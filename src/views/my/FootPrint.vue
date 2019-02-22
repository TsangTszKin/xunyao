<template>
  <div class="footprint">
    <mt-header title="足迹">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="v-content">
      <div>
        <v-panel v-for="(n, key) in list" :date="n.date" :goodsList="n.goodsList" :key="key"/>
      </div>
      <v-baseline v-if="list.length > 0"/>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, MessageBox, Indicator, InfiniteScroll } from 'mint-ui';
import Footer from '@/common/_footer.vue'
import Panel from '@/components/user/footprint/Panel';
import Baseline from '@/common/_baseline.vue';
import userService from '@/api/userService';
import common from '@/util/common';

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
    this.getMyFootPrint();
  },
  methods: {
    getMyFootPrint() {
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');


      userService.getMyFootPrint().then(res => {
        self.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        for (const key in res.data.data) {
          if (res.data.data.hasOwnProperty(key)) {
            const element = res.data.data[key];
            if (!common.isEmpty(element))
              this.list.push({
                date: key,
                goodsList: element
              })
          }
        }
      })
    }
  },

}
</script>

<style lang="less" scoped>
.footprint {
  // height: 100%;

  > .v-content {
    background-color: #dcdcdc38;
  }
}
</style>