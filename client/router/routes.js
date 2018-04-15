export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: _ => import('../components/TheTodo.vue'),
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'todo,other'
    }
  },
  {
    path: '/login',
    component: _ => import('../components/TheLogin.vue')
  }
]
