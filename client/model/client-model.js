import axios from 'axios'
import config from './config'
import token from './token'
import notify from '../components/notification/function'
import loading from '../components/loading/function'

const request = axios.create({
  baseURL: config.baseURL
})

const handleRequest = config => {
  typeof config === 'string' && (config = {url: config})
  return new Promise((resolve, reject) => {
    const close = loading()
    request({
      url: config.url,
      method: config.method ? config.method : 'GET',
      headers: { token: token.get() },
      data: config.data
    }).then(resp => {
      close()
      resolve(resp.data.data)
    }).catch(err => {
      close()
      const resp = err.response
      if (resp.status === 401) {
        token.refresh().then(_ => {
          resolve(handleRequest(config))
        })
      } else {
        console.log('--------------------', resp)
        notify({
          content: resp.data.message
        })
        reject(resp)
      }
    })
  })
}

export default {
  login (username, password) {
    return handleRequest({
      url: '/login',
      method: 'POST',
      data: { username, password }
    })
  },
  getMyInfo () {
    return handleRequest('users/self')
  },
  getAllTodos () {
    return handleRequest('/todos')
  },
  createTodo (todo) {
    return handleRequest({
      url: '/todos',
      method: 'POST',
      data: todo
    })
  },
  updateTodo (id, todo) {
    return handleRequest({
      url: `/todos/${id}`,
      method: 'PUT',
      data: todo
    })
  },
  deleteTodo (id) {
    return handleRequest({
      url: `/todos/${id}`,
      method: 'DELETE'
    })
  },
  batchDeleteTodos (ids) {
    return handleRequest({
      url: '/batch/todos',
      method: 'DELETE',
      data: { ids }
    })
  }
}
