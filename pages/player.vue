<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Search Player</h1>
        <form @submit.prevent="searchPlayer" class="mb-4">
            <input v-model="playerTag" type="text" placeholder="Enter Player Tag (e.g., #2P0LYQJUU)"
                class="border p-2 rounded w-full" />
            <button type="submit" class="bg-blue-500 text-white p-2 mt-2 rounded">
                Search
            </button>
        </form>
        <div v-if="loading" class="text-gray-500">Loading...</div>
        <div v-if="error" class="text-red-500">Error: {{ error }}</div>
        <div v-if="player" class="bg-gray-100 p-4 rounded shadow">
            <h2 class="text-xl font-bold">{{ player.name }}</h2>
            <p>Tag: {{ player.tag }}</p>
            <p>Town Hall Level: {{ player.townHallLevel }}</p>
            <p>Clan: {{ player.clan?.name || 'No Clan' }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
interface Player {
    name: string;
    tag: string;
    townHallLevel: number;
    clan?: {
        name: string;
    };
}
const playerTag = ref<string>("");
const player = ref<Player | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);
const searchPlayer = async () => {
    if (!playerTag.value) {
        error.value = "Please enter a player tag.";
        return;
    }
    error.value = null;
    player.value = null;
    loading.value = true;
    try {
        const response = await $fetch<Player>("/api/player", {
            params: { tag: playerTag.value },
        });
        if ((response as any).error) {
            throw new Error((response as any).error);
        }
        player.value = response;
    } catch (err: any) {
        error.value = err.message || "Failed to fetch player data.";
    } finally {
        loading.value = false;
    }
};
</script>