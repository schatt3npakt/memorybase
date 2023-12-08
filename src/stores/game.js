import { defineStore } from "pinia";
import {
  playCardFlipSound,
  playCardLoseSound,
  playCardWinSound,
  playFanfareSound,
} from "../services/AudioService";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

const appStates = {
  idle: "IDLE",
  processing: "PROCESSING",
};

const pairStates = {
  idle: "IDLE",
  win: "WIN",
  lose: "LOSE",
};

let cardsData;
let pairsData;
let themeConfig;

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      currentDescription: null,
      cachedStackSize: 0,
      pairState: pairStates.idle,
      winGifKey: 1,
      isAssociative: false,
      themeKey: "",
      config: false,
      cardsData: false,
      pairsData: false,
      moveFeedback: "",
      moveFeedbackImage: false,
      state: appStates.idle,
      selectedCards: new Set(),
    };
  },

  actions: {
    async setTheme(themeKey) {
      this.themeKey = themeKey;
      this.winGifKey = getRandomIntInRange(1, 1);

      cardsData = await import(`../data/${this.themeKey}.cards.json`);
      themeConfig = await import(`../data/${this.themeKey}.config.json`);

      try {
        pairsData = await import(`../data/${this.themeKey}.pairs.json`);
        this.isAssociative = false;
      } catch {
        this.isAssociative = true;
      }

      if (this.isAssociative === true) {
        // Route for normal memory
        // We duplicate and increase ids of the cards so we can easily check for matches
        // a card match for a card with id 0 and a total of 10 cards would be the generated card at id 11
        const duplicatedCardsArray = [...cardsData.default].map((card) => {
          const newCard = Object.assign({}, card);
          newCard.id = newCard.id + cardsData.default.length;
          return newCard;
        });

        this.cardsData = shuffleArray([
          ...cardsData.default,
          ...duplicatedCardsArray,
        ]);
        this.pairsData = [];

        // contruct pairs array
        for (let index = 0; index < cardsData.default.length; index++) {
          this.pairsData.push({
            id: index,
            entries: [index, index + cardsData.default.length],
          });
        }
      } else {
        // Route for associative memory
        this.cardsData = shuffleArray([...cardsData.default]);
        this.pairsData = [...pairsData.default];
      }

      this.config = themeConfig.default;
      this.selectedCards = new Set();
    },
    alterStackSize(stackSize) {
      if (stackSize === 0) return;

      this.cachedStackSize = stackSize;

      this.pairsData = shuffleArray(this.pairsData).slice(0, stackSize);
      this.cardsData = filterCards(this.pairsData, this.cardsData);
    },
    getIsIdle() {
      return this.state === appStates.idle;
    },
    addSelectedCard(cardId, cardDescription) {
      playCardFlipSound();

      if (this.selectedCards.has(cardId)) {
        this.selectedCards.delete(cardId);
        this.currentDescription = null;
        return;
      }

      this.selectedCards.add(cardId);
      this.currentDescription = cardDescription;

      if (this.selectedCards.size === this.config.cardsPerPair) {
        this.checkForPair();
      }
    },
    checkForPair() {
      this.state = appStates.processing;

      // Return a pair that matches the currently selected cards, if available
      const matchedPair = this.pairsData.find((pair) =>
        pair.entries.every((currentlySelectedCardIndex) =>
          this.selectedCards.has(currentlySelectedCardIndex)
        )
      );

      if (matchedPair) {
        this.pairState = pairStates.win;
        playCardWinSound();
        this.moveFeedback = "Well done!";
      } else {
        this.pairState = pairStates.lose;
        playCardLoseSound();
        this.moveFeedback = "Try again!";
        this.moveFeedbackImage = true;
      }

      window.setTimeout(() => {
        this.pairState = pairStates.idle;

        if (matchedPair) {
          // remove found pair from pairs array
          removeItemByIndex(
            this.pairsData,
            this.pairsData.indexOf(matchedPair)
          );

          // remove cards from cards data
          for (let index of this.selectedCards) {
            this.cardsData[findIndexById(this.cardsData, index)] = {};
          }

          if (this.pairsData.length === 0) {
            jsConfetti.addConfetti();
            playFanfareSound();
          }
        }

        // reset selected cards
        this.selectedCards = new Set();
        this.moveFeedback = "";
        this.moveFeedbackImage = false;
        this.state = appStates.idle;
        this.currentDescription = null;

        return matchedPair;
      }, 2000);
    },
    resetGame() {
      this.selectedCards = new Set();
      this.winGifKey = getRandomIntInRange(1, 11);

      if (this.isAssociative === true) {
        const duplicatedCardsArray = [...cardsData.default].map((card) => {
          const newCard = Object.assign({}, card);
          newCard.id = newCard.id + cardsData.default.length;
          return newCard;
        });

        this.cardsData = shuffleArray([
          ...cardsData.default,
          ...duplicatedCardsArray,
        ]);
        this.pairsData = [];

        // contruct pairs array
        for (let index = 0; index < cardsData.default.length; index++) {
          this.pairsData.push({
            id: index,
            entries: [index, index + cardsData.default.length],
          });
        }
      } else {
        this.cardsData = shuffleArray([...cardsData.default]);
        this.pairsData = [...pairsData.default];
      }

      if (this.cachedStackSize !== 0) {
        this.alterStackSize(this.cachedStackSize);
      }
    },
  },
});

const removeItemByIndex = (arr, index) => {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const findIndexById = (arr, id) => {
  return arr.findIndex((item) => item.id === id);
};

const shuffleArray = (arr) => {
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

function getRandomIntInRange(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

// removes all cards that are not needed for the current pairs
function filterCards(pairs, cards) {
  // Get all the entry IDs from the pairs array
  const entryIds = pairs.reduce((acc, pair) => [...acc, ...pair.entries], []);

  // Filter the cards array to only include entries with IDs that are present in the entryIds array
  const filteredCards = cards.filter((card) => entryIds.includes(card.id));

  // Return the filtered cards array
  return filteredCards;
}
