<template lang="html">
  <section class="section3">
    <h2 class="section3-title">
      附近药店
      
      <router-link :to="{path:'/shopList'}" >
        <i class="icon-right"></i>
      </router-link>
      
    </h2>
    <ul class="section3-list">
      <v-shop-cell v-for="(k, index) in dataList" :key='Math.random()' :shop="k" />
    </ul>
    <p v-if="dataList.length == 0" style="text-align: center;margin: 10px 0 20px 0;">暂无数据</p>
    <!-- <router-link :to="{name:'分类页'}" class="section3-banner">
      <img v-lazy="banner">
    </router-link> -->
  </section>
</template>

<script>
import { Lazyload, Toast } from 'mint-ui';
import homeService from '@/api/homeService';
import common from '@/util/common';
import ShopCell from '@/components/ShopCell';
import bus from '@/util/bus';
import $ from 'jquery';

export default {
  components: {
    'v-shop-cell': ShopCell
  },
  data() {
    return {
      dataList: [],
    }
  },
  mounted() {
    let self = this;
    bus.$on("getNearShopList", (lat, lng) => {
      self.getNearShopList(lat, lng);
    })
  },
  methods: {
    getNearShopList(lat, lng) {
      let self = this;
      homeService.getNearShopList(lng, lat).then(res => {
        if (!common.isOk(res)) return
        let data = common.deepClone(res.data.data);
        data.forEach(element => {
          if (element.distance > 1000) {
            element.distance = (element.distance / 1000).toFixed(1) + 'km';
          } else {
            element.distance = element.distance.toFixed(1) + 'm';
          }
          element.shopService = common.stringToArray(element.shopService);
        })
        self.dataList = [];
        self.dataList = common.deepClone(data);
        console.log(self.dataList);
        // $(".section3").show();
      })
    }
  },
  watch: {
    dataList: {
      handler: function (value) {
        console.log("dataList 更新");
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.section3 {
  width: 100%;
  // display: none;
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
