<template>
  <div class="Articles pt-2 pb-4">
    <b-container :class="this.ready ? '' : 'hidden'" class="transition__5">
      <div class="Articles__search-bar pr-0 mb-4 ml-auto">

        <!-- Search input --> 
        <b-form-input
          size="md"
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

        <!-- Reusable post card component --> 
          <card :post="post" />
        </b-col>
      </b-row>

      <!-- Pagination --> 
      <div class="Articles__pagination-wrapper">
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
      </div>

      <!-- Reusable error message components in case of no articles found or an error response from Api --> 
      <error-message v-if="this.getArticles && this.getArticles.length === 0" ref="noResults" content="No results." :top="200"/>
      <error-message v-if="this.getError" :apiError="this.getError" content="If the problem persists, try again later." :top="200"/>
    </b-container>

    <!-- Spinner displayed before the app renders --> 
    <div
    ref="spinner"
      class="Articles__spinner-wrapper transition__5"
      :class="this.ready || this.loaded ? 'hidden' : ''"
    >
      <div class="text-center">
        <b-spinner
          class="Articles__spinner"
          label="Text Centered"
        ></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Card from "../components/Card.vue";
import ErrorMessage from '../components/ErrorMessage.vue';
export default {
  components: { Card, ErrorMessage },
  data() {
    return {
      articles: null,
      currentPage: 1,
      perPage: 12,
      rows: null,
      ready: false,
      timeout: null,
      debouncedSearch: "",
      //for not triggering another Api call, when not needed
      ignoreSearch: false,
      loaded: false
    };
  },
  computed: {
    ...mapGetters({
      getArticles: "api/getArticles",
      getError: "api/getError",
    }),

    // getter and debounced setter for search input value
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

    // renders previously opened page
    this.currentPage = this.$store.state.api.page;

    // bounds data variable with a Vuex state item, which marks whether
    // the app has been rendered yet
    this.loaded = this.$store.state.api.loaded;

    // depending on whether a search input value is presents, 
    // fetches appropriate articles and array length
    if (this.$store.state.api.search.length > 0) {
      await this.getLength(this.$store.state.api.search);
      await this.getRange({
        search: this.$store.state.api.search,
        page: this.currentPage,
      });
      this.ignoreSearch = true;
      this.search = this.$store.state.api.search;
    } else {
      await this.getLength();
      await this.getRange({ page: this.currentPage });
    }
    this.articles = this.getArticles;
    this.rows = this.$store.state.api.length;
    setTimeout(() => {

      // page content is being revealed
      this.ready = true;

      // marking app rendering as finished (no more welcome spinner)
      this.setAppLoaded()
    }, 300);
  },
  watch: {

    // what happens, when a pagination page changes 
    // (for appropriate styling and different Api calls, depending of the search input value)
    currentPage(val) {
      if (val) {
        if (this.$refs.articlesRow)
          this.$refs.articlesRow.classList.add("hidden");
        if (this.$refs.noResults) this.$refs.noResults.classList.add("hidden");
        if (this.$refs.error) this.$refs.error.$el.classList.add("hidden");
        if (this.search.length > 0) {
          this.getRange({ search: this.search, page: val });
        } else {
          this.getRange({ page: val });
        }
        this.setPage(val);
        window.scrollTo(0, 0);
        setTimeout(() => {
          if (this.$refs.articlesRow)
            this.$refs.articlesRow.classList.remove("hidden");
          if (this.$refs.noResults)
            this.$refs.noResults.classList.remove("hidden");
          if (this.$refs.error) this.$refs.error.$el.classList.remove("hidden");
        }, 700);
      }
    },

    // captures changes of the search input value
    search() {
      // when the search doesn't have to be ignored, just for appropriate styling (fade-in, fade-out)
      if (!this.ignoreSearch) {
        if (this.$refs.articlesRow)
          this.$refs.articlesRow.classList.add("hidden");
        if (this.$refs.noResults) this.$refs.noResults.$el.classList.add("hidden");
        setTimeout(() => {
          if (this.$refs.articlesRow)
            this.$refs.articlesRow.classList.remove("hidden");
          if (this.$refs.noResults)
            this.$refs.noResults.$el.classList.remove("hidden");
          if (this.$refs.error) this.$refs.error.classList.remove("hidden");
        }, 700);
      }
    },

    // if the page has been mounted, spinner dissapears
    ready(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.spinner.style.display = 'none'
        }, 400)
      }
    }
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
      setAppLoaded: "api/setAppLoaded"
    }),

    //searching articles by key word(s)
    async find(val) { 
      if (val.length > 0) {
        await this.getLength(val);
        // in the first scenario user returns from a post page to the same page as before.
        // used when search input value hasn't changed 
        if (this.ignoreSearch)
          await this.getRange({ search: val, page: this.currentPage });

        // used when a new search input value has been provided (displays new results from page 1)  
        else await this.getRange({ search: val, page: 1 });

        // sets current search value in Vuex state
        this.setSearch(val);
      } else {

        // if there is no search input value, fetches unfiltered, paginated articles 
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
    @media (min-width: 500px) {
      max-width: 300px;
    }
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
  &__pagination-wrapper {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__pagination {
    justify-content: center;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
    width: fit-content;
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
  &__spinner-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__spinner {
    color: $orange;
    width: 4em;
    height: 4em;
  }
}
</style>
