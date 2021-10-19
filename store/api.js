

export const state = () => ({
  articles: null,
  length: null,
  error: null,
  search: '',
  post: null,
  page: 1,
  loaded: false
})

export const getters = {
  getPage: state => state.page,
  getPost: state => state.post,
  getArticles: state => state.articles,
  getError: state => state.error,
  getSearch: state => state.search,
  getLength: state => state.length,
  getLoaded: state => state.loaded
}

export const actions = {
  async fetchLength({ commit }, payload) {
    try {
      let articles
      if (payload) {
        articles = await this.$axios.$get(`?search=${payload}`)
      } else {
        articles = await this.$axios.$get()
      }
      commit('setLength', articles.length)
      commit('clearError')
    } catch (err) {
      commit('setError', err)
    }

  },
  async fetchRange({ commit }, payload) {
    try {
      let articles
      if (payload.search) {
        articles = await this.$axios.$get(`?search=${payload.search}&page=${payload.page}&limit=12`)
      } else {
        articles = await this.$axios.$get(`?page=${payload.page}&limit=12`)
      }
      commit('setPage', payload.page)
      commit('setArticles', articles)
      commit('clearError')
    } catch (err) {
      commit('setError', err)
    }
  },
  async fetchSinglePost({ commit }, payload) {
    try {
      const post = await this.$axios.$get(`/${payload}`)
      commit('setPost', post)
      commit('clearError')
    } catch (err) {
      commit('setError', err)
    }
  }
}

export const mutations = {
  setPage(state, data) {
    state.page = data
  },
  setSearch(state, data) {
    state.search = data
  },
  setPost(state, data) {
    state.post = data
  },
  setAppLoaded(state) {
    state.loaded = true
  },
  setArticles(state, data) {
    state.articles = data
  },
  setLength(state, data) {
    state.length = data
  },
  setError(state, data) {
    state.error = data
  },
  clearError(state) {
    state.error = null
  }
}
