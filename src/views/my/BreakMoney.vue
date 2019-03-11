<template>
  <div class="message">
    <mt-header title="违约金额明细">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <!-- <span slot="right" style="font-size: 12px;" @click="addFriends">
        <i class="fa fa-plus-circle fa-lg" style="margin-right: 5px;"></i>添加好友
      </span>-->
    </mt-header>

    <div class="v-content">
      <mt-cell
        v-for="(n, key) in breakMoneyList"
        :key="key+Math.random()"
        :title="`${n.money}元`"
        :value="n.createTime"
      ></mt-cell>
      <v-baseline/>
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Cell, Popup, Toast } from 'mint-ui';
import FriendCell from '@/components/user/friend/Cell';
import Footer from '@/common/_footer.vue'
import userService from '@/api/userService';
import common from '@/util/common';
import Baseline from '@/common/_baseline.vue';

export default {
  data() {
    return {
      breakMoneyList: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getBreakMoneyList();
  },
  methods: {
    getBreakMoneyList() {
      userService.getBreakMoneyList(1).then(res => {
        if (!common.isOk(res)) return
        this.breakMoneyList = res.data.data.list;
      })
    }

  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell': Cell,
    'mt-cell-swipe': CellSwipe,
    'v-friend-cell': FriendCell,
    'v-footer': Footer,
    'v-baseline': Baseline,
  }
}
</script>

<style lang="less">
</style>