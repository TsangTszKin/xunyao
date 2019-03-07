<template lang="html">
  <footer class="footer">
    <router-link :to="{name:'店铺主页', params:{id: shopId}}" class="footer-index">
      <i class="icon-index"></i>
    </router-link>
    <a class="footer-index" style="padding-top: 0;" @click="addFavorite(goods.id)"  v-if="!isFavorite">
        <i class="fa fa-star fa-lg"></i>
    </a>
     <a class="footer-index" style="padding-top: 0;color: orange;" @click="removeFavorite(favoriteId)" v-else >
        <i class="fa fa-star fa-lg"></i>
    </a>
    
    <router-link  :to="{name:'购物车'}" class="footer-gocar">
      <i class="fa fa-shopping-cart fa-lg" style="position: relative;top: -5px;font-size: 29px;" ></i>
      <span v-if="count">{{count}}</span>
    </router-link>
    <span class="footer-addcar" @click="addIntoCar">
      加入购物车
    </span>

    <mt-popup
      v-model="modal"
      position="bottom"
      class="v-detail-modal"
      :modal="true"
      :closeOnClickModal="true"
      >
      <ul>
        <goods-item :data="goods" />
      </ul>
      <!-- <mt-field label="购买数量" placeholder="" type="number" v-model="number"></mt-field> -->
      <p class="count" style="    margin-top: 10px;">
        <span style="    margin: 0px 70px 0 20px;">购买数量</span>
                  <i class="fa fa-minus-square-o fa-lg" @click="changeItemCount('sub')" style="font-size: 18px;"></i>
                   <input type="number" readOnly :value="number" style="width: 30px;
                border: 1px solid gainsboro;
                margin-top: -2px;
                text-align: center;">
                  <i class="fa fa-plus-square-o fa-lg" @click="changeItemCount('add')" style="font-size: 18px;"></i>
       </p>
      <p class="p-btn">
        <mt-button type="primary" class="btn" @click="addCart">确定</mt-button>
      </p>
    </mt-popup>

  </footer>
</template>

<script>
import { MessageBox, Popup, Toast, Button, Field } from 'mint-ui';
import GoodsItem from '@/components/goods/GoodsItem';
import cartService from '@/api/cartService';
import common from '@/util/common';
import userService from '@/api/userService';
import bus from '@/util/bus';

export default {
  props: ["shopId", "goods", "isFavorite", "favoriteId"],
  data() {
    return {
      modal: false,
      // goods: {
      //   "id": 3,
      //   "shopName": "张明家的店",
      //   "distance": null,
      //   "className": "清热解毒",
      //   "name": "感冒清热颗粒(九连山)",
      //   "commonName": "感冒清热颗粒",
      //   "englishName": null,
      //   "productImg": "http://47.106.168.53:8094/20190124/0fb5be50e7e8406ea45aa955302daece.png",
      //   "oldPrice": 14,
      //   "discountPrice": 0,
      //   "viewCount": null
      // },
      number: 1
    }
  },
  computed: {
    count() {
      return this.$store.getters.getCartAllCount
    },
  },
  components: {
    'mt-popup': Popup,
    'goods-item': GoodsItem,
    'mt-button': Button,
    'mt-field': Field
  },
  methods: {
    addIntoCar() {
      this.modal = true;

    },
    addCart() {
      let productId = this.goods.id;
      let quantity = this.number;
      let shopId = this.shopId;
      cartService.addCart(productId, quantity, shopId).then(res => {
        if (!common.isOk(res)) return
        this.modal = false;
        this.getCartList();
      }).catch(() => { })
    },
    changeItemCount(type) {//type（add,sub,replace）
      switch (type) {
        case 'add':
          this.number++;
          break;

        case 'sub':
          if (this.number > 1) {
            this.number--;
          } else {
            Toast('不能再少了哦~');
          }
          break;

          break;
        default:
          break;

      }
    },
    getCartList() {
      cartService.cartList().then(res => {
        if (!common.isOk(res)) return
        let data = res.data.data;
        let cartList = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            cartList.push(element);
          }
        }
        this.$store.commit("CHANGE_CART_LIST", cartList);
      })
    },
    addFavorite(id) {
      userService.addFavorite(2, id).then(res => {
        if (!common.isOk(res)) return
        Toast("关注成功");
        bus.$emit("detail.getInfo");
      })
    },
    removeFavorite(id) {
      userService.removeFavorite(id).then(res => {
        if (!common.isOk(res)) return
        Toast("已取消关注");
        bus.$emit("detail.getInfo");
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";

.footer {
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  height: 14vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  -moz-user-select: none;
  -webkit-user-select: none;
  .bt();
  .footer-index,
  .footer-gocar,
  .footer-addcar {
    text-align: center;
  }

  .footer-index {
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    line-height: 14vw;
    height: 14vw;
    padding-top: 1.5vw;
    border-right-color: #f7f7f7;
    border-right-style: solid;
    .fz(border-right-width, 1);

    i {
      .fz(font-size, 45);
    }
    &:active {
      background-color: #f1f1f1;
    }
  }

  .footer-gocar {
    position: relative;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
    height: 14vw;
    line-height: 14vw;
    padding-top: 1.6vw;
    span {
      height: 5.5vw;
      width: 5.5vw;
      line-height: 5.5vw;
      position: absolute;
      top: 0.5vw;
      right: 5.5vw;
      background-color: @cl;
      border-radius: 50%;
      color: #fff;
      .fz(font-size, 24);
    }

    &:active {
      background-color: #f1f1f1;
    }
    i {
      .fz(font-size, 48);
    }
  }

  .footer-addcar {
    -webkit-flex: 6;
    -ms-flex: 6;
    flex: 6;
    line-height: 14vw;
    height: 14vw;

    color: #fff;
    background-color: @cl;
    letter-spacing: 0.2vw;
    &:active {
      background-color: #ff7d00;
    }
  }

  > .v-detail-modal {
    width: 100%;
    height: 300px;
    > .p-btn {
      text-align: center;
      position: fixed;
      bottom: 20px;
      width: 100%;
      > .btn {
        width: 80%;
        margin: auto;
      }
    }
  }
}
</style>
