<template>
  <article class="Card">
    <b-img-lazy class="Card__img desktop" :src="post.image" />
    <div class="Card__img mobile" :src="post.image" />
    <div class="Card__content p-3">
      <header>
        <h4 class="Card__title pb-2" @click="goTo(post.id)">
          {{ formatTitle(post.title) }}
        </h4>
      </header>
      <p class="Card__intro">{{ truncate(post.intro, 200) }}</p>
    </div>
    <footer>
      <post-info
        :absolute="true"
        :postInfo="{ author: post.author, date: post.createdAt }"
      />
    </footer>
  </article>
</template>

<script>
import titleMixin from "../mixins/titleMixin";
import PostInfo from "./PostInfo.vue";
export default {
  components: { PostInfo },
  mixins: [titleMixin],
  props: {
    post: {
      type: Object,
      required: true,
    },
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
// style import for Storybook
@import "assets/scss/main.scss";
.Card {
  position: relative;
  height: 100%;
  border-radius: 5px;
  max-width: 350px;
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
  background-color: $white;
  &__img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    max-height: 263px;
    background-position: center top;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  &__intro {
    color: darken($grey, 40%);
    @media (min-width: 600px) {
      font-size: 16px;
    }
    font-size: 15px;
  }
  &__content {
    margin-bottom: 28px;
  }
}
</style>