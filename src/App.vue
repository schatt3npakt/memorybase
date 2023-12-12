<script setup>
import { RouterView } from 'vue-router'
import OptionsModal from './components/OptionsModal.vue'
import TheBackground from "./components/TheBackground.vue";
import { Howler } from 'howler';
import {ref} from "vue";
import { playHoverSound } from './services/AudioService';
import { usePreferenceStore } from './stores/preference';

const preferences = usePreferenceStore();
const audioIsMuted = ref(true);
Howler.mute(audioIsMuted.value);

function enableAudioClickHandler () {
  audioIsMuted.value = !audioIsMuted.value
  Howler.mute(audioIsMuted.value)
}
</script>

<template>
  <div class="max-w-4xl xl:max-w-6xl mx-auto p-4">
    <TheBackground />
    <button v-if="preferences.ui.showSoundButton" @mouseenter="playHoverSound()" class="fixed top-4 left-4 bg-white rounded-lg p-2 text-lg z-10 shadow-md md:shadow-lg hover:scale-105 font-bold" @click="enableAudioClickHandler">{{ audioIsMuted? "Activate" : "Deactivate" }} sound</button>
    <OptionsModal v-if="preferences.ui.showOptions" />
    <RouterView />
  </div>
</template>
