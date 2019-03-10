import Util from '../../util/common'
import * as types from '../types'

const state = {
  user: {
    "userId": 0,
    "username": "",
    "mobile": "",
    "password": null,
    "nickname": "",
    "money": '',
    "openId": "",
    "headimgurl": "",
    "type": null,
    "createTime": null,
    "id": '',
    "idCard": '',
    "sex": '',
    "realname": ''

  },
  shop: {
    "shopId": 2,
    "createDate": null,
    "updateDate": null,
    "delFlag": "1",
    "remarks": "1",
    "ownerId": 2,
    "userName": "张明",
    "shopName": "张明家的店",
    "distance": null,
    "shopLogo": "http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg",
    "address": "广州黄埔",
    "longitude": 1,
    "latitude": 1,
    "phone": "13570412412",
    "telephone": "020-88545852",
    "businessTime": "早上10点至晚上22点",
    "shopService": 1,
    "drugLicensing": "1",
    "businessLicense": "1",
    "drugQuality": "1",
    "otherQualifications": "1",
    "isClosed": 0
  },
  isShop: false,
  messageCount: {
    all: 0,
    count1: 0,
    count2: 0,
    count3: 0,
  }
}

const mutations = {
  [types.CHANGE_USER_INFO](state, res) {
    state.user = res
  },
  [types.CHANGE_USER_ISSHOP](state, res) {
    state.isShop = res
  },
  [types.CHANGE_USER_SHOP](state, res) {
    state.shop = res
  },
  [types.CHANGE_USER_MESSAGECOUNT](state, res) {
    state.messageCount = res
  }
}


export default {
  state,
  mutations
}
