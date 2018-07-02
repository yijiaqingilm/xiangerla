import api from '../../api/api'
import { isEmptyObject, margeMutations } from '../../lib/utils'
import { globalConst as native, mutationNames, pageSize as size } from '../../lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from '../index'

let state = {
  orderList: [],
  order: {}
}
let actions = {
  [native.doSysOrderOfflinePay] ({state}, refs) {
    return applyClientMiddleware(api.doSysOrderOfflinePay)(refs)
  },
  [native.doSysOrderList] ({state}, refs) {
    return applyClientMiddleware(api.doSysOrderList)(refs)
  },
  [native.doSysOrderInfo] ({state}, refs) {
    let orderId = refs.orderId
    if (!state.order[orderId]) {
      return applyClientMiddleware(api.doSysOrderInfo)(refs)
    }
  },
  [native.doSysOrderAdd] ({state}, refs) {
    return applyClientMiddleware(api.doSysOrderAdd)(refs)
  },
  [native.doSysOrderEdit] ({state}, refs) {
    return applyClientMiddleware(api.doSysOrderEdit)(refs)
  },

}
let mutations = {
  [mutationNames.doSysOrderOfflinePay_success] (state, {data}) {
  },
  [mutationNames.doSysOrderList_success] (state, {data}) {
    state.orderList = data
  },
  [mutationNames.doSysOrderInfo_success] (state, {data, refs}) {
    let orderId = refs.orderId
    Vue.set(state.order, orderId, data)
  },
  [mutationNames.doSysOrderAdd_success] (state, {data}) {
  },
  [mutationNames.doSysOrderEdit_success] (state, {data}) {
  }
}
mutations = Object.assign(margeMutations(actions), mutations)

export {
  state,
  actions,
  mutations
}
