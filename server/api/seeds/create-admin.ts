import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const hashedPassword = await bcrypt.hash('admin-', 10);

  const admin = await prisma.user.create({
    data: {
      nama_user: 'Super Admin',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
      avatar: 'https://avatar.iran.liara.run/public/3',
      alamat: 'Head Office',
      hp: '6281234567890',
      status: 'EMPLOYED',
    },
  });

  return {
    message: 'Admin account created successfully',
    admin,
  };
});
