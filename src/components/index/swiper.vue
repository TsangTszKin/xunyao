<template lang="html">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="k in advertList" :key="k.id" @click.native="showInfo(k)">
        <!-- <router-link :to="{ name: '详情页'}"> -->
          <img :src="k.pic">
        <!-- </router-link> -->
      </mt-swipe-item>

    </mt-swipe>

</template>

<script>
import homeService from '@/api/homeService';
import common from '@/util/common';
import { MessageBox, Popup, Header } from 'mint-ui';
import bus from '@/util/bus';

export default {
  props: {
    swiperData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      advertList: [],
      // {
      //   "id": 5,
      //   "title": "ddd",
      //   "pic": "http://47.106.168.53:8094/20190130/d47567a08c98494ba2642bc127ec0f9f.png",
      //   "link": "ddd"
      // }
    }
  },
  components: {
    'mt-popup': Popup,
    'v-header': Header,
  },
  methods: {
    getAdvertList() {
      homeService.getAdvertList().then(res => {
        if (!common.isOk(res)) return
        let data = res.data.data;
        this.advertList = data;
      })
    },
    showInfo(k) {
      // MessageBox.alert(info);
      // MessageBox({
      //   title: '广告',
      //   message: info,
      //   showCancelButton: false
      // });;
      // k.content = ''
      bus.$emit("advert.show", k.title, k.content)
    }
  },
  mounted() {
    this.getAdvertList();
  }
}
</script>

<style lang="less" scoped>
.mint-swipe {
  width: 100%;
  height: 40vw;
  a,
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
