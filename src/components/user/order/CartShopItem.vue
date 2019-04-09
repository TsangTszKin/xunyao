<template>
  <li>
    <div class="shop-info" @click.native="$router.push({name: '订单详情', params:{id: cartShop.id}})">
      <img :src="cartShop.shopLogo">
      <span>{{cartShop.shopName}}</span>
      <!-- <i class="fa fa-angle-right fa-lg"></i> -->
    </div>
    <span @click.native="$router.push({name: '订单详情', params:{id: cartShop.id}})">{{orderStatus}}</span>
    <v-cart-goods-list
      :shopIndex="shopIndex"
      :goodsList="cartShop.orderItemlist"
      @click.native="$router.push({name: '订单详情', params:{id: cartShop.id}})"
    />
    <p style="margin-top: 10px;text-align: right;">
      <!-- <mt-button type="default" size="small">删除订单</mt-button> -->
      <mt-button
        type="default"
        size="small"
        @click="cancelOrder(cartShop.id)"
        v-if="this.cartShop.orderStatus == 1"
      >取消订单</mt-button>
      <mt-button
        type="default"
        size="small"
        :disabled="cartShop.shopOrderStatus == 0"
        @click="receiverOrder(cartShop.id)"
        v-if="this.cartShop.orderStatus == 1"
      >{{cartShop.shopOrderStatus == 0?'待商家确认交易':'确认收货'}}</mt-button>
      <mt-button
        type="default"
        size="small"
        @click="confirmOrder(cartShop.id)"
        v-if="this.cartShop.orderStatus == 0 && this.cartShop.insteadBuyerId == $store.state.user.user.id"
      >确认订单</mt-button>
    </p>
  </li>
</template>

<script>
import CartGoodsList from '@/components/user/order/CartGoodsList';
import { Button } from 'mint-ui';
import bus from "@/util/bus";

export default {
  props: {
    shopIndex: {
      type: Number,
      default: 0
    },
    cartShop: {
      type: Object,
      default: function () {
        return {
          id: '',
          shopName: '张明家的店',
          shopId: 2,
          shopLogo: 'http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg',
          orderStatus: 0, //0待朋友确认，1待商家开始交易，2已完成，3已取消
          shopOrderStatus: 0,//0未确认，1交易开始，2买家取消待商家确认，3买家完成待商家确认，4商家已确认完成，5商家已确认取消
          orderItemlist: [
            {
              "id": 9,
              "buyerId": 7,
              "shopId": 2,
              "productId": 5,
              "productName": "复方金银花颗粒(诺金)",
              "discountPrice": 28.54,
              "oldPrice": 39,
              "productImg": "http://o2o.c-doctor.com/images/upload/prodimage/201604/201642614542296.jpg",
              "shopName": "张明家的店",
              "quantity": 1,
              "createDate": "2019-02-15 22:49:58"
            },
          ]
        }
      }
    }
  },
  data() {
    return {
      orderStatus: 0
    }
  },
  mounted() {
    let orderStatus = '';
    switch (this.cartShop.orderStatus) {
      case 0:
        if (this.cartShop.insteadBuyerId == this.$store.state.user.user.id) {
          orderStatus = '请确认';
        } else {
          orderStatus = '待好友确认';
        }
        break;

      case 1:
        orderStatus = '待收货';
        break;

      case 2:
        if (this.cartShop.shopOrderStatus == 3) {
          orderStatus = '待商家确认完成';
        } else if (this.cartShop.shopOrderStatus == 4) {
          orderStatus = '已完成';
        }
        break;

      case 3:
        if (this.cartShop.shopOrderStatus == 2) {
          orderStatus = '待商家确认取消';
        } else if (this.cartShop.shopOrderStatus == 5) {
          orderStatus = '已取消';
        }
        break;

      default:
        break;
    }

    this.orderStatus = orderStatus;
  },
  components: {
    'v-cart-goods-list': CartGoodsList,
    'mt-button': Button
  },
  methods: {
    cancelOrder(id) {
      bus.$emit("my.order.cancelOrder", id);
    },
    receiverOrder(id) {//确认收货按钮触发事件
      bus.$emit("my.order.receiverOrder", id);
    },
    confirmOrder(id) {
      bus.$emit("my.order.confirmOrder", id);
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";
li {
  position: relative;
  > .shop-info {
    width: fit-content;
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
  > span {
    position: absolute;
    right: 5px;
    top: -1px;
    font-size: 13px;
    color: orangered;
  }
}
</style>

