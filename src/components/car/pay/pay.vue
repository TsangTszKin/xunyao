<template lang="html">

  <div class="pay">
    <v-header class="mint-header">
      <h1 slot="title">确认订单</h1>
    </v-header>

    <div class="v-content">
    <mt-radio
      title="收货方式"
       align="right"
      v-model="saveData.takeWay"
      :options="[{label: '到店自取',value: '0'},{label: '货到付款',value: '1'}]">
    </mt-radio>
    

    <div class="pay-address" v-if="saveData.takeWay === '1'" @click="modal.address = true">
      <div>
        <p class="main-address-per">收货人:<span>王先生</span></p>
        <p class="main-address-tel">15985698749</p>
      </div>
      <p>收货地址:<span>河南省郑州市中原区秦岭路8号院59号单元28层15号东户第三家</span></p>
      <i class="fa fa-angle-right fa-lg" style="    position: absolute;
    top: 53px;
    right: 5px;"></i>
    </div>

    <div class="pay-address" style="padding-left: 3vw">
      <div>
        <p class="main-address-per" style="line-height: 32px;"> 好友代取</p>
        <p class="main-address-tel"><mt-switch v-model="saveData.isFriendGet"></mt-switch></p>
      </div>
    </div>

    <a class="mint-cell mint-field" v-if="saveData.isFriendGet"  >
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">代取好友</span>
          <!---->
        </div>
        <div class="mint-cell-value" style="position: relative;">
          <div @click="modal.friends = true">
            {{saveData.friend}}
            
          </div>
          <router-link :to="{path:'/search'}" >
          <i class="fa fa-search fa-lg" style="position: absolute;
    right: 10px;
    font-size: 14px;top: 4px;"></i>
   </router-link>
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
      <!---->
    </a>

    <a class="mint-cell mint-field" v-if="saveData.takeWay === '1'" @click="modal.sendTime = true">
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">配送时间</span>
          <!---->
        </div>
        <div class="mint-cell-value">
          <div>
            {{saveData.sendTime+'小时后配送'}}
          </div>
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
      <!---->
    </a>


    
    <!-- <v-picker @getValue="getValue" :isShow="isShowPicker" /> -->

    <mt-field label="留言" placeholder="买家留言" type="textarea" rows="1" v-modal="saveData.remark"></mt-field>

    <a class="mint-cell mint-field"  @click="modal.coupon1 = true">
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">保证金抵扣券</span>
          <!---->
        </div>
        <div class="mint-cell-value">
          <div>
            {{saveData.coupon1}}
          </div>
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
      <!---->
    </a>

    <a class="mint-cell mint-field" @click="modal.coupon2 = true">
      <!---->
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <!---->
          <span class="mint-cell-text">配送费抵扣券</span>
          <!---->
        </div>
        <div class="mint-cell-value">
          <div>
            {{saveData.coupon2}}
            
          </div>
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
      <!---->
    </a>

    

    <!-- <mt-field label="保证金抵扣券" type="text" :value="saveData.coupon1"></mt-field> -->
    <!-- <mt-field label="配送费抵扣券" type="text" :value="saveData.coupon2"></mt-field> -->

    <div class="pay-product">
      <ul v-if="!confirm">
        <li v-for="k in carList">
          <a>
            <img :src="k.imgPath" alt="">
            <div>
              <h2><span style="color:#ee7150"> {{k.size}} - {{k.col}} </span>- {{k.title}} -</h2>
              <p>{{k.price}} 元</p>
            </div>
          </a>
        </li>
      </ul>

      <!-- 支付成功后的提示 -->
      <!-- <div class="pay-confirm" v-else>
        支付成功!!!</br>
        当页面数据清空</br>
        购物车列表重新设置
      </div> -->
    </div>

        <mt-popup
            v-model="modal.address"
            position="bottom"
            style="width: 100%;"
            >
            <AddressPicker />
        </mt-popup>
        <mt-popup
            v-model="modal.friends"
            position="bottom"
            style="width: 100%;"
            >
            <FriendsPicker />
        </mt-popup>
    
        <mt-popup
            v-model="modal.coupon1"
            position="bottom"
            style="width: 100%;"
            >
            <mt-picker :slots="pickerData.coupon1" ></mt-picker>
        </mt-popup>

        <mt-popup
            v-model="modal.coupon2"
            position="bottom"
            style="width: 100%;"
            >
            <mt-picker :slots="pickerData.coupon2" ></mt-picker>
        </mt-popup>

         <mt-popup
            v-model="modal.sendTime"
            position="bottom"
            style="width: 100%;"
            >
            <mt-picker :slots="pickerData.sendTime" ></mt-picker>
        </mt-popup>
    </div>

    <v-footer :totalMoney="totalMoney" ></v-footer>

  </div>
</template>

<script>
import Util from '../../../util/common'
import Header from '@/common/_header.vue'
import Footer from '@/components/car/pay/footer.vue';
// import Picker from '@/components/Picker';
import AddressPicker from '@/components/AddressPicker';
import FriendsPicker from '@/components/FriendsPicker';
import $ from 'jquery';

import {
  MessageBox, Radio, Field, Switch, Popup, Picker
} from 'mint-ui';

export default {
  components: {
    'v-header': Header,
    'v-footer': Footer,
    'mt-radio': Radio,
    'mt-field': Field,
    // 'v-picker': Picker,
    'mt-switch': Switch,
    'mt-popup': Popup,
    AddressPicker,
    FriendsPicker,
    'mt-picker': Picker
  },
  data() {
    return {
      modal: {
        address: false,
        friends: false,
        coupon1: false,
        coupon2: false,
        sendTime: false
      },
      pickerData: {
        coupon1: [
          {
            flex: 1,
            values: ['-10', '-15', '-30'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        coupon2: [
          {
            flex: 1,
            values: ['-15', '-20', '-30'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        sendTime: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      },
      confirm: '',
      totalMoney: 0,
      saveData: {
        takeWay: '0',//0到店自取.1货到付款
        contact: {
          name: '',
          mobile: '',
          address: ''
        },
        sendTime: '1',
        isFriendGet: false,
        friend: '李小白',
        remark: '',
        coupon1: '-10',
        coupon2: '-5'
      },
      // slots: ,
      isShowPicker: false

    }
  },

  computed: {

    //所有商品列表
    carList() {

      return this.$store.state.detail.selectedList
    },

    // 商品价格总和
    allpay() {
      let allpay = 0, selectedList = this.carList
      for (let i = 0; i < selectedList.length; i++) {
        allpay += selectedList[i].price
      }
      return allpay
    }
  },
  mounted() {
    // 防止页面刷新后数据丢失
    if (this.$store.state.detail.selectedList == '') {
      this.$store.commit('SET_SELECTEDLIST')
    }

    let allpay = 0, selectedList = this.$store.state.detail.selectedList
    for (let i = 0; i < selectedList.length; i++) {
      allpay += selectedList[i].price
    }
    this.totalMoney = allpay;


    $(".v-picker").height($('#app').height());
    let tempArray = [];
    for (let i = 1; i <= 24; i++) {
      tempArray.push({
        name: `${i}小时后派送`,
        value: i
      })
    }
    this.slots[0].values = tempArray;
  },

  methods: {
    payConfirm() {
      if (this.carList) { //还未提交了订单,数据还未清空
        MessageBox
          .confirm(
            `确定支付${this.allpay}元`
          )
          .then(action => { //点击成功执行这里的函数
            this.confirm = false;
            this.$store.commit('SET_LOADING', true);
            this.$store.dispatch('resetCarList'); //重置购物车（用unSelectedList替换）
            this.$store.dispatch('resetCount'); //重置购物车数量
            setTimeout(() => {
              this.$store.commit('SET_LOADING', false); //关闭loading
              this.confirm = true; //支付完成后切换视图
            }, 300)
          }, function (err) {
            //点击取消执行这里的函数
          });
      } else { //提交了订单,数据清空
        alert('请勿重复提交订单')
      }

    },
    onValuesChange(picker, values) {
      // if (values[0] > values[1]) {
      //   picker.setSlotValue(1, values[0]);
      // }
    },
    getValue(value) {
      this.isShowPicker = false;
      this.saveData.sendTime = value;
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";
.pay {
  width: 100%;
  background-color: #f7f7f7;

  .pay-address {
    background-color: #fff;
    border-bottom: 1 * 10vw/75 solid #dedede;
    padding: 30 * 10vw/75;
    position: relative;
    > div {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-between;
      padding-right: 17px;
      p {
        color: #868686;
        .fz(font-size, 32px);
        padding-right: 5px;
      }
      i {
        position: absolute;
        right: 10px;
        top: 54px;
      }
    }

    > p {
      .fz(font-size, 28px);
      color: #868686;
      padding-top: 30 * 10vw/75;
      letter-spacing: 3 * 10vw/75;
      line-height: 45 * 10vw/75;
    }
  }
  .pay-product {
    background-color: #fff;
    height: 60vw;
    overflow: auto;

    li {
      a {
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        box-sizing: border-box;
        padding: 20 * 10vw/75 30 * 10vw/75;
        color: #4d4d4d;
        .fz(font-size, 30px);
        border-bottom: 1 * 10vw/75 solid #dedede;

        > img {
          display: block;
          width: 2.5 * 10vw;
          height: 2.5 * 10vw;
        }

        > div {
          box-sizing: border-box;
          padding-left: 50 * 10vw/75;
          width: 70%;
          h2 {
            padding-top: 0.09 * 10vw;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          p {
            text-align: right;
            .fz(font-size, 24px);
            padding-top: 1.4 * 10vw;
          }
        }
      }
    }
  }

  .pay-allpay {
    text-align: right;
    margin-top: 6vw;
    padding: 4vw 5vw;
    .fz(font-size, 32px);
    color: #999999;
    background-color: #fff;
    i,
    span {
      color: @cl;
    }
  }

  .pay-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 4vw;
    span {
      display: block;
      width: 85%;
      background-color: #fd729c;
      border-radius: 1.3vw;
      color: #fff;
      font-size: 17px;
      padding: 4vw;
      margin: 0 auto;
      text-align: center;
      &:active {
        background-color: @cl;
      }
    }
  }

  .pay-confirm {
    padding: 20px 0;
    background-color: @cl;
    text-align: center;
    color: #fff;
    line-height: 30px;
    .fz(font-size, 40);
  }
  .mint-field-core {
    text-align: right;
  }
}
</style>
