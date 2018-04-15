export default {
  namespaced: true,
  state: {
    text: 0
  },
  mutations: {
    updateText (state, data) {
      state.text = data.text
    }
  },
  getters: {
    textPlus (state, data, rootState) {
      return state.text + rootState.count
    }
  },
  actions: {
    updateTextAsync (state, data) {
      setTimeout(_ => {
        state.commit('updateText', data)
      }, data.time)
    }
  }
}
