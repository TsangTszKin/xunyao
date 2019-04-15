<template>
  <div class="panel">
    <p class="cate">{{this.$store.state.shop.selectCate.className}}</p>
    <ul v-if="goods.length > 0">
      <goods-item
        v-for="(item, i) in goods"
        class="goods"
        :key="i+Math.random()"
        :data="item"
        v-if="$store.state.goods.listType === 1"
      />
      <goods-item2
        v-for="(item, i) in goods"
        class="goods"
        :key="i+Math.random()"
        :data="item"
        v-if="$store.state.goods.listType === 2"
      />
      <goods-item3
        v-for="(item, i) in goods"
        class="goods"
        :key="i+Math.random()"
        :data="item"
        v-if="$store.state.goods.listType === 3"
      />
    </ul>
    <p v-if="goods.length == 0" style="text-align: center;">暂无数据</p>
    <!-- <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i> -->
    <div style="position: fixed;bottom: 20%;right: 20px;width: 32px; height: 32px;" @click="$router.push({name: '购物车'})">
      <div style="position: relative;">
        <img src="../../assets/images/购物车.png">
        <mt-badge
          size="small"
          type="error"
          style="position: absolute;top: -9px;right: -10px;"
          v-if="$store.getters.getCartAllCount > 0"
        >{{$store.getters.getCartAllCount}}</mt-badge>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import GoodsItem2 from '@/components/goods/GoodsItem2';
import GoodsItem3 from '@/components/goods/GoodsItem3';
import common from '@/util/common';
import { Badge } from 'mint-ui'

export default {
  components: {
    'goods-item': GoodsItem,
    'goods-item2': GoodsItem2,
    'goods-item3': GoodsItem3,
    'mt-badge': Badge
  },
  props: {
    goods: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  mounted() {
  }
}
</script>

<style lang='less' scoped>
.panel {
  width: 80%;
  float: left;
  height: 100%;
  overflow-y: scroll;
  > .cate {
    text-align: left;
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
  }
}
</style>
