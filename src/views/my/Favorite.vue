<template>
  <div class="message">
    <mt-header title="我的关注">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="v-content">
      <mt-navbar
        v-model="type"
        style="position: ralative;
    top: 40px;
    width: 100%;
    z-index: 999;"
      >
        <mt-tab-item id="1">店铺</mt-tab-item>
        <mt-tab-item id="2">药品</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="type" style="margin-top: 5px;">
        <mt-tab-container-item id="1">
          <Cell
            v-for="(n, key) in shopList"
            :name="n.shopName"
            :avatar="n.shopLogo"
            :id="n.id"
            :key="key+Math.random()"
            @click.native="$router.push({name: '店铺主页', params:{id: n.shopId}})"
          />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <v-goods-cell
            v-for="(n, key) in goodsList"
            :key="key+Math.random()"
            :name="n.productName"
            :avatar="n.productImg"
            :msg="'规格：'+n.specification"
            :id="n.id"
            time
            @click.native="$router.push({name: '搜索结果', params:{id: n.productBaseId}})"
            class="v-message-large"
          />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Indicator, Toast } from 'mint-ui';
import Cell from '@/components/user/favorite/Cell';
import Footer from '@/common/_footer.vue';
import GoodsItemFavorite from '@/components/goods/GoodsItemFavorite';
import userService from '@/api/userService';
import common from '@/util/common';
import GoodsCell from '@/components/user/favorite/GoodsCell';
import bus from '@/util/bus';

export default {
  data() {
    return {
      goodsList: [],
      shopList: [],
      pageno: 1,
      type: '1',
      loading: false,
      isEnd: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.listener();
  },
  methods: {
    listener() {
      bus.$on("my.favorite", id => {
        this.removeFavorite(id);
      })
    },
    getMyFavoriteList(type, pageno) {
      if (this.isEnd) return
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');
      userService.getMyFavoriteList(type, pageno).then(res => {
        self.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return

        if (common.isEmpty(res.data.data.list)) {
          self.isEnd = true;
        } else {
          res.data.data.list.forEach(element => {
            if (self.type == '1') {
              self.shopList.push(element)
            } else {
              element.name = element.productName;
              element.discountPrice = element.productPrice;
              self.goodsList.push(element)
            }
          })
          self.page++;
        }
      })
    },
    removeFavorite(id) {
      userService.removeFavorite(id).then(res => {
        if (!common.isOk(res)) return
        Toast("已取消关注");
        this.goodsList = [];
        this.shopList = [];
        this.getMyFavoriteList(this.type, this.pageno);
      })
    }
  },
  watch: {
    type: {
      handler: function (value, oldVal) {
        this.isEnd = false;
        this.pageno = 1;
        if (value == '1') {
          this.goodsList = [];
        } else {
          this.shopList = [];
        }
        this.getMyFavoriteList(value, this.pageno);
      },
      immediate: true
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    Cell,
    'v-footer': Footer,
    'goods-item-favorite': GoodsItemFavorite,
    'v-goods-cell': GoodsCell
  }
}
</script>

<style lang="less">
</style>