<template>
  <div class="main-container">
    <section>
      <div id="pause-and-points">
        <div id="pause-container" @click="openGameModal">
          <fa id="pause-icon" icon="pause"></fa>
        </div>
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
      </div>

      <div id="countdown-container">
        <h1 id="countdown-text">{{ remainingSeconds }}</h1>
      </div>
    </section>

    <img
      v-if="showCheatPicture"
      id="cheat-pic"
      src="../assets/no-cheating.png"
      alt="cheating"
    />

    <b-modal
      ref="game-modal"
      hide-footer
      hide-header
      no-close-on-backdrop
      centered
    >
      <div id="game-modal">
        <div>
          <h1>Current team</h1>
          <h4>Explaining: <span>Player1</span></h4>
        </div>

        <div class="modal-buttons">
          <div
            @click="
              $refs['game-modal'].hide();
              $refs['quit-modal'].show();
            "
          >
            <BaseButton class="modal-button" :buttonText="'Quit'" />
          </div>
          <div
            @click="
              startCountdown();
              showCurrentWord = true;
              $refs['game-modal'].hide();
            "
          >
            <BaseButton class="modal-button" :buttonText="gameModalText" />
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal
      ref="quit-modal"
      hide-footer
      hide-header
      no-close-on-backdrop
      centered
    >
      <div id="quit-modal">
        <h2>Are you sure?</h2>
        <div class="modal-buttons">
          <div
            @click="
              $refs['quit-modal'].hide();
              $refs['game-modal'].show();
            "
          >
            <BaseButton class="modal-button" :buttonText="'No'" />
          </div>
          <div>
            <BaseButton
              class="modal-button"
              :buttonText="'Yes'"
              :to="'/lobby'"
            />
          </div>
        </div>
      </div>
    </b-modal>

    <div v-if="showCurrentWord" id="word-container">
      <h1>{{ currentWord }}</h1>
    </div>

    <div id="points-buttons" v-if="!showCheatPicture">
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
      showCurrentWord: false,
      showCheatPicture: false,
      gameModalText: 'Play',
    };
  },
  computed: {
    ...mapGetters('words', ['getAppearedIndexes']),
  },
  created() {
    this.getWords();
  },
  mounted() {
    this.$refs['game-modal'].show();
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
      if (
        !this.currentWord &&
        (!_.isEmpty(this.correctWords) || !_.isEmpty(this.wrongWords))
      ) {
        this.showCheatPicture = true;
      }
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
    openGameModal() {
      this.gameModalText = 'Continue';
      this.$refs['game-modal'].show();
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
  color: #374b7b;
}

section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 16px;

  #pause-and-points {
    display: flex;
    flex-direction: column;
    align-items: center;

    #pause-container {
      position: relative;
      right: 7px;
      margin-bottom: 16px;
      background: #374b7b;
      padding: 15px;
      border-radius: 8px;

      #pause-icon {
        font-size: 30px;
        color: white;
        transition: 0.2s ease-in-out;
      }

      &:hover {
        cursor: pointer;

        #pause-icon {
          transform: scale(1.2, 1.2);
        }
      }
    }

    #points-container {
      max-width: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 16px;
      border-radius: 8px;
      padding: 10px;

      .points-counter {
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
          margin-bottom: 4px;
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
  }

  #countdown-container {
    margin-right: 16px;
    width: 110px;

    #countdown-text {
      font-size: 70px;
      font-weight: 600;
      padding: 10px;
      background: #374b7b;
      color: #fff5de;
      border-radius: 8px;
      text-align: center;
      user-select: none;
    }
  }
}

#word-container {
  padding: 6px 14px;
  position: relative;
  bottom: 38px;

  h1 {
    user-select: none;
    font-size: 50px;
    text-align: center;
  }
}

#cheat-pic {
  max-height: 50vh;
  margin: 0 auto;
}

#game-modal {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: #374b7b;
  text-align: center;

  h1 {
    font-weight: 700;
  }

  h4 {
    span {
      font-weight: 800;
      font-size: 28px;
    }
  }
}

.modal-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 400px;
}

.modal-button {
  max-width: 160px;
}

#quit-modal {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;

  h2 {
    color: #374b7b;
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
    opacity: 0.73;

    #button-wrong {
      font-size: 72px;
      color: white;
      transition: 0.2s ease-in-out;
    }

    &:hover {
      opacity: 1;

      #button-wrong {
        transform: scale(1.3, 1.3);
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
    opacity: 0.73;

    #button-correct {
      font-size: 70px;
      color: white;
      transition: 0.2s ease-in-out;
    }

    &:hover {
      opacity: 1;

      #button-correct {
        transform: scale(1.3, 1.3);
      }
    }
  }
}
</style>
