<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/game'
import { usePreferenceStore } from '../stores/preference'
import { playHoverSound } from '../services/AudioService';

const preferenceStore = usePreferenceStore()
const gameStore = useGameStore()

let gridCols = ref(3)

function updateGridCols() {
  gridCols.value = 3
  if (window.innerWidth >= 768) gridCols.value = 4
  if (window.innerWidth >= 1024) gridCols.value = 6
  if (window.innerWidth >= 1280) gridCols.value = 7
}

function getGridMapping(index) {
  let row = Math.floor(index / gridCols.value)
  let col = (index % gridCols.value) + 1
  let letter = String.fromCharCode(65 + row)

  return `${letter}${col}`
}

defineProps({
  item: {
    required: true,
    type: Object
  },
  index: {
    required: true,
    type: Number
  }
})

updateGridCols()

window.addEventListener('resize', () => {
  updateGridCols()
})
</script>

<template>
  <div class="w-16 h-16 sm:w-24 sm:h-24 xl:w-32 xl:h-32" v-if="item.id === undefined"></div>
  <button
    v-else
    @mouseenter="playHoverSound()"
    class="flip-card w-16 h-16 sm:w-24 sm:h-24 xl:w-32 xl:h-32 mx-auto cursor-pointer font-extrabold hover:scale-105"
    :disabled="gameStore.getIsIdle() === false"
    :class="{ active: gameStore.selectedCards.has(item.id), 'hover:scale-150': preferenceStore.enableLargerScale}"
    @click="gameStore.addSelectedCard(item.id, item.description, item?.sound)"
  >
    <div class="flip-card-inner text-xl md:text-3xl rounded-lg">
      <div
        class="flip-card-front border-4 shadow-md md:shadow-lg flex justify-center items-center rounded-lg bg-white"
        :class="{
          'border-green-300': gameStore.pairState === 'WIN',
          'border-red-300': gameStore.pairState === 'LOSE'
        }"
      >
        <img
          v-if="item.image"
          :class="{
            'object-cover': preferenceStore.fitImageToCardDimensions === true,
            'object-contain': preferenceStore.fitImageToCardDimensions === false
          }"
          class="block w-full h-full"
          :src="item.image"
          alt=""
        />
        <p v-else class="block" :class="(item.title.length === 1) ? 'text-sm' : 'text-5xl'" alt="">{{ item.title }}</p>
      </div>
      <div
        class="flip-card-back border-white border-4 shadow-md md:shadow-lg flex justify-center items-center rounded-lg text-white font-black"
      >
        <span class="font-black" :class="{ hidden: preferenceStore.showGridSigns === false }">{{
          getGridMapping(index)
        }}</span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.flip-card {
  perspective: 1000px;
}

.flip-card:disabled,
.flip-card.disabled {
  pointer-events: none;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card.active .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card.active .flip-card-back span {
  display: none;
}

.flip-card-back,
.flip-card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  transform: rotateY(180deg);
  z-index: 5;
}

.flip-card-back {
  --background-color-1: var(--theme-color);
  background-image: linear-gradient(45deg, var(--background-color-1) 25%, transparent 25%),
    linear-gradient(-45deg, var(--background-color-1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--background-color-1) 75%),
    linear-gradient(-45deg, transparent 75%, var(--background-color-1) 75%),
    linear-gradient(var(--theme-color-2), var(--theme-color-2)), linear-gradient(white, white);
  background-size: 20px 20px;
  background-position: 50% 50%;
}
</style>
