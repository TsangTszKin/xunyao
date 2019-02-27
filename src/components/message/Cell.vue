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
      <img src="../../assets/images/通知.png" v-if="isConfig">
      <img :src="avatar" v-else>
      <span
        style="position: absolute;top: 10px;left: 35px;height: 8px;width: 8px;background-color: red;border-radius: 50%;"
      ></span>
      <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">{{name}}</span>
        <span class="time">{{time}}</span>
        <p class="msg-details">{{msg}}</p>
      </div>
    </div>
  </mt-cell-swipe>
</template>
<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Badge } from 'mint-ui';
export default {
  props: {
    name: { type: String, default: '海王星辰' },
    avatar: { type: String, default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550682456839&di=7e051074d444088572c62ded90c4e9f3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg' },
    time: { type: String, default: '19/01/15' },
    msg: { type: String, default: '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地' },
    isConfig: { type: Boolean, default: true }//1系统消息，
  },
  components: {
    'mt-cell-swipe': CellSwipe,
    'mt-badge': Badge
  }
}
</script>

<style lang="less" scoped>
.msg-cell {
  position: relative;
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