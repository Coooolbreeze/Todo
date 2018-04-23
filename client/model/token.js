import axios from 'axios'
import config from './config'
import notify from '../components/notification/function'
import bus from '../util/bus'

let timestramp = Date.parse(new Date()) / 1000

export default {
  get (key = 'access_token') {
    const token = JSON.parse(window.localStorage.getItem('token'))
    if (!token) {
      return ''
    }
    if (key === 'access_token') {
      return token.expire_in > timestramp ? token.access_token : ''
    } else {
      return token[key]
    }
  },
  set (data) {
    data.expire_in = parseInt(data.expire_in) + parseInt(timestramp)
    window.localStorage.setItem('token', JSON.stringify(data))
  },
  delete () {
    window.localStorage.removeItem('token')
  },
  refresh () {
    return new Promise((resolve, reject) => {
      axios({
        baseURL: config.baseURL,
        url: '/refresh',
        headers: { token: this.get('refresh_token') },
        method: 'POST'
      }).then(resp => {
        this.set(resp.data.data)
        resolve()
      }).catch(err => {
        if (err.response.status === 401) {
          this.delete()
          notify({
            content: '登录已失效，请重新登录'
          })
          bus.$emit('auth')
        }
      })
    })
  }
}
