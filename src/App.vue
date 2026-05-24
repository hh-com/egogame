<template>
  <div class="min-h-screen bg-gray-900 text-white p-4">
    <div v-if="!store.nickname">
      <input v-model="inputName" class="w-full p-2 text-black mb-2" placeholder="Nickname" />
      <button @click="store.setNickname(inputName)" class="w-full bg-blue-600 p-2 rounded">Join</button>
    </div>
    <div v-else-if="!store.roomId">
      <input v-model="inputRoom" class="w-full p-2 text-black mb-2" placeholder="Raum ID" />
      <button @click="store.joinRoom(inputRoom)" class="w-full bg-green-600 p-2 rounded">Raum beitreten</button>
    </div>
    <div v-else class="text-center">
      <h2 class="text-xl">Spieler: {{ store.players.length }}</h2>
      <div v-if="store.phase === 'lobby'" class="grid grid-cols-2 gap-4 mt-4">
        <button @click="store.setReady(true)" class="bg-green-600 p-4 rounded">Spielen</button>
        <button @click="store.setReady(false)" class="bg-red-600 p-4 rounded">Warten</button>
      </div>
      <div v-if="store.phase === 'question'" class="mt-8">
        <h3 class="text-2xl">Phase: Frage</h3>
        <div class="flex justify-center gap-4 mt-4">
          <button v-for="c in [1,2]" :key="c" @click="store.setBet(c)" class="bg-yellow-600 p-6 rounded-full w-20 h-20">{{c}} Chip</button>
        </div>
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
