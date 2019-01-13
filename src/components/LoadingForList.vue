<template>
  <div
    style="    margin-left: 50%;
    width: 100px;
    position: relative;
    left: -45px;
    top: 10px;"
  >
    <p style="float:left;">
      <mt-spinner type="fading-circle"></mt-spinner>
    </p>
    <p style="float:left;margin-left: 10px;">加载中...</p>
  </div>
</template>

<script>
import { Spinner } from 'mint-ui';
export default {
  components: {
    'mt-spinner': Spinner
  },
}
</script>

<style>
</style>
