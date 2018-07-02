import api from '../../api/api'
import { isEmptyObject, margeMutations } from '../../lib/utils'
import { globalConst as native, mutationNames, pageSize as size } from '../../lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from '../index'

let state = {
  goodsAll: [],
  catalogsAll: [],
  catalogsList: [],
  catalogs: {},
  goodsList: [],
  goods: {},
  comboList: [],
  combo: {},
  catalogsAllJoinGoods: [],
  comboAll: []
}
let actions = {
  [native.doSysGoodsAll] ({state}, refs) {
    return applyClientMiddleware(api.doSysGoodsAll)(refs)
  },
  [native.doSysCatalogsAll] ({state}, refs) {
    return applyClientMiddleware(api.doSysCatalogsAll)(refs)
  },
  [native.doSysCatalogsAllJoinGoods] ({state}, refs) {
    return applyClientMiddleware(api.doSysCatalogsAllJoinGoods)(refs)
  },
  [native.doSysCatalogsList] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doSysCatalogsList)(refs)
  },
  [native.doSysCatalogsInfo] ({state}, refs) {
    let catalogsId = refs.catalogsId
    if (!state.catalogs[catalogsId]) {
      return applyClientMiddleware(api.doSysCatalogsInfo)(refs)
    }
  },
  [native.doSysCatalogsAdd] ({state}, refs) {
    return applyClientMiddleware(api.doSysCatalogsAdd)(refs)
  },
  [native.doSysCatalogsEdit] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doSysCatalogsEdit)(refs)
  },

  [native.doSysGoodsList] ({state}, refs) {
    return applyClientMiddleware(api.doSysGoodsList)(refs)
  },
  [native.doSysGoodsInfo] ({state}, refs) {
    let goodsId = refs.goodsId
    if (!state.goods[goodsId]) {
      return applyClientMiddleware(api.doSysGoodsInfo)(refs)
    }
  },
  [native.doSysGoodsAdd] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doSysGoodsAdd)(refs)
  },
  [native.doSysGoodsEdit] ({state}, refs) {
    console.log('refs', refs)
    return applyClientMiddleware(api.doSysGoodsEdit)(refs)
  },

  [native.doSysComboListAll] ({state}, refs) {
    return applyClientMiddleware(api.doSysComboListAll)(refs)
  },
  [native.doSysComboList] ({state}, refs) {
    return applyClientMiddleware(api.doSysComboList)(refs)
  },
  [native.doSysComboInfo] ({state}, refs) {
    let comboId = refs.comboId
    if (!state.goods[comboId]) {
      return applyClientMiddleware(api.doSysComboInfo)(refs)
    }
  },
  [native.doSysComboAdd] ({state}, refs) {
    return applyClientMiddleware(api.doSysComboAdd)(refs)
  },
  [native.doSysComboEdit] ({state}, refs) {
    return applyClientMiddleware(api.doSysComboEdit)(refs)
  },
}
let mutations = {
  [mutationNames.doSysGoodsAll_success] (state, {data}) {
    state.goodsAll = data
  },

  [mutationNames.doSysCatalogsAll_success] (state, {data}) {
    state.catalogsAll = data
  },
  [mutationNames.doSysCatalogsAllJoinGoods_success] (state, {data}) {
    state.catalogsAllJoinGoods = data
  },
  [mutationNames.doSysCatalogsList_success] (state, {data}) {
    state.catalogsList = data
  },
  [mutationNames.doSysCatalogsInfo_success] (state, {data, refs}) {
    let catalogsId = refs.catalogsId
    Vue.set(state.catalogs, catalogsId, data)
  },
  [mutationNames.doSysCatalogsAdd_success] (state, {data}) {
  },
  [mutationNames.doSysCatalogsEdit_success] (state, {data}) {
  },

  [mutationNames.doSysGoodsList_success] (state, {data}) {
    state.goodsList = data
  },
  [mutationNames.doSysGoodsInfo_success] (state, {data, refs}) {
    let goodsId = refs.goodsId
    Vue.set(state.goods, goodsId, data)
  },
  [mutationNames.doSysGoodsAdd_success] (state, {data}) {
  },
  [mutationNames.doSysGoodsEdit_success] (state, {data}) {
  },
  [mutationNames.doSysComboList_success] (state, {data}) {
    state.comboList = data
  },
  [mutationNames.doSysComboListAll_success] (state, {data}) {
    state.comboListAll = data
  },
  [mutationNames.doSysComboInfo_success] (state, {data, refs}) {
    let comboId = refs.comboId
    Vue.set(state.combo, comboId, data)
  },
  [mutationNames.doSysComboAdd_success] (state, {data}) {
  },
  [mutationNames.doSysComboEdit_success] (state, {data}) {
  }
}
mutations = Object.assign(margeMutations(actions), mutations)

export {
  state,
  actions,
  mutations
}
