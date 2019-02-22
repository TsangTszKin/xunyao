<template>
  <div class="goods-list" style="height: 100%">
    <mt-header title="分类商品">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <!-- <router-link to="/goodsSave" slot="right">
        <mt-button>上传</mt-button>
      </router-link>-->
      <i
        class="fa fa-th-list fa-lg v-change"
        slot="right"
        v-if="$store.state.goods.listType === 1"
        @click="changeGoodsListShowType(2)"
      ></i>
      <i
        class="fa fa-th-large fa-lg v-change"
        slot="right"
        v-if="$store.state.goods.listType === 2"
        @click="changeGoodsListShowType(3)"
      ></i>
      <i
        class="fa fa-align-justify fa-lg v-change"
        slot="right"
        v-if="$store.state.goods.listType === 3"
        @click="changeGoodsListShowType(1)"
      ></i>
      <router-link :to="{name:'搜索页', params:{type: 'goods'}}" slot="right">
        <mt-button icon="search" ></mt-button>
      </router-link>
    </mt-header>
    <div class="v-content">
      <shop-main :categories="classList" :shopId="shop.shopId" ref="shopMain"/>
    </div>
  </div>
</template>

<script>
// import Header from '@/common/_header.vue';
import { InfiniteScroll, Indicator, Button, Header, Search } from 'mint-ui';
import GoodsItem from '@/components/goods/GoodsItem';
import LoadingForList from '@/components/LoadingForList';
import Footer from '@/common/_footer.vue'
import Main from '@/components/shop/Main';
import shopService from '@/api/shopService';
import userService from '@/api/userService';
import common from '@/util/common';
import homeService from '@/api/homeService';

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
      }],
      classList: [
        // {
        //   "id": 7,
        //   "className": "五官用药",
        //   "bySort": 1
        // }
      ],
      shop: {}
    }
  },
  components: {
    'mt-header': Header,
    'goods-item': GoodsItem,
    'loading-for-list': LoadingForList,
    'mt-button': Button,
    'mt-search': Search,
    'v-footer': Footer,
    'shop-main': Main
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getClassList();
    let classId = this.$route.query.classId;
    let className = this.$route.query.className;
    this.$store.commit("CHANGE_SHOP_SELECT_CATE", {
      id: classId,
      className: className
    })
    this.$refs.shopMain.runChildrenNodeFunc(classId);
  },
  methods: {
    changeGoodsListShowType(value) {
      this.$store.commit('CHANGE_GOODSLIST_SHOWTYPE', value);
    },
    getClassList() {
      shopService.getClassList().then(res => {
        if (!common.isOk(res)) return
        this.classList = res.data.data;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  .v-content {
    height: 100%;
    position: fixed;
    top: 40px;
    width: 100%;
  }
  .v-change {
    position: relative;
    right: 30px;
  }
}
</style>

