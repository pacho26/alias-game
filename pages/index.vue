<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <div id="page-container">
      <div :key="componentKey">
        <div id="desc">
          <h1>{{ strings.desc }}</h1>
        </div>
        <main>
          <div class="buttons">
            <BaseButton class="btn" to="/lobby" :buttonText="strings.newGame" />
            <BaseButton class="btn" to="/rules" :buttonText="strings.rules" />
          </div>
        </main>
      </div>
      <footer>
        <div class="flags">
          <img
            src="../assets/countryFlags/croatia.svg"
            alt="Croatia flag"
            :class="
              chosenLanguage === 'croatian' ? 'flag selected-flag' : 'flag'
            "
            @click="
              setLanguage('croatian');
              forceRerender();
              translate();
            "
          />
          <img
            src="../assets/countryFlags/united-kingdom.svg"
            alt="United Kingdom flag"
            :class="
              chosenLanguage === 'english' ? 'flag selected-flag' : 'flag'
            "
            @click="
              setLanguage('english');
              forceRerender();
              translate();
            "
          />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      componentKey: 0,
      isLoading: true,
      strings: {},
    };
  },
  created() {
    // to prevent redirecting if starting page is not index.vue
    this.startingFromIndexPage();
    this.translate();
    this.changeGameScreenStatus(false);
  },
  mounted() {
    this.$confetti.stop();

    document.body.classList[this.isDarkMode ? 'add' : 'remove']('dark-mode');

    // timeout is for preventing black screen for a moment
    this.changingColorTheme
      ? (this.isLoading = false)
      : setTimeout(() => (this.isLoading = false), 200);

    this.showAlertBeforeUnload();
  },
  computed: {
    ...mapState(['isDarkMode', 'changingColorTheme', 'chosenLanguage']),
  },
  methods: {
    ...mapMutations([
      'setGameInProgress',
      'changeGameScreenStatus',
      'setLanguage',
      'startingFromIndexPage',
    ]),
    translate() {
      this.chosenLanguage === 'english'
        ? ((this.strings.newGame = 'New game'),
          (this.strings.rules = 'Rules'),
          (this.strings.desc = 'Explain using other words!'))
        : ((this.strings.newGame = 'Nova igra'),
          (this.strings.rules = 'Pravila igre'),
          (this.strings.desc = 'Reci drugim riječima!'));
    },
    forceRerender() {
      this.componentKey++;
    },
    showAlertBeforeUnload() {
      window.addEventListener('beforeunload', (e) => {
        const confirmationMessage = '\o/';

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #374b7b;
$secondary-color: #e6e6e6;

#page-container {
  position: relative;
  min-height: 91vh;

  main {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
    padding: 20px;
  }

  #desc {
    background: $primary-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;

    h1 {
      font-size: 50px;
      color: #f0f0f0;
      text-align: center;
      max-width: 660px;
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;

    .flags {
      display: flex;
      align-items: center;
      justify-content: center;

      .flag {
        max-width: 64px;
        margin: 0 20px;
        cursor: pointer;
        transition: 0.5s;
        opacity: 0.45;
      }

      .selected-flag {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }

  .buttons {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;

    :first-of-type {
      margin-bottom: 20px;
    }
  }
}

.dark-mode {
  body {
    background: #202124;
  }
  #page-container {
    #desc {
      background: #303136;

      h1 {
        color: #f2f2f2;
      }
    }
  }
}
</style>
