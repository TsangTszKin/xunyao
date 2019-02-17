<template>
  <footer class="footer">
    <div class="footer-result">
      <p>合计保证金：</p>
      <p>
        <span>{{allpay}}</span>元
      </p>
    </div>
    <a class="footer-pay" @click="goPay">提交订单</a>
  </footer>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  mounted() {
  },
  props: {
    totalMoney: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    allpay() {
      return this.$store.getters.getCartAllPrice
    }
  },
  methods: {
    //点击跳转到支付页
    goPay() {

      // 如果有选择商品才能跳转
      if (this.$store.getters.selectedList.length) {
        // 保存+缓存选择的商品 ,在支付页能用到
        this.$store.dispatch('setSelectedList')
        this.$router.push({ name: '支付页' })

      } else {

        Toast('你还没选择商品')

      }

    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/fz.less";

.footer {
  width: 100%;
  height: 16vw;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
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
