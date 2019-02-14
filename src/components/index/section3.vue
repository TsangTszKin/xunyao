<template lang="html">
  <section class="section3">
    <h2 class="section3-title">
      附近药店
      
      <router-link :to="{path:'/shopList'}" >
        <i class="icon-right"></i>
      </router-link>
      
    </h2>
    <ul class="section3-list">
      <li v-for="(k, index) in list" :key='index' @click="$router.push({path: '/shop/'+k.shopId})">
        
        <a class="section3-list-right">
           <img :src="k.shopLogo">
          <!-- <span>${{k.price}}</span> -->
        </a>
        <div class="section3-list-left">
          <h4>{{k.shopName}}</h4>
          <div class="time">
            <span class="time-num">距离{{k.distance}}</span>
          </div>
          <p class="start">店铺地址： {{k.address}}</p>
          <p class="coupon">
              <span>满减</span>
              <!-- 满20减5，满50减10 -->
          </p>
        </div>
      </li>
    </ul>
    <!-- <router-link :to="{name:'分类页'}" class="section3-banner">
      <img v-lazy="banner">
    </router-link> -->
  </section>
</template>

<script>
import { Lazyload, Toast } from 'mint-ui';
import homeService from '@/api/homeService';
import common from '@/util/common';

export default {
  data() {
    return {
      list: [],
    }
  },
  mounted() {

    let self = this;
    let timer = setInterval(() => {
      if (!common.isEmpty(BMap)) {
        self.locationInit();
        clearInterval(timer);
      }
    }, 500)

  },
  methods: {
    getNearShopList(lng, lat) {
      homeService.getNearShopList(lng, lat).then(res => {
        if (!common.isOk(res)) return
        let data = res.data.data;
        data.forEach(element => {
          if (element.distance > 1000) {
            element.distance = (element.distance / 1000).toFixed(1) + 'km';
          } else {
            element.distance = element.distance.toFixed(1) + 'm';
          }
        })
        this.list = data;
      })
    },
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
          self.getNearShopList(r.point.lng, r.point.lat);
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
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section3 {
  width: 100%;
  .pt();
  .section3-title {
    .bt();
    text-align: center;
    .fz(font-size, 40);
    padding: 4vw 0;
    position: relative;
    background-color: #ffffff;
    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top, -16);
      &::before {
        color: #9f9f9f;
      }
    }
  }
  .section3-list {
    width: 100%;
    .bt();
    > li {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 0 5vw;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;

      border-bottom: 1px solid #dcdcdc85;
      .section3-list-left {
        padding: 5vw 3vw;
        width: 80%;
        h4 {
          .fz(font-size, 34);
          line-height: 4.8vw;
          margin-bottom: 1.2vw;
          letter-spacing: 0.42vw;
          color: #000;
        }
        .time {
          .time-num {
            display: inline-block;
            text-align: center;
            padding: 0.6vw;
            color: #fff;
            border-radius: 0.5vw;
            background-color: #444;
            // .fz(font-size, 26);
            font-size: 12px;
            letter-spacing: 0.3vw;
          }
          .time-col {
            color: #333;
            width: 2vw;
            display: inline-block;
            text-align: center;
            font-weight: 700;
            .fz(font-size, 30);
          }
        }

        .start {
          // .fz(font-size, 30);
          font-size: 12px;
          padding-top: 1vw;
          letter-spacing: 0.3vw;
        }
        .coupon {
          font-size: 12px;
          margin-top: 5px;
          > span {
            border: 1px solid #ef4f4f;
            padding: 0 2px;
            border-radius: 2px;
            color: #ef4f4f;
            margin-right: 5px;
          }
        }
      }

      .section3-list-right {
        width: 30%;
        display: block;
        padding-top: 5vw;
        position: relative;
        img {
          display: block;
          width: 100%;
          background-color: gold;
          border-radius: 8px;
        }
        span {
          padding: 0.3vw 1.2vw;
          border-radius: 1vw;
          text-align: center;
          position: absolute;
          bottom: 0.4vw;
          right: 0.2vw;
          background-color: @cl;
          color: #fff;
          .fz(font-size, 24);
        }
      }
    }
  }

  .section3-banner {
    display: block;
    width: 100%;
    .bd();
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
