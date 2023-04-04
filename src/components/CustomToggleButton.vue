<template>
  <div class="flex justify-between">
    <p class="text-xl">{{ message }}</p>

    <button
      @mouseenter="playHoverSound()"
      :id="id"
      class="block text-white rounded-lg font-bold cursor-pointer py-2 px-8 h-12 text-md ml-4 hover:scale-105"
      :class="{ 'bg-green-400': value === true, 'bg-red-400': value === false }"
    >
      {{ value ? 'Yes' : 'No' }}
    </button>
  </div>
</template>

<script setup>
import { playHoverSound } from '../services/AudioService';

defineProps({
  message: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  value: {
    type: Boolean,
    required: true
  }
})
</script>
