<template>
  <div style="margin-bottom: 20px;">
    <mt-cell
      title="李小白"
      icon="edit"
      value="18888888888"
    ></mt-cell>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Button, Cell } from 'mint-ui';
export default {
  components: {
    'mt-button': Button,
    'mt-cell': Cell
  }
}
</script>

<style lang="less" >
.mint-cell-title {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
</style>