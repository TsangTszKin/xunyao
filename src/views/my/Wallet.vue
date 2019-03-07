<template lang="html">

  <div class="car">

    <mt-header title="钱包">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>


      <div class="main v-content">
          

          <section class="my-vip">
            <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
                <i class="fa fa-cny fa-lg"></i>
              </div>
              <p>
                <span>保证金</span><span style="position: absolute;
    right: 6vw;">￥{{money}}</span>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '充值'}">
              <div>
                <!-- <i class="fa fa-cny fa-lg"></i> -->
              </div>
              <p>
                <span>充值</span><i class="icon-go"></i>
              </p>
            </router-link>
            <!-- <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
              </div>
              <p>
                <span>提现</span><i class="icon-go"></i>
              </p>
            </router-link> -->
          </section>

           <!-- <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <i class="fa fa-credit-card-alt fa-lg"></i>
              </div>
              <p>
                <span>银行卡管理</span><i class="icon-go"></i>
              </p>
            </router-link>
            
          </section> -->

         

      </div>
      <!-- <v-baseline></v-baseline> -->
    </div>
</template>

<script>
// import * as mockData from '@/http/mock.js' //模拟数据

import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Badge, Header } from 'mint-ui';
import userService from '@/api/userService';
import common from '@/util/common';

export default {
  components: {
    'v-baseline': Baseline,
    'v-footer': Footer,
    'mt-badge': Badge,
    'mt-header': Header,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyMoney();
  },
  data() {
    return {
      money: 0.0
    }
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

  },
  methods: {
    getMyMoney() {
      userService.getMyMoney().then(res => {
        if (!common.isOk(res)) return
        this.money = res.data.money || this.money;
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/user/icon/carstyle.css";

.car {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #fff;
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
