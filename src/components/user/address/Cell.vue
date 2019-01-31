<template>
  <div style="margin-bottom: 20px;">
    <div style="height: 40px; width: 40px; float:left;">
      <p
        style="background-color: gainsboro;
    border-radius: 50%;
    text-align: center;
        height: 30px;
    width: 30px;
    line-height: 30px;
    margin: 10px;
"
      >李</p>
    </div>

    <mt-cell
      title="李小白 18888888888"
      icon="edit"
      value="编辑"
      label="广东省广州市天河区车陂街道车陂大街车陂1号车陂1号车陂1号车陂1号"
      is-link
      style="float: left;width: calc(100% - 40px);"
    ></mt-cell>
    <div style="clear: both;"></div>
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

<style lang="less" scoped>
</style>