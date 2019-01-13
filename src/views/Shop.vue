<template>
  <div class="shop">
    <v-header>
      <h1 slot="title">店铺主页</h1>
    </v-header>
    <div class="shopInfo">
      <div class="ui-img-div">
        <img src="../assets/images/goods.jpg">
      </div>
      <div class="bref" style=" width: calc(100% - 55px - 16px);">
        <p class="name">
          添色彩绘旗舰店
          <i class="fa fa-search fa-lg search">搜索</i>
        </p>
        <p class="location">地址：广东省广州市天河区车陂社区</p>
      </div>
      <div style="clear: both;"></div>
    </div>
    <shop-swiper  />
    <shop-main />
  </div>
</template>

<script>
import Header from '@/common/_header.vue';
import ShopSwiper from '@/components/shop/Swiper';
import Main from '@/components/shop/Main';

export default {
  components: {
    'v-header': Header,
    'shop-swiper': ShopSwiper,
    'shop-main': Main
  }
}
</script>

 <style lang="less" scoped>
.shop {
  > .shopInfo {
    padding: 10px;
    > .ui-img-div {
      display: webkit-flex;
      display: flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      float: left;
      > img {
        width: 100%;
      }
    }
    > .bref {
      float: left;
      padding: 7px 8px;

      > .name {
        height: 25px;
        color: #000;
        > .search {
          font-size: 15px;
          float: right;
          margin: 4px 9px;
          color: #666;
        }
      }
      > .location {
        height: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>
