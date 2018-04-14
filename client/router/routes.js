import TheTodo from '../components/TheTodo.vue'
import TheLogin from '../components/TheLogin.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: TheTodo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'todo,other'
    }
  },
  {
    path: '/login',
    component: TheLogin
  }
]
