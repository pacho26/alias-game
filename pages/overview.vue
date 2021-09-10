<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <h1>{{ strings.modifyAnswers }}</h1>
      <div class="words-container">
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

      window.onhashchange = function () {
        window.location.hash = 'no-back-button';
      };
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
</style>
