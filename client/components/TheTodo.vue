<template>
  <section :class="$style.todo">
    <div :class="$style['tab-container']">
      <tabs
        :value="filter"
        @change="handleChangeTab"
      >
        <tab
          v-for="tab in states"
          :key="tab"
          :label="tab"
          :index="tab"
        />
      </tabs>
    </div>
    <input
      type="text"
      :class="$style.add"
      placeholder="接下去做什么？"
      autofocus
      @keyup.enter="handleAdd"
    >
    <todo-item
      v-for="todo in filteredTodos"
      :todo="todo"
      :key="todo.id"
      @del="deleteTodo"
      @toggle="toggleTodoState"
    />
    <todo-helper
      :filter="filter"
      :todos="todos"
      @clearAllCompleted="deleteAllCompleted"
    />
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import TodoItem from './TodoItem.vue'
import TodoHelper from './TodoHelper.vue'

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  mounted () {
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  asyncData ({ store, router }) {
    if (store.state.token) {
      return store.dispatch('fetchTodos')
    }
    if (!store.state.refresh_token) {
      router.replace('/login')
    }
    return Promise.resolve()
  },
  data () {
    return {
      filter: 'all',
      states: ['all', 'active', 'completed']
    }
  },
  components: {
    TodoItem,
    TodoHelper
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') return this.todos
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  methods: {
    ...mapMutations(['saveToken']),
    ...mapActions(['fetchTodos', 'addTodo', 'updateTodo', 'deleteTodo', 'deleteAllCompleted']),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    handleChangeTab (value) {
      this.filter = value
    }
  }
}
</script>

<style lang="stylus" module>
.todo {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666666;
}

.add {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0);
  box-sizing: border-box;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.06);
}

.tab-container {
  background-color: #ffffff;
  padding: 0 15px;
}
</style>
