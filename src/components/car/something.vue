<template lang="html">

  <div class="wrap">
    <!-- <v-gologin></v-gologin> -->
    <ul class="shop-panel" v-for="(item, i) in $store.state.cart.cartList" :key="i" v-if="item.productList.length > 0">
      <li >
        <div class="shop-info">
          <img :src="item.shopLogo">
          <span>{{item.shopName}}</span>
          <i class="fa fa-angle-right fa-lg" @click="$router.push({name: '店铺主页', params: {id: item.shopId}})"></i>
        </div>

        <ul class="something">
          <li v-for="(item2,i2) in item.productList" :key="i2">
              <!-- <div class="something-left" @click="toggle(i ,k.choseBool)">
                <label class="true" :class="{false:!k.choseBool}">
                  <input type="checkbox" :value="k.choseBool">
                </label>
              </div> -->
              <div class="something-middle">
                <img :src="item2.img">
              </div>
              <div class="something-right">
                <p>{{item2.name}}</p>
                <p style="color:rgb(199, 108, 28)"> 
                  <!-- {{k.col}} 
                  -  -->
                  {{item2.size}}
                  </p>
                <p>参考价：{{item2.price}}元</p>
                <p class="count">
                  <i class="fa fa-minus-square-o fa-lg" @click="changeItemCount('sub',i, i2)"></i>
                  <input type="number" :value="item2.count" @keyup="(e)=>{
                    changeItemCount('replace', i, i2, e.target.value);
                  }">
                  <i class="fa fa-plus-square-o fa-lg" @click="changeItemCount('add',i, i2)"></i>
                </p>
                <div class="something-right-bottom" @click="deleteGoods(i, i2)">
                  <span></span>
                </div>
              </div>
          </li>

        </ul>
      </li>

    </ul>
    
  </div>
</template>

<script>
// 提示登录组件
import Gologin from '@/components/car/gologin.vue';
import Util from '../../util/common';
import common from '@/util/common';
import { Toast } from 'mint-ui';

export default {
  components: {
    'v-gologin': Gologin,
  },
  data() {
    return {
      cartList: [
        {
          shopName: '张明家的店',
          shopId: 2,
          shopLogo: 'http://47.106.168.53:8094/20190124/83244be702ab4907924d865569c6dba4.jpg',
          productList: [
            {
              name: '复方金银花颗粒(诺金)',
              id: 5,
              count: 1,
              img: 'http://o2o.c-doctor.com/images/upload/prodimage/201604/201642614542296.jpg',
              price: 118,
              size: '12g*6袋'
            },
            {
              name: '复方金银花颗粒(诺金)2',
              id: 5,
              count: 1,
              img: 'http://o2o.c-doctor.com/images/upload/prodimage/201612/201612814485529.jpg',
              price: 118,
              size: '12g*6袋'
            }
          ]
        },
        {
          shopName: '陈生陈生陈生',
          shopId: 3,
          shopLogo: 'http://47.106.168.53:8094/20190124/de2389e27fc346c095a85d5f1fa39953.jpg',
          productList: [
            {
              name: '复方金银花颗粒(诺金)',
              id: 5,
              count: 1,
              img: 'http://o2o.c-doctor.com/images/upload/prodimage/201604/201642614542296.jpg',
              price: 118,
              size: '12g*6袋'
            },
            {
              name: '复方金银花颗粒(诺金)2',
              id: 5,
              count: 1,
              img: 'http://o2o.c-doctor.com/images/upload/prodimage/201612/201612814485529.jpg',
              price: 118,
              size: '12g*6袋'
            }
          ]
        }
      ]
    }
  },
  computed: {
    getAllCount() {
      let count = 0;
      this.cartList.forEach(element => {
        element.productList.forEach(element2 => {
          count += element2.count;
        })
      });
      return count
    }
  },
  mounted() {
  },

  methods: {

    changeItemCount(type, index1, index2, value) {//type（add,sub,replace）
      switch (type) {
        case 'add':
          this.cartList[index1].productList[index2].count++;
          break;

        case 'sub':
          if (this.cartList[index1].productList[index2].count > 1) {
            this.cartList[index1].productList[index2].count--;
          } else {
            Toast('不能再少了哦~');
          }
          break;

        case 'replace':
          if (value > 1) {
            this.cartList[index1].productList[index2].count = value;
          }

          break;
        default:
          break;

      }
    },
    deleteGoods(index1, index2) {
      this.cartList[index1].productList.splice(index2, 1);
    }
  },
  watch: {
    cartList: {
      handler: function (newValue) {
        this.$store.commit("CHANGE_CART_LIST", newValue)
      },
      immediate: true,//初始化自动执行一次
      deep: true
    }
  }

}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
.wrap {
  width: 100%;
  margin-bottom: 120px;
  > ul.shop-panel {
    margin: 10px;
    padding: 10px;
    border: 1px solid #dcdcdcc7;
    border-radius: 8px;
    > li {
      > .shop-info {
        > img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        > span {
          color: #000;
          font-size: 13px;
          margin: 0 5px;
        }
        > i {
          color: #ccc;
        }
      }

      .something {
        width: 100%;
        > li {
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 4vw 2vw;
          position: relative;
          height: 26vw;
          .bd();
          .something-left {
            -ms-flex: 2;
            -webkit-box-flex: 2;
            flex: 2;

            label {
              float: left;
              background: url("../../assets/car/images/t.svg") no-repeat center
                center/50% 50%;
              input {
                height: 14vw;
                width: 14vw;
                opacity: 0;
                filter: alpha(opacity=0);
              }
            }
            .false {
              background: url("../../assets/car/images/f.svg") no-repeat center
                center / 50% 50% !important;
            }
          }
          .something-middle {
            -ms-flex: 3;
            -webkit-box-flex: 3;
            flex: 3;
            height: 26vw;
            padding-left: 2vw;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .something-right {
            -ms-flex: 7;
            -webkit-box-flex: 7;
            flex: 7;
            height: 100%;
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-flow: column wrap;
            flex-flow: column wrap;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding-left: 6vw;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              .fz(font-size, 26);
            }
            p:last-of-type {
              .fz(font-size, 22);
              color: rgb(168, 168, 168);
            }
            > p.count {
              > input {
                width: 30px;
                border: 1px solid gainsboro;
                margin-top: -2px;
                text-align: center;
              }
            }
            .something-right-bottom {
              > div {
                display: -ms-flex;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                input {
                  width: 6vw;
                  text-align: center;
                }

                span {
                  height: 7vw;
                  line-height: 7vw;
                  width: 8vw;
                  display: inline-block;
                  border: 0.2vw solid #f1f1f1;
                  border-radius: 1vw;
                  text-align: center;
                  font-size: 20px;
                  cursor: pointer;
                }
              }
              > span {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 13vw;
                height: 13vw;
                background: url("../../assets/car/images/laji.svg") no-repeat
                  center/50%;
              }
            }
          }
        }
      }
    }
  }

  label,
  span {
    &:active {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }
}
</style>
