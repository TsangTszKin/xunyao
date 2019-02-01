<template>
  <div class="panel">
    <p class="cate">{{this.$store.state.shop.selectCate.name}}</p>
    <ul>
      <goods-item v-for="(item, i) in goods" class="goods" :key="i" :data="item" v-if="$store.state.goods.listType === 1" />
      <goods-item2 v-for="(item, i) in goods" class="goods" :key="i" :data="item" v-if="$store.state.goods.listType === 2" />
      <goods-item3 v-for="(item, i) in goods" class="goods" :key="i" :data="item" v-if="$store.state.goods.listType === 3" />
    </ul>
  </div>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import GoodsItem2 from '@/components/goods/GoodsItem2';
import GoodsItem3 from '@/components/goods/GoodsItem3';
export default {
  components: {
    'goods-item': GoodsItem,
    'goods-item2': GoodsItem2,
    'goods-item3': GoodsItem3
  },
  props: {
    goods: {
      type: Array,
      default: function () {
        return []
      }
    },
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
