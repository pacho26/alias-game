<template>
  <body>
    <div id="desc">
      <h1>Explain using other words!</h1>
    </div>

    <main>
      <div class="buttons">
        <nuxt-link class="nuxtLink" to="/lobby"
          ><BaseButton class="btn" :buttonText="'New game'"
        /></nuxt-link>
        <nuxt-link class="nuxtLink" to="/rules"
          ><BaseButton class="btn" :buttonText="'Rules'"
        /></nuxt-link>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  data() {
    return {
      // language {
      //   eng: {
      //     desc: 'Explain using another words!',
      //     newGame: 'New game',
      //     rules: 'Rules',
      //   },
      //   cro: {
      //     desc: 'Objasni drugim riječima!',
      //     newGame: 'Nova igra',
      //     rules: 'Pravila',
      //   },
    };
  },
  computed: {
    chosenLanguage() {
      const chosenLang = 'eng';
    },
  },
};
</script>

<style lang="scss" scoped>
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
  background: #374b7b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  h1 {
    font-size: 50px;
    color: #fff5de;
    text-align: center;
  }
}

.buttons {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.buttons > * {
  margin: 12px 0;
}
</style>
