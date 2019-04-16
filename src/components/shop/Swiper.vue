<template>
  <mt-swipe :auto="4000" style="height: 90px;
    padding: 5px;
    background-color: #dcdcdc80;">
    <mt-swipe-item v-for="(item, index) in adList" :key="index">
      <img :src="item.pic">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  props: {
    adList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  }
}
</script>

<style>
</style>
