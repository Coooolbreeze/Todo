import axios from 'axios'
import config from './config'

const request = axios.create({
  baseURL: config.baseURL
})

const handleRequest = (url, { token }) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'GET',
      headers: { token }
    }).then(resp => {
      resolve(resp.data.data)
    }).catch(err => {
      const resp = err.response
      reject(resp)
    })
  })
}

export default {
  getAllTodos ({ token }) {
    return handleRequest('/todos', { token })
  }
}
