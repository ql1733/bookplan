// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router,{navRouter} from './router'
import 'font-awesome/css/font-awesome.css'
import ECharts from 'vue-echarts/components/Echarts.vue'
import './assets/css/element-variables.scss'
import './assets/css/common.scss'
import ElementUI from 'element-ui'
import getData from './lib/index'
import getImg from './lib/down'
import store from './store/store.js'
import {sync} from 'vuex-router-sync'
// import io from 'socket.io-client'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(ECharts)
Window.ECharts = ECharts
Vue.component('chart', ECharts)
Vue.prototype.axois = getData
Vue.prototype.getUrl = getImg
Vue.prototype.url = 111
sync(store, router)
// eslint-disable-next-line no-labels

navRouter()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
