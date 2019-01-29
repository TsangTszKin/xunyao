<template>
  <div class="panel">
    <p class="cate">{{this.$store.state.shop.selectCate.name}}</p>
    <ul>
      <goods-item v-for="(item, i) in goods" class="goods" :key="i" :data="item"/>
    </ul>
  </div>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
export default {
  components: {
    'goods-item': GoodsItem
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
