import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import text from './modules/text'

const isDev = process.env.NODE_ENV === 'development'

const state = {
  token: null,
  refresh_token: null,
  todos: []
}

export default _ => {
  const store = new Vuex.Store({
    strict: isDev,
    state,
    mutations,
    getters,
    actions,
    modules: {
      text
    }
  })

  if (module.hot) {
    module.hot.accept([
      './mutations',
      './getters',
      './actions',
      './modules/text'
    ], _ => {
      const newMutations = require('./mutations').default
      const newGetters = require('./getters').default
      const newActions = require('./actions').default
      const newText = require('./modules/text').default

      store.hotUpdate({
        mutations: newMutations,
        getters: newGetters,
        actions: newActions,
        modules: {
          text: newText
        }
      })
    })
  }

  return store
}
