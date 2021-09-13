<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <h2>{{ strings.rules }}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ab autem
        voluptatibus sequi quam distinctio harum. Aut aperiam dignissimos
        exercitationem accusantium a quod ratione eum quis sint, aspernatur
        similique voluptas commodi, et quia numquam reprehenderit? Maxime sed
        porro aliquid, expedita tempora minima non eum doloribus aperiam
        possimus qui repudiandae sunt iure sapiente cumque iusto magnam tempore
        culpa! Enim est corporis autem error praesentium molestias consectetur
        accusantium accusamus. Iure repellendus corporis reiciendis nihil quas
        repudiandae quia qui esse. Obcaecati, dolore nesciunt et veniam aut
        recusandae laborum consequatur rerum mollitia modi pariatur blanditiis
        voluptates minus quisquam doloremque? Error laudantium voluptatum
        dolorem adipisci.
      </p>
      <BaseButton class="btn" :to="'/'" :buttonText="this.strings.return" />
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      strings: {},
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['isDarkMode', 'chosenLanguage']),
    ...mapGetters(['getStartedOnIndexPage']),
  },
  created() {
    !this.getStartedOnIndexPage
      ? this.$router.push({ path: '/' })
      : this.translate();
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
    this.isLoading = false;
  },
  methods: {
    translate() {
      this.chosenLanguage === 'english'
        ? ((this.strings.return = 'Return to menu'),
          (this.strings.rules = 'Rules'))
        : ((this.strings.return = 'Povratak na izbornik'),
          (this.strings.rules = 'Pravila'));
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
  color: #3c5186;

  .btn {
    font-size: 22px;
  }

  h2 {
    font-family: 'Poppins Extra Bold', sans-serif;
    font-weight: 800;
    font-size: 48px;
    color: #374b7b;
    text-transform: uppercase;
    cursor: default;
    user-select: none;
  }

  p {
    font-size: 20px;
  }
}

.dark-mode {
  main {
    color: #f2f2f2;

    h2 {
      color: #bb86fc;
    }
  }
}
</style>
