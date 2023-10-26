import axios from 'axios'
import { showNotify } from 'vant'
import * as qs from 'qs'
import 'vant/es/notify/style'
import '@/assets/css/reset.css'
import Cookies from 'js-cookie'

// 创建请求实例
const instance = axios.create({
  withCredentials: true, // 跨域请求 允许携带cookie
  timeout: 6000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers['openId'] = localStorage.getItem('openId')
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return config
  },
  (error) => {
    console.error('request:', error) 
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    let res = {}
    if (response.config.userHeader) {
      res = response
    } else {
      res = response.data
    }
    const statusCode = response.statusCode
    // 自定义状态码
    if (statusCode !== 200) {
      if (statusCode === 403) {
        showNotify({ type: 'danger', message: res.data.msg || '权限不足' })
      } else if (statusCode === 401) {
        showNotify({ type: 'danger', message: res.msg || '授权失败' })
      } else if ((statusCode === 500) | (statusCode === 400)) {
        showNotify({ type: 'danger', message: res.data.msg || 'Error' })
        return res
      } else {
        return res
      }
    } else {
      return res
    }
  },
  (error) => {
    // 处理response的错误
    console.error('response:', error) // for debug
    if (error.response && error.response.status === 500) {
      showNotify({ type: 'danger', message: error.response.data.msg })
    } else if (error.response && error.response.status === 401) {
      showNotify({ type: 'danger', message: '授权失败' })
      localStorage.removeItem('openId')
      Cookies.remove('openId')
    } else {
      showNotify({ type: 'danger', message: error.response.data.msg || error.msg })
    }
    return Promise.reject(error)
  }
)
export default instance
