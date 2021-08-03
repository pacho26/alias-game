<template>
  <main>
    <h1>MODIFY ANSWERS</h1>
    <div class="words-container">
      <WordsOverview />
    </div>
    <div id="btn" @click="addPoints">
      <BaseButton :to="'/standings'" :buttonText="'Continue'" />
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('words', ['previousRoundWords']),
  },
  methods: {
    ...mapMutations(['setPoints']),

    addPoints() {
      let pointsCounter = 0;
      for (const word of this.previousRoundWords) {
        word.correct ? pointsCounter++ : pointsCounter--;
      }
      this.setPoints(pointsCounter);
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
</style>
