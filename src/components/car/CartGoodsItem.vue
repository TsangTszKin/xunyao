<template>
  <li >
    <!-- <div class="something-left" @click="toggle(i ,k.choseBool)">
                <label class="true" :class="{false:!k.choseBool}">
                  <input type="checkbox" :value="k.choseBool">
                </label>
    </div>-->
    <div class="something-middle">
      <img :src="cartGoods.img">
    </div>
    <div class="something-right">
      <p>{{cartGoods.name}}</p>
      <p style="color:rgb(199, 108, 28)">
        <!-- {{k.col}} 
        --->
        {{cartGoods.size}}
      </p>
      <p>参考价：{{cartGoods.price}}元</p>
      <p class="count">
        <i class="fa fa-minus-square-o fa-lg" @click="changeItemCount('sub',shopIndex, goodsIndex)"></i>
        <input
          type="number"
          readonly
          :value="cartGoods.count"
          @keyup="(e)=>{
                    changeItemCount('replace', i, goodsIndex, e.target.value);
                  }"
        >
        <i class="fa fa-plus-square-o fa-lg" @click="changeItemCount('add',shopIndex, goodsIndex)"></i>
      </p>
      <div class="something-right-bottom" @click="deleteGoods(shopIndex, goodsIndex)">
        <span></span>
      </div>
    </div>
  </li>
</template>

<script>
import common from '@/util/common';
import { Toast } from 'mint-ui';

export default {
  props: {
    shopIndex: {
      type: Number,
      default: 0
    },
    goodsIndex: {
      type: Number,
      default: 0
    },
    cartGoods: {
      type: Object,
      default: function () {
        return {
          name: '复方金银花颗粒(诺金)',
          id: 5,
          count: 1,
          img: 'http://o2o.c-doctor.com/images/upload/prodimage/201604/201642614542296.jpg',
          price: 118,
          size: '12g*6袋'
        }
      }
    }
  },
  methods: {

    changeItemCount(type, index1, index2, value) {//type（add,sub,replace）
      let cartList = this.$store.state.cart.cartList;
      switch (type) {
        case 'add':
          cartList[index1].productList[index2].count++;
          break;

        case 'sub':
          if (cartList[index1].productList[index2].count > 1) {
            cartList[index1].productList[index2].count--;
          } else {
            Toast('不能再少了哦~');
          }
          break;

        case 'replace':
          if (value > 1) {
            cartList[index1].productList[index2].count = value;
          }

          break;
        default:
          break;

      }


    },
    deleteGoods(index1, index2) {
      let cartList = this.$store.state.cart.cartList;
      cartList[index1].productList.splice(index2, 1);
      this.$store.commit("CHANGE_CART_LIST", cartList);
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

li {
  display: -ms-flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 4vw 2vw;
  position: relative;
  height: 26vw;
  .bd();
  .something-left {
    -ms-flex: 2;
    -webkit-box-flex: 2;
    flex: 2;

    label {
      float: left;
      background: url("../../assets/car/images/t.svg") no-repeat center
        center/50% 50%;
      input {
        height: 14vw;
        width: 14vw;
        opacity: 0;
        filter: alpha(opacity=0);
      }
    }
    .false {
      background: url("../../assets/car/images/f.svg") no-repeat center center /
        50% 50% !important;
    }
  }
  .something-middle {
    -ms-flex: 3;
    -webkit-box-flex: 3;
    flex: 3;
    height: 26vw;
    padding-left: 2vw;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .something-right {
    -ms-flex: 7;
    -webkit-box-flex: 7;
    flex: 7;
    height: 100%;
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column wrap;
    flex-flow: column wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-left: 6vw;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      .fz(font-size, 26);
    }
    p:last-of-type {
      .fz(font-size, 22);
      color: rgb(168, 168, 168);
    }
    > p.count {
      > input {
        width: 30px;
        border: 1px solid gainsboro;
        margin-top: -2px;
        text-align: center;
      }
    }
    .something-right-bottom {
      > div {
        display: -ms-flex;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        input {
          width: 6vw;
          text-align: center;
        }

        span {
          height: 7vw;
          line-height: 7vw;
          width: 8vw;
          display: inline-block;
          border: 0.2vw solid #f1f1f1;
          border-radius: 1vw;
          text-align: center;
          font-size: 20px;
          cursor: pointer;
        }
      }
      > span {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 13vw;
        height: 13vw;
        background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
      }
    }
  }
}
</style>

