import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '../pages/shoppingMall/shoppingMall'
import Login from "../pages/Login/login"
import Register from '../pages/register/register'
import Goods from '../pages/goods/goods'
import CategoryList from "../pages/categoryList/category"
import Cart from "../pages/cart/cart"
import Main from "../pages/main/Main"
import Personal from "../pages/personal/personal"
import Userinfo from "../pages/userinfo/userinfo"
import SettleAccounts from "../pages/settleAccounts/settleAccounts"
import Coupon from "../pages/coupon/coupon"
import Pay from "../pages/pay/pay"
import ConfirmPay from "../pages/confirmPay/confirmPay"
import Order from "../pages/order/order"
import ChatList from "../pages/chatList/chatList"
import Chat from "../pages/chat/chat"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/chatlist',
      name: 'ChatList',
      component: ChatList
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/confirmPay',
      name: 'ConfirmPay',
      component: ConfirmPay
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {path: '/register',
      name: 'Register',
      component: Register
    },
    {path: '/settleAccounts',
      name: 'SettleAccounts',
      component: SettleAccounts
    },
    {path: '/coupon',
      name: 'Coupon',
      component: Coupon
    },
    {path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {path: '/userinfo',
      name: 'uinfo',
      component: Userinfo
    },
    {path: '/',name: 'Main',component: Main,

      children:[
        {path: '/',name: 'ShoppingMall',component: ShoppingMall},
        {path: '/categoryList',name: 'CategoryList',component: CategoryList},
        {path: '/cart',name: 'Cart',component: Cart},
        {path: '/personal',name: 'Personal',component: Personal},

      ]
    },
  ]
})
