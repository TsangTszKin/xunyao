<template>
  <mt-badge size="small" color="#efeff4" style="color:#000;margin: 5px 10px;">{{data}}</mt-badge>
</template>

<script>
import { Badge } from 'mint-ui';
export default {
  components: {
    'mt-badge': Badge
  },
  props: ["data"]
}
</script>

<style>
</style>
