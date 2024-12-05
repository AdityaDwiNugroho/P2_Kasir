<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Produk</h1>
      <button @click="openProductModal(null)"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition">
        Tambah Produk
      </button>
    </div>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4 text-left">Nama Produk</th>
            <th class="p-4 text-left">Harga</th>
            <th class="p-4 text-left">Stok</th>
            <th class="p-4 text-left">Kategori</th>
            <th class="p-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b">
            <td class="p-4">{{ product.name }}</td>
            <td class="p-4">{{ formatRupiah(product.price) }}</td>
            <td class="p-4">{{ product.stock }}</td>
            <td class="p-4">{{ product.category }}</td>
            <td class="p-4 space-x-2">
              <button @click="openProductModal(product)" class="text-blue-500 hover:text-blue-700">
                Edit
              </button>
              <button @click="deleteProduct(product.id)" class="text-red-500 hover:text-red-700">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ProductModal v-if="isModalOpen" :product="selectedProduct" @close="closeProductModal" @save="saveProduct" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
}
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Laptop',
    price: 1000000,
    stock: 10,
    category: 'Elektronik'
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 500000,
    stock: 15,
    category: 'Elektronik'
  }
])
const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)
const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value)
}
const openProductModal = (product: Product | null) => {
  selectedProduct.value = product
  isModalOpen.value = true
}
const closeProductModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}
const saveProduct = (product: Product) => {
  if (selectedProduct.value) {
    const index = products.value.findIndex(p => p.id === selectedProduct.value?.id)
    if (index !== -1) {
      products.value[index] = product
    }
  } else {
    product.id = products.value.length + 1
    products.value.push(product)
  }
  closeProductModal()
}
const deleteProduct = (id: number) => {
  products.value = products.value.filter(product => product.id !== id)
}
</script>