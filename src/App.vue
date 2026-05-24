<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
    <div v-if="!store.nickname" class="w-full max-w-sm">
      <h1 class="text-4xl font-bold mb-6 text-center text-blue-400">EGO Party</h1>
      <input v-model="inputName" placeholder="Nickname..." class="w-full p-3 rounded-lg text-black mb-4 focus:outline-none" />
      <button @click="join" class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold">Spiel beitreten</button>
    </div>
    <div v-else class="text-center w-full max-w-md">
      <h2 class="text-2xl font-bold">Hallo, {{ store.nickname }}!</h2>
      <div class="bg-gray-800 p-6 rounded-xl mt-6">
        <p class="text-gray-400">Status: Lobby</p>
        <p class="text-sm mt-2">UUID: {{ store.userId.substring(0,8) }}...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from './stores/gameStore';
const store = useGameStore();
const inputName = ref('');
const join = () => { if (inputName.value.trim()) store.setNickname(inputName.value); };
</script>
