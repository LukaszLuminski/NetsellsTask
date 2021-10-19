<template>
  <p class="information mb-0">
    By
    <span class="information__author">{{ postInfo.author }}</span
    ><span class="information__date ml-2">{{
      postInfo.date | formatDate
    }}</span>
  </p>
</template>

<script>
import moment from "moment";
export default {
  props: {
    postInfo: {
      type: Object,
      required: true,
    }
  },
  filters: {
    formatDate(val) {
      if (val) {
        return moment(String(val)).format("Do MMM YYYY");
      }
    },
  },
};
</script>

<style lang="scss">
// style import for Storybook
@import "assets/scss/main.scss";
.information {
  white-space: nowrap;
  color: $grey;
  @media (min-width: 600px) {
    font-size: 16px;
  }
  font-size: 14px;

  &__author {
    color: $orange;
  }
  &__date {
    &:before {
      content: "\a";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #bdbdbd;
      display: inline-block;
      margin-bottom: 3px;
      margin-right: 7px;
    }
  }
}
</style>