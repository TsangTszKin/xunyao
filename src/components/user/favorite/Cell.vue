<template>
  <mt-cell-swipe
    title="海王星辰"
    :right="[
              {
                content: '取消关注',
                style: { background: 'red', color: '#fff', lineHeight: '48px', fontSize: '13px' },
                handler: () => this.$messagebox('已取消关注')
              }
            ]"
  >
    <!-- <div class="msg-cell"> -->
      <img src="../../../assets/images/shop.jpg" slot="icon" width="30" height="30" style="    margin-right: 10px;">
      <!-- <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">海王星辰</span>
      </div> -->
    <!-- </div> -->
  </mt-cell-swipe>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
export default {
  components: {
    'mt-cell-swipe': CellSwipe
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