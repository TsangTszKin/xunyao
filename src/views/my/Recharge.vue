<template lang="html">

  <div class="recharge">

    <mt-header title="充值">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

      <div class="v-content">
          <mt-field label="充值金额" :disableClear="true" :readonly="true"></mt-field>
          <div class="denomination">
            <v-denomination v-for="(n, k) in moneyList" :key="k" :money="n" :isSelected="money == n" @change="(data)=>{money = data}" v-if="k < 3" />
          </div>
          <div class="denomination">
            <v-denomination v-for="(n, k) in moneyList" :key="k" :money="n" :isSelected="money == n" @change="(data)=>{money = data}" v-if="k >= 3" />
              <v-denomination :money="0" :isSelected="money == 0" @change="(data)=>{money = data}" :type="2" @click.native="showBox" />
          </div>
          <mt-field label="支付方式" :disableClear="true" :readonly="true" style="margin-top: 20px;"></mt-field>
          <mt-checklist
            align="right"
            title=""
            :value="[1]"
            :options="[
              {
                label: '微信支付',
                value: 1,
                disabled: true
              }
            ]">
          </mt-checklist>
          <footer class="footer">
            <p class="prefix">共计<span style="    color: #000;">￥</span><span style="    color: #000;
    font-size: 20px;
    font-weight: bold;">{{money}}</span></p>
            <div  class="v-btn">
              <mt-button style="width: 100%;height: 100%;" type="primary" size="small" @click="reCharge">立即充值</mt-button>
            </div>
          </footer>
      </div>
    </div>
</template>

<script>

import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { Badge, Header, Button, Field, Checklist, Toast, MessageBox } from 'mint-ui';
import Denomination from '@/components/user/wallet/Denomination';
import userService from '@/api/userService';
import common from '@/util/common';

export default {
  components: {
    'mt-header': Header,
    'v-denomination': Denomination,
    'mt-button': Button,
    'mt-field': Field,
    'mt-checklist': Checklist
  },
  data() {
    return {
      money: 30,
      moneyList: [30, 50, 100, 200, 500],
      WCPay: {
        "appId": "",     //公众号名称，由商户传入     
        "timeStamp": "",         //时间戳，自1970年以来的秒数     
        "nonceStr": "", //随机串     
        "package": "",
        "signType": "",         //微信签名方式：     
        "paySign": "" //微信签名 
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
  },
  methods: {
    reCharge() {
      let self = this;
      userService.reChargeOrder(this.money).then(res => {
        if (!common.isOk(res)) return
        let data = res.data.result;
        this.WCPay.appId = data.appId;
        this.WCPay.nonceStr = data.nonceStr;
        this.WCPay.timeStamp = data.timeStamp;
        this.WCPay.package = data.packageValue;
        this.WCPay.signType = data.signType;
        this.WCPay.paySign = data.paySign;
        this.goPay();
      })
    },
    showBox() {
      let self = this;
      MessageBox.prompt('请输入金额').then(({ value, action }) => {
        console.log(value);
        if (isNaN(value)) {
          Toast("请输入正确的金额");
          return
        }
        self.money = value;
        // self.reCharge();
      });
    },
    goPay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.weChatPayInit(), false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.weChatPayInit());
          document.attachEvent('onWeixinJSBridgeReady', this.weChatPayInit());
        }
      } else {
        this.weChatPayInit();
      }
    },
    weChatPayInit() {
      let self = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', this.WCPay,
        function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // let timer = Toast({
            //   message: '充值成功',
            //   iconClass: 'fa fa-check'
            // });
            // setTimeout(() => {
            //   timer.close();
            //   self.$router.push({ name: '钱包' });
            // }, 500);

            MessageBox({
              title: '提示',
              message: '充值成功',
              showCancelButton: true,
              confirmButtonText: '继续充值',
              cancelButtonText: '查看钱包'
            }).then(action => {
              console.log("right", action);
              if (action === 'confirm') {//去查看
                // this.$router.push({ name: '我的订单', params: { status: '1' } })
              } else if (action === 'cancel') {//返回首页
                // this.$router.push({ name: '首页' })
                self.$router.go(-1);
              }
            }).catch(action => {
              console.log("left", action);
            });
          }
        });
    }
  }
}
</script>

<style lang="less" scoped>
.recharge {
  > .v-content {
    > .denomination {
      // padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      align-content: center;
    }
    > .footer {
      height: 60px;
      display: flex;
      width: 100%;
      position: fixed;
      bottom: 0;
      // z-index: 9999;
      > .prefix {
        flex: 3;
        line-height: 60px;
        text-align: center;
      }
      > .v-btn {
        flex: 5;
        height: 40px;
        padding: 10px;
      }
    }
  }
}
</style>
