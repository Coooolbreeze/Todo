// import model from '../model/client-model'
import model from 'model'
import notify from '../components/notification/function'
import Token from '../model/token'

export default {
  login ({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          Token.set(data)
          notify({
            content: '登录成功'
          })
          resolve()
        })
    })
  },
  fetchTodos ({ commit, state }) {
    return model.getAllTodos({ token: state.token })
      .then(data => {
        commit('fillTodos', data)
      }).catch(resp => {
        console.log(resp)
      })
  },
  addTodo ({ commit }, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({
          content: '你又多了一件事要做'
        })
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', data)
        notify({
          content: '是完成了还是重新开始呢'
        })
      })
  },
  deleteTodo ({ commit }, id) {
    model.deleteTodo(id)
      .then(_ => {
        commit('deleteTodo', id)
        notify({
          content: '删除了一件事，是完成了吗'
        })
      })
  },
  deleteAllCompleted ({ commit, state }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    if (ids.length < 1) {
      notify({
        content: '还没有已完成的事情哦'
      })
      return
    }
    model.batchDeleteTodos(ids)
      .then(data => {
        commit('deleteAllCompleted')
        notify({
          content: '已完成的事就不要占地方了'
        })
      })
  }
}
