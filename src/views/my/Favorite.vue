<template>
  <div class="message">
    <mt-header title="我的关注">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="v-content">
      <mt-navbar
        v-model="selected"
        style="position: ralative;
    top: 40px;
    width: 100%;
    z-index: 999;"
      >
        <mt-tab-item id="1">店铺</mt-tab-item>
        <mt-tab-item id="2">药品</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <Cell v-for="(n, key) in 4" :key="key+Math.random()"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul>
            <goods-item v-for="(n, key) in 4" :data="goods[0]" :key="key+Math.random()"/>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import Cell from '@/components/user/favorite/Cell';
import Footer from '@/common/_footer.vue';
import GoodsItem from '@/components/goods/GoodsItem';

export default {
  data() {
    return {
      selected: '1',
      goods: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '1399',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }]
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    showMore() {
      // MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    Cell,
    'v-footer': Footer,
    'goods-item': GoodsItem,
  }
}
</script>

<style lang="less">
.mint-cell-title {
  -webkit-box-flex: 0;
  -ms-flex: 0;
  flex: 0;
}
.mint-cell-swipe-button {
  line-height: 66px;
}
</style>