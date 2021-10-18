<template>
  <div class="Error" :style="`top: ${this.top}px`">
    <div class="text-center">
      <h4 v-if="this.apiError" class="Error__text">
        {{ this.apiError.message ? this.apiError.message : this.apiError }}!
        Please refresh page.
      </h4>
      <h4 class="Error__text" v-html="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiError: {
      type: undefined,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    // how far from the page top 
    // this absolute component will be positioned, to not cover
    // CTAs (like search input field)
    top: {
      type: Number,
      required: true
    }
  },
};
</script>

<style lang="scss">
// style import for Storybook
@import "assets/scss/main.scss";
.Error {
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  height: 80px;
  justify-content: center;
  align-items: center;
  color: $orange;
  position: absolute;
  left: 0;
  right: 0
}
</style>