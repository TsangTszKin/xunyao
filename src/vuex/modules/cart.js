import Util from '../../util/common'
import * as types from '../types'

const state = {
  allCount: 0,
  allPrice: 0,
  cartList: []
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
}

const getters = {

  getCartAllCount(state) {
    let count = 0;
    state.cartList.forEach(element => {
      element.productList.forEach(element2 => {
        count += element2.count;
      })
    });
    return count
  },
  getCartAllPrice(state) {
    let price = 0;
    state.cartList.forEach(element => {
      element.productList.forEach(element2 => {
        price += element2.price * element2.count;
      })
    });
    return price
  }

}


export default {
  state,
  mutations,
  getters
}
