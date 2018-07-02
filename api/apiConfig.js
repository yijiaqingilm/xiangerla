import { globalConst as native } from 'lib/const'

class ApiConfig {
  constructor (name, url, config, method = 'post') {
    this.name = name
    this.url = url
    this.method = method
    if (config && typeof config === 'object') {
      this.config = config
      this.method = method
    } else if (config && typeof config === 'string') {
      this.method = config
    } else {
      this.config = {}
    }

  }
}

let apiConfig = [
  new ApiConfig(native.doSysCheckInInfo, '/api/sys/room/checkInInfo'),
  new ApiConfig(native.doSysCheckVip, '/api/sys/user/checkVip'),
  new ApiConfig(native.doSysGetCode, '/api/sys/getCode'),
  new ApiConfig(native.doSysLogin, '/api/sys/login'),
  new ApiConfig(native.doSysUserList, '/api/sys/user/list'),
  new ApiConfig(native.doSysUserAdd, '/api/sys/user/add'),
  new ApiConfig(native.doSysUserDel, '/api/sys/user/del'),
  new ApiConfig(native.doSysUserEdit, '/api/sys/user/edit'),
  new ApiConfig(native.doSysUserInfo, '/api/sys/user/info'),
  new ApiConfig(native.doSysUserSeach, '/api/sys/user/search'),
  new ApiConfig(native.doSysRuleList, '/api/sys/menu/list'),
  new ApiConfig(native.doSysRuleInfo, '/api/sys/menu/info'),
  new ApiConfig(native.doSysRuleAdd, '/api/sys/menu/add'),
  new ApiConfig(native.doSysRuleEdit, '/api/sys/menu/edit'),
  new ApiConfig(native.doSysRuleDel, '/api/sys/menu/del'),
  new ApiConfig(native.doSysRuleSeach, '/api/sys/menu/seach'),
  new ApiConfig(native.doSysRuleGetChildren, '/api/sys/rule/getChildren'),
  new ApiConfig(native.doSysRoleAdd, '/api/sys/role/add'),
  new ApiConfig(native.doSysRoleList, '/api/sys/role/list'),
  new ApiConfig(native.doSysRoleInfo, '/api/sys/role/info'),
  new ApiConfig(native.doSysRoleEdit, '/api/sys/role/edit'),

  new ApiConfig(native.doUserList, '/api/sys/user/list'),
  new ApiConfig(native.doUserAdd, '/api/sys/user/add'),
  new ApiConfig(native.doUserEdit, '/api/sys/user/set'),
  new ApiConfig(native.doUserInfo, '/api/sys/user/info'),
  new ApiConfig(native.doUserSearch, '/api/sys/user/search'),

  new ApiConfig(native.doSysCatalogsList, '/api/sys/shop/catalogs/list'),
  new ApiConfig(native.doSysCatalogsAdd, '/api/sys/shop/catalogs/add'),
  new ApiConfig(native.doSysCatalogsEdit, '/api/sys/shop/catalogs/set'),
  new ApiConfig(native.doSysCatalogsInfo, '/api/sys/shop/catalogs/info'),
  new ApiConfig(native.doSysCatalogsAll, '/api/sys/shop/catalogs/all'),
  new ApiConfig(native.doSysCatalogsAllJoinGoods, '/api/sys/shop/catalogs/allJoinGoods'),

  new ApiConfig(native.doSysGoodsList, '/api/sys/shop/goods/list'),
  new ApiConfig(native.doSysGoodsAdd, '/api/sys/shop/goods/add'),
  new ApiConfig(native.doSysGoodsEdit, '/api/sys/shop/goods/set'),
  new ApiConfig(native.doSysGoodsInfo, '/api/sys/shop/goods/info'),
  new ApiConfig(native.doSysGoodsAll, '/api/sys/shop/goods/all'),

  new ApiConfig(native.doSysComboList, '/api/sys/shop/combo/list'),
  new ApiConfig(native.doSysComboAdd, '/api/sys/shop/combo/add'),
  new ApiConfig(native.doSysComboEdit, '/api/sys/shop/combo/set'),
  new ApiConfig(native.doSysComboInfo, '/api/sys/shop/combo/info'),
  new ApiConfig(native.doSysComboListAll, '/api/sys/shop/combo/all'),

  new ApiConfig(native.doSysOrderList, '/api/sys/order/list'),
  new ApiConfig(native.doSysOrderAdd, '/api/sys/order/add'),
  new ApiConfig(native.doSysOrderEdit, '/api/sys/order/set'),
  new ApiConfig(native.doSysOrderInfo, '/api/sys/order/info'),
  new ApiConfig(native.doSysOrderOfflinePay, '/api/sys/order/offlinePay')
]
export default apiConfig
