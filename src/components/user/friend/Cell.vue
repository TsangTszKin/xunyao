<template>
  <mt-cell-swipe
    :title="name"
    :right="[
              {
                content: '删除好友',
                style: { background: 'red', color: '#fff', lineHeight: '48px', fontSize: '13px' },
                handler: () => this.deleteCallBack()
              }
            ]"
  >
    <!-- <div class="msg-cell"> -->
    <img :src="avatar" slot="icon" width="30" height="30" style="    margin-right: 10px;">
    <!-- <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">海王星辰</span>
    </div>-->
    <!-- </div> -->
  </mt-cell-swipe>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
export default {
  components: {
    'mt-cell-swipe': CellSwipe
  },
  props: {
    name: { type: String, default: '海王星辰' },
    avatar: { type: String, default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550682456839&di=7e051074d444088572c62ded90c4e9f3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg' },
    friendId: { type: Number, default: 0 }
  },
  methods: {
    deleteCallBack() {
      this.$emit('deleteCallBack', this.friendId)
    }
  }
}
</script>

<style lang="less" scoped>
.msg-cell {
  > img {
    float: left;
    margin: 13px 0;
    width: 40px;
    height: 40px;
    border-radius: 7px;
  }
  > .right {
    float: left;
    position: relative;
    padding: 17px 0 0 10px;
    > .name {
      font-size: 15px;
      color: #000;
    }
    > .time {
      font-size: 12px;
      color: #666;
      position: absolute;
      right: 0;
    }
    > .msg-details {
      font-size: 12px;
      color: #666;
      margin-top: 5px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1; //四行
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: initial;
    }
  }
}
</style>