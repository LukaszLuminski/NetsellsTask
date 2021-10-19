
export const actions = {
    async nuxtServerInit ({ dispatch }) {
      const toDispatch = [
        dispatch('api/fetchLength'),
        dispatch('api/fetchRange'),
        dispatch('api/fetchSinglePost')
      ]
      await Promise.all(toDispatch)
    }
  }
  