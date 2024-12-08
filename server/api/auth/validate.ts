import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

if (!JWT_SECRET && process.env.JWT_SECRET === 'production') {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export default defineEventHandler(async (event) => {
  const token = event.req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createError({ statusCode: 401, message: 'Token not provided' });
  }

  if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token)) {
    console.warn('Malformed token received.');
    throw createError({ statusCode: 401, message: 'Invalid token. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.warn('Invalid or expired token:', error.message);
      throw createError({ statusCode: 401, message: 'Invalid or expired token. Please log in again.' });
    }
    throw createError({ statusCode: 500, message: 'Internal server error' });
  }
});
