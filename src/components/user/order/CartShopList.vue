<template>
  <div class="wrap">
    <ul
      class="shop-panel"
      v-for="(item, i) in orderList"
      :key="i"
    >
      <v-cart-shop-item :shopIndex="i" :cartShop="item"  />
    </ul>
    <v-baseline/>
  </div>
</template>

<script>
import CartShopItem from '@/components/user/order/CartShopItem';
import Baseline from '@/common/_baseline.vue'

export default {
  props: {
    orderList: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  components: {
    'v-cart-shop-item': CartShopItem,
    'v-baseline': Baseline,
  },
  mounted() {
    this.cartList = this.$store.state.cart.cartList;
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";
.wrap {
  width: 100%;
  margin-bottom: 120px;
  > ul.shop-panel {
    margin: 10px;
    padding: 10px;
    border: 1px solid #dcdcdcc7;
    border-radius: 8px;
  }

  label,
  span {
    &:active {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }
}
</style>
