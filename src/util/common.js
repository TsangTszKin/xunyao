const STORAGE_USER_KEY = 'STORAGE_USER_KEY'
// const STORAGE_CARTLIST_KEY = 'STORAGE_CARTLIST_KEY'
// const STORAGE_QUERYMYLIST_KEY = 'STORAGE_QUERYMYLIST_KEY'
import { Toast } from 'mint-ui';
import axios from 'axios'
const prefix = 'http://testapi.gu-dao.cn';
// import authService from '@/api/authService.js'
//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
import $ from 'jquery'


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
  formatDate(time) {
    //   格式：yyyy-MM-dd
    let date = new Date(Number(time));
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    return Y + M + D;
  },
  isOk(res) {
    if (this.isEmpty(res)) {
      console.error("后台返回数据有误");
      return false
    } else {
      if (res.data.code != 0) {

        if (res.data.code == 401) {
          // alert(401)
          this.goWxOauth2();
        } else {
          Toast(res.data.msg);
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


  /**
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
   * 即谷歌、高德 转 百度
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
  },
  isPhone(value) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  isIDCardNo(value) {
    var myreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!myreg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  getImgFile_width_and_height(file) {
    console.log("file", file);
    var isAllow = false;

    if (file.files && file.files[0]) {
      var fileData = file.files[0];

      //读取图片数据
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        //加载图片获取图片真实宽度和高度
        var image = new Image();
        image.onload = function () {
          var width = image.width;
          var height = image.height;
          return [width, height]
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);

    } else {
      //IE下使用滤镜来处理图片尺寸控制
      //文件name中IE下是完整的图片本地路径
      // var input = D.get('#uploader');
      // //var input = uploader.get('target').all('input').getDOMNode();
      // input.select();
      // //确保IE9下，不会出现因为安全问题导致无法访问
      // input.blur();
      // var src = document.selection.createRange().text;
      // var img = $('<img style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);width:300px;visibility:hidden;"  />').appendTo('body').getDOMNode();
      // img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
      // var width = img.offsetWidth;
      // var height = img.offsetHeight;
      // $(img).remove();
      // return [width, height]
    }

  },
  getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
      url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  }

}
