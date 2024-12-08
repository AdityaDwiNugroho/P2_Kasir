<script setup lang="ts">

definePageMeta({
  layout: 'none'
})
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { SearchIcon, HomeIcon, ArrowLeftIcon, RefreshCwIcon } from 'lucide-vue-next'
const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const isSearchVisible = ref(false)
const animationComplete = ref(false)
const originalPath = ref(route.path)
const suggestions = ref([
  { path: '/', label: 'Home Page' },
  // { path: '/products', label: 'Products' },
  // { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
])
onMounted(() => {
  setTimeout(() => {
    animationComplete.value = true
  }, 500)
})
const goBack = () => {
  router.back()
}
const goHome = () => {
  router.push('/')
}
const refreshPage = () => {
  window.location.reload()
}
const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value
}
</script>
<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <div class="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500"
        :class="{ 'translate-y-0 opacity-100': animationComplete, 'translate-y-4 opacity-0': !animationComplete }">
        <div class="text-center mb-8">
          <h1 class="text-6xl font-bold text-gray-900 mb-4">
            4<span class="text-indigo-600">😅</span>4
          </h1>
          <p class="text-xl text-gray-600 mb-2">Oops! Page Not Found</p>
          <p class="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-600 font-mono">
            Requested Path: <span class="text-indigo-600">{{ originalPath }}</span>
          </p>
        </div>
        <div class="flex flex-wrap gap-4 justify-center mb-8">
          <button @click="goBack"
            class="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button @click="goHome"
            class="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
            <HomeIcon class="w-4 h-4 mr-2" />
            Home Page
          </button>
          <button @click="refreshPage"
            class="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <RefreshCwIcon class="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
        <div class="relative">
          <button @click="toggleSearch"
            class="w-full flex items-center justify-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            <SearchIcon class="w-4 h-4 mr-2" />
            Search for content
          </button>
          <div v-if="isSearchVisible" class="mt-4 transform transition-all duration-300"
            :class="{ 'translate-y-0 opacity-100': isSearchVisible, 'translate-y-4 opacity-0': !isSearchVisible }">
            <div class="relative">
              <input v-model="searchQuery" type="text" placeholder="Search..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
              <SearchIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
        <div class="mt-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Suggested Pages</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a v-for="suggestion in suggestions" :key="suggestion.path" :href="suggestion.path"
              class="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors">
              {{ suggestion.label }}
            </a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8 text-gray-500 text-sm">
        Need help? <a href="/contact" class="text-indigo-600 hover:text-indigo-700">Contact Support</a>
      </div>
    </div>
  </div>
</template>