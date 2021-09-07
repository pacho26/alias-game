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
          <label for="checkbox" class="label" :style="checkboxBackgroundColor">
            <fa class="fa-moon" icon="moon"></fa>
            <fa class="fa-sun" icon="sun"></fa>
            <div class="ball"></div>
          </label>
        </div>
      </div>
    </header>
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      componentKey: 0,
      darkMode: false,
      bgColor: '#d1dffa',
    };
  },
  computed: {
    ...mapState(['gameInProgress', 'isDarkMode', 'isGameScreen']),

    checkboxBackgroundColor() {
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
            (this.bgColor = '#d1dffa'));
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

.content {
  margin-top: 61px;
}

header {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
  box-shadow: 0 1.5px 2px 2px rgb(243, 243, 243);
}

#header-content {
  width: 96.7%;
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
    top: 5px;
  }

  .fa-moon {
    color: #f1c40f;
  }

  .fa-sun {
    color: #f29a0d;
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

.no-click {
  pointer-events: none;
}

#logo-link {
  text-decoration: none;
  font-family: 'Poppins Bold', sans-serif;
  color: #3a5088;
  font-size: 40px;
  font-weight: 800;
  padding: 8px;
  user-select: none;

  span {
    font-family: 'Poppins Extra Bold', sans-serif;
    color: #9f6db0;
    font-size: 20px;
    font-weight: 800;
  }
}

.dark-mode {
  header {
    background: rgb(31, 31, 31);
    box-shadow: 0 1.5px 2px 2px rgb(30, 30, 30);
  }

  #logo-link {
    color: #5974c0;

    span {
      color: #ffb2ff;
    }
  }
}
</style>
