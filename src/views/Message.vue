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
        <mt-tab-item id="1">
          <mt-badge
            size="small"
            type="error"
            style=" position: absolute;top: 0px;left: 75px;"
            v-if="$store.state.user.messageCount.count1 > 0"
          >{{$store.state.user.messageCount.count1}}</mt-badge>店铺消息
        </mt-tab-item>
        <mt-tab-item id="2">
          <mt-badge
            size="small"
            type="error"
            style=" position: absolute;top: 0px;left: 75px;"
            v-if="$store.state.user.messageCount.count2 > 0"
          >{{$store.state.user.messageCount.count2}}</mt-badge>系统消息
        </mt-tab-item>
        <mt-tab-item id="3">
          <mt-badge
            size="small"
            type="error"
            style=" position: absolute;top: 0px;left: 75px;"
            v-if="$store.state.user.messageCount.count3 > 0"
          >{{$store.state.user.messageCount.count3}}</mt-badge>好友消息
        </mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top: 5px;">
        <mt-tab-container-item id="1" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in shopList"
            :key="key+Math.random()"
            @click.native="showMore(n.sendBy, n.message, n.id, n.type)"
            class="v-message-large"
            :isConfig="false"
            :name="n.sendBy"
            :avatar="n.sendImg"
            :time="n.createTime"
            :msg="n.message"
            :readStatus="n.readStatus"
            :id="n.id"
            :type="n.type"
            @deleteMessage="deleteMessage"
          />
          <v-baseline/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in systemList"
            :key="key+Math.random()"
            @click.native="showMore(n.sendBy, n.message, n.id, n.type)"
            class="v-message-large"
            :isConfig="true"
            :name="n.sendBy"
            :time="n.createTime"
            :msg="n.message"
            :readStatus="n.readStatus"
            :id="n.id"
            :type="n.type"
            @deleteMessage="deleteMessage"
          />
          <v-baseline/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3" style="margin-bottom: 50px;">
          <v-cell
            v-for="(n, key) in friendList"
            :key="key+Math.random()"
            @click.native="showMore(n.sendBy, n.message, n.id, n.type)"
            class="v-message-large"
            :isConfig="false"
            :name="n.sendBy"
            :avatar="n.sendImg"
            :time="n.createTime"
            :msg="n.message"
            :readStatus="n.readStatus"
            :id="n.id"
            :type="n.type"
            @deleteMessage="deleteMessage"
          />
          <v-baseline/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <v-footer/>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Cell, Badge, Toast } from 'mint-ui';
import VCell from '@/components/message/Cell';
import Footer from '@/common/_footer.vue';
import userService from '@/api/userService';
import otherService from '@/api/otherService';
import common from '@/util/common';
import Baseline from '@/common/_baseline.vue'

export default {
  data() {
    return {
      selected: '1',
      shopList: [],
      systemList: [],
      friendList: [],
      messageCount: {
        all: 0,
        count1: 0,
        count2: 0,
        count3: 0,
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getNoReadMessageCount2();
    this.getMessageList(1);
    this.getMessageList(2);
    this.getMessageList(3);
    this.$on("Message.deleteMessage", (messageId, type) => this.deleteMessage(messageId, type));
  },
  methods: {
    showMore(sendby, message, id, type) {
      MessageBox(sendby, message);
      this.updateMessage(id, type);
    },
    getNoReadMessageCount2() {
      otherService.getNoReadMessageCount2().then(res => {
        if (!common.isOk(res)) return
        this.messageCount.count1 = res.data.count1;
        this.messageCount.count2 = res.data.count2;
        this.messageCount.count3 = res.data.count3;
        this.$store.commit("CHANGE_USER_MESSAGECOUNT", this.messageCount)
      })
    },
    getMessageList(type) {
      otherService.getMessageList(type, 1).then(res => {
        if (!common.isOk(res)) return
        switch (type) {
          case 1:
            this.shopList = res.data.data.list;
            break;
          case 2:
            this.systemList = res.data.data.list;
            break;
          case 3:
            this.friendList = res.data.data.list;
            break;
          default:
            break;
        }
      })
    },
    updateMessage(messageId, type) {
      otherService.updateMessage(messageId).then(res => {
        if (!common.isOk(res)) return
        this.getMessageList(type);
        this.getNoReadMessageCount();
      })
    },
    deleteMessage(messageId, type) {
      otherService.deleteMessage(messageId).then(res => {
        if (!common.isOk(res)) return
        Toast("删除成功");
        this.getMessageList(type);
        this.getNoReadMessageCount();
      })
    },
    getNoReadMessageCount() {
      otherService.getNoReadMessageCount().then(res => {
        if (!common.isOk(res)) return
        this.messageCount.all = res.data.total;
        this.getNoReadMessageCount2();
      })
    },
    getNoReadMessageCount2() {
      otherService.getNoReadMessageCount2().then(res => {
        if (!common.isOk(res)) return
        this.messageCount.count1 = res.data.count1;
        this.messageCount.count2 = res.data.count2;
        this.messageCount.count3 = res.data.count3;
        this.$store.commit("CHANGE_USER_MESSAGECOUNT", this.messageCount)
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
    'mt-badge': Badge
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