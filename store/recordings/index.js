export const state = () => ({
  audioRecording: null,
});

export const getters = {
  getAudioRecording(state) {
    return state.audioRecording;
  },
};

export const mutations = {
  setAudioRecording(state, audio) {
    state.audioRecording = audio;
  },
};
