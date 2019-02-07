<template>
  <div class="message">
    <mt-header title="收货地址">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import Cell from '@/components/user/address/Cell';
import Footer from '@/common/_footer.vue'

export default {
  data() {
    return {
      selected: '1'
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    showMore() {
      // MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    Cell,
    'v-footer': Footer
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