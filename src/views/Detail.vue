<template lang="html">
  <div class="detail">
    <v-swiper :imgs="[product.productImg]" />
    <v-chose :name="product.name" :discountPrice="product.discountPrice" :stock="product.stock" :manufacturer="product.manufacturer" :specification="product.specification" />
    <v-content :productExplain="product.productExplain" />
  <div class="ralative">
    <p class="title">相关药品</p>
    <ul
    >
      <goods-item v-for="(item, key) in list" class="goods" :key="key" :data="item"/>
    </ul>
  </div>
    <v-baseline/>
    <v-footer :shopId="shop.shopId" :name="product.name" :discountPrice="product.discountPrice" :specification="product.specification" :productImg="product.productImg" :id="product.id" />
  </div>
</template>

<script>
import Swiper from '@/components/detail/swiper.vue'
import Chose from '@/components/detail/chose.vue'
import Content from '@/components/detail/content.vue'
import Footer from '@/components/detail/footer.vue'
import Baseline from '@/common/_baseline.vue'
import detail from '@/http/mock.js' //模拟数据
import GoodsItem from '@/components/goods/GoodsItem';
import goodsService from '@/api/goodsService';
import common from '@/util/common';
import { Indicator } from 'mint-ui';

export default {
  components: {
    'v-swiper': Swiper,
    'v-chose': Chose,
    'v-content': Content,
    'v-footer': Footer,
    'v-baseline': Baseline,
    'goods-item': GoodsItem,
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getGoodsInfo(this.$route.params.id);
  },
  beforeCreate() {
    this.$store.dispatch('setDatas');
  },
  data() {
    return {
      list: [{
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      },
      {
        goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
        goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
        size: '黑色',
        price: '13999',
        stock: '7',
        shopName: '添色彩绘旗舰店'
      }],
      product: {
        // "id": 3,
        // "createDate": "2019-02-14 11:31:13",
        // "updateDate": "2019-01-28 22:13:55",
        // "createBy": "admin",
        // "updateBy": "admin",
        // "delFlag": "0",
        // "remarks": "33",
        // "shopId": 2,
        // "shopName": "张明家的店",
        // "distance": null,
        // "classId": 18,
        // "className": "清热解毒",
        // "name": "感冒清热颗粒(九连山)",
        // "commonName": "感冒清热颗粒",
        // "englishName": null,
        // "productImg": "http://47.106.168.53:8094/20190124/0fb5be50e7e8406ea45aa955302daece.png",
        // "specification": "12g*6袋",
        // "manufacturer": "广东九连山药业有限公司 ",
        // "barCode": "33",
        // "approvalNumber": "国药准字Z44021572 ",
        // "productExplain": "荆芥穗、薄荷、防风、柴胡、紫苏叶、葛根、桔梗、苦杏仁、白芷、苦地丁、芦根。辅料为：蔗糖、糊精。 ",
        // "reminder": "请仔细阅读说明书并在医师指导下使用",
        // "oldPrice": 14,
        // "discountPrice": 0,
        // "prescription": 0,
        // "stock": 3,
        // "state": 1,
        // "top": 3,
        // "lowerShelf": 3,
        // "viewCount": null
      },
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
      }
    }
  },
  methods: {
    getGoodsInfo(id) {
      Indicator.open();
      goodsService.getGoodsInfo(id).then(res => {
        Indicator.close();
        if (!common.isOk(res)) return

        this.product = res.data.product;
        this.shop = res.data.shop;
      }).catch(() => {
        Indicator.close();
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  padding-bottom: 14vw;
  .ralative {
    position: relative;
    margin-top: 20px;
    > .title {
      padding: 5px 7px;
      background-color: #f7f7f7;
      &:before {
        width: 3px;
        height: 28px;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        // margin-top: -14px;
        background-color: green;
      }
    }
  }
}
</style>
