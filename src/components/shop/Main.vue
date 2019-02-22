<template>
  <section class="main" style="height: calc(100% - 40px);">
    <shop-aside :categories="categories" :shopId="shopId" ref="shopAside" />
    <shop-panel :goods="$store.state.shop.goodsList"/>
    <div style="clear: both;"></div>
  </section>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import Aside from '@/components/shop/Aside';
import Panel from '@/components/shop/Panel';

export default {
  props:{
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    shopId: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$store.commit('CHANGE_SHOP_SELECT_CATE', { id: '1', name: '所有药品' });
  },
  components: {
    'goods-item': GoodsItem,
    'shop-aside': Aside,
    'shop-panel': Panel
  },
  data() {
    return {
      goods: [],
    }
  },
  methods:{
    runChildrenNodeFunc(classId){
      this.$refs.shopAside.getGoodsList2(classId);
    }
  }

}
</script>

<style lang="less" scoped>
.main {
  
}
</style>

