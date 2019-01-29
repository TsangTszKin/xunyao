<template>
  <div class="goods-list" style="height: calc(100% - 55px)">
    <mt-header title="商品列表">
      <!-- <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button> -->
      <!-- <router-link to="/goodsSave" slot="right">
        <mt-button>上传</mt-button>
      </router-link> -->

      <router-link :to="{name:'搜索页'}" slot="right">
        <mt-button icon="search" style="margin-left: 30px;"></mt-button>
      </router-link>
    </mt-header>
    <shop-main/>
    <Footer/>
  </div>
</template>

<script>
// import Header from '@/common/_header.vue';
import { InfiniteScroll, Indicator, Button, Header, Search } from 'mint-ui';
import GoodsItem from '@/components/goods/GoodsItem';
import LoadingForList from '@/components/LoadingForList';
import Footer from '@/common/_footer.vue'
import Main from '@/components/shop/Main';

export default {
  data() {
    return {
      loading: false,
      list: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }]
    }
  },
  components: {
    'mt-header': Header,
    'goods-item': GoodsItem,
    'loading-for-list': LoadingForList,
    'mt-button': Button,
    'mt-search': Search,
    Footer,
    'shop-main': Main
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    loadMore() {
      console.log("loadMore")
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');
      setTimeout(() => {
        let last = self.list[self.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          self.list.push({
            goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
            goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
            size: '黑色',
            price: '13999',
            stock: '7',
            shopName: '添色彩绘旗舰店'
          });
        }
        self.loading = false;
        Indicator.close();
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  // height: clac(100% - 95px);
}
</style>

