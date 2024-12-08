<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-screen px-4 sm:px-6 lg:px-8 py-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Users Management</h1>
          <p class="mt-2 text-sm text-gray-600">Manage system users, roles, and permissions</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button @click="isModalOpen = true"
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add user
          </button>
        </div>
      </div>
      <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Add New User</h2>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input v-model="newUser.username" type="text" id="username"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input v-model="newUser.password" type="password" id="password"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="nama_user" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input v-model="newUser.nama_user" type="text" id="nama_user"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md" required />
            </div>
            <div class="mb-4">
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <select v-model="newUser.role" id="role" class="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required>
                <option value="OPERATOR">Operator</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button type="button" @click="isModalOpen = false"
                class="mr-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button type="submit" class="px-4 py-2 text-white bg-indigo-600 rounded-md">Create User</button>
            </div>
          </form>
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
              <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                :class="[activeTab === tab.value ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:text-gray-900', 'px-4 py-2 text-sm font-medium first:rounded-l-lg last:rounded-r-lg border', 'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10']">
                {{ tab.name }}
              </button>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-4">
              <div class="flex rounded-md shadow-sm">
                <div class="relative flex-grow focus-within:z-10">
                  <input type="search" v-model="searchQuery"
                    class="flex w-full h-full rounded-none rounded-l-md border pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search users...">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon class="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <button
                  class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <FilterIcon class="h-5 w-5 text-gray-400" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50 overflow-hidden">
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
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.role }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <span
                    :class="[user.status === 'EMPLOYED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex rounded-full px-2 text-xs font-semibold leading-5']">
                    {{ user.status }}
                  </span>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <button class="text-indigo-600 hover:text-indigo-900">Edit</button>
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
import { ref, computed, onMounted } from 'vue';
import { SearchIcon, FilterIcon } from 'lucide-vue-next';
import type { User } from '@prisma/client';
import { Role, Status } from '@prisma/client';
const searchQuery = ref('');
const activeTab = ref('all');
const users = ref<User[]>([]);
const isModalOpen = ref(false);
const newUser = ref({
  username: '',
  password: '',
  role: Role.OPERATOR,
  nama_user: '',
});

async function fetchUsers() {
  try {
    const data = await $fetch<User[]>('/api/users');
    if (data) {
      users.value = data.map((user: User) => ({
        ...user,
        status: user.status === Status.EMPLOYED ? Status.EMPLOYED : Status.TERMINATED,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nama_user)}&background=random`
      }));
    }
  } catch (error) {
    console.error(error);
  }
}



onMounted(fetchUsers);
const filteredUsers = computed(() => {
  let filtered = users.value;
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(user => user.status === activeTab.value);
  }
  return filtered.filter(user => user.nama_user.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

async function submitForm() {
  try {
    const { data, status, error, refresh } = useFetch('/api/users', {
      method: 'POST',
      body: {
        username: newUser.value.username,
        nama_user: newUser.value.nama_user,
        password: newUser.value.password,
        role: newUser.value.role,
        alamat: '',
        hp: '',
      },
    });

    console.log(data.value)
    console.log()
    if (data?.status === 200) {
      isModalOpen.value = false;
      return data.value
    }
  } catch (error) {
    console.error(error)
  }
}

const tabs = ref([
  { name: 'All', value: 'all' },
  { name: 'Active', value: 'EMPLOYED' },
  { name: 'Inactive', value: 'TERMINATED' },
]);
const stats = computed(() => {
  return [
    { name: 'Total Users', value: users.value.length },
    { name: 'Active Users', value: users.value.filter(user => user.status === Status.EMPLOYED).length },
    { name: 'Inactive Users', value: users.value.filter(user => user.status === Status.TERMINATED).length }
  ];
});

const tableHeaders = ['User', 'Role', 'Status', 'Actions'];
</script>