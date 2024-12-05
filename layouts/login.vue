<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
    <main id="page-content" class="flex-1 bg-white/90 backdrop-blur-sm p-4 shadow-xl">
      <NuxtPage />
    </main>
    <div v-if="connect"
      class="fixed top-12 left-1/2 transform -translate-x-1/2 shadow-2xl rounded-xl p-4 flex items-center justify-between max-w-md w-full z-50 transition-all duration-500 ease-in-out"
      :class="[
        connStat === true
          ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/50'
          : 'bg-rose-600 text-white ring-4 ring-rose-500/50'
      ]">
      <div class="flex items-center space-x-3">
        <span :class="connStat ? 'mdi mdi-wifi-strength-4' : 'mdi mdi-wifi-strength-off'"
          class="text-2xl animate-pulse"></span>
        <span class="text-sm font-medium tracking-wide">
          {{ connStat ? 'Network Connected' : 'Network Disconnected' }}
        </span>
      </div>
      <button class="rounded-full py-1 px-2 hover:bg-white/20 transition-colors duration-300" @click="connect = false">
        <span class="mdi mdi-close text-lg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const connect = ref(false)
const connStat = ref<boolean | null>(null)

const uiNetworkStatus = (val: boolean) => {
  connStat.value = val
  connect.value = true

  if (val) {
    setTimeout(() => {
      connect.value = false
    }, 5000)
  }
}

const handleOnline = () => uiNetworkStatus(true)
const handleOffline = () => uiNetworkStatus(false)

onMounted(() => {
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})
</script>