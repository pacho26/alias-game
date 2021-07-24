export const state = () => ({
  appearedWordsIndexes: [],
});

export const getters = {
  getAppearedIndexes(state) {
    return state.appearedWordsIndexes;
  },
};

export const mutations = {
  addToAppearedIndexes(state, idx) {
    state.appearedWordsIndexes.push(idx);
  },
  clearAppearedIndexes(state) {
    state.appearedWordsIndexes = [];
  },
};

export const actions = {};
