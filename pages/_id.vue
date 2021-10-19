<template>
  <div>
    <article
      v-if="this.getPost"
      class="Post pt-4 transition__3 hidden"
      ref="post"
    >
      <header class="text-center">
        <h1 class="pb-4">
          {{ formatTitle(this.getPost.title) }}
        </h1>
      </header>
      <div
        class="Post__img mb-4"
        :style="`background-image: url('${this.getPost.image}')`"
      />
      <b-container>
        <b-row class="Post__info-wrapper text-center">

          <!-- Reusable styled component containing the post's author & date --> 
          <post-info
            class="mb-4"
            :postInfo="{
              author: this.getPost.author,
              date: this.getPost.createdAt,
            }"
        /></b-row>
        <h4 class="text-left mb-4">{{ this.getPost.intro }}</h4>
        <p class="text-left">{{ this.getPost.text }}</p>
        <div class="text-center">
          <!-- Reusable button component --> 
          <btn label="Go back" @clicked="$router.go(-1)" class="Post__go-back-btn" />
        </div>
      </b-container>
    </article>
    <!-- Reusable error message component --> 
    <error-message v-if="!this.getPost && this.ready" ref="error" :top="200" :content="this.errorMessage" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Btn from "../components/Btn.vue";
import PostInfo from "../components/PostInfo.vue";
import ErrorMessage from "../components/ErrorMessage.vue";
import titleMixin from "../mixins/titleMixin";
export default {
  components: { PostInfo, Btn, ErrorMessage },
  async asyncData({ params }) {
    const id = params.id;
    return {
      id,
    };
  },
  data() {
    return {
      ready: false,
      errorMessage:
        'An error occurred and the content is currently unavailable. Please refresh page.<br />If the problem persists, try again later."',
    };
  },
  mixins: [titleMixin],
  computed: {
    ...mapGetters({
      getPost: "api/getPost",
      getError: "api/getError",
    }),
  },
  async mounted() {
    await this.getSinglePost(this.id);
    if (this.$refs.post) this.$refs.post.scrollTop = 0;
    setTimeout(() => {
      this.ready = true;
      if (this.$refs.post) this.$refs.post.classList.remove("hidden");
    }, 800);
  },
  methods: {
    ...mapActions({
      getSinglePost: "api/getSinglePost",
    }),
  },
};
</script>

<style lang="scss">
.Post {
  h1 {
    @media (min-width: 768px) {
      font-size: 54px;
    }
    font-size: 34px;
    font-weight: 700;
  }
  h4 {
    @media (min-width: 768px) {
      font-size: 24px;
    }
    font-size: 19px;
  }
  &__img {
    width: 100%;
    @media (min-width: 768px) {
      height: 400px;
    }
    @media (min-width: 992px) {
      height: 600px;
    }
    height: 230px;
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
  }
  &__info-wrapper {
    display: flex;
    justify-content: center;
  }
  &__go-back-btn {
    margin-top: 25px;
    margin-bottom: 40px;
  }
}
</style>