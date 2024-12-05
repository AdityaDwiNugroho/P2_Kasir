import prisma from "~/server/utils/prisma"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

let blacklist: string[] = []
export default defineEventHandler(async (event) => {

  const token = event.req.headers.authorization?.split(' ')[1]

  if(!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token not provided'
    })
  }

  blacklist.push(token)

  return {
    message: 'Logout successful'
  }
})
