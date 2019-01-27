<template>
  <section class="section2">
    <div class="section2-list">
      <ul>
        <li v-for="k in list" :key="k.id">
          <router-link :to="{name:'详情页'}">
            <img src="../../assets/images/goods.jpg">
          </router-link>
          <h2 class="section2-list-title ac">频道{{k.title}}</h2>
          <!-- <p class="section2-list-intro">{{k.intro}}</p>
          <p class="section2-list-price">￥{{k.price}}</p>-->
        </li>
      </ul>
      <ul>
        <li v-for="k in list" :key="k.id">
          <router-link :to="{name:'详情页'}">
            <img src="../../assets/images/goods.jpg">
          </router-link>
          <h2 class="section2-list-title ac">频道{{k.title}}</h2>
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
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
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
      width: 14vw;
      height: 22vw;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      align-content: center;
      margin: 3vw;
      a {
        border: 1px solid gainsboro;
        border-radius: 5px;
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }

      h2,
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
      }
      h2 {
        .fz(font-size, 32);
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
