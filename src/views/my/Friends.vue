<template>
  <div class="message">
    <mt-header title="我的好友">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <i slot="right" class="fa fa-plus-circle fa-lg" @click="addFriends"></i>
    </mt-header>

    <div class="v-content">
      <v-favorite-cell
        v-for="(n, key) in friendList"
        :name="n.friendName"
        :avatar="n.friendHeadimgurl"
        :key="key+Math.random()"
        @click.native="$router.push({name: '店铺主页', params:{id: n.shopId}})"
      />
    </div>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Cell, Popup } from 'mint-ui';
import FavoriteCell from '@/components/user/favorite/Cell';
import Footer from '@/common/_footer.vue'
import userService from '@/api/userService';
import common from '@/util/common';

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
    deleteCallBack() {
      MessageBox.alert('操作成功').then(action => {

      });
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
      userService.addFriend(phone).then(res => {
        if (!common.isOk(res)) return
        Toast("添加好友成功");
        this.getMyFriendList();
      })
    }

  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    'v-favorite-cell': FavoriteCell,
    'v-footer': Footer
  }
}
</script>

<style lang="less">
</style>