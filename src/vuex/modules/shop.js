import Util from '../../util/common'
import * as types from '../types'

const state = {
  selectCate: {
    id: '',
    name: ''
  }
}

const mutations = {
  [types.CHANGE_SHOP_SELECT_CATE](state, res) {
    state.selectCate = res
  }
}


export default {
  state,
  mutations
}
