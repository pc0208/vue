/**
 * 整个项目通用得ajax请求函数封装
 * 憨八龟 2019-09-11
 */
// 引入axios和qs
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import local from '@/utils/local.js'

// 封装通用的请求url
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 请求拦截器【请求发送出去之前】
axios.interceptors.request.use((config) => {
  // 取出令牌【token】
  let token = local.get('tok') || ""
  if (token) {
    // 挂在请求头上
    config.headers.Authorization = token;
  }
  return config
}, (err) => {
  Promise.reject(err)
})

// 响应拦截器【后端响应数据，接收到之前】
axios.interceptors.response.use((response) => {
  let res = response && response.data;

  // 判断返回的数据要包含 code 字段 和 msg 字段
  if (res.hasOwnProperty('code') && res.hasOwnProperty('msg')) {
    let { code, msg } = res; // 获取code 和 msg的值
    // 如果等于0 代表成功
    if (code === 0) {
      Message({
        type: 'success',
        message: msg,
      })
    } else if (code === 1) {
      // 否则 代表失败
      Message.error(msg)
    }
  }

  return response
}, (err) => {
  Promise.reject(err)
})


//封装通用得get请求和post请求
const request = {
  get(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: data
      }).then(response => {
        resolve(response.data)//成功数据
      }).catch(err => {
        reject(err)//失败
      })
    })
  },
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(data)).then(response => {
        resolve(response.data) // 成功的数据
      }).catch(err => {
        reject(err) // 失败
      })
    })
  }
}
//暴露出去
export default request

 // 之后 在其他文件 引入使用+
// request.get('/users/checkLogin', { acc: 'admin', pwd: '666' }).then(res => {
// })
// let res = await request.post('/users/checkLogin', { acc: 'admin', pwd: '666' })