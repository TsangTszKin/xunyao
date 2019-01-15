<template>
  <div class="shop">
    <mt-header title="店铺主页">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <router-link :to="{name:'搜索页'}" slot="right">
        <mt-button icon="search" style="margin-left: 30px;"></mt-button>
      </router-link>
    </mt-header>
    <div class="shopInfo">
      <div class="ui-img-div">
        <img src="../assets/images/shop.jpg">
      </div>
      <div class="bref" style=" width: calc(100% - 55px - 16px);">
        <p class="name">添色彩绘旗舰店
          <!-- <i class="fa fa-search fa-lg search">搜索</i> -->
        </p>
        <p class="location">地址：广东省广州市天河区车陂社区</p>
      </div>
      <div style="clear: both;"></div>
    </div>
    <shop-swiper/>
    <shop-main/>
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
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

 <style lang="less" scoped>
.shop {
  > .shopInfo {
    padding: 10px 10px 0 10px;
    > .ui-img-div {
      display: webkit-flex;
      display: flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;
      height: 70px;
      width: 70px;
      border-radius: 50%;
      margin: auto;
      // float: left;
      > img {
        width: 100%;
      }
    }
    > .bref {
      // float: left;
      padding: 5px 8px;
      text-align: center;
      margin: auto;
      > .name {
        height: 25px;
        color: #000;
        font-size: 18px;
        font-family: "微软雅黑";
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
        margin-top: 2px;
      }
    }
  }
}
</style>
