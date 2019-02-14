import Util from '../../util/common'
import * as types from '../types'

const state = {
  selectCate: {
    id: '',
    name: ''
  },
  goodsList: []
}

const mutations = {
  [types.CHANGE_SHOP_SELECT_CATE](state, res) {
    state.selectCate = res
  },
  [types.CHANGE_GOODSLIST_BY_SHOPANDCATE](state, res) {
    state.goodsList = res
  },
}


export default {
  state,
  mutations
}
