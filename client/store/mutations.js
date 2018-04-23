export default {
  fillTodos (state, todos) {
    state.todos = todos.data
  },
  addTodo (state, todo) {
    state.todos.unshift(todo)
  },
  updateTodo (state, todo) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === todo.id),
      1,
      todo
    )
  },
  deleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1
    )
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.completed)
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
