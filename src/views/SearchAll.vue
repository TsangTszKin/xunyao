<template>
  <div class="search">
    <mt-search
      v-model="searchValue"
      :result.sync="searchResult"
      cancel-text="取消"
      placeholder="搜索"
      :autofocus="true"
      :show="true"
      @keyup.enter.native="search(true)"
      style="position: fixed;top: 0;width: 100%;z-index: 1;height: 40px;"
    ></mt-search>
    <mt-navbar v-model="searchType" style="margin-top: 40px;">
      <mt-tab-item id="1">药品</mt-tab-item>
      <mt-tab-item id="2">店铺</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="searchType" style="margin: 5px 0 30px 0;">
      <mt-tab-container-item id="1">
        <ul
          class="section3-list"
          v-infinite-scroll="getGoodsList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <!-- <v-shop-cell v-for="(k, index) in goodsList" :key="index" :shop="k"/> -->
          <goods-item v-for="(item, i) in goodsList" class="goods" :key="i" :data="item"/>
        </ul>
        <p
          style="margin-top: 10px; text-align:center;"
          v-if="searchType == '1' && goodsList.length == 0"
        >暂无数据</p>
        <v-baseline v-else/>
      </mt-tab-container-item>

      <mt-tab-container-item id="2">
        <ul
          v-infinite-scroll="getShopList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <v-shop-cell v-for="(item, i) in shopList" :key="i" :shop="item"/>
        </ul>

        <p
          style="margin-top: 10px; text-align:center;"
          v-if="searchType == '2' && shopList.length == 0"
        >暂无数据</p>
        <v-baseline v-else/>
      </mt-tab-container-item>
    </mt-tab-container>

    <div v-if="goodsList.length == 0 && shopList.length == 0">
      <div v-if="historySearchKey.length > 0">
        <p style="padding: 5px 13px;color: #000;">
          历史搜索
          <i class="fa fa-trash-o fa-lg" style="float: right;" @click="deleteHistorySearchKey"></i>
        </p>
        <div>
          <v-search-key-cell
            v-for="(n, i) in historySearchKey"
            :data="n"
            :key="i"
            v-if="i < 10"
            @click.native="selectSearchKeyWord(n)"
          />
        </div>
      </div>

      <div style="margin-top: 20px;">
        <p style="padding: 5px 13px;color: #000;">热门搜索</p>
        <div>
          <v-search-key-cell
            v-for="(n, i) in hotSearchKey"
            :data="n"
            :key="i"
            v-if="i < 10"
            @click.native="selectSearchKeyWord(n)"
          />
        </div>
      </div>
    </div>

    <!-- <div class="result"></div> -->
  </div>
</template>

<script>
import { Search, Header, Button, Indicator, InfiniteScroll, Cell, Navbar, TabItem } from 'mint-ui';
import GoodsItem from '@/components/goods/GoodsItemSearch';
import ShopCell from '@/components/ShopCell';
import shopService from '@/api/shopService';
import goodsService from '@/api/goodsService';
import common from '@/util/common';
import SearchkeyCell from '@/components/search/searchKeyCell';
import commonService from '@/api/commonService';
import Baseline from '@/common/_baseline.vue'


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
      ],
      shopGoodsList: [],
      searchType: '1',
      historySearchKey: [],
      hotSearchKey: [],
    }
  },
  components: {
    'mt-header': Header,
    'mt-search': Search,
    'goods-item': GoodsItem,
    'v-shop-cell': ShopCell,
    'mt-cell': Cell,
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'v-search-key-cell': SearchkeyCell,
    'v-baseline': Baseline,
  },
  mounted() {
    this.initHistorySearchKey();
    this.getHotSearchKeyWord();
  },
  methods: {
    selectSearchKeyWord(value) {
      this.searchValue = value;
      this.search();
    },
    search(isInitPageno) {
      if (common.isEmpty(this.searchValue)) return
      if (isInitPageno) {
        this.page = 1;
        window.scrollTo(0, 0);
      }
      this.isInit = true;
      // this.$messagebox("搜索");
      switch (this.searchType) {
        case '1':
          this.getGoodsList();
          break;
        case '2':
          this.getShopList();
          break;
        default:
          break;
      }
      if (common.isEmpty(localStorage.historySearchKey)) {
        localStorage.historySearchKey = this.searchValue;
      } else {

        let arrayTemp = [];
        let array2 = common.stringToArray(localStorage.historySearchKey);
        array2.forEach(element => {
          if (element != this.searchValue) {
            arrayTemp.push(element);
          }
        })
        localStorage.historySearchKey = common.arrayToString(arrayTemp) + ',' + this.searchValue;

      }
      this.initHistorySearchKey();
    },
    initHistorySearchKey() {
      if (common.isEmpty(localStorage.historySearchKey)) {
        this.historySearchKey = [];
      } else {
        this.historySearchKey = common.stringToArray(localStorage.historySearchKey).reverse();
      }

    },
    deleteHistorySearchKey() {
      localStorage.removeItem("historySearchKey");
      this.initHistorySearchKey();
    },
    getHotSearchKeyWord() {
      commonService.getHotSearchKeyWord("", this.searchType).then(res => {
        if (!common.isOk(res)) return
        let arrayTemp = [];
        res.data.data.forEach(element => {
          arrayTemp.push(element.keyword);
        })
        this.hotSearchKey = arrayTemp;
      })
    },
    getShopList() {
      if (this.searchType != 2) return
      if (!this.isInit) return
      if (this.isEnd) return
      Indicator.open('加载中...');
      this.loading = true;
      shopService.getShopList(this.page, this.searchValue).then(res => {
        this.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data)) {
          this.isEnd = true;
        } else {
          res.data.data.forEach(element => {
            if (element.distance > 1000) {
              element.distance = (element.distance / 1000).toFixed(1) + 'km';
            } else {
              element.distance = element.distance.toFixed(1) + 'm';
            }
            element.shopService = common.stringToArray(element.shopService);
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
      if (this.searchType != 1) return
      if (!this.isInit) return
      if (this.isEnd) return
      Indicator.open('加载中...');
      this.loading = true;
      goodsService.searchGoodsList(this.searchValue, this.page).then(res => {
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
    getShopGoodsList() {
      if (!this.isInit) return
      Indicator.open('加载中...');
      goodsService.searchShopGoodsList(this.$route.query.shopId, this.searchValue, this.page).then(res => {
        this.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data.list)) {
          this.isEnd = true;
        } else {
          res.data.data.list.forEach(element => {
            this.shopGoodsList.push(element)
          })
          this.page++;
        }

      }).catch(() => {
        this.loading = false;
        Indicator.close();
      })
    },
  },
  watch: {
    searchValue: function (newvs, oldvs) {
      console.log("newvs", newvs);
      console.log("oldvs", oldvs);
      this.page = 1;
      this.shopGoodsList = [];
      this.goodsList = [];
      if (!newvs) {
        // this.$router.go(-1);
      }
    },
    searchType: function (newvs, oldvs) {
      console.log("newvs", newvs);
      console.log("oldvs", oldvs);
      window.scrollTo(0, 0);
      this.isEnd = false;
      this.page = 1;
      this.shopGoodsList = [];
      this.goodsList = [];
      this.shopList = [];
      this.search();
      this.getHotSearchKeyWord();
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
