<template>
  <div class="message">
    <mt-header title="我的好友">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <span slot="right" style="font-size: 12px;" @click="addFriends">
        <i class="fa fa-plus-circle fa-lg" style="margin-right: 5px;"></i>添加好友
      </span>
    </mt-header>

    <div class="v-content">
      <v-friend-cell
        v-for="(n, key) in friendList"
        :name="n.friendName"
        :avatar="n.friendHeadimgurl"
        :key="key+Math.random()"
        :friendId="n.friendId"
        @deleteCallBack="deleteCallBack"
      />
      <!-- <v-baseline/> -->
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Cell, Popup, Toast  } from 'mint-ui';
import FriendCell from '@/components/user/friend/Cell';
import Footer from '@/common/_footer.vue'
import userService from '@/api/userService';
import common from '@/util/common';
import Baseline from '@/common/_baseline.vue';

export default {
  data() {
    return {
      friendList: [],
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyFriendList();
  },
  methods: {
    getMyFriendList() {
      userService.getMyFriendList().then(res => {
        if (!common.isOk(res)) return
        this.friendList = res.data.data.list;
      })
    },
    deleteCallBack(friendId) {
      let self = this;

      userService.deleteFriend(friendId).then(res => {
        if (!common.isOk(res)) return
        MessageBox.alert('删除成功').then(action => {
          self.getMyFriendList();
        });
      })


    },
    addFriends() {
      let self = this;
      this.popupVisible = false;
      MessageBox.prompt('请输入好友手机号').then(({ value, action }) => {
        console.log(value);
        self.addFriendForApi(value);
      });
    },
    addFriendForApi(phone) {
      let self = this;
      userService.addFriend(phone).then(res => {
        if (!common.isOk(res)) return
        Toast("添加好友成功");
        self.getMyFriendList();
      })
    }

  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    'v-friend-cell': FriendCell,
    'v-footer': Footer,
    'v-baseline': Baseline,
  }
}
</script>

<style lang="less">
</style>