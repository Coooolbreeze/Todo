export default {
  updateCountAsync (store, data) {
    setTimeout(_ => {
      store.commit('updateCount', data)
    }, data.time)
  }
}
