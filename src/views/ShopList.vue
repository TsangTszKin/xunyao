<template>
  <div>
    <mt-header title="店铺列表">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>

      <!-- <mt-button   @click="modal = true">筛选</mt-button> -->
      <p slot="right" style="margin-right: 8px;" @click="modal = true">
        筛选
        <i
          class="fa fa-filter fa-lg"
          style="font-size: 12px;position: relative;top: -2px;left: 5px;text-align: center;"
        ></i>
      </p>
    </mt-header>

    <div class="v-content">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="section3-list"
      >
        <v-shop-cell v-for="(k, index) in list" :key="Math.random()" :shop="k"/>
      </ul>
      <v-baseline v-if="isEnd"/>
    </div>

    <mt-popup v-model="modal" position="top" style="width: 100%;height: 30%;">
      <mt-header title="店铺列表">
        <!-- <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button> -->
        <mt-button slot="left" @click="modal = false">关闭</mt-button>
        <mt-button slot="right" style="margin-left: 30px;" @click="filterCommit">确定</mt-button>
      </mt-header>
      <div class="v-content" style="padding: 10px;">
        <div>
          <p style="font-size: 12px;">
            商家服务
            <span>（可多选）</span>
          </p>
          <div class="shop-service">
            <p
              class="service-cell"
              :class="{'service-cell-active': service.fp === 1}"
              @click="selectService('fp', 1)"
            >
              <img class="fp" src="/static/fapiao.png">
              发票
            </p>
            <p
              class="service-cell"
              :class="{'service-cell-active': service.yb === 2}"
              @click="selectService('yb', 2)"
            >
              <img class="yb" src="/static/yibao.png">
              医保
            </p>
            <p
              class="service-cell"
              :class="{'service-cell-active': service.sm === 3}"
              @click="selectService('sm', 3)"
            >
              <img class="sm" src="/static/shangmen.png">
              送药上门
            </p>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { InfiniteScroll, Indicator, Button, Header, Search, Popup } from 'mint-ui';
import LoadingForList from '@/components/LoadingForList';
import shopService from '@/api/shopService';
import homeService from '@/api/homeService';
import common from '@/util/common';
import ShopCell from '@/components/ShopCell';
import Baseline from '@/common/_baseline.vue'

export default {
  data() {
    return {
      loading: false,
      isEnd: false,
      page: 1,
      list: [],
      modal: false,
      service: {
        fp: '',
        yb: '',
        sm: ''
      }
    }
  },
  components: {
    'mt-header': Header,
    'loading-for-list': LoadingForList,
    'mt-button': Button,
    'mt-search': Search,
    'v-shop-cell': ShopCell,
    'v-baseline': Baseline,
    'mt-popup': Popup,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    selectService(name, value) {
      if (this.service[name] === value) {//取消
        this.service[name] = '';
      } else {
        this.service[name] = value;
      }

    },
    filterCommit() {
      this.list = [];
      this.isEnd = false;
      this.page = 1;
      this.loadMore();
    },
    loadMore() {
      this.modal = false;
      if (this.isEnd) return
      let self = this;
      Indicator.open('加载中...');
      this.loading = true;
      shopService.getShopList(this.page, '', this.service).then(res => {
        this.loading = false;
        Indicator.close();
        if (!common.isOk(res)) return
        if (common.isEmpty(res.data.data)) {
          this.isEnd = true;
        } else {
          res.data.data.forEach(element => {
            if (element.distance > 1000) {
              element.distance = (element.distance / 1000).toFixed(1) + 'km';
            } else {
              element.distance = element.distance.toFixed(1) + 'm';
            }
            element.shopService = common.stringToArray(element.shopService);
            this.list.push(element)
          })
          this.page++;

        }
      }).catch(() => {
        this.loading = false;
        Indicator.close();
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/fz.less";
.section3-list {
  width: 100%;
  .bt();
}
.shop-service {
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  align-items: center; /*垂直居中*/
  height: 80px;
  > .service-cell {
    height: 23px;
    width: fit-content;
    line-height: 25px;
    font-size: 12px;
    overflow: hidden;
    border: 1px solid grey;
    border-radius: 7px;
    padding: 0 3px;
    > .fp {
      height: 25px;
      margin-top: -5px;
    }
    > .yb {
      height: 28px;
      margin-top: -3px;
    }
    > .sm {
      height: 15px;
      margin-top: -3px;
    }
  }
  > .service-cell-active {
    border: 2px solid #38af43;
    color: #38af43;
  }
}
</style>
