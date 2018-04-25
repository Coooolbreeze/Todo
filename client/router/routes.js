export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: _ => import(/* webpackChunkName: "todo-view" */'../components/TheTodo.vue'),
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'todo,other'
    }
  },
  {
    path: '/login',
    component: _ => import(/* webpackChunkName: "login-view" */'../components/TheLogin.vue')
  }
]
