<template>
  <nuxt-link v-if="link" class="container" :to="to">
    <button class="btn">{{ buttonText }}</button>
  </nuxt-link>

  <button v-else class="btn">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: false,
      default: '',
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.btn {
  border: 2px #374b7b solid;
  border-radius: 8px;
  padding: 10px;
  width: 400px;
  font-size: 26px;
  text-transform: uppercase;
  margin: 10px;
  text-align: center;
  background: #374b7b;
  color: #fff5de;
  margin: 0;
  transition: all 0.2s ease-in-out;
  max-width: 250px;
}

.btn:hover {
  color: #3c5186;
  background: #fff5de;
}

.btn:focus {
  outline: 0;
  box-shadow: none;
}
</style>
