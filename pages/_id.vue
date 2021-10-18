<template>
<div><article
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
        <p class="information mb-4">
          By
          <span class="information__author">{{ this.getPost.author }}</span
          ><span class="information__date ml-2">{{
            this.getPost.createdAt | formatDate
          }}</span>
        </p></b-row
      >
      <h4 class="text-left mb-4">{{ this.getPost.intro }}</h4>
      <p class="text-left">{{ this.getPost.text }}</p>
      <div class="text-center">
        <button class="Post__go-back-btn btn-orange" @click="$router.go(-1)">
          Go back
        </button>
      </div>
    </b-container>
  </article>
  <div v-if="!this.getPost && this.ready" class="Error" ref="error">
      <div class="text-center">
        <h4 class="Error__text">
          An error occurred and the content is currently unavailable. Please refresh page.
        </h4>
        <h4 class="Error__text">
         If the problem persists, try again later.
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TitleAndDateMixin from "../mixins/titleAndDate";
export default {
  async asyncData({ params }) {
    const id = params.id;
    return {
      id,
    };
  },
  data () {
    return {
      ready: false
    }
  },
  mixins: [TitleAndDateMixin],
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
      this.ready = true
      if (this.$refs.post) this.$refs.post.classList.remove("hidden");
    }, 400);
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
     font-size:24px; 
    }
    font-size:19px; 
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
    padding-bottom: 4px;
    margin-top: 25px;
    margin-bottom: 40px;
    height: 50px;
    width: 200px;
    font-size: 20px;
  }
}
</style>