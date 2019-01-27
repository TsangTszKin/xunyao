import Util from '../../util/common'
import * as types from '../types'

const state = {
  user: {
    "userId": 0,
    "username": "",
    "mobile": "",
    "password": null,
    "nickname": "",
    "money": 0,
    "openId": "",
    "headimgurl": "",
    "type": null,
    "createTime": null
  }
}

const mutations = {
  [types.CHANGE_USER_INFO](state, res) {
    state.user = res
  }
}


export default {
  state,
  mutations
}
