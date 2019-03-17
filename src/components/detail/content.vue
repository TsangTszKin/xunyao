<template lang="html">
  <section class="content goods-detail">
    <!-- <p class="title">说明书</p>
    <div style="padding: 10px;">
      {{product.productExplain}}
    </div> -->

    <div id="goods-detail-panel">
      <mt-navbar v-model="selected"  v-if="toHeight > 0">
        <mt-tab-item id="1">说明书</mt-tab-item>
        <mt-tab-item id="2">详情</mt-tab-item>
      </mt-navbar>
      <!-- <div style="height: 50px;width: 100%;"></div> -->
      <mt-navbar v-model="selected" style="position: fixed;width: 100%;top: 0px;z-index: 1;" v-else>
        <mt-tab-item id="1">说明书</mt-tab-item>
        <mt-tab-item id="2">详情</mt-tab-item>
      </mt-navbar>
      

      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top: 3px;">
        <mt-tab-container-item id="2">
          <div class="img-wrap" v-show="product.detailImgs" v-for="(n, i) in product.detailImgs" >
            <img :src="n">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div class="goods-params">
            <p>【药品】<span></span></p>
             <p style="margin-left: 20px;">名称：<span>{{product.name}}</span></p>
            <p style="margin-left: 20px;">通用名：<span>{{product.commonName}}</span></p>
            <p>【成份】<span></span>本品主要成份为：{{product.basesbasis}}</p>
            <p>【性状】<span></span>{{product.characters}}</p>
            <!-- <p>【适应症】<span></span>{{product.basesbasis}}</p> -->
            <p>【规格】<span>{{product.specification}}</span></p>
            <p>【用法用量】<span>{{product.usages}}</span></p>
            <p>【不良反应】<span>{{product.untowardeffect}}</span></p>
            <p>【禁忌】<span>{{product.taboo}}</span></p>
            <p>【注意事项】<span>{{product.announcements}}</span></p>
               <!-- <p>【孕妇及哺乳期妇女用药】<span>{{product.untowardeffect}}</span></p> -->
            <p>【药物相互作用】<span>{{product.druginteraction}}</span></p>
                 <!-- <p>【药物过量】<span>{{product.untowardeffect}}</span></p> -->
                  <!-- <p>【药理毒理】<span>{{product.untowardeffect}}</span></p> -->
            <p>【贮藏】<span>{{product.storage}}</span></p>
            <p>【生产厂商】<span>{{product.manufacturer}}</span></p>
            
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
      padding: 20px 10px 20px 10px;
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
