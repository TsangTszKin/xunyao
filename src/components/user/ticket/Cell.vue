<template>
  <!-- <mt-cell-swipe
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
      <img src="../../../assets/images/shop.jpg">
      <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">海王星辰</span>
        <span class="time">19/01/15</span>
        <p class="msg-details">亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地</p>
      </div>
    </div>
  </mt-cell-swipe>-->
  <div class="ticket">
    <p>海王星辰旗舰店</p>
    <div>
      <p class="price">
        ￥
        <span>50</span>满300减50
      </p>
      <p>2019.1.28 00:00~2019.1.31 00:00</p>
    </div>
    <mt-button
      type="primary"
      size="small"
      style="position: absolute;
    top: 27px;
    right: 8px;"
    @click="$router.push({name: '详情页'})"
    >去使用</mt-button>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Button } from 'mint-ui';
export default {
  components: {
    'mt-cell-swipe': CellSwipe,
    'mt-button': Button
  }
}
</script>

<style lang="less" scoped>
div.ticket {
  padding: 5px;
  margin: 5px;
  background-color: #f0f2f5;
  border-radius: 10px;
  position: relative;
  > p {
    color: #000;
  }
  > div {
    > p.price {
      color: #f40;
      font-size: 12px;
      > span {
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }
}
</style>