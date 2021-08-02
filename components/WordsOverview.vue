<template>
  <main>
    <div class="words" v-for="word in words" :key="word.word">
      <p>{{ word.word }}</p>
      <div id="switch-container">
        <b-form-checkbox
          switch
          size="lg"
          v-model="word.correct"
          @change="updateCorrectWords"
        ></b-form-checkbox>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      words: [],
    };
  },
  computed: {
    ...mapGetters('words', ['getPreviousRoundWords']),
  },
  methods: {
    ...mapMutations('words', ['setPreviousRoundWords']),

    updateCorrectWords() {
      this.setPreviousRoundWords(_.cloneDeep(this.words));
    },
  },
  created() {
    this.words = _.cloneDeep(this.getPreviousRoundWords);
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  color: #3c5186;
  font-size: 28px;

  .words {
    max-width: 450px;
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 13px;

    p {
      position: relative;
      top: 8px;
      user-select: none;
    }

    #switch-container {
      position: relative;
      top: 9px;
      transform: scale(1.5, 1.5);
    }
  }

  .words:not(:last-child) {
    border-bottom: #3c5186 1px solid;
  }
}
</style>
