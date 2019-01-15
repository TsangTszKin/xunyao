<template>
  <aside class="aside">
    <ul class="cate">
      <li
        class="cell"
        :class="item.id === $store.state.shop.selectCate.id?'active-cell': ''"
        v-for="(item,i) in categories"
        @click="changeCate(item)"
      >{{item.name}}</li>
    </ul>
  </aside>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  props: {
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  methods: {
    changeCate(item) {
      Indicator.open();
      this.$store.commit('CHANGE_SHOP_SELECT_CATE', item);
      setTimeout(() => { Indicator.close() }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  width: 20%;
  float: left;
  > .cate {
    background-color: #dcdcdc4a;
    .cell {
      text-align: center;
      font-size: 13px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background-color: transparent;
    }
    .active-cell::before {
      width: 3px;
      height: 28px;
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -14px;
      background-color: green;
    }
  }
}
</style>