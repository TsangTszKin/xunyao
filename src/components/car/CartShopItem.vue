<template>
  <li>
    <div class="shop-info">
      <img :src="cartShop.shopLogo">
      <span>{{cartShop.shopName}}</span>
      <i
        class="fa fa-angle-right fa-lg"
        @click="$router.push({name: '店铺主页', params: {id: cartShop.shopId}})"
      ></i>
    </div>
    <v-cart-goods-list :shopIndex="shopIndex" :goodsList="cartShop.productList" />
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
          productList: [
            {
              name: '复方金银花颗粒(诺金)',
              id: 5,
              count: 1,
              img: 'http://o2o.c-doctor.com/images/upload/prodimage/201604/201642614542296.jpg',
              price: 118,
              size: '12g*6袋'
            },
            {
              name: '复方金银花颗粒(诺金)2',
              id: 5,
              count: 1,
              img: 'http://o2o.c-doctor.com/images/upload/prodimage/201612/201612814485529.jpg',
              price: 118,
              size: '12g*6袋'
            }
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

