import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (username === 'admin' && password === 'password') {
    return { success: true, message: 'Login successful' };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
});