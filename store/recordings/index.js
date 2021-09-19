export const state = () => ({
  mediaRecorder: null,
  audioRecording: null,
  isMediaRecorderInitialized: false,
});

export const getters = {
  getAudioRecording(state) {
    return state.audioRecording;
  },
};

export const mutations = {
  setMediaRecorder(state, mediaRecorder) {
    state.mediaRecorder = mediaRecorder;
    state.isMediaRecorderInitialized = true;
  },
  setAudioRecording(state, audio) {
    state.audioRecording = audio;
  },
};
