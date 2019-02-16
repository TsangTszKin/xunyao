import axios from 'axios'
import { Toast } from 'mint-ui';
import store from '@/vuex/store.js'
import router from '../router'

const api = axios.create();
api.defaults.baseURL = 'http://192.168.0.110:8888';
// api.defaults.baseURL = 'http://47.106.168.53:8091';
// api.defaults.baseURL = 'http://zwdjack.iok.la:40229';
api.defaults.timeout = 5000;
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type';
api.defaults.headers['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS';
api.defaults.headers['Access-Control-Allow-Credentials'] = true;


// 请求拦截
api.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // store.commit('SET_LOADING',true);
    // 如果有token,添加到请求报文 后台会根据该报文返回status
    if(localStorage.token) {
      config.headers.token = `${localStorage.token}`;
    }

    return config;

  }, function (error) {
    // 对请求错误做些什么
    Toast('网络错误,请稍后再试');

    // store.commit('SET_LOADING',false);

    return Promise.reject(error);
  });

// 添加响应拦截器
api.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 加到时器主要是为了 展示Loading效果 项目中应去除
    setTimeout(()=>{
      // store.commit('SET_LOADING',false);
    },300)

    return response;

  }, function (error) {
    // 对响应错误做点什么
    // store.commit('SET_LOADING',false);

    if(errore.response) {

      if(error.response.status== 401) {
          // 如果返回401 即没有权限，跳到登录页重新登录
        store.commit('CHANGE_TOKEN',0);

        Toast('请重新登录');

        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })

      }
    }

    return Promise.reject(error);
  });
export default api
