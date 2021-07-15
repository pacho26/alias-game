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
}
</script>

<style lang="scss" scoped>
.container {
  background: blue;
}

.btn {
  border: 2px #283558 solid;
  border-radius: 8px;
  padding: 10px 10px;
  width: 400px;
  font-size: 26px;
  text-transform: uppercase;
  margin: 10px;
  text-align: center;
  background: #3c5186;
  color: #fff5de;
  margin: 10px 0;
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
