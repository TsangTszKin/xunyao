<template>
  <div class="message">
    <mt-header title="消息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">店铺消息列表</mt-tab-item>
      <mt-tab-item id="2">订阅</mt-tab-item>
      <mt-tab-item id="3">通知</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <Cell v-for="(n, key) in 4" :key="key+Math.random()" @click.native="showMore"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import Cell from '@/components/message/Cell';
export default {
  data() {
    return {
      selected: '1'
    }
  },
  methods: {
    showMore() {
      MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    Cell
  }
}
</script>

<style lang="less">
.mint-cell-title {
  -webkit-box-flex: 0;
  -ms-flex: 0;
  flex: 0;
}
</style>