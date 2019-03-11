<template>
  <ul class="something">
    <v-cart-goods-item
      v-for="(item, i) in goodsList"
      :shopIndex="shopIndex"
      :goodsIndex="i"
      :cartGoods="item"
      :key="i"
    />
  </ul>
</template>

<script>
import CartGoodsItem from '@/components/user/order/CartGoodsItem';
import cartService from '@/api/cartService';
import common from '@/util/common';

export default {
  props: {
    shopIndex: {
      type: Number,
      default: 0
    },
    goodsList: {
      type: Array,
      default: function () {
        return [
          {
            name: '复方金银花颗粒(诺金)',
            id: 5,
            count: 1,
            img: 'http://o2o.c-doctor.com/images/upload/prodimage/201604/201642614542296.jpg',
            price: 118,
            size: '12g*6袋'
          }
        ]
      }
    }
  },
  mounted() {
  },
  components: {
    'v-cart-goods-item': CartGoodsItem
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";
.something {
  width: 100%;
}
</style>
