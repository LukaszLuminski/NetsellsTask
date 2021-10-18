<template>
  <div class="Error" ref="error">
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
  },
};
</script>

<style lang="scss">
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
  right: 0;
  top: 200px;
}
</style>