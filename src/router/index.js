// @ts-nocheck
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const CityPicker = resolve => require(['@/components/CityPicker'], resolve)
const Message = resolve => require(['@/views/Message'], resolve)
const GoodsList = resolve => require(['@/views/GoodsList'], resolve)
const ShopList = resolve => require(['@/views/ShopList'], resolve)
const Shop = resolve => require(['@/views/Shop'], resolve)
const GoodsSave = resolve => require(['@/views/GoodsSave'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const Search = resolve => require(['@/views/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)


export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Index,
    meta: {
      requireAuth: true
    }
  },{
    path: '/message',
    name: '消息',
    component: Message,
    meta: {
      requireAuth: true
    }
  },{
    path: '/cityPicker',
    name: '城市选择',
    component: CityPicker,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/goodsList',
    name: '商品列表',
    component: GoodsList,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/shop',
    name: '店铺主页',
    component: Shop,
    meta: {
      requireAuth: true
    }
  },  {
    path: '/shopList',
    name: '店铺列表',
    component: ShopList,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/goodsSave',
    name: '商品保存',
    component: GoodsSave
  }, {
    path: '/category',
    name: '分类页',
    redirect: '/category/all',
    component: Category,
    children: [{
      path: '/category/:tab',
      component: CategoryMain
    }]
  }, {
    path: '/car',
    name: '购物车',
    component: Car
  }, {
    path: '/car/pay',
    name: '支付页',
    component: Pay
  },
  {
    path: '/user',
    name: '我的',
    component: User,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
  }, {
    path: '/detail',
    name: '详情页',
    component: Detail
  }, {
    path: '/search',
    name: '搜索页',
    component: Search
  }, {
    path: '/login',
    name: '登录页',
    component: Login
  }
  ]
})
