<script setup>
import { usePreferenceStore } from '../stores/preference';

const preferenceStore = usePreferenceStore();

defineProps({
  isReversed: {
    default: false,
    type: Boolean
  }
})
</script>

<template>
  <div v-show="preferenceStore.disableMovingBackgrounds === false" class="background" :class="{ reverse: isReversed }"></div>
</template>

<style scoped>
.background {
  animation: scroll 120s linear infinite;
  background: repeating-linear-gradient(-45deg, #fff, #fff 10px, #598dc8 10px, #93c5fd 20px);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  mix-blend-mode: multiply;
  opacity: 0.25;
}

.background.reverse {
  transform: rotateZ(180deg) rotateY(180deg);
}

@keyframes scroll {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -2000px 0;
  }
}
</style>
