<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="首页">
      <i slot="icon" class="fa fa-home fa-lg" style="font-size: 27px;"></i>
        首页
    </mt-tab-item>
     <mt-tab-item id="消息" style="position: relative;">
      <i slot="icon" class="fa fa-envelope fa-lg" style="font-size: 25px;"></i>
      <mt-badge size="small" type="error" style=" position: absolute;top: 0px;left: 50px;" v-if="$store.state.user.messageCount.all > 0">{{$store.state.user.messageCount.all}}</mt-badge>
        消息
    </mt-tab-item>
    <mt-tab-item id="购物车">
      <i slot="icon" class="fa fa-shopping-cart fa-lg" style="font-size: 27px;"></i>
      购物车
    </mt-tab-item>
    <mt-tab-item id="商品列表" v-if="isShop">
       <i slot="icon" class="fa fa-th-large fa-lg" style="font-size: 25px;"></i>
      商品列表
    </mt-tab-item>
    <mt-tab-item id="我的">
      <i slot="icon" class="fa fa-user fa-lg" style="font-size: 25px;"></i>
      我的
    </mt-tab-item>
  </mt-tabbar>
  </footer>
</template>

<script>
import common from '@/util/common';
import { Badge } from 'mint-ui';

export default {
  components: {
    'mt-badge': Badge
  },
  methods: {
    gotoRouter() {
      this.$router.push({
        name: this.selected
      })
    }
  },
  data() {
    return {
      //对应mt-tab-item 的id值
      selected: '',
      isShop: false
    }
  },
  mounted() {

    if (!common.isEmpty(localStorage.shop)) {
      this.isShop = true
    }

    //获取当前路由名称，根据该名称给当前footer添加is-selected
    let Rname = this.$route.name;
    switch (Rname) {
      case '首页':
        this.selected = '首页';
        break;
      case '消息':
        this.selected = '消息';
        break;
      case '购物车':
        this.selected = '购物车';

        break;
      case '商品列表':
        this.selected = '商品列表';

        break;
      case '我的':
        this.selected = '我的';
        break;
    }
  }

}
</script>

<style lang="less" scoped>
@import "../assets/fz.less";

.mint-tab-item-label:hover {
  color: #333;
}
.footer {
  position: fixed;
  bottom: 0;
  height: 55px;
  width: 100%;
  .mint-tabbar {
    background-color: #fff;
    background-image: none;
    box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, 0.13);
    -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, 0.13);
    .is-selected {
      color: @cl;
      background-color: #fff;
      i {
        &::before {
          color: @cl;
        }
      }
    }
    i {
      .fz(font-size, 42);
    }
  }
}
</style>
