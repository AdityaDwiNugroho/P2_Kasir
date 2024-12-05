import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const token = event.req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createError({ statusCode: 401, message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return decoded; 
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid or expired token' });
  }
});
