<template>
  <div>
    <mt-header title="店铺列表">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>

      <router-link :to="{name:'搜索页', params:{type: 'shop'}}" slot="right">
        <mt-button icon="search" style="margin-left: 30px;"></mt-button>
      </router-link>
    </mt-header>

    <div class="v-content">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="section3-list"
      >
        <v-shop-cell v-for="(k, index) in list" :key="index" :shop="k"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator, Button, Header, Search } from 'mint-ui';
import LoadingForList from '@/components/LoadingForList';
import shopService from '@/api/shopService';
import common from '@/util/common';
import ShopCell from '@/components/ShopCell';

export default {
  data() {
    return {
      loading: false,
      isEnd: false,
      page: 1,
      list: []
    }
  },
  components: {
    'mt-header': Header,
    'loading-for-list': LoadingForList,
    'mt-button': Button,
    'mt-search': Search,
    'v-shop-cell': ShopCell
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    loadMore() {
      if (this.isEnd) return
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');
      shopService.getShopList(self.page, '').then(res => {
        self.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data.list)) {
          self.isEnd = true;
        } else {
          res.data.data.list.forEach(element => {
            self.list.push(element)
          })
          self.page++;
        }

      }).catch(() => {
        self.loading = false;
        Indicator.close();
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
.section3-list {
  width: 100%;
  .bt();
}
</style>
