<template lang="html">
  <section class="content">
    <p class="title">说明书</p>
    <div class="img-wrap">
      <img src="../../assets/images/details1.jpg">
    </div>
    <div class="img-wrap">
      <img src="../../assets/images/details2.jpg">
    </div>
    <div class="img-wrap">
      <img src="../../assets/images/details3.jpg">
    </div>

  </section>

</template>

<script>
export default {
  computed: {
    content() {
      return this.$store.state.detail.productDatas.contentImgSrc
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  margin-top: 10px;
  border-top: 20px solid #f8fcff;
  position: relative;
  .title {
    padding: 5px 7px;
    background-color: #f7f7f7;
    &:before {
      width: 3px;
      height: 28px;
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      // margin-top: -14px;
      background-color: green;
    }
  }
  .img-wrap {
    height: 120vw;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
