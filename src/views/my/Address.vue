<template>
  <div class="message">
    <mt-header title="收货地址">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <i
        class="fa fa-plus fa-lg"
        slot="right"
        style="font-size: 12px;"
        @click="$router.push({path: '/addressSave'})"
      >新增地址</i>
    </mt-header>

    <div class="v-content">
      <Cell v-for="(n, key) in list" :data="n" :key="key" @click.native="showMore"/>
      <v-baseline/>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Indicator } from 'mint-ui';
import Cell from '@/components/user/address/Cell';
import Footer from '@/common/_footer.vue'
import userService from '@/api/userService';
import common from '@/util/common';
import Baseline from '@/common/_baseline.vue';

export default {
  data() {
    return {
      selected: '1',
      list: []
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getAddressList();
  },
  methods: {
    showMore() {
      // MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    },
    getAddressList() {
      Indicator.open();
      userService.getAddressList().then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        this.list = res.data.list;
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

<style >
.mint-cell-title {
  -webkit-box-flex: 1 !important;
  -ms-flex: 1 !important;
  flex: 1 !important;
}
</style>