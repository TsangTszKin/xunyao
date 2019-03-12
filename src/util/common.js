const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
// const STORAGE_CARTLIST_KEY = 'STORAGE_CARTLIST_KEY'
// const STORAGE_QUERYMYLIST_KEY = 'STORAGE_QUERYMYLIST_KEY'
import { Toast } from 'mint-ui';
import axios from 'axios'
const prefix = 'http://testapi.gu-dao.cn';
// import authService from '@/api/authService.js'

export default {
  // 获取
  getLocal(key = STORAGE_USER_KEY) {
    // console.log('get local operation')
    return JSON.parse(window.localStorage.getItem(key))
  },
  // 设置用
  setLocal(res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    //第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    if (isSaveOldData) {
      if (this.getLocal(key)) {
        let oldData = this.getLocal(key);
        return window.localStorage.setItem(key, JSON.stringify(oldData.concat(res)))
      }
    }
    return window.localStorage.setItem(key, JSON.stringify(res))
  },
  deepClone(obj) {
    var o;
    if (typeof obj == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(this.deepClone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = this.deepClone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  }, loading: {
    show() {
      if (window.layer) {
        layer.load(2, {
          shade: [0.2, '#fff']
        });
      }
    },
    hide() {
      if (window.layer) {
        layer.closeAll('loading');
      }
    }
  },
  getGuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },
  isEmpty(value) {
    let result = false;
    if (value == null || value == undefined) {
      result = true;
    }
    if (typeof value == 'string' && (value.replace(/\s+/g, "") == "" || value == "")) {
      result = true;
    }
    if (typeof value == "object" && value instanceof Array && value.length === 0) {
      result = true;
    }
    return result;
  },
  formatTime(time) {
    //   格式：yyyy-MM-dd hh:mm:ss
    let date = new Date(Number(time));
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  isOk(res) {
    if (this.isEmpty(res)) {
      console.error("后台返回数据有误");
      return false
    } else {
      if (res.data.code != 0) {
        Toast(res.data.msg);
        if (res.data.code == 401) {
          // alert(401)
          this.goWxOauth2();
        }
        return false
      } else {
        return true
      }
    }

  },
  goWxOauth2() {
    localStorage.removeItem("token");
    var returnUrl = location.href;
    var index = returnUrl.indexOf("?");
    if (index >= 0) {
      returnUrl = returnUrl.substr(0, index);
    }
    var url = prefix + "/app/auth/goWxOauth2?returnUrl=" + encodeURIComponent(returnUrl);
    location.href = url;
  },
  /**
    * 字符串转数组
    * @param {*} value
    * @returns
    */
  stringToArray(value) {
    if (this.isEmpty(value)) return []
    if (typeof value !== 'string') return []
    if (value.indexOf(",") < 0) return [value]
    let array = value.split(",");
    return array
  },
  /**
   * 数组转字符串
   * @param {*} value
   * @returns
   */
  arrayToString(value) {
    if (typeof value == "object" && value instanceof Array) {
      if (value.length == 0) return ""
      let str = '';
      value.forEach(element => {
        str += element + ',';
      })
      return str.substr(0, str.length - 1);
    } else {
      return ""
    }
  },
}
