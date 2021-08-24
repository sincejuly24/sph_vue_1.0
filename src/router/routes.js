import Home from "@/views/Home";
import Search from "@/views/Search";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Detail from "@/views/Detail"

export default [
    {
      path: "/home",
      component: Home,
      //路由元信息key不能瞎写：只能叫做meta
      meta:{isShow:true},
    },
    {
      //下面这种写法：代表的是params参数可以传递|当然也可以不传递  ?(正则:两次代表出现次数0|1)
      //今晚在练习的时候，切记?给我带上，因为咱们项目当中params参数就可以传递|不传递也可以
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
      path: "/detail/:skuId",
      component: Detail,
      meta: { isShow: true },
    },
    // 重定向：本来上来访问的是/根，我就让你去home
    {
      path:'/',
      redirect:'/home'
    }
  ]