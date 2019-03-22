<template lang="html">

<div class="pay">
     
         <mt-header title="确认订单">
          <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>

        <div class="v-content">
                <div class="shop-order" v-for="(item, i) in $store.state.cart.cartList" :key="i" v-if="item.cartList.length > 0">
                        <ul class="shop-panel">
                                <li>
                                        <div class="shop-info">
                                                <img :src="item.shopLogo">
                                                <span>{{item.shopName}}</span></div>
                                        <ul class="something">
                                                <li v-for="(item2,i2) in item.cartList" :key="i2">
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
                        <mt-radio
                          title="收货方式"
                          v-model="saveData[i].getType"
                          @click.native="currentShopIndex = i"
                          :options="[{
                            label: '到店自取',
                            value: '1'
                          },{
                            label: '货到付款',
                            value: '2'
                          }]"
                          class="sex-box"
                          style="background-color: #fff;"
                        ></mt-radio>
                        <div class="pay-address" v-if="saveData[i].getType == '2'" @click="modal.address = true;currentShopIndex = i">
                            <div>
                                  <p class="main-address-per">收货人:
                                          <span>{{saveData[i].receiverName}}</span></p>
                                  <p class="main-address-tel">{{saveData[i].receiverPhone}}</p>
                            </div>
                            <p>收货地址:
                                  <span>{{saveData[i].address}}</span>
                            </p>
                            <i class="fa fa-angle-right fa-lg" style="position: absolute;top: 53px;right: 5px;"></i>
                       </div>
                        <div class="pay-address" style="padding-left: 3vw" v-if="saveData[i].getType == 2">
                                <div>
                                        <p class="main-address-per" style="line-height: 32px;">好友代收</p>
                                        <p class="main-address-tel">
                                                <mt-switch v-model="saveData[i].isFriendGet"></mt-switch>
                                        </p>
                                </div>
                        </div>
                        <a class="mint-cell mint-field" v-if="saveData[i].isFriendGet">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">代收好友</span></div>
                                        <div class="mint-cell-value" style="position: relative;" @click="modal.friends = true;currentShopIndex = i">
                                                <div>{{saveData[i].insteadBuyerName?saveData[i].insteadBuyerName:'无'}}</div>
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
                        <a class="mint-cell mint-field" @click="modal.limitHour = true;currentShopIndex = i;">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">{{mainData.getType == '1'?'自取时间':'送货时间'}}</span></div>
                                        <div class="mint-cell-value" style="position: relative;">
                                                <div>{{saveData[i].limitHour?saveData[i].limitHour+'小时内':'选择时间'}}</div>
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
                        <mt-field label="营业时间" :placeholder="saveData[i].businessTime" type="text" :readonly="true" :disableClear="true"></mt-field>
                        <mt-field label="留言" placeholder="给店家留言" type="textarea" rows="1" v-model="saveData[i].memo"></mt-field>
                        <a class="mint-cell mint-field" @click="getBuyerCouponForShop(saveData[i].shopId);currentShopIndex = i;">
                                <div class="mint-cell-left"></div>
                                <div class="mint-cell-wrapper">
                                        <div class="mint-cell-title">
                                                <span class="mint-cell-text">抵扣券</span></div>
                                        <div class="mint-cell-value" style="position: relative;">
                                                <div>{{saveData[i].couponId?saveData[i].couponName:'选择优惠券'}}</div>
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
                        <mt-field label="邮费" :placeholder="saveData[i].postage?`${saveData[i].postage}元`:'无'" type="text" :readonly="true" :disableClear="true"></mt-field>
                </div>
                <div style="height: 55px"></div>
                <mt-popup v-model="modal.address" position="bottom" style="width: 100%;height: 100%;">
                        <mt-header title="选择收货地址">
                                <mt-button icon="back" slot="left" @click="modal.address = false"></mt-button>
                                <i class="fa fa-plus fa-lg" slot="right" style="font-size: 12px;" @click="$router.push({path: '/addressSave'})">新增地址</i></mt-header>
                        <div style="padding-top: 40px;">
                                <AddressPicker @selectAddress="selectAddress" /></div>
                </mt-popup>
                <mt-popup v-model="modal.friends" position="bottom" style="width: 100%;height: 100%;">
                        <mt-header title="选择代收好友">
                                <mt-button icon="back" slot="left" @click="modal.friends = false"></mt-button>
                                <!-- <mt-button icon="search" slot="right" @click="$router.push({name: '搜索页', params:{type: 'friends'}})"></mt-button> -->
                        </mt-header>
                        <div style="padding-top: 40px;">
                                <FriendsPicker />
                        </div>
                </mt-popup>
                <mt-popup v-model="modal.coupon1" position="bottom" style="width: 100%;height: 100%;">
                        <mt-header title="选择优惠券">
                                <mt-button icon="back" slot="left" @click="modal.coupon1 = false"></mt-button>
                        </mt-header>
                        <div style="padding-top: 40px;">
                                <v-ticket-cell 
                                  v-for="(n, key) in activityList"
                                  :data="n"
                                  :key="key"
                                  :type="0"
                                  @callBack="selectCoupon"
                                />
                        </div>
                        <v-baseline />
                </mt-popup>
                <mt-popup v-model="modal.limitHour" position="bottom" style="width: 100%;height: 30%;" v-if="$store.state.cart.cartList.length > 0">
                        <mt-picker v-if="saveData[currentShopIndex].getType == 1" :slots="slot1" @change="limitHourChange"></mt-picker>
                        <mt-picker v-else :slots="slot2" @change="limitHourChange"></mt-picker>
                </mt-popup>
        </div>
        <v-footer @submitCart="submitCart" v-if="$store.state.cart.cartList.length > 0"></v-footer>
</div>

</template>

<script>
import Header from '@/common/_header.vue'
import Footer from '@/components/car/pay/footer.vue';
import AddressPicker from '@/components/AddressPicker';
import FriendsPicker from '@/components/FriendsPicker';
import $ from 'jquery';
import Cell from '@/components/user/ticket/Cell';
import userService from '@/api/userService';
import shopService from '@/api/shopService';
import cartService from '@/api/cartService';
import { MessageBox, Radio, Field, Switch, Popup, Picker, Indicator, Toast } from 'mint-ui';
import common from '@/util/common';
import bus from '@/util/bus';
import Baseline from '@/common/_baseline.vue';

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
    'v-ticket-cell': Cell,
    'v-baseline': Baseline,
  },
  data() {
    return {
      modal: {
        address: false,
        friends: false,
        coupon1: false,
        limitHour: false
      },
      friend: {
        name: '李小白',
        id: '',
        phone: ''
      },
      totalFee: this.$store.state.cart.totalFee,
      sureFee: this.$store.state.cart.sureFee,
      saveData: [],
      activityList: [],
      currentShopIndex: 0,
      mainData: {
        getType: '1',
        address: {
          "id": 1,
          "createBy": null,
          "createDate": null,
          "updateBy": "",
          "updateDate": "",
          "delFlag": "0",
          "remarks": null,
          "buyerId": 7,
          "receiverName": "",
          "provinceId": null,
          "province": "",
          "cityId": null,
          "city": "",
          "districtId": null,
          "district": "",
          "receiverPhone": "",
          "receiverAddress": "",
          "postcode": null,
          "isDefault": "1",
          "isLabel": null
        }
      },
      couponList: [],
      slot1: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slot2: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },

  computed: {
    //所有商品列表
    carList() {
      return this.$store.state.detail.selectedList
    },
    deliveryTime() {
      return this.$store.state.cart.deliveryTime + '~' + this.$store.state.cart.deliveryTime2
    },
  },
  beforeMount() {
    console.log("this.$store.state.cart.cartList", this.$store.state.cart.cartList)
    this.saveData = this.$store.state.cart.cartList;
    this.initSlots();
  },
  mounted() {

    if (this.$store.state.cart.cartList.length == 0){
      this.$router.push({name: '购物车'});
    }

    window.scrollTo(0, 0);
    this.listener();
    this.getDefaultAddress();

    this.saveData.forEach(element => {
      this.couponList.push(0);
      common.isEmpty(element.limitHour) ? element.limitHour = 6 : element.limitHour;
    });



    $(".v-picker").height($('#app').height());
  },

  methods: {
    limitHourChange(picker, values) {
      console.log(picker, values);
      if (!common.isEmpty(values[0])) {
        this.saveData[this.currentShopIndex]['limitHour'] = values[0];
      } else {
        this.saveData[this.currentShopIndex]['limitHour'] = 6;
      }

    },
    initSlots() {
      let arrayTemp1 = [];
      for (let i = 1; i <= 48; i++) {
        arrayTemp1.push(i);
      }
      let arrayTemp2 = [];
      for (let i = 1; i <= 24; i++) {
        arrayTemp2.push(i);
      }
      this.slot1[0].values = arrayTemp1;
      this.slot2[0].values = arrayTemp2;
    },
    listener() {
      bus.$on("car.pay.selectFriend", (insteadBuyerId, insteadBuyerName) => {
        console.log("this.saveData", this.saveData)
        console.log(this.currentShopIndex)
        console.log(insteadBuyerId, insteadBuyerName)
        // return
        this.saveData[this.currentShopIndex]['insteadBuyerId'] = insteadBuyerId;
        this.saveData[this.currentShopIndex]['insteadBuyerName'] = insteadBuyerName;
        this.modal.friends = false;
      })
    },
    getDefaultAddress() {
      userService.getDefaultAddress().then(res => {
        if (!common.isOk(res)) return
        this.saveData.forEach(element => {
          if (!common.isEmpty(res.data.data)) {
            element.address = `${res.data.data.province}${res.data.data.city}${res.data.data.district}${res.data.data.receiverAddress}`;
          } else {
            element.address = '';
          }

          element.receiverName = res.data.data.receiverName;
          element.receiverPhone = res.data.data.receiverPhone;
          element.receiverId = res.data.data.id;
        })
        this.resetCardList(this.packData());
      })
    },
    selectAddress(address) {
      console.log("address", address)
      this.modal.address = false;
      // this.saveData[this.currentShopIndex].address = address;
      this.saveData[this.currentShopIndex].address = `${address.province}${address.city}${address.district}${address.receiverAddress}`;
      this.saveData[this.currentShopIndex].receiverName = address.receiverName;
      this.saveData[this.currentShopIndex].receiverPhone = address.receiverPhone;
      this.saveData[this.currentShopIndex].receiverId = address.id;
      this.resetCardList(this.packData());
    },
    getBuyerCouponForShop(shopId) {
      this.modal.coupon1 = true;
      let totalFee = 0;
      let shop = this.$store.state.cart.cartData[shopId];
      shop.cartList.forEach(element => {
        totalFee += element.discountPrice * element.quantity;
      })
      shopService.getBuyerCouponForShop(totalFee, shopId).then(res => {
        if (!common.isOk(res)) return
        this.activityList = res.data.data;
      })
    },
    selectCoupon(coupon) {
      console.log(this.currentShopIndex, coupon)
      console.log(this.couponList);
      this.saveData[this.currentShopIndex].couponId = coupon.id;

      this.modal.coupon1 = false;
      this.couponList[this.currentShopIndex] = coupon.cash;

      switch (coupon.type) {
        case 1:
          this.saveData[this.currentShopIndex].couponName = `满${coupon.meet}免邮`;
          break;
        case 2:
          this.saveData[this.currentShopIndex].couponName = `满${coupon.meet}减${coupon.cash}现金`;
          // this.$store.commit('CHANGE_CART_TOTALFREE', totalFree - totalCash > 0 ? totalFree - totalCash : 0)
          break;
        case 3:
          this.saveData[this.currentShopIndex].couponName = `满${coupon.meet}减${coupon.cash}抵压金`;
          // this.$store.commit('CHANGE_CART_SUREFREE', sureFee - totalCash > 0 ? sureFee - totalCash : 0)
          break;

        default:
          break;
      }
      this.resetCardList(this.packData());
      // console.log(this.$store.state.cart.totalFee);


    },
    submitCart() {
      let params = this.packData();
      Indicator.open();
      cartService.submit(params).then(res => {
        Indicator.close();
        // if (!common.isOk(res)) return
        if (res.data.code != 0) {
          if (String(res.data.msg).indexOf('请充值') != -1) {
            MessageBox({
              title: '提示',
              message: '您的保证金余额不足！请先充值',
              showCancelButton: true,
              confirmButtonText: '去充值',
              cancelButtonText: '稍后再试'
            }).then(action => {
              console.log("right", action);
              if (action === 'confirm') {//去查看
                this.$router.push({ name: '充值' })
              }
            }).catch(action => {
              console.log("left", action);
            });
          }
          return
        } else {
          this.$store.commit("CHANGE_CART_LIST", []);
          this.$store.commit("CHANGE_CART_DATA", {});
          this.$store.commit("CHANGE_CART_SUREFREE", 0);
          this.$store.commit("CHANGE_CART_TOTALFREE", 0);
          Toast({
            message: '提交成功',
            iconClass: 'fa fa-check',
            duration: 500
          });
          setTimeout(() => {
            MessageBox({
              title: '提示',
              message: '是否查看订单？',
              showCancelButton: true,
              confirmButtonText: '去查看',
              cancelButtonText: '返回首页'
            }).then(action => {
              console.log("right", action);
              if (action === 'confirm') {//去查看
                this.$router.push({ name: '我的订单', params: { status: '1' } })
              } else if (action === 'cancel') {//返回首页
                this.$router.push({ name: '首页' })
              }
            }).catch(action => {
              console.log("left", action);
            });
          }, 500)
        }


      })
    },
    packData() {
      let data = {}
      this.saveData.forEach(element => {
        element.isFriendGet = element.isFriendGet || false;
        // element.address = `${element.address.province}${element.address.city}${element.address.district}${element.address.receiverAddress}`;
        data[element.shopId] = element;
      })
      console.log("data", data)
      return data
    },
    getOrderInfo(id) {
      shopService.getOrderInfo(id).then(res => {
        if (!common.isOk(res)) return

      })
    },
    resetCardList(params) {
      cartService.cartList(params).then(res => {
        if (!common.isOk(res)) return
        let data = res.data.data;
        let cartList = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            cartList.push(element);
          }
        }

        for (let i = 0; i < this.saveData.length; i++) {
          const element = this.saveData[i];
          cartList[i].receiverName = element.receiverName;
          cartList[i].receiverPhone = element.receiverPhone;
          cartList[i].isFriendGet = element.isFriendGet;
        }
        this.$store.commit("CHANGE_CART_LIST", cartList);
        this.$store.commit("CHANGE_CART_DATA", data);
        this.$store.commit("CHANGE_CART_SUREFREE", res.data.sureFee);
        this.$store.commit("CHANGE_CART_TOTALFREE", res.data.totalFee);
        this.saveData = cartList;
      })
    }
  },
  watch: {
    saveData: {
      handler(newValue, oldName) {
        this.$store.commit('CHANGE_CART_LIST', newValue)
      },
      // immediate: true,
      deep: true
    },
    // getType: {
    //   handler(newValue, oldName) {
    //     // this.$store.commit('CHANGE_CART_GETTYPE', newValue);
    //     this.saveData.forEach(element => {
    //       element.limitHour = 6;
    //     })
    //     this.mainData.getType = newValue;
    //     this.resetCardList(this.packData());

    //   },
    //   deep: true
    // }

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
      padding: 10px 10px 0 10px;
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
