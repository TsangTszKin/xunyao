<template>
  <div class="v-content">
    <p class="question">下单流程是怎样的？</p>
    <div class="main">
      <p class="step">1，找到合适的药品选择加入购物车</p>
      <div class="ui-img">
        <img src="../../../../assets/images/help/qna1/1.png">
      </div>

      <p class="step">2，选择药品数量，确定加入</p>
      <div class="ui-img">
        <img src="../../../../assets/images/help/qna1/2.png">
      </div>

      <p class="step">3，选择完想要购买的药品到购物车后，进去购物车一览药品，确定无误后点击结算</p>
      <div class="ui-img">
        <img src="../../../../assets/images/help/qna1/3.png">
      </div>

      <p class="step">4，提供自取和配送两个选项， 配送可以选择自己收货或者好友代收</p>
      <div class="ui-img">
        <img src="../../../../assets/images/help/qna1/4.png">
      </div>

      <p class="step">5，可选择可用的优惠券抵扣一部分订单总金额</p>
      <div class="ui-img">
        <img src="../../../../assets/images/help/qna1/5.png">
      </div>

      <p class="step">6，提交订单后在“我的”订单里面查看订单</p>
      <div class="ui-img">
        <img src="../../../../assets/images/help/qna1/6.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less"scoped>
.v-content {
  overflow: scroll;
  position: fixed;
  width: 100%;
  > .question {
    color: #000;
    font-weight: bold;
    font-size: 15px;
    padding: 8px;
    border-bottom: 1px solid #eaeaea;
  }
  > .main {
    > .step {
      padding: 14px;
    }
    > .ui-img {
      padding: 10px 42px;
      > img {
        width: 100%;
      }
    }
  }
}
</style>
