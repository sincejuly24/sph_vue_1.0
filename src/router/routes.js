// import Home from "@/views/Home";
import Search from "@/views/Search";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Detail from "@/views/Detail"
import AddCartSuccess from "@/views/AddCartSuccess"
import ShopCart from "@/views/ShopCart"
import Trade from "@/views/Trade"
import Pay from "@/views/Pay"
import Paysuccess from "@/views/PaySuccess"
import Center from "@/views/Center"
import Myorder from "@/views/Center/Myorder"
import Grouporder from "@/views/Center/Grouporder"

export default [
    {
      path: "/home",
      //··························路由的懒加载！！！！··························
      component:()=>import("@/views/Home"),
      //路由元信息key不能瞎写：只能叫做meta
      meta:{isShow:true},
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
    {
          //下面这种写法：代表的是params参数可以传递|当然也可以不传递  ?(正则:两次代表出现次数0|1)
          //切记?带上，因为params参数可以传递|可以不传递
          path: "/search/:keyword?",
          component: Search,
          meta:{isShow:true},
          // 命名路由
          name:"search",
          //路由是可以给组件传递props的
          //props:($route)=>({keyword:$route.params.keyword,big:$route.query.big})
          //props:(route)=>({keyword:route.params.keyword1,big:route.query.big})

        },
    {
      path: "/detail/:skuId",
      component: Detail,
      meta: { isShow: true },
    },
    {
      path: "/addcartsuccess",
      component:AddCartSuccess,
      meta: {isShow: true},
      name:"addcartsuccess",
    },
    {
      path: "/shopcart",
      component: ShopCart,
      meta: {isShow:true}
    },
    {
      path: "/trade",
      component:Trade,
      meta: {isShow:true},
      //路由独享守卫
      beforeEnter: (to, from, next) => {
        //去交易页面，必须是从购物车而来
        if (from.path == "/shopcart") {
          next();
        } else {
          //其他的路由组件而来，停留在当前
          next(false);
        }
      },
    },
    {
      path:"/pay",
      component:Pay,
      meta: {isShow:true},
      //组件内守卫
      beforeEnter: (to, from, next) => {
        if (from.path == "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path:"/paysuccess",
      component:Paysuccess,
      meta: {isShow:true}
    },
    {
      path:"/center",
      component:Center,
      meta: {isShow:true},
      children:[
        {
          path:"myorder",
          component:Myorder,
          meta: {isShow:true},
        },
        {
          path: "grouporder",
          component: Grouporder,
        },
        {
          path: "/center",
          redirect: "/center/myorder",
        },
      ]
    },
    // 重定向：本来上来访问的是/根，我就让你去home
    {
      path:'/',
      redirect:'/home'
    }
  ]