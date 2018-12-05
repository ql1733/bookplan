import axios from 'axios'

let reqMap = {}

function newInstance () {
  let http = axios.create()
  http.reqMap = {}
  // request拦截器
  http.interceptors.request.use((config) => {
    // let data = { args: encodeURIComponent(JSON.stringify(config.data || '{}')) }
    // config.data = data
    return config
  }, (err) => {
    return Promise.reject(err)
  })
  // response拦截器
  http.interceptors.response.use((res) => {
    let data = res.data
    if (typeof data === 'string') {
      data = JSON.parse(data.replace(/\\/g, ''))
    }
    return res
  }, (err) => {
    return Promise.reject(err)
  })
  return http
}

export function fetch (http, config, url, data) {
  let key = `POST${URL}${JSON.stringify(data)}`
  if (http.reqMap[key]) {
    return Promise.reject(new Error('request repeat'))
  }
  reqMap[key] = 1
  return http.post(config.baseURL + url, data, config)
    .then(res => {
      delete reqMap[key]
      return res
    }, err => {
      delete reqMap[key]
      return err
    })
}
export default { newInstance }
