<template>
  <aside class="aside">
    <ul class="cate">
      <li
        class="cell"
        :class="item.id === $store.state.shop.selectCate.id?'active-cell': ''"
        v-for="(item,i) in categories"
        @click="changeCate(item)"
      >{{item.className}}</li>
    </ul>
  </aside>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import goodsService from '@/api/goodsService';
import common from '@/util/common';
import bus from '@/util/bus';

export default {
  props: {
    categories: {
      type: Array,
      default: function () {
        return []
      }
    },
    shopId: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.listener();
  },
  methods: {
    listener() {
      bus.$on("shop.aside.deleteGoods", id => this.deleteGoods(id));
      bus.$on("shop.aside.changeGoodsStock", (goodsId, stock) => this.changeGoodsStock(goodsId, stock));
    },
    changeCate(item) {
      window.scrollTo(0, 0);
      this.$store.commit('CHANGE_SHOP_SELECT_CATE', item);
      if (common.isEmpty(this.$route.query.classId) && common.isEmpty(this.$route.query.classId)) {
        this.getGoodsList(this.shopId, this.$store.state.shop.selectCate.id);
      } else {
        this.getGoodsList2(this.$store.state.shop.selectCate.id);
      }

    },
    getGoodsList(shopId, classId) {
      Indicator.open();
      goodsService.getGoodsList(shopId, classId).then(res => {
        Indicator.close()
        if (!common.isOk(res)) return
        let list = res.data.data.list;
        this.$store.commit('CHANGE_GOODSLIST_BY_SHOPANDCATE', list);

      }).catch(() => { Indicator.close() })
    },
    getGoodsList2(classId) {
      Indicator.open();
      goodsService.getGoodsListByClass(classId).then(res => {
        Indicator.close()
        if (!common.isOk(res)) return
        let list = res.data.data.list;
        this.$store.commit('CHANGE_GOODSLIST_BY_SHOPANDCATE', list);

      }).catch(() => { Indicator.close() })
    },
    deleteGoods(id) {
      goodsService.deleteGoods(id).then(res => {
        if (!common.isOk(res)) return
        Toast('删除成功');
        this.getGoodsList(this.shopId, this.$store.state.shop.selectCate.id);
      })
    },
    changeGoodsStock(goodsId, stock) {
      goodsService.changeGoodsStock(goodsId, stock).then(res => {
        if (!common.isOk(res)) return
        this.getGoodsList(this.shopId, this.$store.state.shop.selectCate.id);

      })
    }
  },
  watch: {
    shopId(value) {
      this.getGoodsList(value, this.$store.state.shop.selectCate.id);
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  width: 20%;
  float: left;
  height: 100%;
  > .cate {
    background-color: #dcdcdc4a;
    height: 100%;
    overflow-y: scroll;
    .cell {
      text-align: center;
      font-size: 13px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background-color: transparent;
    }
    .active-cell::before {
      width: 3px;
      height: 28px;
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -14px;
      background-color: green;
    }
  }
}
</style>