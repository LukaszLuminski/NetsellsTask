
export const actions = {
    async nuxtServerInit ({ dispatch }) {
      const toDispatch = [
        dispatch('api/getLength'),
        dispatch('api/getRange'),
        dispatch('api/getSinglePost')
      ]
      await Promise.all(toDispatch)
    }
  }
  