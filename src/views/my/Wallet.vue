<template lang="html">

  <div class="car">

    <mt-header title="钱包">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <i slot="right" class="fa fa-clock-o fa-lg" style="margin-right: 10px;"  @click="$router.push({name: '违约金额明细'})"></i>
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
             <router-link class="my-vip-bottom ho" :to="{ name: ''}">
              <div>
                <i class="fa fa-lock fa-lg"></i>
              </div>
              <p>
                <span>冻结金额</span><span style="position: absolute;
    right: 6vw;">￥{{lockMoney}}</span>
              </p>
            </router-link>
            <router-link class="my-vip-bottom ho" :to="{ name: '充值'}">
              <div>
                <i class="fa fa-credit-card-alt fa-sm" style="margin-left: -2px;"></i>
              </div>
              <p>
                <span>充值</span><i class="fa fa-angle-right fa-lg"></i>
              </p>
            </router-link>
             <a class="my-vip-bottom ho" @click="modal = true">
               <div>
                <i class="fa fa-money fa-lg" style="margin-left: -2px;"></i>
              </div>
              <p>
                <span>提现</span><i class="fa fa-angle-right fa-lg"></i>
              </p>
            </a>
          </section>

                <mt-popup v-model="modal" position="bottom" style="width: 100%;height: 100%;">
                        <mt-header title="提现申请">
                                <mt-button icon="back" slot="left" @click="modal = false"></mt-button>
                        </mt-header>
                        <div style="padding-top: 40px;">
                               <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model="withdrawCashApply.bankCard"></mt-field> 
                                <a class="mint-cell mint-field" @click="modal2 = true">
                                        <div class="mint-cell-left"></div>
                                        <div class="mint-cell-wrapper">
                                                <div class="mint-cell-title">
                                                        <span class="mint-cell-text">银行卡类型</span></div>
                                                <div class="mint-cell-value" style="position: relative;">
                                                        <div>{{withdrawCashApply.bankName?withdrawCashApply.bankName:'选择银行卡类型'}}</div>
                                                        <i class="fa fa-angle-right fa-lg" style="position: absolute;right: 10px;font-size: 14px;top: 4px;"></i>
                                                        <div class="mint-field-clear" style="display: none;">
                                                                <i class="mintui mintui-field-error"></i>
                                                        </div>
                                                        <span class="mint-field-state is-default">
                                                                <i class="mintui mintui-field-default"></i>
                                                        </span>
                                                        <div class="mint-field-other"></div>
                                                </div>
                                        </div>
                                        <div class="mint-cell-right"></div>
                                </a>
                                <mt-field label="提现金额" type="number" placeholder="请输入提现金额" v-model="withdrawCashApply.money"></mt-field> 
                              <div style="padding: 20px;">
                                    <mt-button @click="withdrawCashApplySubmit" type="primary" size="large">提现</mt-button>
                              </div>
                                
                        </div>
                </mt-popup>
                <mt-popup v-model="modal2" position="bottom" style="width: 100%;height: 30%;" >
                        <mt-picker :slots="slot" @change="bankNameChange"></mt-picker>
                </mt-popup>
         

      </div>
      <!-- <v-baseline></v-baseline> -->
    </div>
</template>

<script>
// import * as mockData from '@/http/mock.js' //模拟数据

import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Badge, Header, Popup, Field, Picker, Toast, Button } from 'mint-ui';
import userService from '@/api/userService';
import common from '@/util/common';

export default {
  components: {
    'v-baseline': Baseline,
    'v-footer': Footer,
    'mt-badge': Badge,
    'mt-header': Header,
    'mt-popup': Popup,
    'mt-field': Field,
    'mt-picker': Picker,
    'mt-button': Button
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyMoney();
  },
  data() {
    return {
      money: 0.0,
      lockMoney: 0.0,
      modal: false,
      modal2: false,
      withdrawCashApply: {
        bankCard: '',
        bankName: '',
        money: ''
      },
      slot: [
        {
          flex: 1,
          values: ['中国农业银行', '中国建设银行', '中国工商银行', '交通银行', '中国邮政储蓄银行', '中国银行', '中国光大银行', '招商银行', '浦发银行', '华夏银行', '中国民生银行', '广发银行', '平安银行', '兴业银行', '恒丰银行', '浙商银行', '渤海银行', '其他'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
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
        this.lockMoney = res.data.lockMoney || this.lockMoney;
      })
    },
    bankNameChange(picker, values) {
      console.log(picker, values);
      if (!common.isEmpty(values[0])) {
        this.withdrawCashApply.bankName = values[0];
      }
    },
    withdrawCashApplySubmit() {
      if (!this.verify()) return;
      userService.withdrawCashApply(this.withdrawCashApply.bankCard, this.withdrawCashApply.bankName, this.withdrawCashApply.money).then(res => {
        if (!common.isOk(res)) return
        Toast({
          message: '成功提交申请',
          iconClass: 'fa fa-check',
          duration: 500
        });
        this.modal = false;
      })
    },
    verify() {
      console.log(this.withdrawCashApply);
      if (common.isEmpty(this.withdrawCashApply.bankCard)) {
        Toast("请输入银行卡号");
        return false
      }
      if (common.isEmpty(this.withdrawCashApply.bankName)) {
        Toast("请选择银行卡类型");
        return false
      }
      if (common.isEmpty(this.withdrawCashApply.money)) {
        Toast("请输入提现金额");
        return false
      }
      if (String(this.withdrawCashApply.money).split(".").length > 2) {
        Toast("请输入正确的提现金额");
        return false
      }
      if (isNaN(this.withdrawCashApply.money) || this.withdrawCashApply.money <= 0) {
        Toast("请输入正确的提现金额");
        return false
      }
      return true
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
            top: 1.5vw;
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
