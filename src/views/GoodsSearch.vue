<template>
  <div class="shop">
    <mt-header title="在售药店">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>

    <div class="v-content">
      <div class="goods">
        <div class="ui-img-div">
          <img :src="productBase.productImg">
        </div>
        <div class="brief" style="width: calc(60% - 14px)">
          <p class="name">{{this.productBase.name}}</p>
          <p class="size">{{this.productBase.packaging}}</p>
          <p class="status">
            <span style="font-size: 13px;color:red;">
              参考价
              ￥{{this.productBase.discountPrice?this.productBase.discountPrice: 0}}
            </span>
          </p>
          <p class="status" style="height: 20px;">
            <span class="stock" style="position: relative;">（共{{this.productBase.count}}个报价）</span>
          </p>
        </div>
      </div>

      <ul>
        <v-shop-cell v-for="(item, i) in shopList" :key="i" :shop="item"/>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/common/_header.vue';
import ShopSwiper from '@/components/shop/Swiper';
import Main from '@/components/shop/Main';
import goodsService from '@/api/goodsService';
import userService from '@/api/userService';
import common from '@/util/common';
import { Popup, Navbar, TabItem, Indicator, Toast } from 'mint-ui';
import Cell from '@/components/user/ticket/Cell';
import Baseline from '@/common/_baseline.vue';
import ShopCell from '@/components/ShopCellSearch';

export default {
  components: {
    'v-header': Header,
    'shop-swiper': ShopSwiper,
    'shop-main': Main,
    'mt-popup': Popup,
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'v-ticket-cell': Cell,
    'v-baseline': Baseline,
    'v-shop-cell': ShopCell,
  },
  mounted() {
    window.scrollTo(0, 0);
    if (common.isEmpty(localStorage.lng) || common.isEmpty(localStorage.lat)) {
      Toast("请先定位的当前位置");
      this.$router.push({ name: '定位' });
    } else {
      this.getProductBaseInfo(localStorage.lng, localStorage.lat, this.$route.params.id);
    }
  },
  computed: {

  },
  data() {
    return {
      productBase: {
        productImg: '',
        name: '',
        packaging: '',
        minPrice: '',
        maxPrice: '',
        count: ''
      },
      shopList: [{
        "productId": '',
        "shopName": "XXXXX",
        "shopLogo": "",
        "address": "",
        "distance": 0,
        "shopService": [],
        "price": ""
      }]
    }
  },
  methods: {

    getProductBaseInfo(lng, lat, id) {
      goodsService.getProductBaseInfo(lng, lat, id).then(res => {
        if (!common.isOk(res)) return
        this.productBase = res.data.productBase;
        if (res.data.shopPage.totalCount > 0) {
          this.productBase.count = res.data.shopPage.totalCount;
          res.data.shopPage.list.forEach(element => {
            element.shopService = common.stringToArray(element.shopService);
          })
          this.shopList = res.data.shopPage.list;
        } else {
          this.shopList = [];
          this.productBase.count = 0;
        }

      })
    }
  }
}
</script>

<style lang="less" scoped>
.goods {
  height: 110px;
  padding: 5px 10px 30px 10px;
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
