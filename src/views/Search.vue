<template>
  <div class="search">
    <mt-search
      v-model="searchValue"
      :result.sync="searchResult"
      cancel-text="取消"
      placeholder="搜索"
      :autofocus="true"
      :show="true"
      @keyup.enter.native="search"
      style="position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;"
    ></mt-search>
    <div class="result">
      <ul
        v-if="$route.params.type == 'goods'"
        v-infinite-scroll="getGoodsList"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <goods-item v-for="(item, i) in goodsList" class="goods" :key="i" :data="item"/>
      </ul>
      <ul
        v-if="$route.params.type == 'shop'"
        class="section3-list"
        v-infinite-scroll="getShopList"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <v-shop-cell v-for="(k, index) in shopList" :key="index" :shop="k"/>
      </ul>
      <ul
        v-if="$route.params.type == 'friends'"
        class="section3-list"
        v-infinite-scroll="getFriendsList"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <li>
          <mt-cell title="李小白" value="18888888888"></mt-cell>
        </li>
         <li>
          <mt-cell title="李小白" value="18888888888"></mt-cell>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Search, Header, Button, Indicator, InfiniteScroll, Cell } from 'mint-ui';
import GoodsItem from '@/components/goods/GoodsItem';
import ShopCell from '@/components/ShopCell';
import shopService from '@/api/shopService';
import goodsService from '@/api/goodsService';
import common from '@/util/common';

export default {
  data() {
    return {
      searchValue: '',
      searchResult: [],
      loading: false,
      isEnd: false,
      page: 1,
      isInit: false,
      goodsList: [
        // {
        //   "id": 8,
        //   "shopName": "陈生陈生陈生",
        //   "distance": null,
        //   "className": "儿科用药",
        //   "name": "羚贝止咳糖浆(敖东)",
        //   "commonName": "羚贝止咳糖浆",
        //   "englishName": null,
        //   "productImg": "http://o2o.c-doctor.com/images/upload/prodimage/201308/2013819163735462.jpg",
        //   "oldPrice": 20,
        //   "discountPrice": 11,
        //   "viewCount": null
        // }
      ],
      shopList: [
        // {
        //   "shopId": 2,
        //   "createDate": null,
        //   "updateDate": null,
        //   "delFlag": "1",
        //   "remarks": "1",
        //   "ownerId": 2,
        //   "userName": "张明",
        //   "shopName": "张明家的店",
        //   "distance": null,
        //   "shopLogo": "http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg",
        //   "address": "广州黄埔",
        //   "longitude": 1,
        //   "latitude": 1,
        //   "phone": "13570412412",
        //   "telephone": "020-88545852",
        //   "businessTime": "早上10点至晚上22点",
        //   "shopService": 1,
        //   "drugLicensing": "1",
        //   "businessLicense": "1",
        //   "drugQuality": "1",
        //   "otherQualifications": "1",
        //   "isClosed": 0
        // }
      ]
    }
  },
  components: {
    'mt-header': Header,
    'mt-search': Search,
    'goods-item': GoodsItem,
    'v-shop-cell': ShopCell,
    'mt-cell': Cell
  },
  methods: {
    search() {
      this.isInit = true;
      // this.$messagebox("搜索");
      switch (this.$route.params.type) {
        case 'shop':
          this.getShopList();
          break;
        case 'goods':
          this.getGoodsList();
          break;
        case 'friends':
          this.getGoodsList();
          break;
        default:
          break;
      }
    },
    getShopList() {
      if (!this.isInit) return
      Indicator.open('加载中...');
      shopService.getShopList(this.page, this.searchValue).then(res => {
        this.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data.list)) {
          this.isEnd = true;
        } else {
          res.data.data.list.forEach(element => {
            this.shopList.push(element)
          })
          this.page++;
        }

      }).catch(() => {
        this.loading = false;
        Indicator.close();
      })
    },
    getGoodsList() {
      if (!this.isInit) return
      Indicator.open('加载中...');
      let params = {
        "name": this.searchValue,
        "shopId": this.$route.query.shopId
      }
      goodsService.searchGoodsList(this.page, params).then(res => {
        this.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data.list)) {
          this.isEnd = true;
        } else {
          res.data.data.list.forEach(element => {
            this.goodsList.push(element)
          })
          this.page++;
        }

      }).catch(() => {
        this.loading = false;
        Indicator.close();
      })
    },
    getFriendsList() {
      if (!this.isInit) return
      Indicator.open('加载中...');


    }
  },
  watch: {
    searchValue: function (newvs, oldvs) {
      console.log("newvs", newvs);
      console.log("oldvs", oldvs);
      if (!newvs) {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  > .result {
    position: absolute;
    top: 52px;
    width: 100%;
    z-index: 999;
  }
}
</style>
