import { defineStore } from 'pinia'
import initialConfig from "../data/config.json"

export const usePreferenceStore = defineStore('preference', {
  state: () => {
    return initialConfig
  },

  actions: {
    setRevealCardsOnStartUp() {
      this.revealCardsOnStartUp = !this.revealCardsOnStartUp
    },
    setShowGridSigns() {
      this.showGridSigns = !this.showGridSigns
    },
    setFitImageToCardDimensions() {
      this.fitImageToCardDimensions = !this.fitImageToCardDimensions
    },
    setEnableLargerScale() {
      this.enableLargerScale = !this.enableLargerScale
    },
    setDisableMovingBackgrounds() {
      this.disableMovingBackgrounds = !this.disableMovingBackgrounds
    },
    setShowLünkerButton() {
      this.showLünkerButton = !this.showLünkerButton
    }
  }
})
