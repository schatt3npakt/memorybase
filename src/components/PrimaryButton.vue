<script setup>
import { playHoverSound } from '../services/AudioService';

defineProps({
  message: String
})
</script>

<template>
  <button
    @mouseenter="playHoverSound()"
    class="block cursor-pointer mx-auto rounded-lg border-white border-4 text-white font-black text-xl px-8 py-4 shadow-md md:shadow-lg md:text-2xl hover:scale-105"
  >
    {{ message }}
  </button>
</template>

<style scoped>
button {
  background-color: var(--theme-color);
}
</style>
