<template>
  <div class="plus">
    <script
      src="https://kit.fontawesome.com/06e4cc1e22.js"
      crossorigin="anonymous"
    ></script>
    <i
      class="fa fa-plus"
      aria-hidden="true"
      v-b-tooltip.hover
      :title="tooltipText"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    tooltipText: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.plus {
  position: relative;
  margin: 0;
  padding: 0;
}

.fa-plus {
  background: #374b7b;
  color: #fff5de;
  padding: 8px;
  border-radius: 8px;
  position: absolute;
  border: 2px #374b7b solid;
  transition: all 0.2s ease-in-out;
}

.fa-plus:hover {
  color: #3c5186;
  background: #fff5de;
  cursor: pointer;
}
</style>
