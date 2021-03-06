import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

//引入（大）仓库并进行注册
//引入仓库进行注册
import store from '@/store'
//注册全局组件
import typeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from "@/components/Pagination"
Vue.component(typeNav.name,typeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
import { Button,MessageBox} from 'element-ui';
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mockServe.js需要执行一次才能有数据（mock模仿服务器）
import '@/mock/mockServe';
import 'swiper/css/swiper.css'
//图片懒加载
import atm from '@/assets/7.jpg';
//引入插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
});
import * as API from "@/api"
new Vue({
  render: h => h(App),
  //安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //需要把router进行注册
  //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
  //$route(路由)：可以获取到路由信息（path、query、params）
  //$router:进行编程式导航路由跳转push||replace
  router,
  //在入口文件这里注册store,在每一个组件的身上都拥有一个$store这个属性 
  store
}).$mount('#app')
