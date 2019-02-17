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
const ShopApply = resolve => require(['@/views/ShopApply'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const Search = resolve => require(['@/views/Search.vue'], resolve)
const SearchGoods = resolve => require(['@/views/SearchGoods.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const UserInfo = resolve => require(['@/views/my/UserInfo.vue'], resolve)
const Order = resolve => require(['@/views/my/Order.vue'], resolve)
const Wallet = resolve => require(['@/views/my/Wallet.vue'], resolve)
const Ticket = resolve => require(['@/views/my/Ticket.vue'], resolve)
const Address = resolve => require(['@/views/my/Address.vue'], resolve)
const Friends = resolve => require(['@/views/my/Friends.vue'], resolve)
const FootPrint = resolve => require(['@/views/my/FootPrint.vue'], resolve)
const Favorite = resolve => require(['@/views/my/Favorite.vue'], resolve)
const AddressSave = resolve => require(['@/views/my/AddressSave.vue'], resolve)
const FeedBack = resolve => require(['@/views/my/FeedBack.vue'], resolve)
const Location = resolve => require(['@/views/Location.vue'], resolve)

export default new Router({

  routes: [{
    path: '/',
    name: '首页',
    component: Index,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/message',
    name: '消息',
    component: Message,
    meta: {
      requireAuth: true
    }
  }, {
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
    path: '/shop/:id',
    name: '店铺主页',
    component: Shop,
    meta: {
      requireAuth: true
    }
  }, {
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
  },
  {
    path: '/shopApply',
    name: '商铺入驻申请',
    component: ShopApply,
    meta: {
      requireAuth: true
    }
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
    component: Car,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/car/pay',
    name: '支付页',
    component: Pay,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/user',
    name: '我的',
    component: User,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
  }, {
    path: '/detail/:id',
    name: '详情页',
    component: Detail,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/search/:type',//shop,goods,friend
    name: '搜索页',
    component: Search,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/searchGoods',
    name: '搜索商品',
    component: SearchGoods,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/login',
    name: '登录页',
    component: Login
  },
  {
    path: '/userInfo',
    name: '个人信息',
    component: UserInfo,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/order',
    name: '我的订单',
    component: Order,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/wallet',
    name: '钱包',
    component: Wallet,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/ticket',
    name: '优惠券',
    component: Ticket,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/address',
    name: '收货地址',
    component: Address,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/friends',
    name: '我的好友',
    component: Friends,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/footPrint',
    name: '足迹',
    component: FootPrint,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/favorite',
    name: '我的关注',
    component: Favorite,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/addressSave/:id?',
    name: '地址保存',
    component: AddressSave,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/feedBack',
    name: '反馈',
    component: FeedBack,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/location',
    name: '定位',
    component: Location,
    meta: {
      requireAuth: true
    }
  }
  ]
})
