<template>
  <div class="panel">
    <p>{{date}}</p>
    <ul>
      <v-cell v-for="(n, key) in goodsList" :goods="n" :key="key"/>
      <li class="v-clear"></li>
    </ul>
  </div>
</template>

<script>
import Cell from '@/components/user/footprint/Cell';

export default {
  props: {
    date: {
      type: String,
      default: ""
    },
    goodsList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
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
    // background-color: #dcdcdc38;
    > li.v-clear {
      margin-bottom: 20px;
    }
  }
}
</style>
