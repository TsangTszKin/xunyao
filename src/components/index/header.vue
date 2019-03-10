<template lang="html">

<div class="index-header">
  <mt-header title="">
    <router-link :to="{name:'定位'}" slot="left">
      <span style="font-size: 15px;"><i class="fa fa-map-marker fa-lg" style="font-size:17px;margin-right:5px;"></i>{{city}}</span>
    </router-link>
  

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
import { Toast, Popup, MessageBox } from 'mint-ui';
import CityPicker from '@/components/CityPicker';
import $ from "jquery";
import userService from '@/api/userService';

export default {
  data() {
    return {
      city: localStorage.cityName ? localStorage.cityName : '定位中',
      popupVisible: false
    }
  },
  components: {
    "CityPicker": CityPicker,
    'mt-popup': Popup
  },
  mounted() {
    let self = this;
    if (!common.isEmpty(this.$route.query.business)) {
      this.city = this.$route.query.business;
    } else {
      let timer = setInterval(() => {
        if (!common.isEmpty(BMap)) {
          self.locationInit();
          clearInterval(timer);
        }
      }, 500)
    }

    setInterval(function () { $(".index-search .mint-searchbar").css("background-color", '#38af43 !important') }, 100)
  },
  methods: {
    locationInit() {
      // 百度地图API功能
      let self = this;
      var map = new BMap.Map("allmap");


      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          map.panTo(r.point);
          // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
          var point = new BMap.Point(r.point.lng, r.point.lat);
          localStorage.lng = r.point.lng;
          localStorage.lat = r.point.lat;

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
        }
        else {
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
    addFriends() {
      let self = this;
      this.popupVisible = false;
      MessageBox.prompt('请输入好友手机号').then(({ value, action }) => {
        console.log(value);
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
