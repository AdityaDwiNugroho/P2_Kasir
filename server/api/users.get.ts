import prisma from "../utils/prisma";
export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id_user: true,
        nama_user: true,
        username: true,
        Role: true,
        avatar: true,
        alamat: true,
        hp: true,
        status: true,
      }
    })

    return {
      success: true,
      data: users
    }


  } catch(error) {
    console.error('Error fetching users', error)
    return {
      success: false,
      error: 'Error fetching users.'
    }
  }
})
