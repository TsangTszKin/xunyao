<template>
  <div>
    <mt-header title="店铺列表">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>

      <router-link :to="{name:'搜索页'}" slot="right">
        <mt-button icon="search" style="margin-left: 30px;"></mt-button>
      </router-link>
    </mt-header>

    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="section3-list"
    >
      <li v-for="k in list" :key="k.id" @click="$router.push({path: '/shop'})">
        <a class="section3-list-right">
          <img src="../assets/images/shop.jpg">
          <!-- <span>${{k.price}}</span> -->
        </a>
        <div class="section3-list-left">
          <h4>店铺{{k.title}}</h4>
          <div class="time">
            <span class="time-num">店铺描述店铺描述</span>
          </div>
          <p class="start">店铺地址： 广东省广州市天河区车陂社区</p>
        </div>
      </li>
    </ul>
    <loading-for-list v-show="!loading"></loading-for-list>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator, Button, Header, Search } from 'mint-ui';
import LoadingForList from '@/components/LoadingForList';

export default {
  data() {
    return {
      loading: false,
      list: []
    }
  },
  components: {
    'mt-header': Header,
    'loading-for-list': LoadingForList,
    'mt-button': Button,
    'mt-search': Search
  },
  mounted() {
    window.scrollTo(0, 0);
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
@import "../assets/fz.less";
@import "../assets/index/style.css";
.section3-list {
  width: 100%;
  .bt();
  > li {
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 5vw;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    .section3-list-left {
      padding: 5vw 3vw;
      width: 80%;
      h4 {
        .fz(font-size, 34);
        line-height: 4.8vw;
        margin-bottom: 1.2vw;
        letter-spacing: 0.42vw;
      }
      .time {
        .time-num {
          display: inline-block;
          text-align: center;
          padding: 0.6vw;
          color: #fff;
          border-radius: 0.5vw;
          background-color: #444;
          .fz(font-size, 26);
          letter-spacing: 0.3vw;
        }
        .time-col {
          color: #333;
          width: 2vw;
          display: inline-block;
          text-align: center;
          font-weight: 700;
          .fz(font-size, 30);
        }
      }

      .start {
        .fz(font-size, 30);
        padding-top: 1vw;
        letter-spacing: 0.3vw;
      }
    }

    .section3-list-right {
      width: 30%;
      display: block;
      padding-top: 5vw;
      position: relative;
      img {
        display: block;
        width: 100%;
        background-color: gold;
      }
      span {
        padding: 0.3vw 1.2vw;
        border-radius: 1vw;
        text-align: center;
        position: absolute;
        bottom: 0.4vw;
        right: 0.2vw;
        background-color: @cl;
        color: #fff;
        .fz(font-size, 24);
      }
    }
  }
}
</style>
