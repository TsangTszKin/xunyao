<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
       <mt-header title="购物车">
      </mt-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <div class="v-content">
        <v-something v-if="count"/>
        <v-nothing v-else/>
      </div>
     
      <v-footer/>
      <FooterIndex />
    </div>
</template>

<script>
// import Header from '@/common/_header.vue'
import Nothing from '@/components/car/nothing.vue'
import Something from '@/components/car/something.vue'
import Footer from '@/components/car/footer.vue'
import FooterIndex from '@/common/_footer.vue'
import { Header } from 'mint-ui'

export default {
  components: {
    'mt-header': Header,
    'v-nothing': Nothing,
    'v-something': Something,
    'v-footer': Footer,
    FooterIndex
  },

  computed: {
    count() {
      return this.$store.state.detail.count
    }
  },
  mounted() {
    // 防止刷新页面数据为空
    if (this.$store.state.detail.count == "") {
      this.$store.commit('RESET_COUNT')
    }
    window.scrollTo(0, 0);
  }

}
</script>

<style lang="less" scoped>
.car {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
