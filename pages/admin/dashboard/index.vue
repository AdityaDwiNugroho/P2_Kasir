<template>
  <div class="p-6 max-w-screen mx-auto">
    <div class="mb-8">
      <h2 class="text-gray-600 mb-4">LANGKAH SELANJUTNYA</h2>
      <div class="flex items-center">
        <div class="flex-1">
          <div class="h-2 bg-green-500 rounded"></div>
          <div class="flex items-center mt-2">
            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <icon name="ic:baseline-check" class="text-white w-4 h-4" />
            </div>
            <span class="ml-2 text-sm text-gray-600">1. Tambah produk</span>
          </div>
        </div>
        <div class="flex-1">
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="flex items-center mt-2">
            <div class="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-500 text-sm">2</span>
            </div>
            <span class="ml-2 text-sm text-gray-600">2. Transaksi di aplikasi</span>
          </div>
        </div>
        <div class="flex-1">
          <div class="h-2 bg-gray-200 rounded"></div>
          <div class="flex items-center mt-2">
            <div class="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-500 text-sm">3</span>
            </div>
            <span class="ml-2 text-sm text-gray-600">3. Lihat laporan penjualan</span>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-8">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Outlet</label>
        <select class="w-full border border-gray-300 rounded-md px-3 py-2">
          <option>TheLionel</option>
          <option>AngelShop</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Tanggal</label>
        <select class="w-full border border-gray-300 rounded-md px-3 py-2">
          <option>04 Dec 2024 - 04 Dec 2024</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600">PENJUALAN</h3>
          <icon name="mdi:cart" class="text-gray-400 w-6 h-6" />
        </div>
        <div class="text-green-500 text-sm mb-2">
          <span>0% (+Rp0)</span>
          <span class="text-gray-500 ml-1">Dibanding kemarin</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-gray-500 text-sm mr-1">RATA-RATA</span>
          <span class="text-xl font-semibold">Rp0</span>
        </div>
        <div class="mt-4">
          <button class="text-gray-500 text-sm flex items-center">
            Lihat Selengkapnya
            <icon name="mdi:arrow-right" class="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600">TRANSAKSI</h3>
          <icon name="mdi:chart-bar" class="text-gray-400 w-6 h-6" />
        </div>
        <div class="text-green-500 text-sm mb-2">
          <span>0% (+0)</span>
          <span class="text-gray-500 ml-1">Dibanding kemarin</span>
        </div>
        <div class="text-xl font-semibold">0</div>
        <div class="mt-4">
          <button class="text-gray-500 text-sm flex items-center">
            Lihat Selengkapnya
            <icon name="mdi:arrow-right" class="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600">LABA KOTOR</h3>
          <icon name="mdi:chart-line" class="text-gray-400 w-6 h-6" />
        </div>
        <div class="text-green-500 text-sm mb-2">
          <span>0% (+Rp0)</span>
          <span class="text-gray-500 ml-1">Dibanding kemarin</span>
        </div>
        <div class="text-xl font-semibold">Rp0</div>
        <div class="mt-4">
          <button class="text-gray-500 text-sm flex items-center">
            Lihat Selengkapnya
            <icon name="mdi:arrow-right" class="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatCard {
  title: string;
  icon: string;
  value: string | number;
  percentage: number;
  comparison: string;
}
const stats = ref<StatCard[]>([
  {
    title: 'PENJUALAN',
    icon: 'mdi:cart',
    value: 'Rp0',
    percentage: 0,
    comparison: 'Rp0'
  },
  {
    title: 'TRANSAKSI',
    icon: 'mdi:chart-bar',
    value: '0',
    percentage: 0,
    comparison: '0'
  },
  {
    title: 'LABA KOTOR',
    icon: 'mdi:chart-line',
    value: 'Rp0',
    percentage: 0,
    comparison: 'Rp0'
  }
]);
</script>

<style></style>