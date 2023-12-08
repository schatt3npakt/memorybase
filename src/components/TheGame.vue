<script setup>
import { onMounted, ref } from 'vue'
import router from '../router'
import { useGameStore } from '../stores/game'
import { usePreferenceStore } from '../stores/preference'
import PrimaryButton from './PrimaryButton.vue'
import GameCard from './GameCard.vue'
import { playCardFlipSound, playSelectSound, playHoverSound } from '../services/AudioService'

const isInsideStartAnimation = ref(false)
const gameStore = useGameStore()
const preferenceStore = usePreferenceStore()

if (gameStore.themeKey === '') {
  router.push('/')
}

function revealCardsOnStart() {
  isInsideStartAnimation.value = true

  const flipCards = document.querySelectorAll('.flip-card')
  let delay = 0

  flipCards.forEach((flipCard) => {
    flipCard.classList.add('disabled')
    setTimeout(() => {
      playCardFlipSound()
      flipCard.classList.add('active')
    }, delay)
    delay += 100
  })

  setTimeout(() => {
    const flipCardPromise = new Promise((resolve) => {
      flipCards.forEach((flipCard) => {
        setTimeout(() => {
          playCardFlipSound()
          flipCard.classList.remove('active')
          flipCard.classList.remove('disabled')

          if (flipCard === flipCards[flipCards.length - 1]) {
            // If this is the last flipCard, resolve the promise
            resolve()
          }
        }, delay)
        delay += 100
      })
    })

    flipCardPromise.then(() => {
      window.setTimeout(() => {
        isInsideStartAnimation.value = false
      }, 500)
    })
  }, 2000)
}

function handleResetClick() {
  playSelectSound()
  gameStore.resetGame()
}

onMounted(() => {
  if (preferenceStore.revealCardsOnStartUp) {
    revealCardsOnStart()
  }
})
</script>

<template>
  <div>
    <div
      v-if="gameStore.pairsData.length !== 0"
      class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-none gap-6 mx-auto mb-16"
    >
      <GameCard
        v-for="(item, index) in gameStore.cardsData"
        :index="index"
        :item="item"
        :key="item.id"
      ></GameCard>
    </div>
    <div class="mx-auto my-8 px-4" v-else>
      <img class="mb-8 block mx-auto" :src="`./wingifs/${gameStore.winGifKey}.gif`" alt="" />

      <PrimaryButton :message="'Play again?'" @click="handleResetClick()" />
    </div>
    <button
      v-show="preferenceStore.showLünkerButton"
      :class="{ 'opacity-50 pointer-events-none': isInsideStartAnimation === true }"
      :disabled="isInsideStartAnimation === true"
      @mouseenter="playHoverSound()"
      class="fixed bottom-4 left-4 bg-white rounded-lg p-2 text-lg z-10 shadow-md md:shadow-lg hover:scale-105 font-bold"
      @click="revealCardsOnStart()"
    >
      Cheat? <span class="ml-4">👀</span>
    </button>
  </div>
</template>
