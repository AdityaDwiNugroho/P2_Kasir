<template>



  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <!-- <img src="https://avatar.iran.liara.run/public/3" class="h-8" alt="Logo" /> -->
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">收银员</span>
        <!-- shōu yín yuán > china or mandarin dont have kasir-->
      </a>
      <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <!-- Notification btn -->
        <div class="relative">
          <button class="relative" @click.stop="toggleNotifications">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-800 dark:text-white" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A9.015 9.015 0 0018 10V7a6 6 0 10-12 0v3c0 2.5-1.5 4.5-3 5.5L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
            </svg>
            <span v-if="notificationCount > 0"
              class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {{ notificationCount }}
            </span>
          </button>

          <!-- notification dropdown -->
          <div v-if="isNotificationsOpen" ref="notificationDropdownRef"
            class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg dark:bg-gray-700 z-50">
            <div class="py-2">
              <div class="flex items-center justify-between px-4 py-2">
                <p class="text-sm font-bold text-gray-700 dark:text-gray-300">Pemberitahuan</p>
                <button @click="markAllAsRead"
                  class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Tandai semua telah dibaca
                </button>
              </div>
              <ul>
                <li v-for="(notif, index) in displayedNotifications" :key="index"
                  class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                  {{ notif }}
                </li>
              </ul>
              <div class="px-4 py-2 border-t border-gray-100 dark:border-gray-600">
                <NuxtLink to="/admin/notifications"
                  class="block text-sm text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Lihat semua
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>

        <!-- Profile btn -->
        <div class="relative">
          <button type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            @click.stop="toggleDropdown">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="https://avatar.iran.liara.run/public/3" alt="user photo">
          </button>

          <!-- dropdown profile -->
          <div v-if="isDropDownOpen" ref="profileDropdownRef"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 z-50">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span class="block text-sm text-gray-500 truncate dark:text-gray-400">name@yuán.com</span>
            </div>
            <ul class="py-2">
              <li>
                <NuxtLink to="/admin/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Settings</NuxtLink>
              </li>
              <li>
                <button @click="handleLogout"
                  class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out</button>
              </li>
            </ul>

          </div>
        </div>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">

      </div>
    </div>
  </nav>

  <button @click="sidebar" :sidebar="sidebar" data-drawer-target="cta-button-sidebar"
    data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>

  <aside id="cta-button-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 ">
        <li>
          <NuxtLink to="/admin/dashboard/"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

            <span class="ms-3">Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/notifications"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm  text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/users"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path
                d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/products"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path
                d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Produk</span>

          </NuxtLink>
        </li>
        <SystemDropdown />
        <li>
          <a href="/admin/log/"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span>Log</span>
          </a>
        </li>
      </ul>
      <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        <DocumentationDropdown />
        <li>
          <NuxtLink to="/docs/help"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 21">
              <path
                d="m5.4 2.736 3.429 3.429A5.046 5.046 0 0 1 10.134 6c.356.01.71.06 1.056.147l3.41-3.412c.136-.133.287-.248.45-.344A9.889 9.889 0 0 0 10.269 1c-1.87-.041-3.713.44-5.322 1.392a2.3 2.3 0 0 1 .454.344Zm11.45 1.54-.126-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.029.023.049.054.078.077.236.194.454.41.65.645.034.038.078.067.11.107l2.927-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.024.03-.057.052-.081.082a4.963 4.963 0 0 1-.633.639c-.041.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.442-4.763a3.036 3.036 0 0 0-1.383-1.1l-.012-.007a2.955 2.955 0 0 0-1-.213H10a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.01.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .489 1.716c.009.014.022.026.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.318.129.657.2 1 .213.392.015.784-.05 1.15-.192.012-.005.02-.013.033-.018a3.011 3.011 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.35.447L14.84 9.823c.112.428.166.869.16 1.311-.01.356-.06.709-.147 1.054l3.413 3.412c.132.134.249.283.347.444A9.88 9.88 0 0 0 20 11.269a9.912 9.912 0 0 0-1.386-5.319ZM14.6 19.264l-3.421-3.421c-.385.1-.781.152-1.18.157h-.134c-.356-.01-.71-.06-1.056-.147l-3.41 3.412a2.503 2.503 0 0 1-.443.347A9.884 9.884 0 0 0 9.732 21H10a9.9 9.9 0 0 0 5.044-1.388 2.519 2.519 0 0 1-.444-.348ZM1.735 15.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L1.735 6.4a2.507 2.507 0 0 1-.35-.447 9.889 9.889 0 0 0 0 10.1c.1-.164.217-.316.35-.453Zm5.101-.758a4.957 4.957 0 0 1-.651-.645c-.033-.038-.077-.067-.11-.107L3.15 17.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.03-.018-.05-.053-.078-.076ZM6.08 7.914c.03-.037.07-.063.1-.1.183-.22.384-.423.6-.609.047-.04.082-.092.129-.13L3.983 4.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707L6.08 7.914Z" />
            </svg>
            <span class="ms-3">Help</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64 mt-14">
    <NuxtPage />
  </div>

</template>

<script lang="ts" setup>
import SystemDropdown from '~/components/System Dropdown.vue';

const isDropDownOpen = ref(false)
const isNotificationsOpen = ref(false)
const notificationCount = ref(3)
const profileDropdownRef = ref<HTMLElement | null>(null)
const notificationDropdownRef = ref<HTMLElement | null>(null)
const router = useRouter()

const notifications = ref([
  'New order received.',
  'Product stock is low.',
  'New message from admin.',
  'Server maintenance scheduled for tomorrow.',
  'Invoice #123 has been paid.'
])

const displayedNotifications = computed(() => {
  return notifications.value.slice(0, 5)
})

const markAllAsRead = () => {
  notificationCount.value = 0
  // notif logid disini 
}

const toggleDropdown = () => {
  isDropDownOpen.value = !isDropDownOpen.value
  if (isDropDownOpen.value) {
    isNotificationsOpen.value = false
  }
}

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
  if (isNotificationsOpen.value) {
    isDropDownOpen.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target as Node) &&
    notificationDropdownRef.value && !notificationDropdownRef.value.contains(event.target as Node)) {
    isDropDownOpen.value = false
    isNotificationsOpen.value = false
  }
}

const handleLogout = () => {
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict";



  router.push('/login')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
function sidebar() {

}
</script>

<style></style>