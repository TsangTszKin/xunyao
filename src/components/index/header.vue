<template lang="html">

<div class="index-header">
  <mt-header title="">
    <a  slot="left">
      <i class="fa fa-map-marker fa-lg" style="font-size:17px;margin-right:5px;" @click="locationInitWx(true)"></i><span style="font-size: 15px;" @click="reLocation">{{city}}</span>
    </a>
  

       <i slot="right" class="fa fa-plus-circle fa-lg" @click="popupVisible = true"></i>
    
  </mt-header>

   <router-link :to="{name:'主页搜索', params:{type: 'goods'}}">
      <mt-search
        cancel-text="取消"
        placeholder="搜索"
        class="index-search"
        style="position: relative;top: 40px;"
        >
      </mt-search>
    </router-link>

    <mt-popup
      v-model="popupVisible"
      style="
    width: 150px;
    height: 45px;
    z-index: 2001;
    top: 41px;
    left: auto;
    right: -69px;
    "
      :modal="true"
      :closeOnClickModal="true"
      position="top"
      >
      <div class="">
          <span class="triangle_border_up_span"></span>
          <p style="padding: 10px 10px;text-align: center;" @click="addFriends"><i class="fa fa-user-plus fa-lg" style="margin-right: 10px;"></i>添加好友</p>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import common from '@/util/common';
import { Toast, Popup, MessageBox, Indicator } from 'mint-ui';
import CityPicker from '@/components/CityPicker';
import $ from "jquery";
import userService from '@/api/userService';
import authService from '@/api/authService';
import bus from '@/util/bus';

export default {
  data() {
    return {
      city: '点击重新定位',
      popupVisible: false
    }
  },
  components: {
    "CityPicker": CityPicker,
    'mt-popup': Popup
  },
  mounted() {
    let self = this;
    // setTimeout(() => {
    //   localStorage.removeItem("cityName");
    // }, 5000*60);
    if (!common.isEmpty(this.$route.query.business)) {
      this.city = this.$route.query.business;
      localStorage.cityName = this.city;
      sessionStorage.cityName = this.city;
      localStorage.lat = this.$route.query.lat;
      localStorage.lng = this.$route.query.lng;
      bus.$emit("getNearShopList", this.$route.query.lat, this.$route.query.lng);
    } else {
      if (!common.isEmpty(localStorage.cityName)) {
        this.city = localStorage.cityName;
        setTimeout(() => {
          bus.$emit("getNearShopList", localStorage.lat, localStorage.lng);
        }, 1000);
      } else {
        let timer = setInterval(() => {

          //方案三 ，微信定位
          if (!common.isEmpty(wx)) {
            self.locationInitWx();
            if (self.city === '点击重新定位') {
              self.locationInitWx();
            } else {
              clearInterval(timer);
            }

          }
        }, 2000)

        setTimeout(() => {
          clearInterval(timer);
          if (self.city === '点击重新定位') {
            self.$router.push({ name: '定位' });
            Indicator.close();
          }
        }, 6000);
      }

    }

    setInterval(function () { $(".index-search .mint-searchbar").css("background-color", '#38af43 !important') }, 100)
  },
  methods: {
    reLocation() {
      if (this.city.indexOf("点击重新定位") != -1) {
        // this.locationInit(true);
        this.locationInitWx();
      } else {
        this.$router.push({ name: '定位' })
      }

    },
    locationInitWx() {
      let self = this;
      authService.getWxConfig(encodeURIComponent(location.href)).then(res => {
        if (!common.isOk(res)) return
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature,// 必填，签名
          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
        });

        Indicator.open('正在定位...');
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log("微信经纬度", [res.longitude, res.latitude]);
            let bd09POint = common.gcj02tobd09(res.longitude, res.latitude);
            console.log("转百度经纬度", bd09POint);
            // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var latitude = bd09POint[1]; // 纬度，浮点数，范围为90 ~ -90
            var longitude = bd09POint[0]; // 经度，浮点数，范围为180 ~ -180。
            localStorage.lng = longitude;
            localStorage.lat = latitude;
            self.getBtAddressForApi(latitude, longitude);
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            console.warn(latitude, longitude);
            bus.$emit("getNearShopList", latitude, longitude);
            Indicator.close();
            // localStorage.getNearbyShop = JSON.stringify({ lat: latitude, lng: longitude })
          },
          fail: function () {
            // Toast("微信定位失败，请重新定位");
            Indicator.close();
          }
        });

      })

    },
    locationInit(isLaoding) {
      if (isLaoding) {
        Indicator.open('正在定位...');
      }
      let self = this;
      // 百度地图API功能

      let map = new BMap.Map("allmap");
      var geolocation = new BMap.Geolocation();
      var point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);
      console.log(geolocation)
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          map.panTo(r.point);
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
          var point = new BMap.Point(r.point.lng, r.point.lat);
          localStorage.lng = r.point.lng;
          localStorage.lat = r.point.lat;
          if (isLaoding) {
            Indicator.close();
          }

          bus.$emit("getNearShopList", r.point.lat, r.point.lng);

          var geoc = new BMap.Geocoder();

          geoc.getLocation(point, function (rs) {
            console.log(rs)
            let currentAddress = {};
            if (!common.isEmpty(rs.surroundingPois)) {
              currentAddress = rs.surroundingPois[0].title;
            } else {
              currentAddress = rs.address;
            }
            // Toast("当前定位:" + currentAddress);
            self.city = currentAddress;
            localStorage.cityName = currentAddress;
          });
        } else {
          Toast("定位失败。原因：", self.locationFailReason(this.getStatus()));
          console.error('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true })


    },
    locationFailReason(code) {
      switch (code) {
        case 0:
          return '检索成功'
        case 1:
          return '城市列表'
        case 2:
          return '位置结果未知'
        case 3:
          return '导航结果未知'
        case 4:
          return '非法密钥'
        case 5:
          return '非法请求'
        case 6:
          return '没有权限'
        case 7:
          return '服务不可用'
        case 8:
          return '超时'
        default:
          return '原因未知'
      }
    },
    getBtAddressForApi(lat, lng) {
      let self = this;
      $.ajax({
        type: "GET",
        url: `http://api.map.baidu.com/geocoder/v2/?location=${lat},${lng}&output=json&ak=AuOY7KgIDlUnzBsTxL7YZeo8UAfpYXmQ`,
        dataType: "jsonp",  //数据格式设置为jsonp
        jsonp: "callback",  //Jquery生成验证参数的名称
        success: function (res) {  //成功的回调函数
          // alert(res);
          if (res.status == 0) {
            console.log("百度地图 地址逆解析", res)
            let sematic_description = res.result.sematic_description;
            if (!common.isEmpty(sematic_description)) {
              if (sematic_description.indexOf(',') != -1) {
                let address = sematic_description.split(",")[0];
                self.city = address;
                localStorage.cityName = address;
              } else {
                self.city = sematic_description;
                localStorage.cityName = sematic_description;
              }
            }

          } else {
            Toast("解析地址有误");
            self.city = '定位失败，点击重新定位';
            // localStorage.cityName = '';
          }
        },
        error: function (e) {
          alert("error");
        }
      });
    },

    addFriends() {
      let self = this;
      this.popupVisible = false;
      MessageBox.prompt('请输入好友手机号').then(({ value, action }) => {
        console.log(value);
        if (!common.isPhone(value)) {
          Toast("请填写正确的手机号");
          return
        }

        self.addFriendForApi(value);
      });
    },
    addFriendForApi(phone) {
      userService.addFriend(phone).then(res => {
        if (!common.isOk(res)) return
        Toast("添加好友成功");
      })
    }
  }
}
</script>

<style lang="less">
.index-header {
  background-color: #38af43 !important;
  height: 83px;
  header {
    background-color: #38af43 !important;
  }
  > a {
    > div.index-search {
      height: 7vh;
      > div.mint-searchbar {
        background-color: #38af43 !important;
      }
    }
  }
}
</style>
