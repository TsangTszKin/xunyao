<template>
  <li @click="$router.push({name:'详情页'})">
    <div class="top">
      <img src="../../../assets/images/goods.jpg">
    </div>
    <div class="bottom">
      <p class="price">￥178</p>
      <p class="shop-name">海王星辰旗舰店</p>
    </div>
  </li>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
li {
  width: 33%;
  height: 130px;
  float: left;
  cursor: pointer;
  > div.top {
    display: webkit-flex;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    width: 100%;
    height: 90px;
    > img {
      width: 100%;
    }
  }
  > div.bottom {
    padding-left: 10px;
    height: 40px;
    > .price {
      font-size: 12px;
      color: red;
      margin-top: 5px;
    }
    > .shop-name {
      font-size: 12px;
    }
  }
}
</style>
