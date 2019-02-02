<template lang="html">
  <div class="detail">
    <v-swiper/>
    <v-chose/>
    <v-content/>
  <div class="ralative">
    <p class="title">相关药品</p>
    <ul
    >
      <goods-item v-for="(item, key) in list" class="goods" :key="key" :data="item"/>
    </ul>
  </div>
    <v-baseline/>
    <v-footer/>
  </div>
</template>

<script>
import Swiper from '@/components/detail/swiper.vue'
import Chose from '@/components/detail/chose.vue'
import Content from '@/components/detail/content.vue'
import Footer from '@/components/detail/footer.vue'
import Baseline from '@/common/_baseline.vue'
import detail from '@/http/mock.js' //模拟数据
import GoodsItem from '@/components/goods/GoodsItem';

export default {
  components: {
    'v-swiper': Swiper,
    'v-chose': Chose,
    'v-content': Content,
    'v-footer': Footer,
    'v-baseline': Baseline,
    'goods-item': GoodsItem,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeCreate() {
    this.$store.dispatch('setDatas');
  },
  data() {
    return {
      list: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      },
      {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  padding-bottom: 14vw;
  .ralative {
    position: relative;
    margin-top: 20px;
    > .title {
      padding: 5px 7px;
      background-color: #f7f7f7;
      &:before {
        width: 3px;
        height: 28px;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        // margin-top: -14px;
        background-color: green;
      }
    }
  }
}
</style>
