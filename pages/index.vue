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
            <BaseButton
              class="btn"
              :to="'/lobby'"
              :buttonText="strings.newGame"
            />
            <BaseButton
              class="btn"
              :to="'/rules'"
              :buttonText="strings.rules"
            />
          </div>
        </main>
      </div>
      <footer>
        <div class="flags">
          <img
            src="../assets/countryFlags/croatia.svg"
            alt="Croatia flag"
            id="croatia-flag"
            class="flag"
            @click="
              setLanguage('croatian');
              selectFlag();
              forceRerender();
            "
          />
          <img
            src="../assets/countryFlags/united-kingdom.svg"
            alt="United Kingdom flag"
            id="united-kingdom-flag"
            class="flag"
            @click="
              setLanguage('english');
              selectFlag();
              forceRerender();
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
    this.translate();
    this.changeGameScreenStatus(false);
  },
  mounted() {
    this.selectFlag();

    this.isDarkMode
      ? ((document.body.style.backgroundColor = '#202124'),
        document.body.classList.add('dark-mode'))
      : ((document.body.style.backgroundColor = 'white'),
        document.body.classList.remove('dark-mode'));

    // timeout is for preventing black screen for a moment
    this.changingColorTheme
      ? (this.isLoading = false)
      : setTimeout(() => (this.isLoading = false), 200);
  },
  computed: {
    ...mapState(['isDarkMode', 'changingColorTheme', 'chosenLanguage']),
  },
  methods: {
    ...mapMutations([
      'setGameInProgress',
      'changeGameScreenStatus',
      'setLanguage',
    ]),

    selectFlag() {
      switch (this.chosenLanguage) {
        case 'croatian':
          document.getElementById('croatia-flag').style.opacity = '1';
          document.getElementById('united-kingdom-flag').style.opacity = '0.45';
          document.getElementById('croatia-flag').style.transform =
            'scale(1.2, 1.2)';
          document.getElementById('united-kingdom-flag').style.transform =
            'scale(1, 1)';
          break;
        case 'english':
          document.getElementById('croatia-flag').style.opacity = '0.45';
          document.getElementById('united-kingdom-flag').style.opacity = '1';
          document.getElementById('united-kingdom-flag').style.transform =
            'scale(1.2, 1.2)';
          document.getElementById('croatia-flag').style.transform =
            'scale(1, 1)';
          break;
      }
      this.translate();
    },
    translate() {
      this.chosenLanguage === 'english'
        ? ((this.strings.newGame = 'New game'),
          (this.strings.rules = 'Rules'),
          (this.strings.desc = 'Explain using other words!'))
        : ((this.strings.newGame = 'Nova igra'),
          (this.strings.rules = 'Pravila'),
          (this.strings.desc = 'Reci drugim riječima!'));
    },
    forceRerender() {
      this.componentKey++;
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

  .dark-mode {
    #desc {
      background: #303136;

      h1 {
        color: #f2f2f2;
      }
    }
  }
}
</style>
