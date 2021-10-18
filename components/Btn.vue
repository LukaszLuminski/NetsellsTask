<template>
  <button class="btn-orange" @click="clicked">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="scss">
// style import for Storybook
@import "assets/scss/main.scss";
  .btn-orange {
    cursor: pointer;
    height: 50px;
    width: 200px;
    font-size: 20px;
    padding-bottom: 4px;
    border: none !important;
    background-color: $orange;
    border-radius: 4px;
    color: $white;
    &:hover {
      background: darken($orange, 20%); /* Old browsers */
      background: -moz-linear-gradient(
        to bottom,
        $orange,
       darken($orange, 20%)
      ); /* FF3.6-15 */
      background: -webkit-linear-gradient(
        to bottom,
        $orange,
       darken($orange, 20%)
      ); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, $orange, darken($orange, 20%));
    }
    &:active {
      background: darken($orange, 20%);
    }
    &.disabled {
        pointer-events: none;
        background-color: lighten($grey, 8%);
        color: darken($grey, 15%);
    }
  }
</style>