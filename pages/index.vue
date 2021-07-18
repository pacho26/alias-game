<template>
  <div>
    <div id="desc">
      <h1>Explain using other words!</h1>
    </div>
    <main>
      <div class="buttons">
        <BaseButton class="btn" :to="'/lobby'" :buttonText="'New game'" />
        <BaseButton class="btn" :to="'/rules'" :buttonText="'Rules'" />
      </div>
    </main>
  </div>
</template>

<script>
export default {};
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
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.btn:first-of-type {
  margin-bottom: 20px;
}
</style>
