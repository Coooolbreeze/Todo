import createApp from './create-app'
import bus from './util/bus'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('auth', _ => {
  router.push('/login')
})

router.onReady(_ => {
  app.$mount('#root')
})
