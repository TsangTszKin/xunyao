<template>
  <!-- <mt-cell-swipe
    title
    :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: () => this.$messagebox('已删除')
              }
            ]"
  >
    <div class="msg-cell">
      <img src="../../../assets/images/shop.jpg">
      <div class="right" style="width: calc(100% - 40px - 10px);">
        <span class="name">海王星辰</span>
        <span class="time">19/01/15</span>
        <p class="msg-details">亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地</p>
      </div>
    </div>
  </mt-cell-swipe>-->
  <div class="ticket">
    <!-- <p>{{data.shopName}}</p> -->
    <div>
      <p class="price">
        ￥
        <span>{{data.cash}}</span>
        {{
        data.type == 1?`满${data.meet}免邮`:''
        }}
        {{
        data.type == 2?`满${data.meet}减${data.cash}现金`:''
        }}
        {{
        data.type == 3?`满${data.meet}减${data.cash}抵压金`:''
        }}
      </p>
      <p
        style="font-size: 14px;
    margin-top: 6px;"
      >{{type == 1?data.startTime:data.beginTime}}~{{data.endTime}}</p>
    </div>
    <mt-button
      :disabled="data.status == 0"
      type="primary"
      size="small"
      style="position: absolute;
    top: 22px;
    right: 8px;"
      v-if="type == 0"
      @click="$emit('callBack', data)"
    >选择</mt-button>
    <mt-button
      :disabled="data.status == 0"
      type="primary"
      size="small"
      style="position: absolute;
    top: 22px;
    right: 8px;"
      v-if="type == 2"
      @click="$router.push({name: '店铺主页', params: {id: data.shopId}})"
    >去使用</mt-button>
    <mt-button
      :disabled="data.status == 0"
      type="primary"
      size="small"
      style="position: absolute;
    top: 22px;
    right: 8px;"
      v-if="type == 1"
      @click="$emit('callBack', data.id)"
    >领取</mt-button>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Button } from 'mint-ui';

export default {
  props: {
    type: {
      type: Number,
      default: 0//0去选择，1领取， 2去店铺使用
    },
    index: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      defalut: function () {
        return {
          "id": 7,
          "shopId": 2,
          "shopName": "张明家的店",
          "name": "活动名称",
          "startTime": "2019-01-30",
          "endTime": "2019-02-28",
          "type": 2,
          "status": 1,
          "meet": 333,//满
          "cashRequired": 0,
          "cash": 2,//减
          "postage": 0,
          "provideNum": 11,
          "getNum": null,
          "useNum": null,
          "createBy": "admin",
          "createDate": "2019-01-30 10:49:24",
          "updateBy": null,
          "updateDate": null,
          "remarks": null,
          "delFlag": "0"
        }
      }
    }
  },
  components: {
    'mt-cell-swipe': CellSwipe,
    'mt-button': Button
  }
}
</script>

<style lang="less" scoped>
div.ticket {
  padding: 5px;
  margin: 5px;
  background-color: #f0f2f5;
  border-radius: 10px;
  position: relative;
  > p {
    color: #000;
  }
  > div {
    > p.price {
      color: #f40;
      font-size: 12px;
      > span {
        font-size: 25px;
        margin-right: 5px;
      }
    }
  }
}
</style>