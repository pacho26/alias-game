<template>
  <div>
    <BaseLoader v-if="isLoading" />

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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.isDarkMode
      ? ((document.body.style.backgroundColor = '#202124'),
        document.body.classList.add('dark-mode'))
      : ((document.body.style.backgroundColor = 'white'),
        document.body.classList.remove('dark-mode'));

    // to prevent black screen for a moment
    setTimeout(() => (this.isLoading = false), 180);
  },
  computed: {
    ...mapState(['isDarkMode']),
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #374b7b;
$secondary-color: #fff5de;

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
    color: $secondary-color;
    text-align: center;
    max-width: 660px;
  }
}

.buttons {
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;

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
</style>
