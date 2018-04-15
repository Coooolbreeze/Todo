import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default _ => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      text: {
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
    }
  })
}
