import Util from '../../util/common'
import * as types from '../types'

const state = {
  allCount: 0,
  allPrice: 0,
  cartList: [],
  cartData: {},
  sureFee: 0.0,
  totalFee: 0.0,
  deliveryTime: '',
  getType: '1'
}

const mutations = {
  [types.CHANGE_CART_ALLCOUNT](state, res) {
    state.allCount = res
  },
  [types.CHANGE_CART_ALLPRICE](state, res) {
    state.allPrice = res
  },
  [types.CHANGE_CART_LIST](state, res) {
    state.cartList = res
  },
  [types.CHANGE_CART_DATA](state, res) {
    state.cartData = res
  },
  [types.CHANGE_CART_SUREFREE](state, res) {
    state.sureFee = res
  },
  [types.CHANGE_CART_TOTALFREE](state, res) {
    state.totalFee = res
  },
  [types.CHANGE_CART_TIME](state, res) {
    state.deliveryTime = res
  },
  [types.CHANGE_CART_GETTYPE](state, res) {
    state.getType = res
  },
}

const getters = {

  getCartAllCount(state) {
    let count = 0;
    state.cartList.forEach(element => {
      element.cartList.forEach(element2 => {
        count += element2.quantity;
      })
    });
    return count
  },
  getCartAllPrice(state) {
    let price = 0;
    state.cartList.forEach(element => {
      element.cartList.forEach(element2 => {
        price += element2.discountPrice * element2.quantity;
      })
    });

    return price.toFixed(2)
  },


}


export default {
  state,
  mutations,
  getters
}
