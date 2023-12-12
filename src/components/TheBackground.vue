<script setup>
  import { useGameStore } from "../stores/game";
import { usePreferenceStore } from "../stores/preference";

  const preferenceStore = usePreferenceStore();
  const gameStore = useGameStore();

  defineProps({
    isReversed: {
      default: false,
      type: Boolean,
    },
  });
</script>

<template>
  <div
    class="background"
    :style="(gameStore.backgroundImage !== null) ?`background-image: url(${gameStore.backgroundImage})` : ''"
    :class="{
      reverse: isReversed,
      animate: preferenceStore.backgroundImage === null && preferenceStore.disableMovingBackgrounds === false,
    }"
  ></div>
</template>

<style scoped>
  .background {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: multiply;
    opacity: 0.75;
    background-position: center center;
    background: repeating-linear-gradient(
      var(--theme-color) 0vw,
      var(--theme-color) 1vw,
      var(--theme-color-2) 1vw,
      var(--theme-color-2) 2vw
    );
  }

  @media (prefers-reduced-motion: no-preference) {
    .background.animate {
      animation: scroll 240s linear infinite;
    }
  }

  .background.reverse {
    transform: rotateZ(180deg) rotateY(180deg);
  }

  @keyframes scroll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 -2000px;
    }
  }
</style>
