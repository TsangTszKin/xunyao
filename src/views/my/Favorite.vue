<template>
  <div class="message">
    <mt-header title="我的关注">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import Cell from '@/components/message/Cell';
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