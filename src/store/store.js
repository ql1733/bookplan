import state from './state.js'
import mutations from './mutation.js'
import actions from './action.js'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions
})
