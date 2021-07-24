<template>
  <div class="main-container">
    <section>
      <div id="points-container">
        <div class="points-counter">
          <div id="correct-counter">
            <fa icon="check"></fa>
          </div>
          <div class="points-number">
            <h3>{{ correctWords.length }}</h3>
          </div>
        </div>
        <div class="points-counter">
          <div id="wrong-counter">
            <fa icon="times"></fa>
          </div>
          <div class="points-number">
            <h3>{{ wrongWords.length }}</h3>
          </div>
        </div>
      </div>

      <div id="countdown-container">
        <h1 id="countdown-text">{{ remainingSeconds }}</h1>
      </div>
    </section>

    <div id="word-container">
      <h1>{{ currentWord }}</h1>
    </div>

    <div id="points-buttons">
      <div
        id="wrong-container"
        @click="
          wrongWords.push(currentWord);
          setNewWord();
        "
      >
        <fa id="button-wrong" icon="times"></fa>
      </div>
      <div
        id="correct-container"
        @click="
          correctWords.push(currentWord);
          setNewWord();
        "
      >
        <fa id="button-correct" icon="check"></fa>
      </div>
    </div>
    <!-- <input type="file" @change="setWordsInDatabase" /> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      remainingSeconds: 60,
      wordsArray: [],
      currentWord: '',
      correctWords: [],
      wrongWords: [],
      hasWords: false,
    };
  },
  computed: {
    ...mapGetters('words', ['getAppearedIndexes']),
  },
  created() {
    this.getWords();
    this.startCountdown();
  },
  methods: {
    ...mapMutations('words', ['addToAppearedIndexes', 'clearAppearedIndexes']),

    async setWordsInDatabase() {
      let input = document.querySelector('input');


      let files = input.files;

      const file = files[0];

      let reader = new FileReader();

      reader.onload = async (e) => {
        const file = e.target.result;
        const lines = await file.split(/\r\n|\n/);
        const set = new Set(lines);

        const docRef = this.$fire.firestore
          .collection('dictionaries')
          .doc('croatian');
        await docRef.set({
          words: Array.from(set),
        });
      };

      reader.readAsText(file);
    },
    async getWords() {
      this.wordsArray = await this.getRandomWordsFromDatabase(40);
      this.setNewWord();
      this.hasWords = true;
    },
    async getRandomWordsFromDatabase(amount) {
      const wordsRef = this.$fire.firestore
        .collection('dictionaries')
        .doc('croatian');
      const wordsDoc = await wordsRef.get();

      const wordsArray = wordsDoc.data().words;
      let finalWords = [];

      if (this.getAppearedIndexes.length > wordsArray.length - amount) {
        this.clearAppearedIndexes();
      }

      while (finalWords.length < amount) {
        const newRandom = _.random(0, wordsArray.length);
        if (!_.includes(this.getAppearedIndexes, newRandom)) {
          finalWords.push(wordsArray[newRandom]);
          this.addToAppearedIndexes(newRandom);
        }
      }
      return finalWords;
    },
    setNewWord() {
      this.currentWord = this.wordsArray[0];
      this.wordsArray.shift();
    },
    startCountdown() {
      const interval = setInterval(
        function () {
          this.remainingSeconds--;
          if (this.remainingSeconds === 0) {
            clearInterval(interval);
          }
        }.bind(this),
        1000
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 91vh;
  margin: 0 auto;
}

section {
  color: #374b7b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  #points-container {
    max-width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;

    .points-counter {
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        margin-bottom: 10px;
      }

      .points-number {
        width: 40px;
      }

      h3 {
        user-select: none;
        margin-top: 10px;
        margin-left: 6px;
      }

      #correct-counter {
        color: white;
        background: green;
        padding: 8px 12px;
        font-size: 20px;
        border-radius: 8px;
      }

      #wrong-counter {
        color: white;
        background: red;
        padding: 8px 15px;
        font-size: 20px;
        border-radius: 8px;
      }
    }
  }

  #countdown-container {
    margin-right: 10px;
    width: 110px;

    #countdown-text {
      font-size: 70px;
      font-weight: 600;
      padding: 10px;
      background: #bb9fc6;
      border-radius: 8px;
      text-align: center;
      user-select: none;
    }
  }
}

#word-container {
  padding: 6px 14px;
  color: #374b7b;

  h1 {
    user-select: none;
    font-size: 50px;
    text-align: center;
  }
}

#points-buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #374b7b;

  #wrong-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47%;
    background: red;
    padding: 40px 0;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.75;

    #button-wrong {
      font-size: 72px;
      color: white;
      transition: 0.2s;
    }

    &:hover {
      opacity: 1;

      #button-wrong {
        transform: scale(1.2, 1.2);
      }
    }
  }

  #correct-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47%;
    background: green;
    padding: 40px 0;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.75;

    #button-correct {
      font-size: 70px;
      color: white;
      transition: 0.2s;
    }

    &:hover {
      opacity: 1;

      #button-correct {
        transform: scale(1.2, 1.2);
      }
    }
  }
}
</style>
