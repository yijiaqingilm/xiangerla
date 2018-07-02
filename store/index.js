import Vue from 'vue'
import Vuex from 'vuex'
import clientMiddleware from '../lib/clientMiddleware'
import ApiClient from '../lib/client'
import * as sysUsers from './modules/sysUsers'
import * as users from './modules/users'
import * as shop from './modules/shop'
import * as order from './modules/order'

Vue.use(Vuex)
const store = new Vuex.Store({
  /* actions,*/
  state: {
    userInfo: {name: 'test'}
  },
  mutations: {},
  actions: {},
  modules: {sysUsers, users, shop, order}
})
let client = new ApiClient()
let applyClientMiddleware = clientMiddleware(client)(store.commit)
export { applyClientMiddleware }
const createStore = () => store
export default createStore
