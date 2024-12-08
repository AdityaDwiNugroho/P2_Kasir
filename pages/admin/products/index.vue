<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <div class="overflow-x-auto">

      <div class="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <button @click="openProductModal(null)"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition">
          Tambah Produk
        </button>
        <div class="flex items-center space-x-2">
          <input v-model="searchQuery" type="text" placeholder="Cari produk..."
            class="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
          <select v-model="selectedCategory"
            class="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
          <button @click="showFilters = !showFilters"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-300 transition">
            <Filter class="w-4 h-4 mr-2" /> Filter
          </button>
          <button @click="exportSelected"
            class="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition">
            <Download class="w-4 h-4 mr-2" /> Export
          </button>
        </div>
        <!-- <div v-if="showFilters" class="flex items-center space-x-2">
          <input v-model.number="priceRange.min" type="number" placeholder="Harga min"
            class="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
          <input v-model.number="priceRange.max" type="number" placeholder="Harga max"
            class="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
          <select v-model="stockFilter"
            class="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">Semua Stok</option>
            <option value="in_stock">Stok Tersedia</option>
            <option value="low_stock">Stok Rendah</option>
            <option value="out_of_stock">Stok Habis</option>
          </select>
        </div> -->
      </div>
      <FormProductModal v-if="isModalOpen" :product="selectedProduct" @close="closeProductModal" @save="saveProduct" />
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="w-8 p-4">
              <div class="relative">
                <input type="checkbox" :checked="selectedProducts.size === paginatedProducts.length"
                  :indeterminate="selectedProducts.size > 0 && selectedProducts.size < paginatedProducts.length"
                  @change="toggleAllProducts" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <div v-if="selectedProducts.size > 0"
                  class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {{ selectedProducts.size }}
                </div>
              </div>
            </th>
            <th v-for="(label, field) in {
              name: 'Nama Produk',
              price: 'Harga',
              stock: 'Stok',
              category: 'Kategori',
              lastUpdated: 'Terakhir Diperbarui'
            }" :key="field" @click="toggleSort(field)"
              class="p-4 text-left text-sm font-medium text-gray-600 cursor-pointer select-none">
              <div class="flex items-center group">
                {{ label }}
                <div class="ml-1 text-gray-400 group-hover:text-gray-600">
                  <ChevronUp v-if="sortField === field && sortDirection === 'asc'" class="w-4 h-4" />
                  <ChevronDown v-else-if="sortField === field && sortDirection === 'desc'" class="w-4 h-4" />
                  <div v-else class="w-4 h-4 flex flex-col opacity-0 group-hover:opacity-100">
                    <ChevronUp class="w-4 h-2" />
                    <ChevronDown class="w-4 h-2" />
                  </div>
                </div>
              </div>
            </th>
            <th class="p-4 text-left text-sm font-medium text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <template v-if="paginatedProducts.length > 0">
            <tr v-for="product in paginatedProducts" :key="product.id" class="group hover:bg-gray-50 transition-colors">
              <td class="p-4">
                <input type="checkbox" :checked="selectedProducts.has(product.id)"
                  @change="toggleProductSelection(product.id)"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              </td>
              <td class="p-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 flex-shrink-0 mr-3">
                    <img v-if="product.image" :src="product.image" :alt="product.name"
                      class="w-full h-full rounded-lg object-cover">
                    <div v-else
                      class="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                      <Image class="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-sm text-gray-500">#{{ product.id }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div class="font-medium text-gray-900">
                  {{ formatRupiah(product.price) }}
                </div>
              </td>
              <td class="p-4">
                <div class="flex items-center">
                  <div :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStockStatus(product.stock)
                  ]">
                    {{ product.stock }}
                    <span class="ml-1 text-xs">unit</span>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ product.category }}
                </div>
              </td>
              <td class="p-4 text-sm text-gray-500">
                {{ new Date(product.lastUpdated).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </td>
              <td class="p-4">
                <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openProductModal(product)"
                    class="text-gray-400 hover:text-indigo-600 transition-colors p-1" title="Edit">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="deleteProduct(product.id)"
                    class="text-gray-400 hover:text-red-600 transition-colors p-1" title="Hapus">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="7" class="p-8 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <SearchX class="w-12 h-12 text-gray-400 mb-3" />
                <p class="text-lg font-medium mb-1">Gk ketemu nih, sepertinya kamu lagi sial aja deh! 😬</p>
                <p class="text-sm">
                  Tapi jangan khawatir, semua pasti ada jalannya kalau kamu punya tuhan 🤭
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-500">
          <select v-model="itemsPerPage"
            class="mr-2 px-3 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          <span>items per halaman</span>
        </div>
        <div class="flex items-center space-x-2">
          <button :disabled="currentPage === 1" @click="currentPage--"
            class="px-3 py-1 border rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <div class="flex items-center space-x-1">
            <template v-for="page in totalPages" :key="page">
              <button v-if="page === currentPage ||
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)" @click="currentPage = page" :class="[
                  'px-3 py-1 rounded-md text-sm font-medium',
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                ]">
                {{ page }}
              </button>
              <span v-else-if="page === currentPage - 2 || page === currentPage + 2" class="px-2 text-gray-500">
                ...
              </span>
            </template>
          </div>
          <button :disabled="currentPage === totalPages" @click="currentPage++"
            class="px-3 py-1 border rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-4">
      <RefreshCw class="w-8 h-8 text-indigo-600 animate-spin" />
    </div>
  </div>
  <TransitionRoot appear :show="isModalOpen" as="template">
    <Dialog as="div" @close="closeProductModal" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-lg bg-white rounded-lg shadow-xl">
              <DialogTitle class="p-6 border-b">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ selectedProduct ? 'Edit Produk' : 'Tambah Produk Baru' }}
                </h3>
              </DialogTitle>
              <form @submit.prevent="saveProduct">
                <div class="p-6 space-y-4">
                </div>
                <div class="px-6 py-4 border-t bg-gray-50 flex justify-end space-x-3">
                  <button type="button" @click="closeProductModal"
                    class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                    Batal
                  </button>
                  <button type="submit"
                    class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    :disabled="isLoading">
                    {{ selectedProduct ? 'Simpan Perubahan' : 'Tambah Produk' }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Search,
  SearchX,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  RefreshCw
} from 'lucide-vue-next'
interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  lastUpdated: string
  image?: string
}
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Laptop',
    image: 'data:image/jpeg;base64,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',
    price: 1000000,
    stock: 10,
    category: 'Elektronik',
    status: 'in_stock',
    secret_description: 'motherboardnya doang',
    lastUpdated: '2024-03-08T10:00:00'
  },
  {
    id: 2,
    name: 'Smartphone',
    image: 'data:image/jpeg;base64,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',
    price: 500000,
    stock: 2,
    category: 'Elektronik',
    secret_description: 'barang bekas 2 tahun yang lalu',
    status: 'low_stock',
    lastUpdated: '2024-03-07T15:30:00'
  }
])
const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)
const searchQuery = ref('')
const selectedCategory = ref<string>('All')
const sortField = ref<keyof Product>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')
const isLoading = ref(false)
const itemsPerPage = ref(5)
const currentPage = ref(1)
const selectedProducts = ref<Set<number>>(new Set())
const showFilters = ref(false)
const priceRange = ref({ min: 0, max: 1000000 })
const stockFilter = ref<'All' | 'in_stock' | 'low_stock' | 'out_of_stock'>('All')
const categories = computed(() => {
  const uniqueCategories = new Set(products.value.map(p => p.category))
  return ['All', ...Array.from(uniqueCategories)]
})
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value
    const matchesPrice = product.price >= priceRange.value.min && product.price <= priceRange.value.max
    const matchesStock = stockFilter.value === 'All' || product.status === stockFilter.value
    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })
})
const sortedProducts = computed(() => {
  return [...filteredProducts.value].sort((a, b) => {
    const aValue = a[sortField.value]
    const bValue = b[sortField.value]
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    return sortDirection.value === 'asc'
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue)
  })
})
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value)
)
const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value)
}
const toggleSort = (field: keyof Product) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}
const getStockStatus = (stock: number): string => {
  if (stock === 0) return 'bg-red-100 text-red-800'
  if (stock < 5) return 'bg-yellow-100 text-yellow-800'
  return 'bg-green-100 text-green-800'
}
const openProductModal = (product: Product | null) => {
  selectedProduct.value = product
  isModalOpen.value = true
}
const closeProductModal = () => {
  isModalOpen.value = false
  selectedProduct.value = null
}
const saveProduct = async (product: Product) => {
  isLoading.value = true
  try {
    if (selectedProduct.value) {
      const index = products.value.findIndex(p => p.id === selectedProduct.value?.id)
      if (index !== -1) {
        products.value[index] = { ...product, lastUpdated: new Date().toISOString() }
      }
    } else {
      product.id = products.value.length + 1
      product.lastUpdated = new Date().toISOString()
      products.value.push(product)
    }
    closeProductModal()
  } finally {
    isLoading.value = false
  }
}
const deleteProduct = async (id: number) => {
  if (!confirm('Lu beneran mau hapus produk ini?')) return
  if (!confirm('yakin dek?')) return
  isLoading.value = true
  try {
    products.value = products.value.filter(product => product.id !== id)
  } finally {
    isLoading.value = false
  }
}
const toggleProductSelection = (productId: number) => {
  if (selectedProducts.value.has(productId)) {
    selectedProducts.value.delete(productId)
  } else {
    selectedProducts.value.add(productId)
  }
}
const toggleAllProducts = () => {
  if (selectedProducts.value.size === paginatedProducts.value.length) {
    selectedProducts.value.clear()
  } else {
    paginatedProducts.value.forEach(product => {
      selectedProducts.value.add(product.id)
    })
  }
}
const exportSelected = () => {
  const selectedData = products.value.filter(p => selectedProducts.value.has(p.id))
  const csv = convertToCSV(selectedData)
  downloadCSV(csv, 'selected_products.csv')
}
const convertToCSV = (data: Product[]): string => {
  const headers = ['ID', 'Name', 'Price', 'Stock', 'Category', 'Status', 'Last Updated']
  const rows = data.map(p => [
    p.id,
    p.name,
    p.price,
    p.stock,
    p.category,
    p.status,
    p.lastUpdated
  ])
  return [headers, ...rows].map(row => row.join(',')).join('\n')
}
const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}
watch(searchQuery, () => {
  currentPage.value = 1
})
watch(selectedCategory, () => {
  currentPage.value = 1
})
</script>