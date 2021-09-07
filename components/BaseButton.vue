<template>
  <nuxt-link v-if="to" class="btn" :to="to">{{ buttonText }} </nuxt-link>
  <button v-else class="btn">{{ buttonText }}</button>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    buttonText: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapState(['isDarkMode']),
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #e6e6e6;
$secondary-color: #374b7b;

* {
  box-sizing: border-box;
}

.btn {
  border-radius: 8px;
  padding: 10px;
  width: 300px;
  font-size: 26px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 10px;
  text-align: center;
  color: #f2f2f2;
  background: $secondary-color;
  margin: 0;
  transition: all 0.2s ease-in-out;
  max-width: 250px;

  &:hover {
    background: $primary-color;
    color: $secondary-color;
    box-shadow: 0 5px 15px rgba(114, 137, 192, 0.8);
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }
}

.dark-mode {
  .btn {
    background: #bb86fc;
    color: #202124;

    &:hover {
      color: #f2f2f2;
      box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
    }
  }
}
</style>
