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
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      words: [],
    };
  },
  computed: {
    ...mapGetters('words', ['getPreviousRoundWords']),
    ...mapState(['isDarkMode']),
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
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
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
    border-bottom: rgba(72, 94, 150, 0.4) 1px solid;
  }
}

.dark-mode {
  main {
    color: #f2f2f2;

    .words:not(:last-child) {
    border-bottom: rgba(72, 94, 150, 0.5) 1px solid;
  }
  }
}
</style>
