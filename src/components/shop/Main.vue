<template>
  <section class="main">
    <shop-aside :categories="categories" />
    <shop-panel :goods="goods" />
    </div>
  </section>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import Aside from '@/components/shop/Aside';
import Panel from '@/components/shop/Panel';

export default {
  components: {
    'goods-item': GoodsItem,
    'shop-aside': Aside,
    'shop-panel': Panel
  },
  data() {
    return {
      categories: [
        { id: '1', name: '所有' },
        { id: '2', name: 2 },
        { id: '3', name: 3 },
        { id: '4', name: 4 },
        { id: '5', name: 5 },
        { id: '6', name: 6 },
        { id: '7', name: 7 },
        { id: '8', name: 8 },
        { id: '9', name: 9 },
        { id: '10', name: 10 },
        { id: '11', name: 11 },
        { id: '12', name: 12 },
        { id: '13', name: 13 },
        { id: '14', name: 14 },
        { id: '15', name: 15 },
        { id: '16', name: 16 },
      ],
      goods: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      },{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      },{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      },{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
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

