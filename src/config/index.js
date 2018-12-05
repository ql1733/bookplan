/* eslint-disable */
import { devConfig } from './dev'
import { prodConfig } from './prod'
export const httpConfig = {
    withCredentials: true,
    timeout: 1000 * 60
}
export const defaultConfig = (process.env.NODE_ENV === 'production' ? prodConfig : devConfig)