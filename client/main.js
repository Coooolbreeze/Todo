import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import './assets/styles/global.styl'
import createRouter from './router/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
