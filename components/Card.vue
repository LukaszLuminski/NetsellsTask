<template>
  <article class="Card">
    <div class="Card__img" :style="`background-image: url('${post.image}')`" />
    <div class="Card__content p-3">
      <header>
        <h4 class="Card__title pb-2" @click="goTo(post.id)">
          {{ formatTitle(post.title) }}
        </h4>
      </header>
      <p class="Card__intro">{{ truncate(post.intro, 200) }}</p>
    </div>
    <footer>
      <p class="information absolute">
        By
        <span class="information__author">{{ post.author }}</span
        ><span class="information__date ml-2">{{
          post.createdAt | formatDate
        }}</span>
      </p>
    </footer>
  </article>
</template>

<script>
import TitleAndDateMixin from "../mixins/titleAndDate";
export default {
  mixins: [TitleAndDateMixin],
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  methods: {
    truncate(text, max) {
      return text.substr(0, max - 1) + (text.length > max ? "..." : "");
    },
    goTo(id) {
      this.$router.push({ path: `/${id}` });
    },
  },
};
</script>
<style lang="scss">
.Card {
  position: relative;
  height: 100%;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.18);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.18);
  background-color: $white;
  &__img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 250px;
    width: 100%;
    background-position: center top;
  }
  &__title {
    cursor: pointer;
  }
  &__content {
    margin-bottom: 28px;
  }
}
</style>