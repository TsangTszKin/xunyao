<template lang="html">
  <section class="section4">
    <h2 class="section4-title">
      药品推荐
      <!-- <router-link :to="{path:'/goodsList'}" >
        <i class="icon-right"></i>
      </router-link> -->
    </h2>
    <ul class="section4-list"
     v-infinite-scroll="getRecommendProductionList"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="k in list" :key='k.id'>
        <router-link :to="{name:'详情页', params:{id: k.id}}">
          <div>
            <img :src="k.productImg">
          </div>
           
          <p>{{k.name}}</p>
        </router-link>
        <!-- <h3>{{k.name}}</h3> -->
        <span>￥ {{k.discountPrice}}</span>
      </li>

    </ul>
    <!-- <router-link :to="{name:'分类页'}" class="section4-banner">
      <img v-lazy="banner">
    </router-link> -->
  </section>
</template>

<script>
import { Lazyload, Indicator, InfiniteScroll } from 'mint-ui';
import homeService from '@/api/homeService';
import common from '@/util/common';

export default {
  props: {
    banner: {
      type: String,
      default: ''
    },
    // list: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      loading: false,
      page: 1,
      isEnd: false,
      list: [
        // {
        //   "id": 1,
        //   "shopName": null,
        //   "distance": null,
        //   "className": null,
        //   "name": "ddd1",
        //   "commonName": "3",
        //   "englishName": "3",
        //   "productImg": "http://47.106.168.53:8094/20190124/0fb5be50e7e8406ea45aa955302daece.png,http://47.106.168.53:8094/20190124/b8232b3a3a1b43df897beb86ca7a453e.jpg,http://47.106.168.53:8094/20190124/570a173318a64b34a7c9362842c1f057.png,http://47.106.168.53:8094/20190124/de2389e27fc346c095a85d5f1fa39953.jpg,http://47.106.168.53:8094/20190124/422bb0cdfc65423fa21e2c4af4a12baa.jpg,http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg",
        //   "oldPrice": 0,
        //   "discountPrice": 0,
        //   "viewCount": null
        // }
      ]
    }
  },
  methods: {
    getRecommendProductionList() {
      if (this.isEnd) return
      this.loading = true;
      let self = this;
      Indicator.open('加载中...');
      homeService.getRecommendProductionList(self.page).then(res => {
        self.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data.list)) {
          self.isEnd = true;
        } else {
          res.data.data.list.forEach(element => {
            self.list.push(element)
          })
          self.page++;
        }

      }).catch(() => {
        self.loading = false;
        Indicator.close();
      })
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
      height: 135px;
      > a {
        display: block;
        width: 100%;
        position: relative;
        > div {
          display: webkit-flex;
          display: flex;
          justify-content: center;
          overflow: hidden;
          align-items: center;
          height: 100px;
          > img {
            display: block;
            width: 100%;
          }
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
