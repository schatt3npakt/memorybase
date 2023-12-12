<script setup>
  import TheGame from "../components/TheGame.vue";
  import MovingBackground from "../components/MovingBackground.vue";
  import router from "../router";
  import { playSelectSound } from "../services/AudioService";
  import PrimaryButton from "../components/PrimaryButton.vue";
  import { useGameStore } from "../stores/game";
  import { usePreferenceStore } from "../stores/preference";
  import TextBanner from "../components/TextBanner.vue";

  const gameStore = useGameStore();
  const preferenceStore = usePreferenceStore(); 

  function handleBackClick() {
    playSelectSound();
    document.documentElement.style.setProperty("--theme-color", "#93c5fd");
    document.documentElement.style.setProperty("--theme-color-2", "#93c5fd90");
    gameStore.currentDescription = null;
    gameStore.resetBackgroundImage();

    router.push("/");
  }
</script>

<template>
  <main>
    <MovingBackground :isReversed="true" />

    <TextBanner class="mt-16">
      {{ gameStore.currentDescription || gameStore.config.task }}
    </TextBanner>

    <TheGame />

    <TextBanner class="fixed -bottom-2 right-5">
      <template v-if="gameStore.moveFeedback.length >= 1">
        {{ gameStore.moveFeedback }}
      </template>
      <template v-else>
        <template v-if="gameStore.pairsData.length >= 2">
          {{ gameStore.pairsData.length }} pairs left!
        </template>
        <template v-else-if="gameStore.pairsData.length === 1">
          <span class="text-red-300 font-black">1</span> pair left!
        </template>
        <template v-else>Amazing, you did it! 🦄</template>
      </template>
    </TextBanner>

    <PrimaryButton
      :message="'Back to home screen'"
      @click="handleBackClick()"
    />
  </main>
</template>
