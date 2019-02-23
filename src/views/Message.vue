<template>
  <div class="message">
    <mt-header title="消息">
      <!-- <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button> -->
    </mt-header>
    <div class="v-content">
      <mt-navbar
        v-model="selected"
        style="    position: ralative;
    top: 40px;
    width: 100%;
    z-index: 999;"
      >
        <mt-tab-item id="1">店铺消息</mt-tab-item>
        <mt-tab-item id="2">订阅</mt-tab-item>
        <mt-tab-item id="3">通知</mt-tab-item>
        <mt-tab-item id="4">好友</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top: 5px;">
        <mt-tab-container-item id="1" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in 4"
            :key="key+Math.random()"
            @click.native="showMore"
            class="v-message-large"
          />
          <v-baseline/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in 6"
            :key="key+Math.random()"
            @click.native="showMore"
            class="v-message-large"
          />
          <v-baseline/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in 8"
            :key="key+Math.random()"
            @click.native="showMore"
            class="v-message-large"
          />
          <v-baseline/>
        </mt-tab-container-item>
        <mt-tab-container-item id="4" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in friendList"
            :name="n.friendName"
            :avatar="n.friendHeadimgurl"
            :time="n.applyDate"
            :msg="'代收成功'"
            :key="key+Math.random()"
            @click.native="showMore"
            class="v-message-large"
          />
          <v-baseline/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <v-footer/>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Cell } from 'mint-ui';
import VCell from '@/components/message/Cell';
import Footer from '@/common/_footer.vue';
import userService from '@/api/userService';
import common from '@/util/common';
import Baseline from '@/common/_baseline.vue'

export default {
  data() {
    return {
      selected: '1',
      friendList: []
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyFriendList();
  },
  methods: {
    showMore() {
      MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    },
    getMyFriendList() {
      userService.getMyFriendList().then(res => {
        if (!common.isOk(res)) return
        this.friendList = res.data.data.list;
      })
    }
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    'v-cell': VCell,
    'v-footer': Footer,
    'mt-cell': Cell,
    'v-baseline': Baseline,
  }
}
</script>

<style lang="less">
.v-message-large {
  .mint-cell-title {
    -webkit-box-flex: 0;
    -ms-flex: 0;
    flex: 0 !important;
  }
  .mint-cell-value {
    width: 100%;
    > .msg-cell {
      width: 100%;
    }
  }
  .mint-cell-swipe-button {
    line-height: 65px;
  }
}
</style>