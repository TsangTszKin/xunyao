<template>
  <mt-swipe :auto="4000" style="height: 70px;
    padding: 5px;
    background-color: #dcdcdc80;">
    <mt-swipe-item>
      <img src="../../assets/images/banner.jpg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../../assets/images/banner.jpg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../../assets/images/banner.jpg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../../assets/images/banner.jpg">
    </mt-swipe-item>
    <mt-swipe-item>
      <img src="../../assets/images/banner.jpg">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  }
}
</script>

<style>
</style>
