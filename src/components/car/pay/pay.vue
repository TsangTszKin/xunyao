<template lang="html">

<div class="pay">
        <v-header class="mint-header">
                <h1 slot="title">确认订单</h1></v-header>
        <div class="v-content">
                <mt-radio title="收货方式" align="right" v-model="saveData.takeWay" :options="[{label: '到店自取',value: '0'},{label: '货到付款',value: '1'}]"></mt-radio>
                <div class="pay-address" v-if="saveData.takeWay === '1'" @click="modal.address = true">
                        <div>
                                <p class="main-address-per">收货人:
                                        <span>王先生</span></p>
                                <p class="main-address-tel">15985698749</p></div>
                        <p>收货地址:
                                <span>河南省郑州市中原区秦岭路8号院59号单元28层15号东户第三家</span></p>
                        <i class="fa fa-angle-right fa-lg" style="position: absolute;top: 53px;right: 5px;"></i>
                </div>

                <div class="shop-order" v-for="(item, i) in $store.state.cart.cartList" :key="i" v-if="item.productList.length > 0">

                        

                        <ul class="shop-panel" >
                            <li >
                              <div class="shop-info">
                                <img :src="item.shopLogo">
                                <span>{{item.shopName}}</span>
                                <!-- <i class="fa fa-angle-right fa-lg" @click="$router.push({name: '店铺主页', params: {id: item.shopId}})"></i> -->
                              </div>

                              <ul class="something">
                                <li v-for="(item2,i2) in item.productList" :key="i2">
                                    <!-- <div class="something-left" @click="toggle(i ,k.choseBool)">
                                      <label class="true" :class="{false:!k.choseBool}">
                                        <input type="checkbox" :value="k.choseBool">
                                      </label>
                                    </div> -->
                                    <div class="something-middle">
                                      <img :src="item2.img">
                                    </div>
                                    <div class="something-right">
                                      <p>{{item2.name}}</p>
                                      <p style="color:rgb(199, 108, 28)"> 
                                        <!-- {{k.col}} 
                                        -  -->
                                        {{item2.size}}
                                        </p>
                                      <p>￥{{item2.price}}<span style="position: absolute;right: 0;">x {{item2.count}}</span></p>
                                      <p class="count">
                                        
                                      </p>
                                    </div>
                                </li>

                              </ul>
                            </li>

                          </ul>

                          <div class="pay-address" style="padding-left: 3vw" v-if="saveData.takeWay == 1">
                                <div>
                                        <p class="main-address-per" style="line-height: 32px;">好友代收</p>
                                        <p class="main-address-tel">
                                                <mt-switch v-model="saveData.isFriendGet"></mt-switch>
                                        </p>
                                </div>
                        </div>
                        <a class="mint-cell mint-field" v-if="saveData.isFriendGet">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">代收好友</span>
                                        </div>
                                        <div class="mint-cell-value" style="position: relative;">
                                                <div @click="modal.friends = true">{{saveData.friend}}</div>
                                                <router-link :to="{name:'搜索页', params: {type: 'friends'}}">
                                                        <i class="fa fa-search fa-lg" style="position: absolute;right: 10px;font-size: 14px;top: 4px;"></i>
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
                        </a>
                        <a class="mint-cell mint-field" v-if="saveData.takeWay === '1'" @click="modal.sendTime = true">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">配送时间</span>
                                        </div>
                                        <div class="mint-cell-value">
                                                <div>{{saveData.sendTime+'小时后配送'}}</div>
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
                        <mt-field label="留言" placeholder="买家留言" type="textarea" rows="1" v-modal="saveData.remark"></mt-field>
                        <a class="mint-cell mint-field" @click="modal.coupon1 = true">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">保证金抵扣券</span>
                                        </div>
                                        <div class="mint-cell-value">
                                                <div>{{saveData.coupon1}}</div>
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
                        <a class="mint-cell mint-field" @click="modal.coupon2 = true">
                                
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">配送费抵扣券</span>
                                        </div>
                                        <div class="mint-cell-value">
                                                <div>{{saveData.coupon2}}</div>
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

                 </div>
                 <div style="height: 55px"></div>
                <mt-popup v-model="modal.address" position="bottom" style="width: 100%;">
                        <AddressPicker /></mt-popup>
                <mt-popup v-model="modal.friends" position="bottom" style="width: 100%;">
                        <FriendsPicker /></mt-popup>
                <mt-popup v-model="modal.coupon1" position="bottom" style="width: 100%;">
                        <mt-picker :slots="pickerData.coupon1"></mt-picker>
                </mt-popup>
                <mt-popup v-model="modal.coupon2" position="bottom" style="width: 100%;">
                        <mt-picker :slots="pickerData.coupon2"></mt-picker>
                </mt-popup>
                <mt-popup v-model="modal.sendTime" position="bottom" style="width: 100%;">
                        <mt-picker :slots="pickerData.sendTime"></mt-picker>
                </mt-popup>
        </div>
        <v-footer :totalMoney="totalMoney"></v-footer>
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
  // height: 100%;
  .pay-address {
    background-color: #fff;
    border-top: 1 * 10vw/75 solid #dedede;
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
  > .v-content .shop-order {
    background: url("../../../assets/images/order2.jpg");
    background-repeat: no-repeat; //不重复
    background-size: 100%; // 满屏
    padding: 8px 0 0 0;
    margin-top: 10px;
    > ul.shop-panel {
      // margin: 10px;
      padding: 10px;
      // border: 1px solid #dcdcdcc7;
      // border-radius: 8px;
      > li {
        > .shop-info {
          > img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          > span {
            color: #000;
            font-size: 13px;
            margin: 0 5px;
          }
          > i {
            color: #ccc;
          }
        }

        .something {
          width: 100%;
          > li {
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 4vw 2vw;
            position: relative;
            height: 26vw;
            .bd();
            .something-left {
              -ms-flex: 2;
              -webkit-box-flex: 2;
              flex: 2;

              label {
                float: left;
                background: url("../../../assets/car/images/t.svg") no-repeat
                  center center/50% 50%;
                input {
                  height: 14vw;
                  width: 14vw;
                  opacity: 0;
                  filter: alpha(opacity=0);
                }
              }
              .false {
                background: url("../../../assets/car/images/f.svg") no-repeat
                  center center / 50% 50% !important;
              }
            }
            .something-middle {
              -ms-flex: 3;
              -webkit-box-flex: 3;
              flex: 3;
              height: 26vw;
              padding-left: 2vw;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .something-right {
              -ms-flex: 7;
              -webkit-box-flex: 7;
              flex: 7;
              height: 100%;
              display: -ms-flex;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-flow: column wrap;
              flex-flow: column wrap;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
              padding-left: 6vw;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;

              position: relative;
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                .fz(font-size, 26);
              }
              p:last-of-type {
                .fz(font-size, 22);
                color: rgb(168, 168, 168);
              }
              > p.count {
                > input {
                  width: 30px;
                  border: 1px solid gainsboro;
                  margin-top: -2px;
                  text-align: center;
                }
              }
              .something-right-bottom {
                > div {
                  display: -ms-flex;
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
                  align-items: center;
                  input {
                    width: 6vw;
                    text-align: center;
                  }

                  span {
                    height: 7vw;
                    line-height: 7vw;
                    width: 8vw;
                    display: inline-block;
                    border: 0.2vw solid #f1f1f1;
                    border-radius: 1vw;
                    text-align: center;
                    font-size: 20px;
                    cursor: pointer;
                  }
                }
                > span {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 13vw;
                  height: 13vw;
                  background: url("../../../assets/car/images/laji.svg")
                    no-repeat center/50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
