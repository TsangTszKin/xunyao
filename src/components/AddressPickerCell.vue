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
     >{{data.receiverName.substr(0, 1)}}</p>
    </div>

    <mt-cell
      :title="data.receiverName+' '+data.receiverPhone"
      icon="edit"
      value="确定"
      :label="data.province+data.city+data.district+data.receiverAddress"
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
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          receiverName: '收',
          receiverPhone: '',
          province: '',
          city: '',
          district: '',
          receiverAddress: '',
          id: ''
        }
      }
    }
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