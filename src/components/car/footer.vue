<template lang="html">
  <footer class="footer">

    <div class="footer-result">
      <p>共{{count}}件 金额：</p>
      <p><span>{{allpay}} </span>元</p>
    </div>
    <!-- <router-link :to="{ name: '分类页'}" class="footer-goon" >
      继续购物
    </router-link> -->
    <div class="footer-result">
      <p>保证金：</p>
      <p><span>{{allpay}} </span>元</p>
    </div>
    <a class="footer-pay" @click="goPay">
      去结算
    </a>
  </footer>

</template>

<script>
import { Toast } from 'mint-ui';

export default {
  computed: {
    // 勾选的商品数量
    count() {
      return this.$store.getters.getCartAllCount
    },

    //勾选的商品的价格总和
    allpay() {
      return this.$store.getters.getCartAllPrice
    }
  },

  methods: {
    //点击跳转到支付页
    goPay() {

      this.$router.push({ name: '支付页' })

    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

.footer {
  width: 100%;
  height: 16vw;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 16vw;
  left: 0;
  background-color: #ffffff;
  .footer-result,
  a {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
  }

  .footer-result {
    p {
      .fz(font-size, 24);
      color: #999;
    }

    p:last-of-type {
      padding: 1vw 0 0 1vw;
      span {
        color: @cl;
        .fz(font-size, 42);
      }
    }
  }

  .footer-goon {
    background-color: #f4f4f4;
    line-height: 16vw;
  }

  .footer-pay {
    background-color: @cl;
    line-height: 16vw;
    color: #fff;
  }
}
</style>
