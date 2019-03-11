<template>
  <div class="to-top" @click="toTop">
    <i class="fa fa-arrow-up fa-lg"></i>
  </div>
</template>

<script>
export default {
  methods: {
    toTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="less" scoped>
.to-top {
  height: 30px;
  width: 30px;
  position: fixed;
  bottom: 100px;
  right: 15px;
  z-index: 9999;
  background-color: #000;
  border-radius: 50%;
  opacity: 0.5;
  line-height: 24px;
  text-align: center;
  > i {
    color: #fff;
    font-size: 15px;
  }
}
</style>
