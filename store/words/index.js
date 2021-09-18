export const state = () => ({
  appearedWordsIndexes: [],
  previousRoundWords: [],
});

export const getters = {
  getAppearedIndexes(state) {
    return state.appearedWordsIndexes;
  },
  getPreviousRoundWords(state) {
    return state.previousRoundWords;
  },
};

export const mutations = {
  addToAppearedIndexes(state, wordIndex) {
    state.appearedWordsIndexes.push(wordIndex);
  },
  clearAppearedIndexes(state) {
    state.appearedWordsIndexes = [];
  },
  setPreviousRoundWords(state, previousWords) {
    state.previousRoundWords = previousWords;
  },
};