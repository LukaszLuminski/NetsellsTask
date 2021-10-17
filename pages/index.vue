<template>
  <div class="Articles py-5">
    <b-container :class="this.ready ? '' : 'hidden'" class="transition__5">
      <div class="Articles__search-bar pr-0 mb-4 ml-auto">
        <b-form-input
          size="md"
          class="mr-2"
          placeholder="Search"
          v-model="search"
          @focus="ignoreSearch = false"
        ></b-form-input>
      </div>
      <b-row
        v-if="this.getArticles && this.getArticles.length > 0"
        class="transition__3"
        ref="articlesRow"
      >
        <b-col
          v-for="(post, i) in this.getArticles"
          :key="i"
          sm="12"
          md="6"
          lg="4"
          class="mb-5"
        >
          <card :post="post"/>
        </b-col>
      </b-row>
      <b-pagination
        v-if="this.getArticles && this.getArticles.length > 0"
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
    <div
      v-if="this.getArticles && this.getArticles.length === 0"
      class="Error"
      ref="noResults"
    >
      <div class="text-center">
        <h4 class="Error__text">No results.</h4>
      </div>
    </div>
    <div v-if="this.getError" class="Error" ref="error">
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
import Card from "../components/Card.vue";
export default {
  components: { Card },
  data() {
    return {
      articles: null,
      currentPage: 1,
      perPage: 12,
      rows: null,
      ready: false,
      timeout: null,
      debouncedSearch: "",
      ignoreSearch: false
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
          if (!this.ignoreSearch) this.find(this.debouncedSearch);
        }, 500);
      },
    },
  },
  async mounted() {
    this.currentPage = this.$store.state.api.page;
    if (this.$store.state.api.search.length > 0) {
      await this.getLength(this.$store.state.api.search);
      await this.getRange({ search: this.$store.state.api.search, page: this.currentPage });
      this.ignoreSearch = true
      this.search = this.$store.state.api.search
    } else {
      await this.getLength();
      await this.getRange({ page: this.currentPage });
    }
    this.articles = this.getArticles;
    this.rows = this.$store.state.api.length;
    setTimeout(() => {
      this.ready = true;
    }, 300)
  },
  watch: {
    currentPage(val) {
      if (val) {
        if (this.$refs.articlesRow)
          this.$refs.articlesRow.classList.add("hidden");
        if (this.$refs.noResults) this.$refs.noResults.classList.add("hidden");
        if (this.$refs.error) this.$refs.error.classList.add("hidden");
        if (this.search.length > 0) {
          this.getRange({ search: this.search, page: val });
        } else {
          this.getRange({ page: val });
        }
        this.setPage(val);
        setTimeout(() => {
          if (this.$refs.articlesRow)
            this.$refs.articlesRow.classList.remove("hidden");
          if (this.$refs.noResults)
            this.$refs.noResults.classList.remove("hidden");
          if (this.$refs.error) this.$refs.error.classList.remove("hidden");
        }, 700);
      }
    },
    search() {
      if (!this.ignoreSearch) {
      if (this.$refs.articlesRow)
        this.$refs.articlesRow.classList.add("hidden");
      if (this.$refs.noResults) this.$refs.noResults.classList.add("hidden");
      setTimeout(() => {
        if (this.$refs.articlesRow)
          this.$refs.articlesRow.classList.remove("hidden");
        if (this.$refs.noResults)
          this.$refs.noResults.classList.remove("hidden");
        if (this.$refs.error) this.$refs.error.classList.remove("hidden");
      }, 700);
      }
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
      setSearch: "api/setSearch",
    }),
    async find(val) {
      if (val.length > 0) {
        await this.getLength(val);
        if (this.ignoreSearch) await this.getRange({ search: val, page: this.currentPage });
        else await this.getRange({ search: val, page: 1 });
        this.setSearch(val)
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
    min-height: 100vh;
    position: relative;
    padding-top: 40px;
  }
  &__search-bar {
    max-width: 300px;
    display: flex;
    flex-wrap: nowrap;
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
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  color: $orange;
  position: fixed;
  top: 40vh;
}
</style>
