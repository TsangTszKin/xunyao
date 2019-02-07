<template>
  <div class="footprint">
    <mt-header title="足迹">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="v-content">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="3"
      >
        <v-panel v-for="(n, key) in list" :key="key"/>
      </div>
      <v-baseline v-if="list.length > 0" />
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, MessageBox, Indicator, InfiniteScroll } from 'mint-ui';
import Footer from '@/common/_footer.vue'
import Panel from '@/components/user/footprint/Panel';
import Baseline from '@/common/_baseline.vue'

export default {
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'v-footer': Footer,
    'v-panel': Panel,
    'v-baseline': Baseline,
  },
  data() {
    return {
      selected: '1',
      loading: false,
      list: []
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    loadMore() {
      console.log("loadMore")
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');
      setTimeout(() => {
        self.list.push(1);
        self.list.push(1);
        self.list.push(1);
        self.loading = false;
        Indicator.close();
      }, 1000);
    }
  },

}
</script>

<style lang="less" scoped>
.footprint {
  // height: 100%;
  background-color: #dcdcdc38;
}
</style>