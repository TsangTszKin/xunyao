<template lang="html">
  <section class="content goods-detail">
    <p class="title">说明书</p>
    <div style="padding: 10px;">
      {{product.productExplain}}
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
          <div class="img-wrap" v-show="product.detailImgs" v-for="(n, i) in product.detailImgs" >
            <img :src="n">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="goods-params">
            <p>药名：<span>{{product.name}}</span></p>
            <p>通用名：<span>{{product.commonName}}</span></p>
            <p>规格：<span>{{product.specification}}</span></p>
            <p>生产厂商：<span>{{product.manufacturer}}</span></p>
            <p>注意事项：<span>{{product.reminder}}</span></p>
            <p>储藏条件：<span>放阴凉处</span></p>
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
    product: {
      type: Object,
      default: function () {
        return {}
      }
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
    $(".goods-detail").scroll(function (e) {

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
