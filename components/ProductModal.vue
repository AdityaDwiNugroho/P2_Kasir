<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4">
        {{ product ? 'Edit Produk' : 'Tambah Produk' }}
      </h2>
      <form @submit.prevent="saveProduct">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Nama Produk</label>
          <input v-model="formData.name" type="text" required class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Harga</label>
          <input v-model.number="formData.price" type="number" required class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Stok</label>
          <input v-model.number="formData.stock" type="number" required class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Kategori</label>
          <input v-model="formData.category" type="text" required class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded-md">
            Batal
          </button>
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
}
const props = defineProps<{
  product: Product | null
}>()
const emit = defineEmits(['close', 'save'])
const formData = ref<Product>({
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  category: ''
})
onMounted(() => {
  if (props.product) {
    formData.value = { ...props.product }
  }
})
const saveProduct = () => {
  emit('save', { ...formData.value })
}
</script>