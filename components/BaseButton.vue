<template>
  <nuxt-link v-if="to" class="btn" :to="to">{{ buttonText }} </nuxt-link>

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
    to: {
      type: String,
      required: false,
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

  &:hover {
    color: #3c5186;
    background: #fff5de;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }
}
</style>
