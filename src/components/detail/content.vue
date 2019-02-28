<template lang="html">
  <section class="content">
    <p class="title">说明书</p>
    <div style="padding: 10px;">
      {{productExplain}}
    </div>

    <div id="goods-detail-panel">
      <mt-navbar v-model="selected"  v-if="toHeight > 0">
        <mt-tab-item id="1">详情</mt-tab-item>
        <mt-tab-item id="2">参数</mt-tab-item>
      </mt-navbar>
      <!-- <div style="height: 50px;width: 100%;"></div> -->
      <mt-navbar v-model="selected" style="position: fixed;width: 100%;top: 0px;z-index: 1;" v-else>
        <mt-tab-item id="1">详情</mt-tab-item>
        <mt-tab-item id="2">参数</mt-tab-item>
      </mt-navbar>
      

      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top: 3px;">
        <mt-tab-container-item id="1">
          <div class="img-wrap">
            <img src="../../assets/images/1.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/2.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/3.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/4.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/5.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/6.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/7.jpg">
          </div>
          <div class="img-wrap">
            <img src="../../assets/images/8.jpg">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="goods-params">
            <p>名称：<span>复方金银花颗粒(诺金)</span></p>
            <p>通用名：<span>复方金银花颗粒(诺金)</span></p>
            <p>规格：<span>复方金银花颗粒(诺金)</span></p>
            <p>生产厂商：<span>复方金银花颗粒(诺金)</span></p>
            <p>储藏条件：<span>复方金银花颗粒(诺金)</span></p>
            <p>注意事项：<span>复方金银花颗粒(诺金)</span></p>
            
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>

    <v-to-top v-if="toHeight <= 0" />

  </section>

</template>

<script>
import { Navbar, TabItem } from 'mint-ui';
import ToTop from '@/components/ToTop';
import $ from 'jquery';

export default {
  props: {
    productExplain: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: '1',
      toHeight: 0
    }
  },
  mounted() {
    //jq部分
    this.toHeight = $("#goods-detail-panel").offset().top - $(window).scrollTop();
    let self = this;
    $(document).scroll(function (e) {

      let toHeight = $("#goods-detail-panel").offset().top - $(window).scrollTop();
      if (toHeight != self.toHeight) {
        // alert(toHeight)
        self.toHeight = toHeight;
      }

    });
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'v-to-top': ToTop
  },
  computed: {
    content() {
      return this.$store.state.detail.productDatas.contentImgSrc
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  margin-top: 10px;
  border-top: 20px solid #f8fcff;
  position: relative;
  > #goods-detail-panel {
    padding-top: 5px;
    background-color: #f7f7f7;
    .goods-params {
      background-color: #fff;
      font-size: 12px;
      padding: 20px;
      > p {
        margin: 5px;
        color: gray;
        > span {
          color: #000;
          margin-left: 10px;
        }
      }
    }
  }
  .title {
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
      background-color: #38af43;
    }
  }
  .img-wrap {
    height: 120vw;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
