import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';


async function main() {
  const hashedPassword = await bcrypt.hash('admin-', 10);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {}, 
    create: {
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

  console.log('Admin account created:', admin);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
