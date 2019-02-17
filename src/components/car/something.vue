<template lang="html">

<v-cart-shop-list  />

</template>

<script>
// 提示登录组件
import Gologin from '@/components/car/gologin.vue';
import Util from '../../util/common';
import common from '@/util/common';
import { Toast } from 'mint-ui';
import CartShopList from '@/components/car/CartShopList';

export default {
  components: {
    'v-gologin': Gologin,
    'v-cart-shop-list': CartShopList
  },
  data() {
    return {

    }
  }


}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

</style>
