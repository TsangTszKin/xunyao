<template>
  <li class="goods">
    <div class="ui-img-div" @click="$router.push({name: '详情页', params:{id: data.id}})">
      <img :src="data.productImg">
    </div>
    <div class="brief" style="width: calc(60% - 14px)">
      <p class="name" @click="$router.push({path: '/detail'})">{{this.data.name}}</p>
      <p class="size" @click="$router.push({path: '/detail'})">{{this.data.specification}}</p>
      <p class="status" @click="$router.push({path: '/detail'})">
        <span style="font-size: 13px;color:red;">参考价￥</span>
        <span class="price">{{this.data.discountPrice}}</span>
        <!-- <span class="stock">
          库存
          <i style="margin: 0 3px;">有</i>
        </span>-->
      </p>
      <p class="status" style="height: 20px;">
        <span
          class="stock"
          style="position: relative;"
          v-if="data.stock == 1"
          @click="changeGoodsStock(0)"
        >
          库存
          <i style="margin: 0 3px;color: #38af43;" class="fa fa-toggle-on fa-lg"></i>有
        </span>
        <span class="stock" style="position: relative;" v-else @click="changeGoodsStock(1)">
          库存
          <i style="margin: 0 3px;" class="fa fa-toggle-off fa-lg"></i>无
        </span>
        
        <span class="delete">
          <i style="margin: 0 3px;" class="fa fa-trash-o fa-lg" @click="deleteFunc(data.id)"></i>
        </span>
      </p>
      <!-- <div class="shop">
        <p class="name">{{this.data.shopName}}</p>
        <router-link :to="{name: '店铺主页'}">
          <p class="in">
            进店
            <i class="fa fa-angle-right fa-lg"></i>
          </p>
        </router-link>
      </div>-->
    </div>
  </li>
</template>

<script>
import { MessageBox } from 'mint-ui';
import bus from '@/util/bus';

export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    changeGoodsStock(stock) {
      bus.$emit("shop.aside.changeGoodsStock", this.data.id, stock)
    },
    deleteFunc(id) {
      MessageBox.confirm('确定删除该商品?', '提示').then(action => {
        bus.$emit("shop.aside.deleteGoods", id)
      }).catch(action => {
        // MessageBox.alert('取消删除', '提示');
      });
    }
  }
}
</script>


<style lang="less" scoped>
.goods {
  height: 110px;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
  > .ui-img-div {
    display: webkit-flex;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;

    height: 100%;
    float: left;
    width: 40%;
    // border-radius: 8px;
    -moz-box-shadow: 0px 1px 3px #808080;
    -webkit-box-shadow: 0px 1px 3px #808080;
    box-shadow: 0px 1px 3px #808080;
    > img {
      width: 100%;
    }
  }
  > .brief {
    height: 100%;
    float: left;
    padding: 0 7px;
    // width: calc(55% - 14);
    > p {
      margin-bottom: 4px;
    }
    > .name {
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2; //四行
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 13px;
    }
    > .size {
      font-size: 12px;
      color: orange;
      border-radius: 5px;
      border: 1px orange solid;
      width: fit-content;
      padding: 0 4px;
      margin: 7px 0 0 0;
    }
    > .status {
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1; //四行
      -webkit-box-orient: vertical;
      overflow: hidden;
      position: relative;
      > .price {
        font-size: 18px;
        color: red;
        font-weight: bold;
      }
      > .stock {
        font-size: 13px;
        position: absolute;
        right: 0;
      }
      > .delete {
        font-size: 13px;
        position: absolute;
        right: 0;
      }
    }
    > .shop {
      height: 20px;
      line-height: 20px;
      > .name {
        width: calc(100% - 40px);
        float: left;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1; //四行
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12px;
        opacity: 0.8;
      }
      .in {
        width: 40px;
        float: right;
        font-size: 12px;
        opacity: 0.8;
        > i {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>