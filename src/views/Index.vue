<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header/>
    <v-swiper />
    <!-- <v-service/> -->
    <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/>
    <!-- <v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/> -->
    
    <v-section3/>
    <v-section4 />
    <div style="height:30px;">

    </div>
    <v-footer/>
    <div id="allmap" style="height: 0"></div>
     <mt-popup v-model="modal" position="bottom" style="width: 100%;height: 100%;">
        <mt-header :title="data.title" style="">
                                <mt-button icon="back" slot="left" @click="closeAdvert"></mt-button>
        </mt-header>
        <div style="padding-top: 40px;overflow: scroll;height: 100%;" v-html="data.content">
                                
        </div>
      </mt-popup>
       <!-- <v-to-top v-if="modal" /> -->
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import index from '@/http/mock.js' //模拟数据
import { MessageBox, Popup } from 'mint-ui';
import bus from '@/util/bus';
import ToTop from '@/components/ToTop';
import userService from '@/api/userService';
import common from '@/util/common';
import cartService from '@/api/cartService';
import otherService from '@/api/otherService';

export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'mt-popup': Popup,
    'v-to-top': ToTop
  },
  data() {
    return {
      datas: {
        section1: {},
        section2: {},
        section3: {},
        section4: {},
        swiper: []
      },
      loading: true,
      modal: false,
      data: {
        title: '',
        content: ''
      },
      messageCount: {
        all: 0,
        count1: 0,
        count2: 0,
        count3: 0,
      }
    }
  },
  methods: {
    closeAdvert() {
      this.modal = false;
      window.scrollTo(0, 0);
    },
    getMyHomeInfo() {
      userService.getMyHomeInfo().then(res => {
        if (!common.isOk(res)) return
        res.data.loginUser.user.id = res.data.loginUser.id;
        res.data.loginUser.user.idCard = res.data.loginUser.idCard;
        res.data.loginUser.user.sex = res.data.loginUser.sex;
        res.data.loginUser.user.borndate = res.data.loginUser.borndate;
        res.data.loginUser.user.realname = res.data.loginUser.realname;
        res.data.loginUser.user.type = res.data.loginUser.type;
        localStorage.user = JSON.stringify(res.data.loginUser.user);
        // localStorage.shop = JSON.stringify(res.data.loginUser.shop);

        if (!common.isEmpty(res.data.loginUser.shop)) {
          localStorage.shop = JSON.stringify(res.data.loginUser.shop);
          this.$store.commit("CHANGE_USER_ISSHOP", true);
          this.$store.commit("CHANGE_USER_SHOP", res.data.loginUser.shop);
        } else {
          localStorage.removeItem("shop");
          this.$store.commit("CHANGE_USER_ISSHOP", false);
        }

        this.$store.commit("CHANGE_USER_INFO", res.data.loginUser.user);
        this.getCartList();
        this.getNoReadMessageCount();
      })
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
        this.$store.commit("CHANGE_CART_DATA", data);
        this.$store.commit("CHANGE_CART_SUREFREE", res.data.sureFee);
        this.$store.commit("CHANGE_CART_TOTALFREE", res.data.totalFee);
        this.$store.commit("CHANGE_CART_SUREFREETEMP", res.data.sureFee);
        this.$store.commit("CHANGE_CART_TOTALFREETEMP", res.data.totalFee);
        this.$store.commit("CHANGE_CART_TIME", res.data.deliveryTime);
      })
    },
    getNoReadMessageCount() {
      otherService.getNoReadMessageCount().then(res => {
        if (!common.isOk(res)) return
        this.messageCount.all = res.data.total;
        this.getNoReadMessageCount2();
      })
    },
    getNoReadMessageCount2() {
      otherService.getNoReadMessageCount2().then(res => {
        if (!common.isOk(res)) return
        this.messageCount.count1 = res.data.count1;
        this.messageCount.count2 = res.data.count2;
        this.messageCount.count3 = res.data.count3;
        this.$store.commit("CHANGE_USER_MESSAGECOUNT", this.messageCount)
      })
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMyHomeInfo();
    bus.$on("advert.show", (title, content) => {
      this.data.title = title;
      this.data.content = content;
      this.modal = true;
    })
  }
}
</script>



<style lang="less" scoped>
.index {
  width: 100%;
  padding-bottom: 14vw;
  background-color: #f8fcff;
}
</style>
