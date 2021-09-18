<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <h1>{{ strings.modifyAnswers }}</h1>
      <div id="words-container">
        <WordsOverview />
      </div>
      <div id="btn" @click="addPoints">
        <BaseButton :to="'/standings'" :buttonText="strings.continue" />
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
    };
  },
  computed: {
    ...mapState('words', ['previousRoundWords']),
    ...mapState(['isDarkMode', 'chosenLanguage']),
    ...mapGetters(['getStartedOnIndexPage']),
  },
  created() {
    !this.getStartedOnIndexPage
      ? this.$router.push({ path: '/' })
      : (this.translate(), this.changeGameScreenStatus(false));
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');

    this.isLoading = false;
    this.preventClickingBack();

    if (screen.height < 600) {
      document.getElementById('words-container').style.height = '55vh';
    }

    if (screen.height < 700) {
      document.getElementById('words-container').style.height = '64vh';
    }
  },
  methods: {
    ...mapMutations(['setPoints', 'changeGameScreenStatus']),

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
          (this.strings.modifyAnswers = 'Modify answers'.toUpperCase()))
        : ((this.strings.continue = 'Nastavi'),
          (this.strings.modifyAnswers = 'Izmijeni odgovore'.toUpperCase()));
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
    margin-bottom: 24px;
  }
}

.dark-mode {
  main {
    color: #f2f2f2;
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
