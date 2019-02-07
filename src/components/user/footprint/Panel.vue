<template>
  <div class="panel">
    <p>2018-02-06</p>
    <ul>
      <v-cell v-for="(n, key) in 4" :key="key" />
      <li class="v-clear"></li>
    </ul>
  </div>
</template>

<script>
import Cell from '@/components/user/footprint/Cell';

export default {
  components: {
    'v-cell': Cell
  }
}
</script>

<style lang="less" scoped>
div.panel {
    margin-bottom: 10px;
  > p {
    font-size: 10px;
    height: 25px;
    line-height: 25px;
    padding-left: 10px;
  }
  > ul {
    > li.v-clear {
      margin-bottom: 20px;
    }
  }
}
</style>
