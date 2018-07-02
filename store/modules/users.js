import api from '../../api/api'
import { isEmptyObject, margeMutations } from '../../lib/utils'
import { globalConst as native, mutationNames, pageSize as size } from '../../lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from '../index'

let state = {
  user: {},
  userList: {
    data: [],
    total: 0
  },
}
let actions = {
  [native.doUserSearch] ({state}, refs) {
    return applyClientMiddleware(api.doUserSearch)(refs)
  },
  [native.doUserList] ({state}, refs) {
    return applyClientMiddleware(api.doUserList)(refs)
  },
  [native.doUserInfo] ({state}, refs) {
    let userId = refs.userId
    if (!state.user[userId]) {
      return applyClientMiddleware(api.doUserInfo)(refs)
    }
  },
  [native.doUserAdd] ({state}, refs) {
    return applyClientMiddleware(api.doUserAdd)(refs)
  },
  [native.doUserEdit] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doUserEdit)(refs)
  },
}
let mutations = {

  [mutationNames.doUserSearch_success] (state, {data}) {
  },
  [mutationNames.doUserList_success] (state, {data}) {
    state.userList = data
  },
  [mutationNames.doUserInfo_success] (state, {data, refs}) {
    let userId = refs.userId
    state.user[userId] = data
  },
  [mutationNames.doUserAdd_success] (state, {data}) {
  },
  [mutationNames.doUserEdit_success] (state, {data}) {
  }
}
mutations = Object.assign(margeMutations(actions), mutations)

export {
  state,
  actions,
  mutations
}
