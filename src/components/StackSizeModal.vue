<script setup>
import PrimaryButton from './PrimaryButton.vue'
import { useGameStore } from '../stores/game';
import { ref } from "vue";
import router from '../router';
import { playClickSound, playHoverSound, playSelectSound } from '../services/AudioService';

const gameStore = useGameStore()
const sliderValue = ref(0)

defineProps({
  isOpen: {
    default: false,
    type: Boolean
  }
})

function stackSizeClickHandler () {
  playSelectSound()
  gameStore.alterStackSize(+sliderValue.value)

  router.push("/game")
}
</script>

<template>
  <transition name="fade">
  <div v-if="isOpen">
    <div class="modal-background"></div>
    <div class="modal p-4 w-full max-w-xl rounded-lg">
      <div class="mx-auto max-w-xs">
        <label class="block font-bold text-xl text-center mb-6" for="stackSize"
          >How many pairs?</label
        >
        <input
          @mouseenter="playHoverSound()"
          @input="playClickSound()"
          @keydown.enter="stackSizeClickHandler()"
          class="block w-full mb-2"
          type="range"
          name="stackSize"
          id="stackSize"
          v-model="sliderValue"
          min="0"
          :max="(gameStore.pairsData.length - 1) || (gameStore.cardsData.length - 1)"
        />
      </div>

      <p class="font-bold text-center mb-2">{{ +sliderValue === 0 ? "All pairs" : sliderValue }}</p>

      <PrimaryButton @click="stackSizeClickHandler()" :message="'Let\'s go!'"></PrimaryButton>
    </div>
  </div>
</transition>
</template>

<style>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 2;
}

/* Style the track */
input[type='range'] {
  appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #ddd;
  outline: none;
}

/* Style the thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4caf50;
  cursor: pointer;
}

/* Change the thumb color on hover */
input[type='range']:hover::-webkit-slider-thumb {
  background-color: #2e8b57;
}

/* Change the thumb color on active state */
input[type='range']:active::-webkit-slider-thumb {
  background-color: #228b22;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
