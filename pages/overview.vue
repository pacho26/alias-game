<template>
  <main>
    <h1>{{ strings.modifyAnswers }}</h1>
    <div class="words-container">
      <WordsOverview />
    </div>
    <div id="btn" @click="addPoints">
      <BaseButton :to="'/standings'" :buttonText="strings.continue" />
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      strings: {},
    };
  },
  computed: {
    ...mapState('words', ['previousRoundWords']),
    ...mapState(['isDarkMode', 'chosenLanguage']),
  },
  created() {
    this.translate();
    this.changeGameScreenStatus(false);
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
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
