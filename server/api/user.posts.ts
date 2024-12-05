import { H3Error, defineEventHandler, readBody } from 'h3'
import bcrypt from 'bcrypt'
import prisma from '~/server/utils/prisma' 
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body.nama_user || !body.username || !body.password || !body.user_priv) {
      throw new H3Error('All fields are required.')
    }
    const hashedPassword = await hashPassword(body.password)
    const newUser = await prisma.user.create({
      data: {
        nama_user: body.nama_user,
        username: body.username,
        password: hashedPassword,
        Role: body.Role,
        avatar: body.avatar ?? '',
        alamat: body.alamat ?? '',
        hp: body.hp ?? '',
        status: body.status ?? 'ACTIVE',
      },
    })
    return { success: true, user: newUser }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'User registration failed. Please try again.' }
  }
})
async function hashPassword(password: string) {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}