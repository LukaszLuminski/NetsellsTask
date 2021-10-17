<template>
  <div class="Articles py-5">
    <b-container :class="this.ready ? '' : 'hidden'" class="transition__5">
      <!-- <div class="Articles__search-bar pr-0 mb-4 ml-auto">
        <b-form-input
          size="md"
          class="mr-2"
          placeholder="Search"
          v-model="search"
        ></b-form-input>
      </div> -->
      <b-row v-if="this.getArticles" class="transition__3" ref="articlesRow">
        <b-col
          v-for="(post, i) in this.getArticles"
          :key="i"
          sm="12"
          md="6"
          lg="4"
          class="mb-5"
        >
          <article class="Articles__card">
            <div
              class="Articles__img"
              :style="`background-image: url('${post.image}')`"
            />
            <div class="Articles__content p-3">
              <header>
                <h4 class="Articles__title pb-2" @click="goTo(post.id)">
                  {{ formatTitle(post.title) }}
                </h4>
              </header>
              <p class="Articles__intro">{{ truncate(post.intro, 200) }}</p>
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
        </b-col>
      </b-row>
      <b-pagination
        v-if="this.getArticles"
        :key="rows"
        class="Articles__pagination"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      />
    </b-container>
    <div v-if="this.getError" class="Error">
      <div class="text-center">
        <h4 class="Error__text">
          {{ this.getError.message ? this.getError.message : this.getError
          }}{{ "! Please refresh page." }}
        </h4>
        <h4 class="Error__text">
          {{ "If the problem persists, try again later." }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TitleAndDateMixin from "../mixins/titleAndDate";
export default {
  mixins: [TitleAndDateMixin],
  data() {
    return {
      articles: null,
      currentPage: 1,
      perPage: 12,
      rows: null,
      ready: false,
      timeout: null,
      debouncedSearch: "",
    };
  },
  computed: {
    ...mapGetters({
      getArticles: "api/getArticles",
      getError: "api/getError",
    }),
    search: {
      get() {
        return this.debouncedSearch;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedSearch = val;
          this.find(val);
        }, 500);
      },
    },
  },
  async mounted() {
    await this.getLength();
    this.currentPage = this.$store.state.api.page;
    await this.getRange({ page: this.currentPage });
    this.articles = this.getArticles;
    this.rows = this.$store.state.api.length;
    this.ready = true;
  },
  watch: {
    currentPage(val) {
      if (val) {
        this.$refs.articlesRow.classList.add("hidden");
        if (this.search.length > 0) {
          this.getRange({ search: this.search, page: val });
        } else {
          this.getRange({ page: val });
        }
        this.setPage(val);
        setTimeout(() => {
          this.$refs.articlesRow.classList.remove("hidden");
        }, 700);
      }
    },
    search() {
      this.$refs.articlesRow.classList.add("hidden");
      setTimeout(() => {
        this.$refs.articlesRow.classList.remove("hidden");
      }, 700);
    },
  },
  methods: {
    ...mapActions({
      getLength: "api/getLength",
      getRange: "api/getRange",
      findRecord: "api/findRecord",
    }),
    ...mapMutations({
      setPage: "api/setPage",
    }),
    formatTitle(val) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
    truncate(text, max) {
      return text.substr(0, max - 1) + (text.length > max ? "..." : "");
    },
    goTo(id) {
      this.$router.push({ path: `/${id}` });
    },
    async find(val) {
      if (val.length > 0) {
        await this.getLength(val);
        await this.getRange({ search: val, page: 1 });
      } else {
        await this.getLength();
        await this.getRange({ page: 1 });
      }
      this.articles = this.getArticles;
      this.rows = this.$store.state.api.length;
      this.currentPage = this.$store.state.api.page;
    },
  },
};
</script>

<style lang="scss">
.Articles {
  min-height: 100vh;
  background-color: $l-grey;
  .container {
    position: relative;
    padding-top: 40px;
  }
  // &__search-bar {
  //   max-width: 300px;
  //   display: flex;
  //   flex-wrap: nowrap;
  // }
  &__card {
    position: relative;
    height: 100%;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.18);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.18);
    background-color: $white;
  }
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
  &__pagination {
    justify-content: center;
    .page-item.active .page-link {
      color: $white !important;
      background-color: $orange !important;
      border-color: darken($orange, 10%) !important;
    }
    .page-link {
      color: $orange !important;
    }
  }
  .form-control:focus {
    border-color: lighten($orange, 10%);
  }
}
.Error {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $orange;
}
</style>
