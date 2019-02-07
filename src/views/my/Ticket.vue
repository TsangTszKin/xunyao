<template>
  <div class="message">
    <mt-header title="优惠券">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">抵扣运费</mt-tab-item>
        <mt-tab-item id="2">抵扣保证金</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import Cell from '@/components/user/ticket/Cell';
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

<style lang="less">
.mint-cell-title {
  -webkit-box-flex: 0;
  -ms-flex: 0;
  flex: 0;
}
.mint-cell-swipe-button {
  line-height: 66px;
}
</style>