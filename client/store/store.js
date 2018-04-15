import Vuex from 'vuex'

import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import text from './modules/text/store'

const isDev = process.env.NODE_ENV === 'development'

export default _ => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      text: text
    }
  })

  if (module.hot) {
    module.hot.accept([
      './state',
      './mutations',
      './getters',
      './actions',
      './modules/text/store'
    ], _ => {
      const newState = require('./state').default
      const newMutations = require('./mutations').default
      const newGetters = require('./getters').default
      const newActions = require('./actions').default
      const newText = require('./modules/text/store').default

      store.hotUpdate({
        state: newState,
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
