<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Player Information - {{ playerData.name }}</h1>
    <div v-if="playerData" class="space-y-6">
      <div class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">Basic Info</h2>
        <p><strong>Name:</strong> {{ playerData.name }}</p>
        <p><strong>Clan:</strong> {{ playerData.clan }}</p>
        <p><strong>Trophies:</strong> {{ playerData.trophies }}</p>
        <p><strong>Town Hall Level:</strong> {{ playerData.townHallLevel }}</p>
        <p><strong>Town Hall Weapon Level:</strong> {{ playerData.townHallWeaponLevel }}</p>
      </div>
      <div v-if="playerData.league" class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">League</h2>
        <p><strong>League Name:</strong> {{ playerData.league.name }}</p>
        <p><strong>League Level:</strong> {{ playerData.league.level }}</p>
      </div>
      <div v-if="playerData.attackWins || playerData.defenseWins || playerData.warStars"
        class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">War Stats</h2>
        <p><strong>Attack Wins:</strong> {{ playerData.attackWins }}</p>
        <p><strong>Defense Wins:</strong> {{ playerData.defenseWins }}</p>
        <p><strong>War Stars:</strong> {{ playerData.warStars }}</p>
      </div>
      <div v-if="playerData.builderHallLevel || playerData.builderBaseTrophies"
        class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">Builder Base</h2>
        <p><strong>Builder Hall Level:</strong> {{ playerData.builderHallLevel }}</p>
        <p><strong>Builder Base Trophies:</strong> {{ playerData.builderBaseTrophies }}</p>
      </div>
      <div v-if="playerData.heroes" class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">Heroes</h2>
        <div v-for="hero in playerData.heroes" :key="hero.name" class="border-b py-2">
          <p><strong>{{ hero.name }}:</strong> Level {{ hero.level }} / Max Level {{ hero.maxLevel }}</p>
        </div>
      </div>
      <div v-if="playerData.spells" class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">Spells</h2>
        <div v-for="spell in playerData.spells" :key="spell.name" class="border-b py-2">
          <p><strong>{{ spell.name }}:</strong> Level {{ spell.level }}</p>
        </div>
      </div>
      <div v-if="playerData.army" class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="mt-6 text-xl font-semibold">Army (Troops)</h2>
        <ul>
          <li v-for="troop in playerData.army" :key="troop.name" class="my-2">
            <strong>{{ troop.name }}</strong> - Level: {{ troop.level }} / Max Level: {{ troop.maxLevel }}
          </li>
        </ul>
      </div>
      <div v-if="playerData.achievements" class="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold">Achievements</h2>
        <div v-for="achievement in playerData.achievements" :key="achievement.name" class="border-b py-2">
          <p><strong>{{ achievement.name }}:</strong> {{ achievement.stars }} Stars</p>
        </div>
      </div>
    </div>
    <div v-if="error" class="text-red-500 mt-4">
      <p>{{ error }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const playerTag = ref('#LLRJPPLLR');
const playerData = ref(null);
const error = ref(null);
const fetchPlayerData = async () => {
  if (!playerTag.value) {
    error.value = 'Please enter a player tag!';
    playerData.value = null;
    return;
  }
  try {
    error.value = null;
    const response = await $fetch(`/api/player?tag=${encodeURIComponent(playerTag.value)}`);
    playerData.value = response;
  } catch (err) {
    playerData.value = null;
    error.value = "Failed to fetch player data. Please check the tag.";
    console.error("Error fetching player data:", err);
  }
};
onMounted(fetchPlayerData); 
</script>