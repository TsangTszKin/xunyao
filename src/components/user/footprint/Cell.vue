<template>
  <li @click="$router.push({name:'详情页', params:{id: goods.productId}})" style="width: calc(33% - 10px);">
    <div class="top">
      <img :src="goods.productImg">
    </div>
    <div class="bottom">
      <p class="price">￥{{goods.productPrice}}</p>
      <p class="shop-name">{{goods.productName}}</p>
    </div>
  </li>
</template>

<script>

export default {
 props:{
    goods: {
      type: Object,
      default: function(){
        return {
                "id": 16,
                "userId": 4,
                "buyerId": 7,
                "shopId": 3,
                "productId": 8,
                "userName": "东",
                "shopName": "陈生陈生陈生",
                "productName": "羚贝止咳糖浆(敖东)",
                "productImg": "http://o2o.c-doctor.com/images/upload/prodimage/201308/2013819163735462.jpg",
                "productPrice": "11.00",
                "createTime": "2019-02-19 12:32:45"
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
li {
  width: calc(33% - 10px);
  height: 145px;
  float: left;
  margin: 5px;
  cursor: pointer;
  > div.top {
    display: webkit-flex;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    width: 100%;
    height: 90px;
    > img {
      width: 100%;
    }
  }
  > div.bottom {
    padding-left: 10px;
    height: 40px;
    > .price {
      font-size: 12px;
      color: red;
      margin-top: 5px;
    }
    > .shop-name {
      font-size: 12px;
    }
  }
}
</style>
