<template>
  <div :key="componentKey">
    <header>
      <div id="header-content">
        <div>
          <nuxt-link v-if="!this.gameInProgress" to="/" id="logo-link"
            >Alias<span>Game</span>
          </nuxt-link>
          <nuxt-link v-else to="/" id="logo-link" class="no-click"
            >Alias<span>Game</span>
          </nuxt-link>
        </div>

        <div id="theme-switch" v-if="!isGameScreen">
          <input
            type="checkbox"
            class="checkbox"
            id="checkbox"
            v-model="darkMode"
            @change="changeMode"
          />
          <label for="checkbox" class="label" :style="pozadinskaBoja">
            <fa class="fa-moon" icon="moon"></fa>
            <fa class="fa-sun" icon="sun"></fa>
            <div class="ball"></div>
          </label>
        </div>
      </div>
    </header>
    <Nuxt />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      componentKey: 0,
      darkMode: true,
      bgColor: '#000',
    };
  },
  computed: {
    ...mapState(['gameInProgress', 'isDarkMode', 'isGameScreen']),

    pozadinskaBoja() {
      return {
        'background-color': this.bgColor,
      };
    },
  },
  created() {
    this.darkMode = this.isDarkMode;
  },
  mounted() {
    this.isDarkMode
      ? (document.body.classList.add('dark-mode'),
        (document.getElementById('checkbox').checked = true))
      : (document.body.classList.remove('dark-mode'),
        (document.getElementById('checkbox').checked = false));
  },
  methods: {
    ...mapMutations(['changeColorTheme']),

    changeMode() {
      this.changeColorTheme();

      // timeout is for animation time
      setTimeout(() => {
        this.isDarkMode
          ? ((document.body.style.backgroundColor = '#202124'),
            (this.bgColor = '#000'))
          : ((document.body.style.backgroundColor = 'white'),
            (this.bgColor = '#ffead0'));
        this.forceRerender();
      }, 200);
    },
    forceRerender() {
      this.componentKey++;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Poppins', sans-serif;
}

header {
  margin: 0;
  padding: 0;
  background: #fff5de;
}

#header-content {
  width: 97%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#theme-switch {
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
    top: 4px;
  }

  .fa-moon {
    color: #f1c40f;
  }

  .fa-sun {
    color: #f39c12;
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
}

.no-click {
  pointer-events: none;
}

#logo-link {
  text-decoration: none;
  font-family: 'Poppins Bold', sans-serif;
  color: #3c5186;
  font-size: 40px;
  font-weight: 800;
  padding: 8px;
  user-select: none;

  span {
    font-family: 'Poppins Extra Bold', sans-serif;
    color: #9b72aa;
    font-size: 20px;
    font-weight: 800;
  }
}

.dark-mode {
  header {
    background: #18191b;
  }

  #logo-link {
    color: #4f6bb0;

    span {
      color: #ffb2ff;
    }
  }
}
</style>
