<template>
  <li>
    <div class="shop-info" @click="$router.push({name: '店铺主页', params: {id: cartShop.shopId}})">
      <img :src="cartShop.shopLogo">
      <span>{{cartShop.shopName}}</span>
      <i
        class="fa fa-angle-right fa-lg"
      ></i>
    </div>
    <v-cart-goods-list :shopIndex="shopIndex" :goodsList="cartShop.cartList"/>
  </li>
</template>

<script>
import CartGoodsList from '@/components/car/CartGoodsList';

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
          shopName: '张明家的店',
          shopId: 2,
          shopLogo: 'http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg',
          cartList: [
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
  components: {
    'v-cart-goods-list': CartGoodsList
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
li {
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
}
</style>

