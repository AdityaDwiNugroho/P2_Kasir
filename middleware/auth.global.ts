import { useCookie, useRequestHeaders } from 'nuxt/app';
import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('auth_token');
  const headers = useRequestHeaders(['cookie']) as HeadersInit;

  const isValidJwt = (token: string) => {
    return /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(token);
  };

  // Public routes
  const publicRoutes = ['/login', '/docs'];

  // Skip middleware for public routes
  if (publicRoutes.some((route) => to.path.startsWith(route))) {
    return;
  }

  // Handle missing or malformed token
  if (!token.value || !isValidJwt(token.value)) {
    console.warn('Malformed or missing token detected. Redirecting to login.');
    // document.cookie = 'auth_token=; Max-Age=0; path=/; secure; SameSite=None';
    token.value = '';
    return navigateTo('/login', { replace: true });
  }

  // Check token expiration
  try {
    const decodedToken: { exp: number } = jwtDecode(token.value);

    if (Date.now() >= decodedToken.exp * 1000) {
      console.warn('Expired token detected. Redirecting to login.');
      // document.cookie = 'auth_token=; Max-Age=0; path=/; secure; SameSite=None';
      token.value = '';
      return navigateTo('/login', { replace: true });
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    document.cookie = 'auth_token=; Max-Age=0; path=/; secure; SameSite=None';
    return navigateTo('/login', { replace: true });
  }

  // Validate token with server
  try {
    const { data, error } = await useFetch('/api/auth/validate', {
      headers: {
        ...headers,
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (error.value) {
      console.warn('Token validation failed. Clearing token and redirecting to login.');
      // document.cookie = 'auth_token=; Max-Age=0; path=/; secure; SameSite=None';
      token.value = '';
      return navigateTo('/login', { replace: true });
    }
  } catch (e) {
    console.error('Error during token validation:', e);
    // document.cookie = 'auth_token=; Max-Age=0; path=/; secure; SameSite=None';
    token.value = '';
    return navigateTo('/login', { replace: true });
  }
});
