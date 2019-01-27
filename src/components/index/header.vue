<template lang="html">

<div class="index-header">
  <mt-header title="">
    <router-link :to="{path:'/cityPicker'}" slot="left">
      <span style="font-size: 15px;"><i class="fa fa-map-marker fa-lg" style="font-size:17px;margin-right:5px;"></i>{{city}}</span>
    </router-link>
  

    <router-link :to="{path:'/search'}" slot="right">
       <i class="fa fa-plus-circle fa-lg" @click="addFriends"></i>
    </router-link>
    
  </mt-header>

   <router-link :to="{path:'/search'}">
      <mt-search
        cancel-text="取消"
        placeholder="搜索"
        class="index-search"
        >
      </mt-search>
    </router-link>

  </div>
</template>

<script>
import common from '../../util/common';
import { Toast } from 'mint-ui';
import CityPicker from '@/components/CityPicker';
import $ from "jquery";

export default {
  data() {
    return {
      city: localStorage.cityName ? localStorage.cityName : '定位中',

    }
  },
  components: {
    "CityPicker": CityPicker
  },
  mounted() {
    let self = this;
    let timer = setInterval(() => {
      if (!common.isEmpty(BMap)) {
        self.locationInit();
        clearInterval(timer);
      }
    }, 500)
    if (!common.isEmpty(this.$route.query.city)) {
      this.city = this.$route.query.city;
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
      Toast('用于添加好友')
    }
  }
}
</script>

<style lang="less">
.index-header {
  background-color: #38af43 !important;
  height: 90px;
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
