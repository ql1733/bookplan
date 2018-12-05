import http, { fetch } from './http'
import { httpConfig, defaultConfig } from '../config/index'
import { merge } from 'lodash'

let config = merge({}, httpConfig, defaultConfig.dataService)
let httpInstance = http.newInstance()

function post (url, data) {
  return fetch(httpInstance, config, url, data)
}
export default {
  post
}
