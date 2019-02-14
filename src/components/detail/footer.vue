<template lang="html">
  <footer class="footer">
    <router-link :to="{name:'店铺主页', params:{id: shopId}}" class="footer-index">
      <i class="icon-index"></i>
    </router-link>
    <router-link  :to="{name:'购物车'}" class="footer-gocar">
      <!-- <i class="icon-car"></i> -->
      <i class="fa fa-shopping-cart fa-lg" style="position: relative;
    top: -5px;
    font-size: 29px;" ></i>
      <!-- <span v-if="count">{{count}}</span> -->
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
      <mt-field label="购买数量" placeholder="" type="number" v-model="number"></mt-field>
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

export default {
  props: ["shopId", "name", "discountPrice", "specification", "productImg", "id", "stock"],
  data() {
    return {
      modal: false,
      goods: {
        "id": 3,
        "shopName": "张明家的店",
        "distance": null,
        "className": "清热解毒",
        "name": "感冒清热颗粒(九连山)",
        "commonName": "感冒清热颗粒",
        "englishName": null,
        "productImg": "http://47.106.168.53:8094/20190124/0fb5be50e7e8406ea45aa955302daece.png",
        "oldPrice": 14,
        "discountPrice": 0,
        "viewCount": null
      },
      number: 1
    }
  },
  computed: {
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

      //  mint-ui的弹出式提示框
      const product = [{
        title: this.name,
        price: this.discountPrice,
        size: this.specification,
        // col: this.productDatasView.chose[this.colSelected].col,
        id: this.id,
        imgPath: this.productImg,
        choseBool: false
      }];

      // MessageBox
      //   .confirm
      //   (
      //   `商品名称:${product[0].title}</br>` +
      //   `价格:${product[0].price}</br>` +
      //   `规格:${product[0].size}</br>`
      //   // `颜色:${product[0].col}</br>` +
      //   // `商品ID:${product[0].id}</br>`
      //   )
      //   .then(action => {      //点击成功执行这里的函数
      //     this.$store.dispatch('setLocalCount', true);
      //     this.$store.dispatch('addCarList', product);

      //     Toast({
      //       message: '添加成功',
      //       duration: 1000
      //     });
      //   }, function (err) {
      //   });
    },
    addCart() {
      let productId = this.goods.id;
      let quantity = this.number;
      cartService.addCart(productId, quantity).then(res => {
        if (!common.isOk(res)) return
        this.modal = false;

      }).catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";

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
