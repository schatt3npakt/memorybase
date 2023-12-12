<script setup>
  import PrimaryButton from "./PrimaryButton.vue";
  import CustomToggleButton from "./CustomToggleButton.vue";
  import { nextTick, ref } from "vue";
  import { usePreferenceStore } from "../stores/preference";
  import {
    playMaximizeSound,
    playMinimizeSound,
    playClickSound,
    playHoverSound,
  } from "../services/AudioService";
  import screenfull from "screenfull";

  const isOpen = ref(false);
  const screenMode = ref(false);
  const userPreferenceStore = usePreferenceStore();

  function openModal() {
    playMaximizeSound();
    isOpen.value = true;
    document.body.classList.add("modal-open");
    nextTick(() => {
      document.getElementById("toggle-0").focus();
    });
  }

  function closeModal() {
    playMinimizeSound();
    isOpen.value = false;
    document.body.classList.remove("modal-open");
  }

  function handleFullscreenButtonClick() {
    if (screenfull.isEnabled) {
      playClickSound();
      screenMode.value = !screenMode.value;
      screenfull.toggle();
    }
  }

  function handleSetRevealCardsOnStartUpToggle() {
    playClickSound();
    userPreferenceStore.setRevealCardsOnStartUp();
  }

  function handleSetShowGridSignsToggle() {
    playClickSound();
    userPreferenceStore.setShowGridSigns();
  }

  function handleSetFitImageToCardDimensionsToggle() {
    playClickSound();
    userPreferenceStore.setFitImageToCardDimensions();
  }

  function handleSetEnableLargerScale() {
    playClickSound();
    userPreferenceStore.setEnableLargerScale();
  }

  function handleSetDisableMovingBackgrounds() {
    playClickSound();
    userPreferenceStore.setDisableMovingBackgrounds();
  }

  function handleSetShowLünkerButton() {
    playClickSound();
    userPreferenceStore.setShowLünkerButton();
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen.value === true) {
      closeModal();
    }
  });
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="isOpen" class="modal-background"></div>
    </transition>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="modal p-4 w-full max-w-3xl rounded-lg max-h-full overflow-auto"
      >
        <div
          class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5 pt-16 md:pt-0"
        >
          <CustomToggleButton
            :message="'Reveal cards on start?'"
            :id="'toggle-0'"
            @click="handleSetRevealCardsOnStartUpToggle()"
            :value="userPreferenceStore.revealCardsOnStartUp"
          />

          <CustomToggleButton
            :message="'Show grid label on card?'"
            :id="'1'"
            @click="handleSetShowGridSignsToggle()"
            :value="userPreferenceStore.showGridSigns"
          />

          <CustomToggleButton
            :message="'Fit image to card?'"
            :id="'2'"
            @click="handleSetFitImageToCardDimensionsToggle()"
            :value="userPreferenceStore.fitImageToCardDimensions"
          />

          <CustomToggleButton
            :message="'increase scale on hover?'"
            :id="'3'"
            @click="handleSetEnableLargerScale()"
            :value="userPreferenceStore.enableLargerScale"
          />

          <CustomToggleButton
            :message="'Disable moving backgrounds?'"
            :id="'4'"
            @click="handleSetDisableMovingBackgrounds()"
            :value="userPreferenceStore.disableMovingBackgrounds"
          />

          <CustomToggleButton
            :message="'Show cheating button?'"
            :id="'5'"
            @click="handleSetShowLünkerButton()"
            :value="userPreferenceStore.showLünkerButton"
          />
        </div>

        <button
          v-if="screenfull.isEnabled"
          @mouseenter="playHoverSound()"
          class="block rounded-md bg-gray-400 w-64 p-4 mx-auto mb-4 text-white font-bold hover:scale-105"
          @click="handleFullscreenButtonClick()"
        >
          {{ screenMode ? "Disable" : "Enable" }} fullscreen
        </button>

        <PrimaryButton @click="closeModal" :message="'Close'"></PrimaryButton>
      </div>
    </transition>
    <button
      @mouseenter="playHoverSound()"
      class="fixed top-4 right-4 bg-white rounded-lg p-2 text-lg z-10 shadow-md md:shadow-lg hover:scale-105 font-bold"
      @click="openModal"
    >
      Options <span class="ml-4 text-xl">⚙</span>
    </button>
  </div>
</template>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 30;
  }

  .modal-open {
    overflow: hidden;
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
