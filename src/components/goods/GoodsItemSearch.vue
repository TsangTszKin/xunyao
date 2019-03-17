<template>
  <li class="goods" @click="$router.push({name: '搜索结果', params:{id: data.id}})">
    <div class="ui-img-div">
      <img :src="data.productImg">
    </div>
    <div class="brief" style="width: calc(60% - 14px)">
      <p class="name">{{this.data.name}}</p>
      <p class="size">{{this.data.specification}}</p>
      <p class="status">
        <span style="font-size: 13px;color:red;">参考价￥{{this.data.discountPrice}}</span>
        <!-- <span class="price">{{this.data.prescription}}</span> -->
        <!-- <span class="stock">
          库存
          <i style="margin: 0 3px;">有</i>
        </span>-->
      </p>
      <p class="status" style="height: 20px;">
        <span class="stock" style="position: relative;">
          库存：
          <i style="margin: 0 3px;color: red;" v-if="this.data.stock == 0">无</i>
          <i style="margin: 0 3px;" v-else>有</i>
          <!-- <i style="margin: 0 3px;">有</i> -->
        </span>
      </p>
      <div class="shop">
        <!-- <p class="name">{{this.data.shopName}}</p> -->
        <p class="in">
          <span class="num">37</span>家商家在售
          <!-- <i class="fa fa-angle-right fa-lg"></i> -->
        </p>
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
        // width: 40px;
        margin-top: -19px;
        float: right;
        font-size: 12px;
        opacity: 0.8;
        > .num {
          color: #38af43;
          margin-right: 5px;
        }
        > i {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>