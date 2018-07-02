const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const REQUEST = 'REQUEST'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  doSysCheckInInfo: 'doSysCheckInInfo',
  doSysCheckVip: 'doSysCheckVip',
  doSysGetCode: 'doSysGetCode',
  doSysUserList: 'doSysUserList',
  doSysUserAdd: 'doSysUserAdd',
  doSysUserEdit: 'doSysUserEdit',
  doSysUserInfo: 'doSysUserInfo',
  doSysUserSeach: 'doSysUserSeach',
  doSysUserDel: 'doSysUserDel',
  doSysRuleList: 'doSysRuleList',
  doSysRuleAdd: 'doSysRuleAdd',
  doSysRuleEdit: 'doSysRuleEdit',
  doSysRuleGetChildren: 'doSysRuleGetChildren',
  doSysRuleDel: 'doSysRuleDel',
  doSysRoleAdd: 'doSysRoleAdd',
  doSysRoleEdit: 'doSysRoleEdit',
  doSysRoleList: 'doSysRoleList',
  doSysRoleInfo: 'doSysRoleInfo',
  doSysRuleInfo: 'doSysRuleInfo',
  doSysRuleSeach: 'doSysRuleSeach',
  doSysLogin: 'doSysLogin',
  doUserList: 'doUserList',
  doUserAdd: 'doUserAdd',
  doUserEdit: 'doUserEdit',
  doUserInfo: 'doUserInfo',
  doUserSearch: 'doUserSearch',

  doSysCatalogsList: 'doSysCatalogsList',
  doSysCatalogsAdd: 'doSysCatalogsAdd',
  doSysCatalogsEdit: 'doSysCatalogsEdit',
  doSysCatalogsInfo: 'doSysCatalogsInfo',
  doSysCatalogsAll: 'doSysCatalogsAll',
  doSysCatalogsAllJoinGoods: 'doSysCatalogsAllJoinGoods',
  doSysGoodsList: 'doSysGoodsList',
  doSysGoodsAdd: 'doSysGoodsAdd',
  doSysGoodsEdit: 'doSysGoodsEdit',
  doSysGoodsInfo: 'doSysGoodsInfo',
  doSysGoodsAll: 'doSysGoodsAll',

  doSysComboList: 'doSysComboList',
  doSysComboAdd: 'doSysComboAdd',
  doSysComboEdit: 'doSysComboEdit',
  doSysComboInfo: 'doSysComboInfo',
  doSysComboListAll: 'doSysComboListAll',

  doSysOrderList: 'doSysOrderList',
  doSysOrderAdd: 'doSysOrderAdd',
  doSysOrderEdit: 'doSysOrderEdit',
  doSysOrderInfo: 'doSysOrderInfo',
  doSysOrderOfflinePay: 'doSysOrderOfflinePay'
}
let methods = [SUCCESS.toLowerCase(), FAILURE.toLowerCase(), REQUEST.toLowerCase()]
const mutationNames = {}
for (let actionName in globalConst) {
  if (globalConst.hasOwnProperty(actionName)) {
    methods.forEach((method) => {
      if (!mutationNames[`${actionName}_${method}`]) {
        mutationNames[`${actionName}_${method}`] = `${actionName}_${method}`
      }
    })
  }
}
const pageSize = 10
const orderStatus = {
  pay: 1,
  noPay: 0,
}
const orderStatusInfo = {
  [orderStatus.pay]: {name: '已支付', status: 'success'},
  [orderStatus.noPay]: {name: '未支付', 'status': 'danger'}
}
const orderPayType = {
  wx: 0,
  cash: 1
}

export {
  orderStatusInfo,
  globalConst,
  modalTitle,
  pageSize,
  SUCCESS,
  FAILURE,
  REQUEST,
  ERROR_UNAUTHORIZED,
  mutationNames,
  orderStatus,
  orderPayType
}
