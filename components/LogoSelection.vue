<template>
  <main>
    <BaseLoader v-if="isLoading" />

    <h1>CHOOSE LOGO</h1>
    <div id="logo-selection" ref="logoSelection">
      <div
        class="pb-1"
        v-for="logoCategory in this.getLogos"
        :key="logoCategory.category"
      >
        <p>{{ logoCategory.category.toUpperCase() }}</p>
        <div class="logos-container">
          <div
            class="logo-container"
            v-for="img in logoCategory.images"
            :key="img.token"
          >
            <img
              :src="`https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2F${logoCategory.category}%2F${img.alt}.png?alt=media&token=${img.token}`"
              :alt="img.alt"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
      imgLoaded: 0,
    };
  },
  emits: ['logoSelected'],
  computed: {
    ...mapGetters('logos', ['getLogos', 'getNumberOfLogos']),
  },
  methods: {
    selectLogo(event) {
      if (event.target.src) {
        this.$emit('logoSelected', event.target.src);
      }
    },
    handleLoading() {
      this.imgLoaded++;
      this.imgLoaded === this.getNumberOfLogos
        ? (this.isLoading = false)
        : null;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  display: flex;
  align-items: center;

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #374b7b;
  }

  #logo-selection {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 70vh;

    p {
      position: relative;
      top: 10px;
      margin-left: 5px;
      color: #374b7b;
    }

    .logo-container {
      margin: 0px 0px 8px 9px;
      width: 56px;
      height: 56px;
      display: flex;
      justify-content: center;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }

    img {
      max-width: 56px;
      max-height: 56px;
      user-select: none;
    }

    .logos-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cad3e7;
  border-radius: 10px;

  &:hover,
  &:active {
    background: #a7b6d7;
  }
}

@media only screen and (min-width: 600px) {
  .logos-container {
    position: relative;
    right: 5px;
  }
}

@media only screen and (max-width: 600px) {
  main {
    #logo-selection {
      .logo-container {
        margin: 0px 2px 8px 10px;
        width: 56px;
        height: 56px;
      }

      img {
        max-width: 56px;
        max-height: 56px;
      }
    }
  }
}
</style>
