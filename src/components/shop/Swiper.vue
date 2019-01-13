<template>
  <mt-swipe :auto="4000" style="height:100px;">
    <mt-swipe-item><img src="../../assets/images/goods.jpg" /></mt-swipe-item>
    <mt-swipe-item><img src="../../assets/images/goods.jpg" /></mt-swipe-item>
    <mt-swipe-item><img src="../../assets/images/goods.jpg" /></mt-swipe-item>
    <mt-swipe-item><img src="../../assets/images/goods.jpg" /></mt-swipe-item>
    <mt-swipe-item><img src="../../assets/images/goods.jpg" /></mt-swipe-item>
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
