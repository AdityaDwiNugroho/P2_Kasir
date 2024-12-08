import prisma from "~/server/utils/prisma"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
if(!JWT_SECRET && process.env.JWT_SECRET ==='production') {
  throw new Error('JWT_SECRET is not defined in the environment variables')
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body

    if(!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password required'
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if(!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password'
      })
    }

    const tokenPayload = {
      id_user: user.id_user,
      username: user.username,
      Role: user.role,
    }
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: '1d'})

    setCookie(event, 'auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.JWT_SECRET === 'production',
      sameSite: 'none',
      path: '/'
    })

    return {
      access_token: accessToken,
      user: {
        id_user: user.id_user,
        username: user.username,
        Role: user.role,
      }
    }
  } catch (error) {
    return sendError(event, error as Error)
  }
})
