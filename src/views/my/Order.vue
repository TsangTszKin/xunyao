<template>
  <div class="v-content">
    <mt-header title="我的订单">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <mt-navbar v-model="orderStatus" style="top: 40px;width: 100%;z-index: 1;">
      <mt-tab-item id="-1">全部</mt-tab-item>
      <mt-tab-item id="0">待确认</mt-tab-item>
      <mt-tab-item id="1">待收货</mt-tab-item>
      <mt-tab-item id="2">已完成</mt-tab-item>
      <mt-tab-item id="3">已取消</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="orderStatus" style="
    top: 0;
    width: 100%;
    z-index: 0;">
      <mt-tab-container-item id="-1">
        <v-cart-shop-list :orderList="this.list" :key="Math.random()+Math.random()"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="0">
        <v-cart-shop-list :orderList="this.list" :key="Math.random()+Math.random()"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <v-cart-shop-list :orderList="this.list" :key="Math.random()+Math.random()"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <v-cart-shop-list :orderList="this.list" :key="Math.random()+Math.random()"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <v-cart-shop-list :orderList="this.list" :key="Math.random()+Math.random()"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem, Header, CellSwipe, MessageBox, Indicator, Toast } from 'mint-ui';
import Cell from '@/components/message/Cell';
import Footer from '@/common/_footer.vue';
import userService from '@/api/userService';
import common from '@/util/common';
import CartShopList from '@/components/user/order/CartShopList';
import bus from "@/util/bus";
import $ from 'jquery';

export default {
  data() {
    return {
      orderStatus: '',
      list: []
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.listener();
    if (!common.isEmpty(this.$route.params.status)) {
      this.orderStatus = this.$route.params.status;
    }

  },
  methods: {
    listener() {
      let self = this;
      bus.$on("my.order.cancelOrder", id => {
        MessageBox.confirm('确定取消订单吗？').then(action => {
          self.cancelOrder(id);
        });

      });

      bus.$on("my.order.receiverOrder", id => {
        MessageBox.confirm('确认已收到货吗？').then(action => {
          self.receiverOrder(id);
        });

      });

       bus.$on("my.order.confirmOrder", id => {
        MessageBox.confirm('是否确认该订单？').then(action => {
          self.confirmOrder(id);
        });

      });

    },
    showMore() {
      // MessageBox('海王星辰', '亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地亲，仓库会根据亲的地');
    },
    getOrderList(orderStatus, page) {
      Indicator.open();
      userService.getOrderList(orderStatus, page).then(res => {
        $(".mint-tab-container-item").scrollTop = 90;
        Indicator.close();
        if (!common.isOk(res)) return
        this.list = res.data.page.list;
      })
    },
    cancelOrder(id) {
      userService.cancelOrder(id).then(res => {
        if (!common.isOk(res)) return
        Toast("已取消");
        this.getOrderList(this.orderStatus, 1);
      })
    },
    receiverOrder(id) {
      userService.receiverOrder(id).then(res => {
        if (!common.isOk(res)) return
        Toast("已确认收货");
        this.getOrderList(this.orderStatus, 1);
      })
    },
    confirmOrder(id) {
      userService.confirmOrder(id).then(res => {
        if (!common.isOk(res)) return
        Toast("已确认订单");
        this.orderStatus = '1';
        this.getOrderList(this.orderStatus, 1);
      })
    }
  },
  watch: {
    orderStatus: {
      handler(newName, oldName) {
        this.getOrderList(newName, 1);
      },
      // immediate: true,
      deep: true
    }

  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-header': Header,
    'mt-cell-swipe': CellSwipe,
    Cell,
    'v-footer': Footer,
    'v-cart-shop-list': CartShopList
  }
}
</script>

<style lang="less">

</style>