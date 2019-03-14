import Util from '../../util/common'
import * as types from '../types'

const state = {
  selectCate: {
    id: '',
    className: ''
  },
  goodsList: [],
  nearbyShopList: []
}

const mutations = {
  [types.CHANGE_SHOP_SELECT_CATE](state, res) {
    state.selectCate = res
  },
  [types.CHANGE_GOODSLIST_BY_SHOPANDCATE](state, res) {
    state.goodsList = res
  },
  [types.CHANGE_HOME_NEARBYSHOPLIST](state, res) {
    state.nearbyShopList = res
  },
}


export default {
  state,
  mutations
}
