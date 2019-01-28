// @ts-nocheck
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from '@/vuex/store.js';  //vuex
import api from '@/http/api.js';       //http请求
import axios from 'axios';
import authService from '@/api/authService.js'
import less from 'less';
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css';
import '@/assets/index.less'
import common from '@/util/common';
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
    if (store.state.login.token) {  // 通过vuex state获取当前的token是否存在
      next();
      if (!store.state.user.user.userId) getMyInfo();

    } else {    //如果没有权限,重定向到登录页,进行登录
      // authService.goWxOauth2();
      next();
    }
  } else { //不需要权限 直接跳转
    next();
  }
})

let getMyInfo = () => {
  authService.getMyInfo().then(res => {
    if (!common.isOk(res)) return
    let user = res.data.data.user;
    store.commit('CHANGE_USER_INFO', user);
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
