<template lang="html">

  <div class="car">
      <router-link class="my-indent" :to="{ name: '个人信息'}">
        <header class="header">
            <div class="header-icon">
                <img :src="getUserImg" />
            </div>
            <div>
              <p class="name">{{getUserNickName}}</p>
              <p class="mobile">
                <img style="margin-right: 5px;" :src="getUserType == '1'?'/static/VIP.png':'/static/youke.png'" />
                <i class="fa fa-mobile fa-lg" style="position: relative;top: 3px;"></i>
                <span style="position: relative;top: 3px;">{{getUserMobile}}</span>
              </p>
            </div>
            <i class="icon-go" style="position: absolute;
      right: 20px;
      z-index: 999;"></i>
        </header>
      </router-link>
      <div class="main">
          <router-link class="my-indent" :to="{ name: '我的订单', params:{status: '-1'}}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="fa fa-angle-right fa-lg" style="position:absolute!important;top:17px!important;right:-10px!important;color:gainsboro!important;"></i>
              </div>
          </router-link>

          <section class="my-pay">
              <router-link :to="{ name: '我的订单', params:{status: '0'}}">
                <div style="position: relative;margin-top: 2vw;">
                  <span class="icon2-money" style="font-size: 28px;"></span>
                  <p style="padding: 3px;">待确认</p>
                  <mt-badge size="small" type="error" style="position: absolute;top: 0;right: 30px;" v-if="doOrderCount >0">{{doOrderCount}}</mt-badge>
                </div>
                 
              </router-link>
              <router-link :to="{ name: '我的订单', params:{status: '1'}}">
                  <span class="icon2-thecar"></span>
                  <p>待收货</p>
              </router-link>
              <router-link :to="{ name: '我的订单', params:{status: '2'}}">
                  <span class="icon2-fixed"></span>
                  <p>已完成</p>
              </router-link>

          </section>

          <!-- <section class="my-vip">
           
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <i class="fa fa-cube fa-lg"></i>
              </div>
              <p>
                <span>店员通</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
          </section> -->

          <section class="my-vip">
            <router-link class="my-vip-bottom ho" :to="{ name: '钱包'}" style="position: relative;">
              <div>
                <i class="fa fa-cny fa-lg"></i>
              </div>
              <p >
                <span>钱包</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '优惠券'}" style="position: relative;">
              <div>
                <i class="fa fa-ticket fa-lg"></i>
              </div>
              <p>
                <span>优惠券</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
          </section>

           <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: '收货地址'}" style="position: relative;">
              <div class="my-vip-top-div">
                <i class="fa fa-map-marker fa-lg"  style="    margin-left: 5px;"></i>
              </div>
              <p>
                <span>收货地址</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
            <router-link class="my-vip-top ho" :to="{ name: '我的好友'}"style="position: relative;" >
              <div class="my-vip-top-div">
                <i class="fa fa-users fa-lg"></i>
              </div>
              <p>
                <span>我的好友</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '足迹'}" style="position: relative;">
              <div>
                <i class="fa fa-eye fa-lg"></i>
              </div>
              <p>
                <span>足迹</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '我的关注'}" style="position: relative;">
              <div>
                 <i class="fa fa-heart fa-lg"></i>
              </div>
              <p>
                <span>我的关注</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '反馈'}" style="position: relative;">
              <div>
                 <i class="fa fa-feed fa-lg" style="    margin-left: 2px;"></i>
              </div>
              <p>
                <span>反馈</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
              </p>
            </router-link>
          </section>

           <section class="my-settle" v-if="shopApplyStatus != -2">
              <a class="my-settle-top" @click="shopApply" style="position: relative;">
                  <div >
                   <i class="fa fa-handshake-o fa-lg"></i>
                  </div>

                  <p style="position: relative;">
                    <span>商家入驻</span><i class="icon-go"  style="margin-left: -3px;"></i>
                    <span style="position: absolute; right: 15px;">{{shopApplyLabel}}</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
                  </p>
              </a>
          </section>

           <section class="my-settle">
             <router-link :to="{ name: '设置'}" class="my-settle-top" style="position: relative;">
                  <div>
                   <i class="fa fa-cog fa-lg"></i>
                  </div>

                  <p>
                    <span>设置</span><i class="fa fa-angle-right fa-lg" style="color:gainsboro;top:5px;"></i>
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
import { Badge, MessageBox, Toast } from 'mint-ui';
import userService from '@/api/userService';
import common from '@/util/common';

export default {
  components: {
    'v-baseline': Baseline,
    'v-footer': Footer,
    'mt-badge': Badge
  },
  data() {
    return {
      doOrderCount: 0,
      shopApplyStatus: -1,
      shopApplyLabel: '',
      shopApplyId: null
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyHomeInfo();
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
    },
    getUserType() {
      return this.$store.state.user.user.type
    }
  },
  methods: {
    shopApply() {
      switch (this.shopApplyStatus) {
        case -2:
          //还没初始化完，不作处理
          break;
        case -1:
          //跳转到商品入驻申请界面
          this.$router.push({ name: "商铺入驻申请" })
          break;
        case 0:
          //未处理
          MessageBox('正在审核', '预计1-3个工作日').then(action => {
            //todo点击确定回调
          });
          break;
        case 1:
          //已经有审核通过的入驻申请 可以再次申请
          this.$router.push({ name: "商铺入驻申请" })
          break;
        case 2:
          //审核不通过
          MessageBox.confirm('审核不通过', '确定执行此操作?').then(action => {
            this.$router.push({ name: "商铺入驻申请", params: { id: this.shopApplyId } })
          });
          break;
        default:
          break;
      }
    },
    clearCache() {
      localStorage.clear();
      Toast("已清除");
    },
    getMyHomeInfo() {
      userService.getMyHomeInfo().then(res => {
        if (!common.isOk(res)) return
        this.doOrderCount = res.data.doOrderCount;
        res.data.loginUser.user.id = res.data.loginUser.id;
        res.data.loginUser.user.idCard = res.data.loginUser.idCard;
        res.data.loginUser.user.sex = res.data.loginUser.sex;
        res.data.loginUser.user.realname = res.data.loginUser.realname;
        res.data.loginUser.user.type = res.data.loginUser.type;
        localStorage.user = JSON.stringify(res.data.loginUser.user);
        this.$store.commit("CHANGE_USER_INFO", res.data.loginUser.user);

        if (!common.isEmpty(res.data.shopApply)) {
          if (!common.isEmpty(res.data.shopApply.status)) {
            this.shopApplyStatus = res.data.shopApply.status;
            this.shopApplyId = res.data.shopApply.id;
            switch (res.data.shopApply.status) {
              case 0:
                this.shopApplyLabel = "审核中";
                break;
              case 1:
                // this.shopApplyLabel = "审核通过";
                break;
              case 2:
                this.shopApplyLabel = "审核不通过";
                break;
              default:
                break;
            }
          }
        } else {
          this.shopApplyStatus = -1;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
@import "../assets/user/icon/carstyle.css";

.car {
  width: 100%;
  padding-bottom: 20vw;
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
        color: #000;
        letter-spacing: 0.2vw;
        font-size: 10px;
        > .fa {
          font-size: 15px;
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
        position: relative;
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
