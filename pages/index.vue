<template>
  <body>
    <main>
      <div class="buttons">
        <nuxt-link to="/gameSettings"><BaseButton class="btn" :buttonText="'New game'"/></nuxt-link>
        <BaseButton class="btn" :buttonText="'Options'" />
        <BaseButton class="btn" :buttonText="'Exit'" />
      </div>
    </main>
  </body>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  width: 80%;
}

.buttons {
  padding: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
