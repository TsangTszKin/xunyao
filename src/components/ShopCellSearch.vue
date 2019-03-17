<template>
  <li @click="$router.push({path: '/shop/'+shop.shopId})">
    <a class="section3-list-right">
      <img :src="shop.shopLogo">
      <!-- <span>${{shop.price}}</span> -->
    </a>
    <div class="section3-list-left">
      <h4>{{shop.shopName}}</h4>
      <div class="time">
        <span class="time-num">参考价{{shop.price}}</span>
      </div>
      <p class="start">地址： {{shop.address}}</p>
      <p class="coupon" v-if="shop.shopService.length > 0">
        <!-- <span v-for="(n, i) in shop.shopService" :key="i">{{n ==1 ?'开发票': n == 2? '医保':'送上门'}}</span> -->
        <img
          :style="{height:n ==1 ?'23px': n == 2? '30px':'15px',marginRight: '10px'}"
          v-for="(n, i) in shop.shopService"
          :key="i"
          :src="n ==1 ?'/static/fapiao.png': n == 2? '/static/yibao.png':'/static/shangmen.png'"
        >
      </p>
    </div>
  </li>
</template>

<script>


export default {
  props: {
    shop: {
      type: Object,
      default: function () {
        return {
          "shopId": 0,
          "remarks": "",
          "shopName": "",
          "shopLogo": "",
          "address": "",
          "shopService": [],
          price: ""
        }
      }
    }
  },
  watch: {
    shop: {
      handler: function (value) {
        console.log(value)
      },
      deep: true
    }
  }

}
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
li {
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
    padding: 3vw;
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
        color: red;
        border-radius: 0.5vw;
        // background-color: #444;
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
    // padding-top: 5vw;
    position: relative;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;
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
</style>
