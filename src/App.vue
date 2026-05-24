<template>
  <div class="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8 text-blue-400">EGO Party</h1>
    <div v-if="!store.nickname" class="w-full max-w-sm">
      <input v-model="inputName" class="w-full p-3 rounded text-black mb-2" />
      <button @click="store.setNickname(inputName)" class="w-full bg-blue-600 p-3 rounded font-bold">Bestätigen</button>
    </div>
    <div v-else-if="!store.roomId" class="w-full max-w-sm">
      <input v-model="inputRoom" class="w-full p-3 rounded text-black mb-2" />
      <button @click="store.joinRoom(inputRoom)" class="w-full bg-green-600 p-3 rounded font-bold">Raum beitreten</button>
    </div>
    <div v-else class="w-full max-w-sm text-center">
      <div v-if="store.phase === 'lobby'" class="flex gap-4">
        <button @click="store.setReady(true)" class="flex-1 bg-green-600 p-4 rounded">Spielen</button>
        <button @click="store.setReady(false)" class="flex-1 bg-red-600 p-4 rounded">Warten</button>
      </div>
      <p v-else class="text-xl">Spiel startet: {{ store.phase }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from './stores/gameStore';
const store = useGameStore();
const inputName = ref('');
const inputRoom = ref('');
</script>
