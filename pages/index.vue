<template>
  <body>
    <main>
      <h1>Explain with another words!</h1>
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
      //     moto: 'Explain with another words!',
      //     newGame: 'New game',
      //     rules: 'Rules',
      //   },
      //   cro: {
      //     moto: 'Objasni drugim riječima!',
      //     newGame: 'Nova igra',
      //     rules: 'Pravila',
      //   },
    }
  },
  computed: {
    chosenLanguage() {
      const chosenLang = 'eng'
    },
  },
}
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

  h1 {
    font-size: 60px;
    color: #3c5186;
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
