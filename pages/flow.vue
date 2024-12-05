<template>
  <div class="relative">
    <!-- User Menu Button -->
    <button type="button"
      class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      @click="toggleDropdown" aria-expanded="isDropdownOpen">
      <span class="sr-only">Open user menu</span>
      <img class="w-8 h-8 rounded-full" src="https://avatar.iran.liara.run/public/3" alt="user photo">
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isDropdownOpen"
      class="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-48">
      <div class="px-4 py-3">
        <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
        <span class="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
      </div>
      <ul class="py-2" aria-labelledby="user-menu-button">
        <li>
          <a href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Settings
          </a>
        </li>
        <li>
          <a href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Earnings
          </a>
        </li>
        <li>
          <a href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Sign out
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event) => {
  // Close dropdown if click is outside the dropdown
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  // Add click event listener to close dropdown when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // Remove event listener to prevent memory leaks
  document.removeEventListener('click', handleClickOutside)
})
</script>