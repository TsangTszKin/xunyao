<template lang="html">
  <section class="section3">
    <h2 class="section3-title">
      附近药店
      
      <router-link :to="{path:'/shopList'}" >
        <i class="icon-right"></i>
      </router-link>
      
    </h2>
    <ul class="section3-list">
      <li v-for="k in list" :key='k.id' @click="$router.push({path: '/shop'})">
        
        <a class="section3-list-right">
           <img src="../../assets/images/shop.jpg">
          <!-- <span>${{k.price}}</span> -->
        </a>
        <div class="section3-list-left">
          <h4>店铺{{k.title}}</h4>
          <div class="time">
            <span class="time-num">店铺描述店铺描述</span>
          </div>
          <p class="start">店铺地址： 广东省广州市天河区车陂社区</p>
        </div>
      </li>
    </ul>
    <!-- <router-link :to="{name:'分类页'}" class="section3-banner">
      <img v-lazy="banner">
    </router-link> -->
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';

export default {
  data() {
    return {
      list: [1,2,3,4,5],
      banner: '',
      dom: [{
        num1: '',
        num2: '',
        num3: ''
      }, {
        num1: '',
        num2: '',
        num3: ''
      }, {
        num1: '',
        num2: '',
        num3: ''
      }, {
        num1: '',
        num2: '',
        num3: ''
      }]
    }
  },
  mounted() {


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
      .section3-list-left {
        padding: 5vw 3vw;
        width: 80%;
        h4 {
          .fz(font-size, 34);
          line-height: 4.8vw;
          margin-bottom: 1.2vw;
          letter-spacing: 0.42vw;
        }
        .time {
          .time-num {
            display: inline-block;
            text-align: center;
            padding: 0.6vw;
            color: #fff;
            border-radius: 0.5vw;
            background-color: #444;
            .fz(font-size, 26);
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
          .fz(font-size, 30);
          padding-top: 1vw;
          letter-spacing: 0.3vw;
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
