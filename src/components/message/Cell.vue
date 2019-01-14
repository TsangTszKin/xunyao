<template>
  <mt-cell-swipe
    title
    :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: () => this.$messagebox('已删除')
              }
            ]"
  >
    <div class="msg-cell">
      <img src="../../assets/images/shop.jpg">
      <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">海王星辰</span>
        <span class="time">19/01/15</span>
        <p class="msg-details">亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地</p>
      </div>
    </div>
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
    margin: 7px 0;
    width: 40px;
    height: 40px;
    border-radius: 7px;
  }
  > .right {
    float: left;
    position: relative;
    padding: 10px 0 0 10px;
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
    }
  }
}
</style>