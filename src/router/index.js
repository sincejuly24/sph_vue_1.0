//引入vue-router路由插件
import VueRouter from "vue-router";
//引入Vue
import Vue from "vue";
//使用插件
Vue.use(VueRouter);
//引入一级路由组件
import routes from "./routes"
import store from "@/store";

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
let router = new VueRouter({
  //配置路由
  //第一:路径的前面需要有/(不是二级路由) 
  //路径中单词都是小写的
  //component右侧Vc别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
  routes,
  //滚动行为
  scrollBehavior (to, from, savedPosition) {
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
    //对于所有路由导航，简单地让页面滚动到顶部。
    return { x: 0, y: 0 }
  },
});

router.beforeEach(async (to,from,next)=>{
  //to:获取到要跳转到的路由信息
  //from：获取到从哪个路由跳转过来来的信息
  //next: next() 放行  next(path) 放行  
  //  next();
  //获取仓库中的token-----可以确定用户是登录了
  let token = store.state.user.token;
  let username = store.state.user.userinfo.name;
  //登录了
  if(token){
    //登陆了不能去登录注册页面啦
    if ((to.path=="/login"||to.path=="/register")){
        next('/');
    }else{
      //登陆了有了用户名，除了登录注册其他页面都放行
      if(username){
        next();
      }else{
        try {
          //登陆了但是没有userinfo，需要获取userinfo,也就是派发根据token获取用户信息的action
          //之前是登录跳转home时在home挂载时派发获取用户信息的action，这个办法的缺点时只能在home中得到user info，别的页面
          //还是没有，因为只在home挂载时派发了获取用户信息的action
          //所以只需要在用户点击跳转（随意）页面之前派发获取用户信息的action就可以解决上述的问题了！！！
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //这里没有信息或者说没有token可能是因为token过期了。直接跳登录页面，别忘了清除token退出登录
          await store.dispatch("userLogot");
          next('/login');
        }
      }
    }
  }else{
    //用户未登录时，(爱干嘛干嘛直接放行！不严谨如下)
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
      //未登录去上面这些路由-----登录
      let toPath = to.path; 
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next('login?redirect='+toPath)
    }else{
      next();
    }
  }
})

export default router;

