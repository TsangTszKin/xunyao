<template>
  <section class="section2">
    <div class="section2-list">
      <ul>
        <li
          v-for="(k, i) in list"
          :key="k.id+Math.random()"
          v-if="i <5"
          @click="$router.push({name: '分类商品', query:{classId: k.id, className: k.className}})"
        >
          <!-- <router-link :to="{name:'详情页'}"> -->
          <div class="ui-img-div">
            <img
               v-lazy="k.classImg?k.classImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550516282049&di=b2c37b954f6f93e0bf508b414fbbe9dc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0168f3583bd7b7a801219c77ca6435.png'"
            >
          </div>
          <!-- </router-link> -->
          <h2 class="section2-list-title ac">{{k.className}}</h2>
          <!-- <p class="section2-list-intro">{{k.intro}}</p>
          <p class="section2-list-price">￥{{k.price}}</p>-->
        </li>
      </ul>
      <ul>
        <li
          v-for="(k, i) in list"
          :key="k.id+Math.random()"
          v-if="i >= 5"
          @click="$router.push({name: '分类商品', query:{classId: k.id, className: k.className}})"
        >
          <!-- <router-link :to="{name:'详情页'}"> -->
          <div class="ui-img-div">
            <img
               v-lazy="k.classImg?k.classImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550516282049&di=b2c37b954f6f93e0bf508b414fbbe9dc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0168f3583bd7b7a801219c77ca6435.png'"
            >
          </div>
          <!-- </router-link> -->
          <h2 class="section2-list-title ac">{{k.className}}</h2>
          <!-- <p class="section2-list-intro">{{k.intro}}</p>
          <p class="section2-list-price">￥{{k.price}}</p>-->
        </li>
      </ul>
    </div>
    <!-- <router-link class="section2-banner" :to="{name:'详情页'}">
      <img v-lazy="banner">
    </router-link>-->
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';
import homeService from '@/api/homeService';
import common from '@/util/common';

export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getChanelList();
  },
  methods: {
    getChanelList() {
      homeService.getChanelList().then(res => {
        if (!common.isOk(res)) return
        this.list = res.data.data;
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.section2-list {
  overflow-x: auto;
  width: 100%;
  .pt();
  /*原生滑动*/
  -webkit-overflow-scrolling: touch;
  > ul {
    .bt();
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    // padding: 6vw;
    width: 100%;
    // height: 50vw;
    li {
      // margin-right: 10vw;
      // width: 62px;
      // height: 70px;
      width: 14vw;
      height: 22vw;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      align-content: center;
      margin: 3vw;
      > .ui-img-div {
        display: webkit-flex;
        display: flex;
        justify-content: center;
        overflow: hidden;
        align-items: center;

        height: 13vw;
        border-radius: 50%;
        > img {
          // display: block;
          width: 100%;
        }
      }

      // a {
      //   border: 1px solid gainsboro;
      //   border-radius: 5px;
      //   display: block;
      //   width: 100%;
      // }

      h2,
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
      }
      h2 {
        font-size: 12px;
        padding-top: 1vw;
        color: #333;
      }

      p.section2-list-intro {
        // padding-top: 2vw;
        .fz(font-size, 26);
        color: rgb(150, 150, 150);
      }

      p.section2-list-price {
        color: #b4282d;
      }
    }
  }
}

.section2-banner {
  display: block;
  width: 100vw;
  img {
    display: block;
    height: 24vw;
    width: 100%;
  }
}
</style>
