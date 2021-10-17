

export const state = () => ({
  articles: null,
  article: null,
  length: null,
  error: null,
  post: null,
  page: 1,
})

export const getters = {
  getPage: state => state.page,
  getPost: state => state.post,
  getArticles: state => state.articles,
  getArticle: state => state.article,
  getError: state => state.error
}

export const actions = {
  async getLength({ commit }, payload) {
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
  async getRange({ commit }, payload) {
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
  async getSinglePost({ commit }, payload) {
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
  setPost(state, data) {
    state.post = data
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
//   export const actions = {
//     async fetchMainMenu ({ commit }) {
//       const menuItems = await this.$axios.$get('wp/v2/menu/main-menu')
//       commit('setMainMenu', menuItems)
//     },
//     async fetchFooterMenuQuickLinks ({ commit }) {
//       const menuItems = await this.$axios.$get('wp/v2/menu/footer-menu')
//       commit('setFooterMenuQuickLinks', menuItems)
//     },
//     async fetchFooterMenuCorporate ({ commit }) {
//       const menuItems = await this.$axios.$get('wp/v2/menu/footer-menu-more')
//       commit('setFooterMenuCorporate', menuItems)
//     }
//   }
