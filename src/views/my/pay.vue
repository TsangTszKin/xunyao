<template lang="html">

<div class="pay">
        <v-header class="mint-header">
                <h1 slot="title">订单详情</h1></v-header>
        <div class="v-content">
         
                <mt-radio  title="收货方式" align="right" v-model="order.getType" :options="[{label: '到店自取',value: 1, disabled: true},{label: '货到付款',value: 2, disabled: true}]"></mt-radio>
                <div class="pay-address" v-if="order.getType == 2">
                        <div>
                                <p class="main-address-per">收货人:
                                        <span>{{receiver.receiverName}}</span></p>
                                <p class="main-address-tel">{{receiver.receiverPhone}}</p></div>
                        <p>收货地址:
                                <span>{{receiver.province}}{{receiver.city}}{{receiver.district}}{{receiver.receiverAddress}}</span></p>
                        <i class="fa fa-angle-right fa-lg" style="position: absolute;top: 53px;right: 5px;"></i>
                </div>
                <div class="shop-order" >
                        <ul class="shop-panel">
                                <li>
                                        <div class="shop-info">
                                                <img :src="order.shopLogo">
                                                <span>{{order.shopName}}</span></div>
                                        <ul class="something">
                                                <li v-for="(item2,i2) in order.orderItemlist" :key="i2">
                                                        <div class="something-middle">
                                                                <img :src="item2.productImg"></div>
                                                        <div class="something-right">
                                                                <p>{{item2.productName}}</p>
                                                                <p style="color:rgb(199, 108, 28)">{{item2.specification}}</p>
                                                                <p>￥{{item2.discountPrice}}
                                                                        <span style="position: absolute;right: 0;">x {{item2.quantity}}</span></p>
                                                                <p class="count"></p>
                                                        </div>
                                                </li>
                                        </ul>
                                </li>
                        </ul>
                        <div class="pay-address" style="padding-left: 3vw" v-if="order.getType == 2">
                                <div>
                                        <p class="main-address-per" style="line-height: 32px;">好友代收</p>
                                        <p class="main-address-tel">
                                                <mt-switch disabled :value="order.insteadBuyerId?true:false"></mt-switch>
                                        </p>
                                </div>
                        </div>
                        <a class="mint-cell mint-field" v-if="insteadBuyerId">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">代收好友</span></div>
                                        <div class="mint-cell-value" style="position: relative;" >
                                                <div>{{order.insteadBuyerName?order.insteadBuyerName:'无'}}</div>
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
                        <!-- <mt-field label="配送时间" placeholder="" type="text" :readonly="true" :disableClear="true" :value="deliveryTime"></mt-field> -->
                        <mt-field label="留言" placeholder="给店家留言" type="textarea" rows="1" v-model="order.memo"></mt-field>
                        <a class="mint-cell mint-field" >
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">抵扣券</span></div>
                                        <div class="mint-cell-value" style="position: relative;">
                                                <div>{{order.couponId?order.couponName:'无'}}</div>
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
                </div>
                <!-- <div style="height: 55px"></div> -->
        </div>
        <v-footer :totalPrice="order.totalPrice" :sureFee="order.sureFee" :postFee="order.postFee" ></v-footer>
</div>

</template>

<script>
import Util from '@/util/common'
import Header from '@/common/_header.vue'
import Footer from '@/components/user/order/footer.vue';
import AddressPicker from '@/components/AddressPicker';
import FriendsPicker from '@/components/FriendsPicker';
import $ from 'jquery';
import Cell from '@/components/user/ticket/Cell';
import userService from '@/api/userService';
import shopService from '@/api/shopService';
import cartService from '@/api/cartService';
import { MessageBox, Radio, Field, Switch, Popup, Picker, Indicator, Toast } from 'mint-ui';
import common from '@/util/common';

export default {
  components: {
    'v-header': Header,
    'v-footer': Footer,
    'mt-radio': Radio,
    'mt-field': Field,
    'mt-switch': Switch,
    'mt-popup': Popup,
    AddressPicker,
    FriendsPicker,
    'mt-picker': Picker,
    'v-ticket-cell': Cell
  },
  data() {
    return {
      totalMoney: 0,
      activityList: [],
      currentShopIndex: 0,
      order: {},
      receiver: {}
    }
  },

  computed: {
    insteadBuyerId() {
      if (common.isEmpty(this.order.insteadBuyerId)) {
        return false
      } else {
        return true
      }
    }

  },

  mounted() {


    window.scrollTo(0, 0);

    this.getOrderInfo(this.$route.params.id);

  },

  methods: {

    getOrderInfo(id) {
      let self = this;
      shopService.getOrderInfo(id).then(res => {
        if (!common.isOk(res)) return
        self.receiver = res.data.receiver;
        self.order = res.data.tOrder;
      })
    }
  },
  watch: {

  }

}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

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
    background: url("../../assets/images/order2.jpg");
    background-repeat: no-repeat; //不重复
    background-size: 100%; // 满屏
    padding: 8px 0 0 0;
    margin-top: 10px;
    margin-bottom: 55px;
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
                background: url("../../assets/car/images/t.svg") no-repeat
                  center center/50% 50%;
                input {
                  height: 14vw;
                  width: 14vw;
                  opacity: 0;
                  filter: alpha(opacity=0);
                }
              }
              .false {
                background: url("../../assets/car/images/f.svg") no-repeat
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
                  background: url("../../assets/car/images/laji.svg") no-repeat
                    center/50%;
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
