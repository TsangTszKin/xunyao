//store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 头部分类
import detail from './modules/detail'
import category from './modules/category'
import login from './modules/login'
import shop from './modules/shop'
import user from './modules/user'
import goods from './modules/goods'
import cart from './modules/cart'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    category,
    login,
    shop,
    user,
    goods,
    cart
  }
})
