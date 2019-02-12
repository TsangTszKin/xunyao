<template>
  <div class="panel">
    <p class="cate">{{this.$store.state.shop.selectCate.name}}</p>
    <ul>
      <goods-item-admin v-for="(item, i) in goods" class="goods" :key="i" :data="item" v-if="$store.state.goods.listType === 1" />
      <goods-item2-admin v-for="(item, i) in goods" class="goods" :key="i" :data="item" v-if="$store.state.goods.listType === 2" />
      <goods-item3-admin v-for="(item, i) in goods" class="goods" :key="i" :data="item" v-if="$store.state.goods.listType === 3" />
    </ul>
  </div>
</template>

<script>
import GoodsItemAdmin from '@/components/goods/GoodsItemAdmin';
import GoodsItem2Admin from '@/components/goods/GoodsItem2Admin';
import GoodsItem3Admin from '@/components/goods/GoodsItem3Admin';
export default {
  components: {
    'goods-item-admin': GoodsItemAdmin,
    'goods-item2-admin': GoodsItem2Admin,
    'goods-item3-admin': GoodsItem3Admin,
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
