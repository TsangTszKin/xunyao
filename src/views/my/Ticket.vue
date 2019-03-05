<template>
  <div class="message">
    <mt-header title="优惠券">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <Cell v-for="(n, key) in list" :key="key" :data="n" :type="2"/>
      <v-baseline/>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import Cell from '@/components/user/ticket/Cell';
import Footer from '@/common/_footer.vue';
import userService from '@/api/userService';
import common from '@/util/common';
import Baseline from '@/common/_baseline.vue';


export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyCouponList();
  },
  methods: {
    showMore() {
      // MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    },
    getMyCouponList() {
      userService.getMyCouponList().then(res => {
        window.scrollTo(0, 0);
        if (!common.isOk(res)) return
        this.list = res.data.data;
      })
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    Cell,
    'v-footer': Footer,
    'v-baseline': Baseline,
  }
}
</script>

<style lang="less">
</style>