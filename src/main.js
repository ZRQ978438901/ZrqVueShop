// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index"
import moment from 'moment'
import "./mock/mockServer"//模拟后台数据

//引入聊天模块
// import './test/socketio_test'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'http://localhost:4000',
  vuex: {
  }
}))





Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})


import { Picker ,Card ,PasswordInput, Tag ,NumberKeyboard,Button,Row,CountDown ,Col,Swipe,SwipeItem,Lazyload ,List,Field,NavBar,Toast,Tab,Tabs,PullRefresh,Tabbar, TabbarItem,Grid,GridItem,RadioGroup, Radio,Dialog,Switch,Popup,Cell  } from 'vant'





Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload ).use(List).use(Field).use(NavBar).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Tabbar)
  .use(TabbarItem).use(Dialog).use(Popup ).use(Tag )
Vue.use(Grid).use(Switch).use(Cell).use(CountDown ).use(Picker ).use(Card )
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(GridItem);
Vue.use(Radio);
Vue.use(RadioGroup);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})


