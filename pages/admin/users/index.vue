<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-screen px-4 sm:px-6 lg:px-8 py-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Users Management</h1>
          <p class="mt-2 text-sm text-gray-600">Manage system users, roles and permissions</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add user
          </button>
        </div>
      </div>
      <dl class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div v-for="stat in stats" :key="stat.name" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt class="truncate text-sm font-medium text-gray-500">{{ stat.name }}</dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
        </div>
      </dl>
      <div class="mt-8 bg-white shadow rounded-lg">
        <div class="p-6 border-b border-gray-200">
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="inline-flex rounded-lg shadow-sm">
              <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value" :class="[
                activeTab === tab.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:text-gray-900',
                'px-4 py-2 text-sm font-medium first:rounded-l-lg last:rounded-r-lg border',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10'
              ]">
                {{ tab.name }}
              </button>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-4">
              <div class="flex rounded-md shadow-sm">
                <div class="relative flex-grow focus-within:z-10">
                  <input type="search" v-model="searchQuery"
                    class="flex w-full h-5 rounded-none rounded-l-md border pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search users...">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <!-- <Search class="h-5 w-5 text-gray-400" /> -->
                    <SearchIcon class="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <!-- <Filter class="h-5 w-5 text-gray-400" /> -->
                  <Filter class="h-5 w-5 text-gray-400" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th v-for="header in tableHeaders" :key="header" scope="col"
                  class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="user in filteredUsers" :key="user.id_user">
                <td class="whitespace-nowrap py-4 px-3">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img :src="user.avatar || undefined" class="h-10 w-10 rounded-full" :alt="user.username" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ user.nama_user }}</div>
                      <div class="text-gray-500">{{ user.username }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.Role }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <span :class="[
                    user.status === 'EMPLOYED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  ]">
                    {{ user.status }}
                  </span>
                </td>
                <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.lastActive }}</td> -->
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <button class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { SearchIcon, FilterIcon } from 'lucide-vue-next'
import type { User } from '@prisma/client'
import { Role, Status } from '@prisma/client'

const searchQuery = ref('')
const activeTab = ref('all')
const users = ref<User[]>([])

const fetchUsers = async () => {
  try {
    const data = await $fetch<User[]>('/api/users')

    if (data) {
      users.value = data.map((user: User) => ({
        ...user,
        status: user.status === Status.EMPLOYED ? Status.EMPLOYED : Status.TERMINATED,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama_user)}&background=random`
      }))
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    // Optionally, add error handling toast or notification
  }
}

const stats = computed(() => [
  { name: 'Total Users', value: users.value.length.toString() },
  { name: 'Active Users', value: users.value.filter(user => user.status === 'EMPLOYED').length.toString() },
])

const tabs = [
  { name: 'All Users', value: 'all' },
  { name: 'Administrators', value: Role.ADMIN },
  { name: 'Operators', value: Role.OPERATOR },
]

const tableHeaders = [
  'User',
  'Role',
  'Status',
  'Last Active',
  'Actions'
]

const filteredUsers = computed(() => {
  let filtered = users.value;
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(user => user.Role === activeTab.value);
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(user =>
      user.nama_user.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  }
  return filtered;
});

onMounted(fetchUsers);
</script>