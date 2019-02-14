<template>
  <div class="search">
    <mt-search
      v-model="searchValue"
      :result.sync="searchResult"
      cancel-text="取消"
      placeholder="搜索"
      :autofocus="true"
      :show="true"
      @keyup.enter.native="search"
    ></mt-search>
    <div class="result">
      <ul>
        <goods-item v-for="(item, i) in goods" class="goods" :key="i" :data="item"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { Search, Header, Button } from 'mint-ui';
import GoodsItem from '@/components/goods/GoodsItem';

export default {
  data() {
    return {
      searchValue: '',
      searchResult: [],
      goods: [{
        className: null,
        commonName: "3",
        discountPrice: 0,
        distance: null,
        englishName: "3",
        id: 1,
        name: "ddd1",
        oldPrice: 0,
        productImg: "http://47.106.168.53:8094/20190213/783c1d10b51d41f2a7266e88e4dd26cc.jpg",
        shopName: null,
        viewCount: null
      }]
    }
  },
  components: {
    'mt-header': Header,
    'mt-search': Search,
    'goods-item': GoodsItem,
  },
  methods: {
    search() {
      this.$messagebox("搜索")
    }
  },
  watch: {
    searchValue: function (newvs, oldvs) {
      console.log("newvs", newvs);
      console.log("oldvs", oldvs);
      if (!newvs) {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  > .result {
    position: absolute;
    top: 52px;
    width: 100%;
    z-index: 999;
  }
}
</style>
