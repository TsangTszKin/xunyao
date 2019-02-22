<template>
  <mt-cell-swipe
    class="v-message-large"
    title
    :right="[
              {
                content: '取消关注',
                style: { background: 'red', color: '#fff' },
                handler: () => this.removeFavorite(this.id)
              }
            ]"
  >
    <div class="msg-cell">
      <img :src="avatar">
      <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">{{name}}</span>
        <span class="time">{{time}}</span>
        <p class="msg-details">{{msg}}</p>
      </div>
    </div>
  </mt-cell-swipe>
</template>
<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox } from 'mint-ui';
import bus from '@/util/bus';

export default {
  props: {
    id: { type: Number, default: 0 },
    name: { type: String, default: '海王星辰' },
    avatar: { type: String, default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550682456839&di=7e051074d444088572c62ded90c4e9f3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg' },
    time: { type: String, default: '19/01/15' },
    msg: { type: String, default: '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地' }
  },
  components: {
    'mt-cell-swipe': CellSwipe
  },
  methods: {
    removeFavorite(id) {
      bus.$emit('my.favorite', id)
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