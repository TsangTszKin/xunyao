<template>
  <div class="panel">
    <p class="cate">{{this.$store.state.shop.selectCate.className}}</p>
    <ul v-if="goods.length > 0" class="section4-list">
      <li v-for="k in goods" :key="k.id">
        <router-link :to="{name:'搜索结果', params:{id: k.id}}">
          <div>
            <img :src="k.productImg">
          </div>

          <p>{{k.name}}</p>
        </router-link>
        <!-- <h3>{{k.name}}</h3> -->
        <p class="price" style="font-size: 12px;">
          参考价
          <span style="font-size: 15px;">￥{{k.discountPrice?k.discountPrice:0}}</span>
        </p>
        <p style="font-size: 13px;">
          <span style="margin-right:3px;color:#38af43">{{k.useCount?k.useCount:0}}</span>家商家在售
        </p>
      </li>
    </ul>
    <p v-if="goods.length == 0" style="text-align: center;">暂无数据</p>
    <!-- <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i> -->
    <div
      style="position: absolute;bottom: 20%;right: 20px;width: 32px; height: 32px;"
      @click="$router.push({name: '购物车'})"
    >
      <div style="position: relative;">
        <img src="../../assets/images/购物车.png">
        <mt-badge
          size="small"
          type="error"
          style="position: absolute;top: -9px;right: -10px;"
          v-if="$store.getters.getCartAllCount > 0"
        >{{$store.getters.getCartAllCount}}</mt-badge>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/goods/GoodsItem';
import GoodsItem2 from '@/components/goods/GoodsItem2';
import GoodsItem3 from '@/components/goods/GoodsItem3';
import common from '@/util/common';
import { Badge } from 'mint-ui'

export default {
  components: {
    'goods-item': GoodsItem,
    'goods-item2': GoodsItem2,
    'goods-item3': GoodsItem3,
    'mt-badge': Badge
  },
  props: {
    goods: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  mounted() {
  }
}
</script>

<style lang='less' scoped>
@import "../../assets/fz.less";
.panel {
  width: 80%;
  float: left;
  height: 100%;
  overflow-y: scroll;
  > .cate {
    text-align: left;
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
  }
}

.section4-list {
  width: 100%;
  display: -ms-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  overflow: hidden;
  li {
    width: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 4vw;
    height: 155px;
    > .price {
      white-space: nowrap;
      > span {
        display: inline-block;
        // padding-bottom: 3vw;
        color: #b4282d;
      }
    }
    > a {
      display: block;
      width: 100%;
      position: relative;
      > div {
        display: webkit-flex;
        display: flex;
        justify-content: center;
        overflow: hidden;
        align-items: center;
        height: 100px;
        > img {
          display: block;
          width: 100%;
        }
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: gainsboro;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 1.2vw 2vw;
        background-color: rgba(238, 238, 238, 0.9);
        font-size: 13px;
      }
    }

    > h3 {
      padding-top: 3vw;
      .fz(font-size, 40);
    }
  }
}
</style>
