<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Clash of Clans Upgrade Estimation</h1>
    <div class="mb-4">
      <label for="playerTag" class="block text-lg">Enter Player Tag:</label>
      <input v-model="playerTag" id="playerTag" type="text" class="border p-2 w-full mt-2" placeholder="#PlayerTag" />
      <button @click="fetchPlayerData" class="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-700">Fetch Player
        Data</button>
    </div>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-if="playerData && !loading" class="mt-6">
      <h2 class="text-xl mb-2 font-semibold">Player Information</h2>
      <div class="bg-white shadow rounded p-4">
        <p><strong>Name:</strong> {{ playerData.name }}</p>
        <p><strong>Clan:</strong> {{ playerData.clan }}</p>
        <p><strong>Trophies:</strong> {{ playerData.trophies }}</p>
        <p><strong>Town Hall Level:</strong> {{ playerData.townHallLevel }}</p>
      </div>
      <div class="mt-6">
        <h2 class="text-xl font-semibold">Enter Building Levels</h2>
        <form @submit.prevent="calculateUpgradeTime">
          <div v-for="(building, index) in buildingNames" :key="index" class="mb-4">
            <label :for="building" class="block">{{ building }}</label>
            <input v-model="buildingLevels[building]" type="number" class="border p-2 w-full mt-2"
              :placeholder="`Level for ${building}`" min="1" />
          </div>
          <button type="submit" class="bg-green-500 text-white p-2 mt-2 hover:bg-green-700">Calculate Upgrade
            Time</button>
        </form>
      </div>
      <div v-if="estimatedUpgradeTime" class="mt-6">
        <h2 class="text-xl mb-2 font-semibold">Estimated Upgrade Time</h2>
        <p class="bg-green-100 p-4 rounded">{{ estimatedUpgradeTime }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
interface PlayerData {
  name: string;
  clan: string;
  trophies: number;
  townHallLevel: number;
}
const playerTag = ref<string>('');
const playerData = ref<PlayerData | null>(null);
const estimatedUpgradeTime = ref<string | null>(null);
const loading = ref<boolean>(false);
const buildingNames = [
  "Barracks", "Archer Tower", "Cannons", "Mortar", "Spell Factory", "Laboratory", "Gold Storage", "Elixir Storage"
];
const buildingLevels: Record<string, number | string> = {};
const fetchPlayerData = async () => {
  loading.value = true;
  try {
    const response = await $fetch(`/api/player?tag=${playerTag.value}`);
    playerData.value = response as PlayerData;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};
const calculateUpgradeTime = () => {
  if (!buildingLevels || Object.keys(buildingLevels).length === 0) {
    estimatedUpgradeTime.value = "Please enter building levels to calculate.";
    return;
  }
  let totalUpgradeTime = 0;
  for (const building of buildingNames) {
    const level = Number(buildingLevels[building]);
    if (level) {
      totalUpgradeTime += level * 10;
    }
  }
  estimatedUpgradeTime.value = `${totalUpgradeTime} minutes`;
};
</script>
<style scoped></style>