<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main>
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
                <h3>{{ correctWordsCounter }}</h3>
              </div>
            </div>
            <div class="points-counter">
              <div id="wrong-counter">
                <fa icon="times"></fa>
              </div>
              <div class="points-number">
                <h3>{{ wrongWordsCounter }}</h3>
              </div>
            </div>
          </div>
        </div>

        <div id="countdown-container">
          <div id="shake-container">
            <h1 id="countdown-text" :style="colorChangeDuration">
              {{ remainingSeconds }}
            </h1>
          </div>
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
            <h1>{{ getCurrentTeams[getCurrentTeamIndex].name }}</h1>
            <h4>
              Explaining:
              <span>{{
                getCurrentTeams[getCurrentTeamIndex].players[
                  getCurrentTeams[getCurrentTeamIndex].explainingPlayerIndex
                ]
              }}</span>
            </h4>
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
                openedModal = false;
                showCurrentWord = true;
                $refs['game-modal'].hide();
                startCountdownSound();
                setGameInProgress(true);
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
            previousWords.push({ word: currentWord, correct: false });
            setNewWord();
            wrongWordsCounter++;
            playSound(false);
          "
        >
          <fa id="button-wrong" icon="times"></fa>
        </div>
        <div
          id="correct-container"
          @click="
            previousWords.push({ word: currentWord, correct: true });
            setNewWord();
            correctWordsCounter++;
            playSound(true);
          "
        >
          <fa id="button-correct" icon="check"></fa>
        </div>
      </div>
      <!-- <input type="file" @change="setWordsInDatabase" /> -->
    </main>
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
      previousWords: [],
      correctWordsCounter: 0,
      wrongWordsCounter: 0,
      showCurrentWord: false,
      showCheatPicture: false,
      gameModalText: 'Play',
      openedModal: false,
      pausedCountdownSound: false,
      isLoading: true,
      correctSound: new Audio(
        'https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/sfx%2Fcorrect-sfx.mp3?alt=media&token=13f14255-18dc-491e-9908-95e7d74cef22'
      ),
      wrongSound: new Audio(
        'https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/sfx%2Fwrong-sfx.mp3?alt=media&token=a72529cf-6280-4f4d-b90d-63d6e8d703c2'
      ),
      countdownSound: new Audio(
        'https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/sfx%2F10-seconds-countdown.mp3?alt=media&token=1de94261-6906-48b1-a67c-11d63be6df33'
      ),
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentTeams',
      'getCurrentTeamIndex',
      'getDurationOfRound',
    ]),
    ...mapGetters('words', ['getAppearedIndexes']),

    colorChangeDuration() {
      return {
        'animation-duration': `${this.getDurationOfRound * 3}s`,
      };
    },
  },
  created() {
    this.getWords();
    this.remainingSeconds = this.getDurationOfRound;
  },
  mounted() {
    this.$refs['game-modal'].show();
  },
  methods: {
    ...mapMutations('words', [
      'addToAppearedIndexes',
      'clearAppearedIndexes',
      'setPreviousRoundWords',
    ]),
    ...mapMutations(['setGameInProgress']),

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
      this.wordsArray = await this.getRandomWordsFromDatabase(50);
      this.setNewWord();

      // to prevent black screen for a moment
      setTimeout(() => (this.isLoading = false), 200);
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
      if (!this.currentWord && !_.isEmpty(this.previousWords)) {
        this.showCheatPicture = true;
      }
      this.wordsArray.shift();
    },
    startCountdown() {
      document.getElementById('countdown-text').classList.add('color-changer');

      const interval = setInterval(
        function () {
          if (this.remainingSeconds === 0) {
            this.shake(false);

            clearInterval(interval);
            this.setPreviousRoundWords(this.previousWords);
            this.$router.push({ path: 'overview' });
          }

          this.openedModal || this.remainingSeconds < 1
            ? clearInterval(interval)
            : this.remainingSeconds--;

          if (this.$router.currentRoute.path !== '/game') {
            clearInterval(interval);
            this.countdownSound.pause();
            this.countdownSound.currentTime = 0;
          }

          if (this.remainingSeconds === 10) {
            this.countdownSound.play();
            this.shake(true);
          }
        }.bind(this),
        1000
      );
    },
    shake(needsToShake) {
      needsToShake
        ? (document
            .getElementById('shake-container')
            .classList.add('shake-rotate'),
          document
            .getElementById('shake-container')
            .classList.add('shake-constant'))
        : (document
            .getElementById('shake-container')
            .classList.remove('shake-rotate'),
          document
            .getElementById('shake-container')
            .classList.remove('shake-constant'));
    },
    openGameModal() {
      this.openedModal = true;
      this.gameModalText = 'Continue';
      this.$refs['game-modal'].show();
      this.shake(false);
      this.countdownSound.pause();
    },
    playSound(correct) {
      correct
        ? ((this.correctSound.currentTime = 0), this.correctSound.play())
        : ((this.wrongSound.currentTime = 0), this.wrongSound.play());
    },
    startCountdownSound() {
      if (this.remainingSeconds < 10) {
        this.countdownSound.currentTime -= 0.5;
        this.countdownSound.play();
        this.shake(true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
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

    .color-changer {
      animation: change-color-animation;
      transition-timing-function: ease-out;
    }

    @keyframes change-color-animation {
      from {
        background-color: #374b7b;
      }
      to {
        background-color: #ce0000;
      }
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
        transform: scale(1.25, 1.25);
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
        transform: scale(1.25, 1.25);
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    #wrong-container {
      height: 22vw;
    }

    #correct-container {
      height: 22vw;
    }
  }
}
</style>
