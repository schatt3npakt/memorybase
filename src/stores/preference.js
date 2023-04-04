import { defineStore } from 'pinia'

export const usePreferenceStore = defineStore('preference', {
  state: () => {
    return {
      revealCardsOnStartUp: true,
      showGridSigns: false,
      fitImageToCardDimensions: true,
      enableLargerScale: false,
      disableMovingBackgrounds: false,
      showLünkerButton: true
    }
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
