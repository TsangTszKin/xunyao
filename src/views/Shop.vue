<template>
  <div class="shop">
    <mt-header title>
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>

      <mt-button slot="right" style="margin-left: 20px;" @click="popupVisible = true">活动</mt-button>
      <i
        class="fa fa-star-o fa-lg"
        slot="right"
        style="font-size: 17px;margin-left: 20px;"
        @click="addFavorite(shop.shopId)"
        v-if="!isFavorite"
      ></i>
      <i
        class="fa fa-star fa-lg"
        slot="right"
        style="font-size: 17px;margin-left: 20px;color: orange;"
        v-else
        @click="removeFavorite(favorite.id)"
      ></i>
      <router-link
        :to="{name:'搜索页', params:{type: 'shopGoods'}, query: {shopId: $route.params.id}}"
        slot="right"
      >
        <mt-button icon="search" style="margin-left: 20px;"></mt-button>
      </router-link>
    </mt-header>
    <div class="shopInfo">
      <div class="ui-img-div">
        <img :src="shop.shopLogo">
      </div>
      <div class="bref" style=" width: calc(100% - 70px - 16px);">
        <p class="name">
          {{shop.shopName}}
          <!-- <span class="location">地址：广东省广州市天河区车陂社区</span> -->
        </p>
        <p class="location">地址：{{shop.address}}</p>
      </div>
      <div style="clear: both;"></div>
    </div>
    <shop-swiper :adList="adList"/>
    <shop-main :categories="classList" :shopId="shop.shopId"/>

    <mt-popup
      v-model="popupVisible"
      position="bottom"
      :modal="false"
      style="width: 100%;height: 100%;"
    >
      <mt-header title="商家活动">
        <mt-button icon="back" slot="left" @click="popupVisible = false"></mt-button>
      </mt-header>
      <div style="padding-top: 40px;">
        <v-ticket-cell
          v-for="(n, key) in activityList"
          :data="n"
          :key="key"
          :type="1"
          @callBack="getCoupon"
        />
        <v-baseline/>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Header from '@/common/_header.vue';
import ShopSwiper from '@/components/shop/Swiper';
import Main from '@/components/shop/Main';
import shopService from '@/api/shopService';
import userService from '@/api/userService';
import common from '@/util/common';
import { Popup, Navbar, TabItem, Indicator, Toast } from 'mint-ui';
import Cell from '@/components/user/ticket/Cell';
import Baseline from '@/common/_baseline.vue';

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
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getShopInfo(this.$route.params.id);
    this.getShopActivityList(this.$route.params.id);
    this.$store.commit('CHANGE_GOODSLIST_SHOWTYPE', 1);
  },
  computed: {
    isFavorite() {
      if (common.isEmpty(this.favorite)) {
        return false
      } else {
        return true
      }
    }
  },
  data() {
    return {
      selected: '1',
      popupVisible: false,
      shop: {
        // "shopId": 2,
        // "createDate": null,
        // "updateDate": null,
        // "delFlag": "1",
        // "remarks": "1",
        // "ownerId": 2,
        // "userName": "张明",
        // "shopName": "张明家的店",
        // "distance": null,
        // "shopLogo": "http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg",
        // "address": "广州黄埔",
        // "longitude": 1,
        // "latitude": 1,
        // "phone": "13570412412",
        // "telephone": "020-88545852",
        // "businessTime": "早上10点至晚上22点",
        // "shopService": 1,
        // "drugLicensing": "1",
        // "businessLicense": "1",
        // "drugQuality": "1",
        // "otherQualifications": "1",
        // "isClosed": 0
      },
      adList: [],
      classList: [
        // {
        //   "id": 7,
        //   "className": "五官用药",
        //   "bySort": 1
        // }
      ],
      activityList: [],
      favorite: {}
    }
  },
  methods: {

    getShopInfo(shopId) {
      shopService.getShopInfo(shopId).then(res => {
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.shop)) {
          this.shop = {};
        } else {
          this.shop = res.data.shop;
        }
        this.favorite = res.data.favorite;
        this.adList = res.data.adList;
        this.classList = res.data.classList;
        if (common.isEmpty(res.data.classList)) {
          this.$store.commit('CHANGE_SHOP_SELECT_CATE', {});
        } else {
          this.$store.commit('CHANGE_SHOP_SELECT_CATE', res.data.classList[0]);
        }
      })
    },
    getShopActivityList(shopId) {
      shopService.getShopActivityList(shopId).then(res => {
        if (!common.isOk(res)) return
        this.activityList = res.data.data;
      })
    },
    getCoupon(id) {
      Indicator.open();
      shopService.getCoupon(id).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return
        Toast('领取成功');
      })
    },
    addFavorite(id) {
      userService.addFavorite(1, id).then(res => {
        if (!common.isOk(res)) return
        Toast("关注成功");
        this.getShopInfo(this.$route.params.id);
      })
    },
    removeFavorite(id) {
      userService.removeFavorite(id).then(res => {
        if (!common.isOk(res)) return
        Toast("已取消关注");
        this.getShopInfo(this.$route.params.id);
      })
    }
  }
}
</script>

<style lang="less" scoped>
.shop {
  > .shopInfo {
    padding: 10px 10px 10px 10px;
    margin-top: 40px;
    > .ui-img-div {
      display: webkit-flex;
      display: flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;
      height: 70px;
      width: 70px;
      border-radius: 10px;
      margin: auto;
      float: left;

      border: 1px solid gainsboro;
      > img {
        width: 100%;
      }
    }
    > .bref {
      float: left;
      // padding: 5px 8px;
      // text-align: center;
      margin: 16px 0 0 10px;
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
