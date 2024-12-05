import prisma from "~/server/utils/prisma";
async function main() {
  const admins = await prisma.user.findMany({
    where: {
      Role: 'ADMIN', 
    },
    select: {
      id_user: true,
      nama_user: true,
      username: true,
      avatar: true,
      alamat: true,
      hp: true,
      status: true,
    },
  });
  if (admins.length === 0) {
    console.log('No admin accounts found.');
  } else {
    console.log('List of Admin Accounts:');
    console.table(admins); 
  }
}
main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());