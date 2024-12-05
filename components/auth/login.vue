<template>
  <div class="min-h-screen flex justify-center bg-transparent px-4 py-5">
    <div
      class="w-full bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2 text-white">Welcome,</h1>
        <p class="text-gray-300 text-sm">Please sign in to continue access page</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300 mb-2">Username</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon icon="line-md:account text-gray-400" />
            </span>
            <input v-model="username" type="text" id="username" required placeholder="Enter your username"
              class="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon icon="mdi mdi-lock text-gray-400" />
            </span>
            <input v-model="password" type="password" id="password" required placeholder="Enter your password"
              class="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" type="checkbox" v-model="rememberMe"
              class="h-4 w-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

        </div>
        <button type="submit"
          class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Sign In
        </button>
        <div class="text-center mt-4">
          <p class="text-sm text-gray-400">
            Don't have an account yet?
            <NuxtLink to="/contact-us" class="text-blue-400 hover:text-blue-300 transition duration-300">
              Contact Us
            </NuxtLink>
          </p>
        </div>
      </form>
      <p v-if="errorMessage" class="text-red-400 text-center mt-4 text-sm">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'nuxt/app';
import { Icon } from '@iconify/vue';

const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');
const router = useRouter();

const roleRoutes = {
  ADMIN: '/admin/dashboard',
  OPERATOR: '/operator/dashboard',
};

const handleLogin = async () => {
  errorMessage.value = '';

  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both username and password';
    return;
  }

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value,
      },
    });

    const { access_token, user } = response;

    if (!access_token || !user) {
      errorMessage.value = 'Invalid username or password';
      return;
    }

    const expires = rememberMe.value
      ? `expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}`
      : '';

    document.cookie = `auth_token=${access_token}; path=/; Secure; ${expires}`;

    const targetRoute = roleRoutes[user.Role];
    if (targetRoute) {
      router.push(targetRoute);
    } else {
      errorMessage.value = 'Unknown role. Please contact support.';
    }
  } catch (error) {
    errorMessage.value =
      (error as any)?.data?.message || 'An error occurred during login';
    console.error('Login error:', error);
  }
};

onMounted(async () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth_token='))
    ?.split('=')[1];

  if (token) {
    try {
      const user = await $fetch('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const targetRoute = roleRoutes[user.Role];
      if (targetRoute) {
        router.push(targetRoute);
      } else {
        console.log('Unknown role detected. Logging out...');
      }
    } catch (error) {
      console.error('Error validating token:', error);
    }
  }
});
</script>
