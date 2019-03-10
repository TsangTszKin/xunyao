// @ts-nocheck
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from '@/vuex/store.js';  //vuex
import api from '@/http/api.js';       //http请求
import axios from 'axios';
import authService from '@/api/authService.js'
import userService from '@/api/userService.js'
import less from 'less';
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css';
import '@/assets/index.less'
import common from '@/util/common';
import Vconsole from 'vconsole';
// export default new Vconsole()
Vue.use(Mint);
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;


// 用钩子函数beforeEach()对路由进行判断

router.beforeEach((to, from, next) => {
  let token = to.query.token;
  if (token) {
    store.commit('CHANGE_TOKEN', token);
    localStorage.token = token;
  }
  if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
    if (localStorage.token) {  // 通过vuex state获取当前的token是否存在
      next();
      if (!localStorage.user) {
        getMyInfo();
      }

    } else {    //如果没有权限,重定向到登录页,进行登录
      authService.goWxOauth2();
      // next();
    }
  } else { //不需要权限 直接跳转
    next();
  }
})

let getMyInfo = () => {
  authService.getMyInfo().then(res => {
    if (!common.isOk(res)) return
    console.log("res.data.data", res.data.data)
    res.data.data.user['id'] = res.data.data.id;
    let user = res.data.data.user;
    localStorage.user = JSON.stringify(user);
    store.commit("CHANGE_USER_INFO", user);
    if (!common.isEmpty(res.data.data.shop)) {
      localStorage.shop = JSON.stringify(res.data.data.shop);
      store.commit("CHANGE_USER_ISSHOP", true);
      store.commit("CHANGE_USER_SHOP", res.data.data.shop);
    } else {
      localStorage.removeItem("shop");
      store.commit("CHANGE_USER_ISSHOP", false);
    }
    getMyHomeInfo();
  })
}

let getMyHomeInfo = () => {
  userService.getMyHomeInfo().then(res => {
    if (!common.isOk(res)) return
    this.doOrderCount = res.data.doOrderCount;
    res.data.loginUser.user.id = res.data.loginUser.id;
    res.data.loginUser.user.idCard = res.data.loginUser.idCard;
    res.data.loginUser.user.sex = res.data.loginUser.sex;
    res.data.loginUser.user.realname = res.data.loginUser.realname;
    res.data.loginUser.user.type = res.data.loginUser.type;
    localStorage.user = JSON.stringify(res.data.loginUser.user);
    this.$store.commit("CHANGE_USER_INFO", res.data.loginUser.user);
  })
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
