<template>
  <div style="width: 100%;    padding-top: 20px;">
    <mt-cell
      :title="n.friendName"
      v-for="(n, k) in friendList"
      :key="k+Math.random()"
      style="border-bottom: 1px solid #dcdcdc6b;"
      @click.native="selectFriend(n.friendId, n.friendName)"
    >
      <span>选择</span>
      <img slot="icon" :src="n.friendHeadimgurl" width="24" height="24">
    </mt-cell>
  </div>
</template>

<script>
// import Cell from '@/components/FriendsPickerCell';
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Cell } from 'mint-ui';
import userService from '@/api/userService';
import common from '@/util/common';
import bus from '@/util/bus';

export default {
  components: {
    // 'v-cell': Cell,
    'mt-cell': Cell,
  },
  // props: ['index'],
  data() {
    return {
      friendList: []
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
    selectFriend(buyerId, friendName) {
      bus.$emit("car.pay.selectFriend", buyerId, friendName)
    }
  },
}
</script>

<style>
</style>
