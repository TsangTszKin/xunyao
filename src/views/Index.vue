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
    <v-baseline/>
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
      }
    }
  },
  methods: {
    closeAdvert() {
      this.modal = false;
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    window.scrollTo(0, 0);
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
