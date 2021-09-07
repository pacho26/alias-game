<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main>
      <div class="words" v-for="word in words" :key="word.word">
        <p>{{ word.word }}</p>

        <div id="answer-switch">
          <input
            type="checkbox"
            class="checkbox"
            name="checkbox"
            :id="word.word"
            v-model="word.correct"
            @change="
              updateCorrectWords();
              updateCheckboxColors();
            "
          />
          <label :for="word.word" class="label" name="label">
            <div class="ball"></div>
          </label>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      words: [],
      isLoading: true,
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

    updateCheckboxColors() {
      const checkboxes = document.getElementsByName('checkbox');
      const labels = document.getElementsByName('label');

      if (this.isDarkMode) {
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked
            ? (labels[i].style.backgroundColor = '#bb86fc')
            : (labels[i].style.backgroundColor = '#e6e6e6');
        }
      } else {
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked
            ? (labels[i].style.backgroundColor = '#47619e')
            : (labels[i].style.backgroundColor = '#b3b3b3');
        }
      }
    },
  },
  created() {
    this.words = _.cloneDeep(this.getPreviousRoundWords);
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');

    this.updateCheckboxColors();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  color: #3c5186;

  .words {
    max-width: 450px;
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 13px;

    #answer-switch {
      transform: scale(1.4);

      .label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        border-radius: 50px;
        height: 26px;
        width: 50px;
        position: relative;
        top: 5px;
      }

      .ball {
        background-color: white;
        position: absolute;
        height: 22px;
        top: 2px;
        left: 2px;
        border-radius: 50%;
        width: 22px;
        transition: transform 0.2s linear;
      }

      .checkbox {
        opacity: 0;
        position: absolute;
      }

      .checkbox:checked + .label .ball {
        transform: translateX(24px);
      }

      .label {
        cursor: pointer;
      }
    }

    p {
      position: relative;
      top: 8px;
      user-select: none;
      font-size: 28px;
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

    #answer-switch {
      .ball {
        background-color: #18191b;
      }
    }
  }
}
</style>
