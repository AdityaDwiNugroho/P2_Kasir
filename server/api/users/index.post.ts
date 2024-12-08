import bcrypt from 'bcrypt';
import { defineEventHandler, readBody, createError } from 'h3';
import prisma from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  return { message: 'API is working!' };

  const { username, password, role, nama_user } = await readBody(event);

  if (!username || !password || !role || !nama_user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'All fields are required.',
    });
  }

  if (!["ADMIN", "OPERATOR"].includes(role)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid role. Allowed roles: ADMIN, OPERATOR.',
    });
  }

  const currentUser = event.context.user;
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Please log in.',
    });
  }

  if (currentUser.role !== "ADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only admins can create users.',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        nama_user,
        password: hashedPassword,
        role,
        alamat: "",
        hp: "",
        status: "EMPLOYED"
      },
    });

    return {
      message: `User ${newUser.username} created successfully`,
      user: {
        id_user: newUser.id_user,
        username: newUser.username,
        role: newUser.role,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user.',
    });
  }
});
