//引入vue-router路由插件
import VueRouter from "vue-router";
//引入Vue
import Vue from "vue";
//使用插件
Vue.use(VueRouter);
//引入一级路由组件
import Home from "@/views/Home";
import Search from "@/views/Search";
import Login from "@/views/Login";
import Register from "@/views/Register";

//重写push和replace方法（目的：1)在编程式导航当中，点击按钮的时候（多次：传递参数相同），回报警告？
//注意：声明式导航是没有这类问题，因为人家内部已经解决了，编程式导航才会有这类问题
//为什么编程式导航会有这类问题:
//因为 vue-router 这个插件在 3.xxx 版本以后，利用的是 promise 封装的，而我们的编程式导航，需要给 promise 传递成功、与失败的回调，才可以解决此类问题
//由于 vue-router（3.xxx）,引入进来了 Promise，当编程式导航进行跳转的时候（传递参数相同），它就会在内部给我们抛出异常，
//因此我们需要给 push 函数传递两个参数，分别是两个回调函数（成功的回调、失败的回调））

//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//对外暴露VueRouter类的实例
export default new VueRouter({
  //配置路由
  //第一:路径的前面需要有/(不是二级路由) 
  //路径中单词都是小写的
  //component右侧Vc别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
  routes: [
    {
      path: "/home",
      component: Home,
      //路由元信息key不能瞎写：只能叫做meta
      meta:{isShow:true},
    },
    {
      //下面这种写法：代表的是params参数可以传递|当然也可以不传递  ?(正则:两次代表出现次数0|1)
      //今晚在练习的时候，切记?给我带上，因为咱们项目当中params参数就可以传递|不传递也可以
      path: "/search/:keyword1?",
      component: Search,
      meta:{isShow:true},
      // 命名路由
      name:"search",
      //路由是可以给组件传递props的
      //props:($route)=>({keyword:$route.params.keyword,big:$route.query.big})
      //props:(route)=>({keyword:route.params.keyword1,big:route.query.big})

    },
    {
        path:'/login',
        component:Login,
        meta:{isShow:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{isShow:false}
    },
    // 重定向：本来上来访问的是/根，我就让你去home
    {
      path:'/',
      redirect:'/home'
    }
  ],
});

