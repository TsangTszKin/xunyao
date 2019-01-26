<template lang="html">
  <section class="section4">
    <h2 class="section4-title">
      药品推荐
      <router-link :to="{path:'/goodsList'}" >
        <i class="icon-right"></i>
      </router-link>
    </h2>
    <ul class="section4-list"
     v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="k in list" :key='k.id'>
        <router-link :to="{name:'详情页'}">
           <img src="../../assets/images/goods.jpg">
          <p>{{k.intro}}</p>
        </router-link>
        <h3>{{k.title}}</h3>
        <span>￥ {{k.price}}</span>
      </li>

    </ul>
    <!-- <router-link :to="{name:'分类页'}" class="section4-banner">
      <img v-lazy="banner">
    </router-link> -->
  </section>
</template>

<script>
import { Lazyload, Indicator, InfiniteScroll } from 'mint-ui';
export default {
  props: {
    banner: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    loadMore() {
      console.log("loadMore")
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');
      setTimeout(() => {
        let last = self.list[self.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          self.list.push({
            goodsImgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1oVIdcTlYBeNjSszcXXbwhFXa_!!0-item_pic.jpg_460x460xz.jpg',
            goodsName: '添色彩绘 客厅欧式照片墙创意美式钟表置物架装饰画挂墙相框组合',
            size: '黑色',
            price: '13999',
            stock: '7',
            shopName: '添色彩绘旗舰店'
          });
        }
        self.loading = false;
        Indicator.close();
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section4 {
  width: 100%;
  overflow: hidden;
  .pt();
  .section4-title {
    .bt();
    text-align: center;
    .fz(font-size, 40);
    padding: 4vw 0;
    position: relative;
    background-color: #ffffff;
    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top, -16);
      &::before {
        color: #9f9f9f;
      }
    }
  }

  .section4-list {
    width: 100%;
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    overflow: hidden;
    li {
      width: 50%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 3vw;
      > a {
        display: block;
        width: 100%;
        position: relative;
        img {
          display: block;
          width: 100%;
        }
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: gold;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 1.2vw 2vw;
        }
      }

      > h3 {
        padding-top: 3vw;
        .fz(font-size, 40);
      }
      > span {
        display: inline-block;
        padding-bottom: 3vw;
        color: #b4282d;
      }
    }
  }

  .section4-banner {
    width: 100%;
    display: block;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
