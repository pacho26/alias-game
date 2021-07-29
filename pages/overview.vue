<template>
  <main>
    <h1>MODIFY ANSWERS</h1>
    <div class="words-container">
      <WordsOverview />
    </div>
    <BaseButton id="btn" :to="'/standings'" :buttonText="'Continue'" />
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #3c5186;

  h1 {
    font-weight: 700;
    margin: 20px 0;
  }

  #btn {
    margin-top: 50px;
    margin-bottom: 20px;
  }
}
</style>
