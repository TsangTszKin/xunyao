<template>
  <li class="goods" >
    <div class="ui-img-div" @click="$router.push({name: '详情页', params:{id: data.id}})">
      <img :src="data.productImg">
    </div>
    <div class="brief" style="width: calc(60% - 14px)">
      <p class="name" @click="$router.push({name: '详情页', params:{id: data.id}})">{{this.data.name}}</p>
      <p class="size">{{this.data.specification}}</p>
      <p class="status">
        <span style="font-size: 13px;color:red;">参考价￥{{this.data.discountPrice}}</span>
        <!-- <span class="price">{{this.data.prescription}}</span> -->
        <!-- <span class="stock">
          库存
          <i style="margin: 0 3px;">有</i>
        </span>-->
      </p>
      <p class="status" style="height: 20px;position: relative;">
        <span class="stock" style="position: relative;">
          库存：
          <i style="margin: 0 3px;color: red;" v-if="this.data.stock == 0">无</i>
          <i style="margin: 0 3px;" v-else>有</i>
        </span>
        <i
          style="margin: 0px 3px;position: absolute; right: 10px;top: 5px;color: orange;"
          class="fa fa-cart-plus"
          @click="addCart"
        ></i>
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
import { Toast, MessageBox } from 'mint-ui';
import cartService from '@/api/cartService';
import common from '@/util/common';

export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  methods: {
    addCart() {
      if (localStorage.user && JSON.parse(localStorage.user).type != 1) {
        MessageBox({
          title: '提示',
          message: '请先完善您的信息！',
          showCancelButton: true,
          confirmButtonText: '去完善',
          cancelButtonText: '以后再算'
        }).then(action => {
          console.log("right", action);
          if (action === 'confirm') {//去查看
            this.$router.push({ name: '个人信息' })
          } else if (action === 'cancel') {//返回首页
            // this.$router.push({ name: '首页' })
          }
        }).catch(action => {
          console.log("left", action);
        });
        return
      }
      let productId = this.data.id;
      let quantity = 1;
      let shopId = this.$route.params.id;
      cartService.addCart(productId, quantity, shopId).then(res => {
        if (!common.isOk(res)) return
        Toast("已成功添加到购物车");
        this.getCartList();
      }).catch(() => { })
    },
    getCartList() {
      cartService.cartList().then(res => {
        if (!common.isOk(res)) return
        let data = res.data.data;
        let cartList = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            cartList.push(element);
          }
        }
        this.$store.commit("CHANGE_CART_LIST", cartList);
      })
    },
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