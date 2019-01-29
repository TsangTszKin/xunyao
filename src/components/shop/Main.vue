<template>
  <section class="main" style="height: calc(100% - 40px);">
    <shop-aside :categories="categories"/>
    <shop-panel :goods="goods"/>
    <div style="clear: both;"></div>
  </section>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import Aside from '@/components/shop/Aside';
import Panel from '@/components/shop/Panel';

export default {
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
      categories: [
        { id: '1', name: '所有药品' },
        { id: '2', name: '抗生素类' },
        { id: '3', name: '心脑血管' },
        { id: '4', name: '消化系统' },
        { id: '5', name: '呼吸系统' },
        { id: '6', name: '泌尿系统' },
        { id: '7', name: '血液系统' },
        { id: '8', name: '五官科' },
        { id: '9', name: '抗风湿类' },
        { id: '10', name: '注射剂类' },
        { id: '11', name: '糖尿病' },
        { id: '12', name: '激素类' },
        { id: '13', name: '皮肤科' },
        { id: '14', name: '妇科' },
        { id: '15', name: '抗肿瘤' },
      ],
      goods: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }, {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }, {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }, {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
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

