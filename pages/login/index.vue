<template>
  <div class="flex flex-col md:flex-row h-screen">
    <div class="md:w-1/2 w-full bg-white flex flex-col justify-center p-8 relative">
      <div class="w-full">
        <div class="flex justify-center items-center flex-col w-full mb-8">
          <img :src="themeImage" alt="Logo" class="max-w-[155px] mb-6" />
        </div>
        <div class="absolute top-4 right-4 z-10">
          <select v-model="selectedLanguage"
            class="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="lang in languages" :key="lang" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full mx-auto">
        <AuthLogin />
      </div>
    </div>
    <div class="md:w-1/2 w-full hidden md:flex bg-login justify-center items-center">
      <img src="/kasir.webp" alt="Login Illustration" class="max-h-full object-contain bg-cover" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
definePageMeta({
  layout: 'login'
})
const languages = ['English', 'Spanish', 'Indonesian']
const selectedLanguage = ref('English')
const themeImage = computed(() => '/kasir.webp')
const isMdUp = computed(() => {
  if (process.client) {
    return window.innerWidth >= 768
  }
  return true
})
const isSmDown = computed(() => {
  if (process.client) {
    return window.innerWidth <= 640
  }
  return false
})
</script>
<style scoped>
.bg-login {
  background-color: #0d9abd;
  background-image: url('/kasir.webp');
  background-size: cover;
  background-position: center;
}

@media only screen and (max-width: 600px) {
  .mobile-bg {
    background-image: url('/kasir.webp');
    background-position: bottom;
    background-size: 100% 30%;
    width: 100%;
  }
}
</style>