<template>
  <li class="goods">
    <div class="ui-img-div">
      <img src="../../assets/images/goods.jpg">
    </div>
    <div class="brief" style="width: calc(60% - 14px)">
      <p class="name">{{this.data.goodsName}}</p>
      <p class="size">{{this.data.size}}</p>
      <p class="status">
        <span style="font-size: 13px;color:red;">￥</span>
        <span class="price">{{this.data.price}}</span>
        <span class="stock">
          库存
          <i style="margin: 0 3px;">{{this.data.stock}}</i>件
        </span>
      </p>
      <div class="shop">
        <p class="name">{{this.data.shopName}}</p>
        <router-link :to="{name: '店铺主页'}">
          <p class="in">
            进店
            <i class="fa fa-angle-right fa-lg"></i>
          </p>
        </router-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
  }
}
</script>


<style lang="less" scoped>
.goods {
  height: 110px;
  padding: 5px 10px;
  > .ui-img-div {
    display: webkit-flex;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;

    height: 100%;
    float: left;
    width: 40%;
    border-radius: 8px;
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
      font-size: 15px;
    }
    > .size {
      font-size: 12px;
      color: orange;
      border-radius: 5px;
      border: 1px orange solid;
      width: fit-content;
      padding: 0 4px;
    }
    > .status {
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1; //四行
      -webkit-box-orient: vertical;
      overflow: hidden;
      > .price {
        font-size: 20px;
        color: red;
      }
      > .stock {
        font-size: 13px;
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