import prisma from "~/server/utils/prisma";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nama_user, username, password, role, alamat, hp } = body;
  if (!nama_user || !username || !password || !role) {
    throw createError({ statusCode: 400, message: 'Missing required fields.' });
  }
  const prefixedUsername = `${role.toLowerCase()}_${username}`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      nama_user,
      username: prefixedUsername,
      password: hashedPassword,
      Role: role.toUpperCase(),
      avatar : '',
      alamat,
      hp,
      status: 'EMPLOYED',
    },
  });
  return {
    message: 'User registered successfully.',
    user: {
      id_user: user.id_user,
      nama_user: user.nama_user,
      username: user.username,
      role: user.Role,
    },
  };
});