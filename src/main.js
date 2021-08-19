import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//注册全局组件
//引入（大）仓库并进行注册
//引入仓库进行注册
import '@/mock/mockServe';
import 'swiper/css/swiper.css'
import store from '@/store'
import typeNav from '@/components/TypeNav'
Vue.component(typeNav.name,typeNav)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route(路由)：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  //在入口文件这里注册store,在每一个组件的身上都拥有一个$store这个属性 
  store
}).$mount('#app')
