<template>
  <div class="Search-bar pr-0 mb-4 ml-auto">
    <b-form-input
      size="md"
      class="mr-2"
      placeholder="Search"
      v-model="search"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
      debouncedSearch: "",
    };
  },
  computed: {
    search: {
      get() {
        return this.debouncedSearch;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedSearch = val;
          this.$emit("find", val);
          //   this.find(val);
        }, 500);
      },
    },
  },
};
</script>

<style lang="scss">
.Search-bar {
  max-width: 300px;
  display: flex;
  flex-wrap: nowrap;
}
</style>