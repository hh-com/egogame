<template>
  <div class="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8 text-blue-400">EGO Party</h1>
    
    <!-- Lobby State -->
    <div v-if="!store.nickname" class="w-full max-w-sm">
      <input v-model="inputName" placeholder="Nickname..." class="w-full p-3 rounded text-black mb-2" />
      <button @click="store.setNickname(inputName)" class="w-full bg-blue-600 p-3 rounded font-bold">Bestätigen</button>
    </div>

    <!-- Join Room State -->
    <div v-else-if="!store.roomId" class="w-full max-w-sm">
      <p class="mb-4">Hallo {{ store.nickname }}!</p>
      <input v-model="inputRoom" placeholder="Raum ID..." class="w-full p-3 rounded text-black mb-2" />
      <button @click="store.joinRoom(inputRoom)" class="w-full bg-green-600 p-3 rounded font-bold">Raum beitreten</button>
    </div>

    <!-- Game Room State -->
    <div v-else class="w-full max-w-md text-center">
      <h2 class="text-2xl font-bold">Raum: {{ store.roomId }}</h2>
      <div class="bg-gray-800 p-6 rounded mt-4">
        <p>Phase: {{ store.phase }}</p>
      </div>
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
