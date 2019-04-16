<template>
  <div id="app">
    <router-view></router-view>
    <v-loading v-show="fetchLoading"></v-loading>
  </div>
</template>

<script>
import Loading from '@/common/_loading';
import cartService from '@/api/cartService';
import common from '@/util/common';
import otherService from '@/api/otherService';
import userService from '@/api/userService';

export default {
  components: {
    'v-loading': Loading
  },
  computed: {
    fetchLoading() {
      return this.$store.state.detail.fetchLoading
    }
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
      ],
      messageCount: {
        all: 0,
        count1: 0,
        count2: 0,
        count3: 0,
      }
    }
  },
  mounted() {
    this.getMyHomeInfo();

    // localStorage.removeItem("cityName");

    // if (!localStorage.haveReload) {
    //   localStorage.haveReload = 1;
    //   window.location.reload();
    // }


  },
  methods: {
    getCartList() {
      cartService.cartList().then(res => {
        if (!common.isOk(res)) return
        let data = res.data.data;
        let cartList = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            cartList.push(element);
          }
        }
        this.$store.commit("CHANGE_CART_LIST", cartList);
        this.$store.commit("CHANGE_CART_DATA", data);
        this.$store.commit("CHANGE_CART_SUREFREE", res.data.sureFee);
        this.$store.commit("CHANGE_CART_TOTALFREE", res.data.totalFee);
        this.$store.commit("CHANGE_CART_SUREFREETEMP", res.data.sureFee);
        this.$store.commit("CHANGE_CART_TOTALFREETEMP", res.data.totalFee);
        this.$store.commit("CHANGE_CART_TIME", res.data.deliveryTime);
      })
    },
    getNoReadMessageCount() {
      otherService.getNoReadMessageCount().then(res => {
        if (!common.isOk(res)) return
        this.messageCount.all = res.data.total;
        // this.getNoReadMessageCount2();
      })
    },
   
    getMyHomeInfo() {
      userService.getMyHomeInfo().then(res => {
        if (!common.isOk(res)) return
        res.data.loginUser.user.id = res.data.loginUser.id;
        res.data.loginUser.user.idCard = res.data.loginUser.idCard;
        res.data.loginUser.user.sex = res.data.loginUser.sex;
        res.data.loginUser.user.borndate = res.data.loginUser.borndate;
        res.data.loginUser.user.realname = res.data.loginUser.realname;
        res.data.loginUser.user.type = res.data.loginUser.type;
        localStorage.user = JSON.stringify(res.data.loginUser.user);
        // localStorage.shop = JSON.stringify(res.data.loginUser.shop);

        if (!common.isEmpty(res.data.loginUser.shop)) {
          localStorage.shop = JSON.stringify(res.data.loginUser.shop);
          this.$store.commit("CHANGE_USER_ISSHOP", true);
          this.$store.commit("CHANGE_USER_SHOP", res.data.loginUser.shop);
        } else {
          localStorage.removeItem("shop");
          this.$store.commit("CHANGE_USER_ISSHOP", false);
        }

        this.$store.commit("CHANGE_USER_INFO", res.data.loginUser.user);
        this.getCartList();
        this.getNoReadMessageCount();
      })
    }
  }
}
</script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
  margin: 0;
  padding: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

button,
fieldset,
img,
input {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul,
li {
  background-color: #ffffff;
}
ol,
ul {
  list-style: none;
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "SimSun", "宋体";
}

input,
select {
  vertical-align: middle;
}

input,
select,
textarea {
  font-size: 12px;
  margin: 0;
}
textarea {
  resize: none;
}

/*防止拖动*/
img {
  border: 0;
  vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
  border-collapse: collapse;
}
//去斜体
i {
  font-style: normal;
}
body {
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  color: #666;
  background: #fff;
}

a {
  color: #666;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
}

.ac {
  text-align: center;
}
</style>
