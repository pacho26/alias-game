<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <h1>{{ strings.modifyAnswers }}</h1>
      <div id="words-container" ref="wordsContainer">
        <WordsOverview />
      </div>
      <div
        v-if="enabledRecording && !problemWithRecording"
        id="recording-container"
      >
        <audio controls controlsList="nodownload noplaybackrate ">
          <source ref="audioSrc" type="audio/wav" />
        </audio>
        <a ref="downloadLink" download="test.mp3">
          <BaseButton
            id="download-btn"
            :buttonText="strings.downloadRecording"
          />
        </a>
      </div>
      <div id="btn" @click="addPoints">
        <BaseButton to="/standings" :buttonText="strings.continue" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      strings: {},
      isLoading: true,
      problemWithRecording: false,
    };
  },
  computed: {
    ...mapState('words', ['previousRoundWords']),
    ...mapState(['isDarkMode', 'chosenLanguage']),
    ...mapGetters([
      'getStartedOnIndexPage',
      'getCurrentTeam',
      'getCurrentRound',
    ]),
    ...mapState('recordings', ['audioRecording', 'enabledRecording']),
  },
  created() {
    !this.getStartedOnIndexPage
      ? this.$router.push({ path: '/' })
      : (this.translate(), this.changeGameScreenStatus(false));
  },
  mounted() {
    document.body.classList[this.isDarkMode ? 'add' : 'remove']('dark-mode');

    this.preventClickingBack();

    let containerHeight;

    try {
      const downloadLinkEl = this.$refs.downloadLink;
      const audioSrcEl = this.$refs.audioSrc;

      downloadLinkEl.href = this.audioRecording.src;
      audioSrcEl.src = this.audioRecording.src;
      downloadLinkEl.download = `${this.getCurrentTeam.name}-${this.getCurrentRound}`;
    } catch {
      this.problemWithRecording = true;
      alert(this.strings.problemsWithRecordingAudio);
    }

    if (screen.height < 600) {
      containerHeight = !this.problemWithRecording ? '35vh' : '54vh';
    } else if (screen.height < 700) {
      containerHeight = !this.problemWithRecording ? '50vh' : '63vh';
    } else if (!this.problemWithRecording) {
      containerHeight = '57vh';
    }

    if (containerHeight) {
      this.$refs.wordsContainer.style.height = containerHeight;
    }

    this.isLoading = false;
  },
  methods: {
    ...mapMutations(['setPoints', 'changeGameScreenStatus']),
    ...mapMutations('recordings', ['setDownloadLink']),

    addPoints() {
      let pointsCounter = 0;
      for (const word of this.previousRoundWords) {
        word.correct ? pointsCounter++ : pointsCounter--;
      }
      this.setPoints(pointsCounter);
    },
    translate() {
      this.chosenLanguage === 'english'
        ? ((this.strings.continue = 'Continue'),
          (this.strings.modifyAnswers = 'Modify answers'.toUpperCase()),
          (this.strings.downloadRecording = 'Download recording'),
          (this.strings.problemsWithRecordingAudio =
            'Problems with recording audio during this round.'))
        : ((this.strings.continue = 'Nastavi'),
          (this.strings.modifyAnswers = 'Izmijeni odgovore'.toUpperCase()),
          (this.strings.downloadRecording = 'Preuzmi snimku'),
          (this.strings.problemsWithRecordingAudio =
            'Dogodio se problem sa snimanjem zvuka tijekom runde.'));
    },
    preventClickingBack() {
      window.location.hash = 'no-back-button';

      // Again because Google Chrome doesn't insert
      // the first hash into the history
      window.location.hash = 'Again-No-back-button';

      window.onhashchange = () => (window.location.hash = 'no-back-button');
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #3c5186;

  h1 {
    font-weight: 700;
    margin: 20px 0;
    text-align: center;
  }

  #words-container {
    overflow-y: auto;
    height: 68vh;
  }

  #btn {
    margin-top: 50px;
    margin-bottom: 20px;
  }

  #recording-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: scale(1.08);
    position: relative;
    top: 27px;

    #download-btn {
      transform: scale(0.68);
      background-color: #e6e6e6;
      color: #374b7b;
      width: 360px;
    }
  }
}

.dark-mode {
  main {
    color: #f2f2f2;
  }

  #recording-container {
    #download-btn {
      color: #202124;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cad3e7;
  border-radius: 10px;

  &:hover,
  &:active {
    background: #a7b6d7;
  }
}
</style>
