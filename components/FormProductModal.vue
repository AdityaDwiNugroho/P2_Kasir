<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 text-center">
        {{ product ? 'Edit Produk' : 'Tambah Produk' }}
      </h2>
      <form @submit.prevent="saveProduct" class="space-y-4">
        <!-- Nama Produk -->
        <div>
          <label class="block text-gray-700 mb-2 font-medium">Nama Produk</label>
          <input v-model="formData.name" type="text" required placeholder="Masukkan nama produk"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
        </div>

        <!-- Harga -->
        <div>
          <label class="block text-gray-700 mb-2 font-medium">Harga</label>
          <input v-model.number="formData.price" type="number" required placeholder="Masukkan harga"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
        </div>

        <!-- Stok -->
        <div>
          <label class="block text-gray-700 mb-2 font-medium">Stok</label>
          <input v-model.number="formData.stock" type="number" required placeholder="Masukkan stok"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300" />
        </div>

        <!-- Kategori Dropdown -->
        <div>
          <label class="block text-gray-700 mb-2 font-medium">Kategori</label>
          <select v-model="formData.category" required
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300">
            <option value="" disabled>Pilih Kategori</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-gray-700 mb-2 font-medium">Gambar Produk</label>
          <input @change="onImageUpload" type="file" accept="image/*"
            class="w-full px-3 py-2 border rounded-md focus:outline-none" />
          <div v-if="imagePreview" class="mt-4 flex justify-center">
            <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-md border" />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-2">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
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
  image?: File | null
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
  category: '',
  image: null
})

const imagePreview = ref<string | null>(null)

const categories = ref<string[]>(['Makanan', 'Minuman', 'Elektronik', 'Pakaian', 'Lainnya'])

onMounted(() => {
  if (props.product) {
    formData.value = { ...props.product }
  }
})

const onImageUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    formData.value.image = file
    const reader = new FileReader()
    reader.onload = (event) => {
      imagePreview.value = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const saveProduct = () => {
  emit('save', { ...formData.value })
}
</script>
