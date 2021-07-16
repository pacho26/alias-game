<template>
  <div class="plus">
    <i
      v-b-tooltip.hover.right="tooltipText"
      class="fa fa-plus"
      aria-hidden="true"
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
  margin: 0;
  padding: 0;
}

.fa-plus {
  background: #374b7b;
  color: #fff5de;
  padding: 8px;
  border-radius: 8px;
  border: 2px #374b7b solid;
  transition: all 0.2s ease-in-out;
  transform: scale(1.1, 1);
}

.fa-plus:hover {
  color: #3c5186;
  background: #fff5de;
  cursor: pointer;
}
</style>
