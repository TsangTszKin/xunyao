import Util from '../../util/common'
import * as types from '../types'

const state = {
  listType: 1
}

const mutations = {
  [types.CHANGE_GOODSLIST_SHOWTYPE](state, res) {
    state.listType = res
  }
}


export default {
  state,
  mutations
}
