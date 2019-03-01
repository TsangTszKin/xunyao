<template lang="html">

  <div class="car">

      <mt-header title="设置">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      </mt-header>

      <div class="main v-content">

            <section class="my-settle">
                <router-link :to="{ name: '帮助'}" class="my-settle-top" >
                    <div>
                    <i class="fa fa-h-square fa-lg"></i>
                    </div>

                    <p>
                        <span>帮助</span><i class="icon-go"></i>
                    </p>
                </router-link>
                <a class="my-settle-top" @click="modal.about = true">
                    <div>
                    <i class="fa fa-info-circle fa-lg"></i>
                    </div>

                    <p>
                        <span>关于</span><i class="icon-go"></i>
                    </p>
                </a>
            </section>

           <section class="my-settle">
               <a class="my-settle-top" @click="clearCache()">
                  <div>
                   <i class="fa fa-trash-o fa-lg"></i>
                  </div>

                  <p>
                    <span>清除缓存</span><i class="icon-go"></i>
                  </p>
              </a>
          </section>

          <mt-popup v-model="modal.about" position="right" style="width: 100%;height: 100%;">
                <mt-header title="关于寻药">
                    <mt-button icon="back" slot="left" @click="modal.about = false"></mt-button>
                </mt-header>
                <v-about />
         </mt-popup>

      </div>
      <!-- <v-baseline></v-baseline> -->
      <!-- <v-footer></v-footer> -->
    </div>
</template>

<script>
// import * as mockData from '@/http/mock.js' //模拟数据

import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Badge, MessageBox, Toast, Popup } from 'mint-ui';
import userService from '@/api/userService';
import common from '@/util/common';
import About from '@/components/user/setting/About';

export default {
  components: {
    'v-baseline': Baseline,
    'v-footer': Footer,
    'mt-badge': Badge,
    'mt-popup': Popup,
    'v-about': About
  },
  data() {
    return {
      modal: {
        about: false
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
  },
  methods: {
    clearCache() {
      localStorage.clear();
      Toast("已清除");
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
@import "../../assets/user/icon/carstyle.css";

.car {
  width: 100%;
  padding-bottom: 20vw;
  background-color: #f8fcff;
  height: 100%;
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
