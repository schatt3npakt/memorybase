<script setup>
import {ref} from "vue"
import themes from '../data/sets.json'
import { useGameStore } from '../stores/game'
import TextBanner from '../components/TextBanner.vue'
import { playHoverSound, playMaximizeSound, playMinimizeSound } from '../services/AudioService'
import categories from '../data/categories.json'
import MovingBackground from '../components/MovingBackground.vue'
import StackSizeModal from '../components/StackSizeModal.vue';

const gameStore = useGameStore()
const stackSizeModalIsOpen = ref(false);

async function handleButtonClick(themeKey, themeColor) {
  // set theme color and transparency theme color
  document.documentElement.style.setProperty('--theme-color', themeColor)
  document.documentElement.style.setProperty('--theme-color-2', themeColor + '75')

  playMaximizeSound()
  // set game theme and navigate to game view
  await gameStore.setTheme(themeKey)

  // router.push({ name: 'game' })
  stackSizeModalIsOpen.value = true
}

function getCategory(id) {
  const cat = categories.filter((category) => {
    return category.id === id
  })

  return cat[0]
}

function getCategoryTitle(id) {
  const cat = getCategory(id)

  return cat?.title
}

function getCategoryColor(id) {
  const cat = getCategory(id)

  return cat?.color
}

function setStackSizeModalIsOpen () {
  playMinimizeSound();
  stackSizeModalIsOpen.value = false
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && stackSizeModalIsOpen.value === true) {
    setStackSizeModalIsOpen()
  }
})
</script>

<template>
  <MovingBackground />
  <TextBanner class="mt-16">Memory!</TextBanner>
  <ul class="list-none my-8 grid md:grid-cols-2 gap-8">
    <li v-for="theme of themes" :key="theme.id">
      <button
        @mouseenter="playHoverSound()"
        class="bg-white text-left flex justify-between w-full h-full rounded-lg p-4 gap-4 text-gray-600 hover:scale-105 shadow-md md:shadow-lg"
        @click="handleButtonClick(theme.key, getCategoryColor(theme.category))"
        :style="`border-left: 16px solid ${getCategoryColor(theme.category)}`"
      >
        <div>
          <b
            :style="`color: ${getCategoryColor(theme.category)}`"
            class="block text-sm md:text-md"
            >{{ getCategoryTitle(theme.category) }}</b
          >
          <b class="block text-xl md:text-2xl md:mb-2">{{ theme.title }}</b>
          <span class="text-lg md:text-xl">{{ theme.description }}</span>
        </div>

        <p class="text-6xl">
          {{ theme.icon }}
        </p>
      </button>
    </li>
  </ul>

  <StackSizeModal :isOpen="stackSizeModalIsOpen" />
</template>
