<template lang="html">

  <div class="car">
      <router-link class="my-indent" :to="{ name: '个人信息'}">
        <header class="header">
            <div class="header-icon">
                <img :src="getUserImg" />
            </div>
            <div>
              <p class="name">{{getUserNickName}}</p>
              <p class="mobile"><i class="fa fa-mobile fa-lg"></i>{{getUserMobile}}</p>
            </div>
            <i class="icon-go" style="position: absolute;
      right: 20px;
      z-index: 999;"></i>
        </header>
      </router-link>
      <div class="main">
          <router-link class="my-indent" :to="{ name: '我的订单'}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="icon-go"></i>
              </div>
          </router-link>

          <section class="my-pay">
              <router-link :to="{ name: ''}">
                <div style="position: relative;">
 <span class="icon2-money"></span>
                  <p>代付款</p>
                  <mt-badge size="small" type="error" style="position: absolute;
    top: 0;
    right: 30px;">30</mt-badge>
                </div>
                 
              </router-link>
              <router-link :to="{ name: ''}">
                  <span class="icon2-thecar"></span>
                  <p>待收货</p>
              </router-link>
              <router-link :to="{ name: ''}">
                  <span class="icon2-fixed"></span>
                  <p>已完成</p>
              </router-link>

          </section>

          <section class="my-vip">
           
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <i class="fa fa-cube fa-lg"></i>
              </div>
              <p>
                <span>店员通</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>

          <section class="my-vip">
            <router-link class="my-vip-bottom ho" :to="{ name: '钱包'}">
              <div>
                <i class="fa fa-cny fa-lg"></i>
              </div>
              <p>
                <span>钱包</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '优惠券'}">
              <div>
                <i class="fa fa-ticket fa-lg"></i>
              </div>
              <p>
                <span>优惠券</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>

           <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: '收货地址'}" >
              <div class="my-vip-top-div">
                <i class="fa fa-map-marker fa-lg"></i>
              </div>
              <p>
                <span>收货地址</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-top ho" :to="{ name: '我的好友'}" >
              <div class="my-vip-top-div">
                <i class="fa fa-users fa-lg"></i>
              </div>
              <p>
                <span>我的好友</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '足迹'}">
              <div>
                <i class="fa fa-eye fa-lg"></i>
              </div>
              <p>
                <span>足迹</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '我的关注'}">
              <div>
                 <i class="fa fa-heart fa-lg"></i>
              </div>
              <p>
                <span>我的关注</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
                 <i class="fa fa-feed fa-lg"></i>
              </div>
              <p>
                <span>反馈</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>

          <!-- <section class="my-service">
              <router-link class="my-service-top" :to="{ name: ''}">
                  <div>
                    <span class="icon2-service">
                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                    </span>
                  </div>
                  <p>
                    <span>服务中心</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link class="my-service-bottom" :to="{ name: ''}">
                  <div>
                    <span class="icon2-milogo"></span>
                  </div>
                  <p>
                    <span>电商之家</span><i class="icon-go"></i>
                  </p>
              </router-link>
          </section> -->


           <section class="my-settle">
             <router-link :to="{ name: ''}" class="my-settle-top">
                  <div>
                   <i class="fa fa-cog fa-lg"></i>
                  </div>

                  <p>
                    <span>设置</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link :to="{ name: '商铺入驻申请'}" class="my-settle-top">
                  <div>
                   <i class="fa fa-handshake-o fa-lg"></i>
                  </div>

                  <p>
                    <span>商家入驻</span><i class="icon-go"></i>
                  </p>
              </router-link>
          </section>

      </div>
      <!-- <v-baseline></v-baseline> -->
      <v-footer></v-footer>
    </div>
</template>

<script>
// import * as mockData from '@/http/mock.js' //模拟数据

import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Badge } from 'mint-ui';

export default {
  components: {
    'v-baseline': Baseline,
    'v-footer': Footer,
    'mt-badge': Badge
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    getUserNickName() {
      return this.$store.state.user.user.nickname
    },
    getUserImg() {
      return this.$store.state.user.user.headimgurl
    },
    getUserMobile() {
      return this.$store.state.user.user.mobile
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/index/style.css";
@import "../assets/user/icon/carstyle.css";

.car {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f8fcff;
  .header {
    width: 100%;
    height: 16vw;
    // background: url(../../static/carbg.png) center 0 #38af43;
    background-size: auto 100%;
    padding: 3.2vw 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .header-icon {
      border: 0.4vw solid #000;
      background-color: @cl;
      margin-left: 4vw;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 14vw;
      height: 14vw;
      line-height: 16vw;
      text-align: center;
      border-radius: 50%;

      display: webkit-flex;
      display: flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;

      > img {
        width: 100%;
      }
      // span {
      //   .fz(font-size, 54);
      //   &::before {
      //     color: #ffffff;
      //   }
      // }
    }
    > div {
      > .name {
        margin-left: 3.2vw;
        .fz(font-size, 35);
        color: #000;
        letter-spacing: 0.2vw;
      }
      > .mobile {
        margin-left: 3.2vw;
        .fz(font-size, 10);
        color: #000;
        letter-spacing: 0.2vw;
        > .fa {
          font-size: 3em;
          margin-right: 3px;
        }
      }
    }
  }
  .main {
    width: 100%;
    .my-indent {
      width: 100%;
      display: block;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #333;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding: 0 5vw;
      height: 15vw;
      line-height: 15vw;
      background-color: #fff;
      .bd();
      &:active {
        background-color: rgb(224, 227, 230);
      }

      .my-indent-right {
        span {
          display: inline-block;
          .fz(font-size, 28);
          color: rgba(0, 0, 0, 0.4);
          position: relative;
        }
        i {
          position: relative;
          top: 0.8vw;
        }
      }
    }

    .my-pay {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      padding: 2vw 0;
      background-color: #fff;
      .bd();

      > a {
        display: block;
        width: 33.33%;
        color: #999;
        text-align: center;

        > span {
          .fz(font-size, 50);
          margin-top: 2.3vw;
          display: block;
          text-align: center;
        }

        p {
          padding: 2.3vw 0;
          text-align: center;
        }
      }
    }

    .my-vip,
    .my-service,
    .my-settle {
      width: 100%;
      .mt();
      .bd();
      .bt();
      > a {
        background-color: #fff;
        display: block;
        width: 100%;
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 15vw;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 6vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        &:active {
          background-color: rgb(224, 227, 230);
        }
        > div {
          -ms-flex: 2;
          -webkit-box-flex: 2;
          flex: 2;
          padding-top: 1.3vw;
        }

        .my-vip-top-div {
          padding-top: 0;
        }
        > p {
          -ms-flex: 10;
          -webkit-box-flex: 10;
          flex: 10;
          position: relative;

          &:active {
            background-color: rgb(224, 227, 230);
          }

          i {
            position: absolute;
            right: 0;
            top: 0.4vw;
          }
        }
      }
    }
  }
}
/*图标大小不一，重新定义*/

.icon-go {
  .fz(font-size, 36);
  &::before {
    color: #aba8a8;
  }
}

[class^="icon2-"],
[class*=" icon2-"] {
  .fz(font-size, 50);
}

.icon2-service {
  .fz(font-size, 34);
}
</style>
