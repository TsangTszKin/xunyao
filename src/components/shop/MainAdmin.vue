<template>
  <section class="main" style="height: calc(100% - 40px);">
    <shop-aside :categories="categories" :shopId="shopId" />
    <shop-panel :goods="$store.state.shop.goodsList"  />
    <div style="clear: both;"></div>
  </section>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import Aside from '@/components/shop/Aside';
import Panel from '@/components/shop/PanelAdmin';

export default {
  props: {
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    shopId: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$store.commit('CHANGE_SHOP_SELECT_CATE', { id: '1', name: '所有药品' });
  },
  components: {
    'goods-item': GoodsItem,
    'shop-aside': Aside,
    'shop-panel': Panel
  },
  data() {
    return {
      goods: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '16支每盒',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }, {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '16支每盒',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }, {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '16支每盒',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }, {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '16支每盒',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }],
    }
  },


}
</script>

<style lang="less" scoped>
.main {
}
</style>

