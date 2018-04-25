import axios from 'axios'
import config from './config'
import notify from '../components/notification/function'
import bus from '../util/bus'

const setCookie = (name, value, expires) => {
  let exp = new Date()
  exp.setTime(exp.getTime() + expires * 1000)
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
}

const getCookie = name => {
  if (!document.cookie) return ''
  let start = document.cookie.indexOf(name + '=')
  if (start === -1) return ''
  start = start + name.length + 1
  let end = document.cookie.indexOf(';', start)
  if (end === -1) end = document.cookie.length
  return document.cookie.substring(start, end)
}

const delCookie = name => {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`
}

export default {
  get (name = 'access_token') {
    return getCookie(name)
  },
  set (data) {
    setCookie('access_token', data.access_token, data.expire_in)
    setCookie('refresh_token', data.refresh_token, data.expire_in * 10)
  },
  delete () {
    delCookie('access_token')
    delCookie('refresh_token')
  },
  refresh () {
    return new Promise((resolve, reject) => {
      let token = this.get('refresh_token')
      if (!token) return bus.$emit('auth')
      axios({
        baseURL: config.baseURL,
        url: '/refresh',
        headers: { token },
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
