//统一接口管理模块
//引入二封装的axios
import requests from "./ajax";
import mockRequests from "./mockAjax"
//三级菜单的请求地址  /api/product/getBaseCategoryList   GET    没有任何参数(来自接口文档)
//对外暴露一个函数，只要外部调用这个函数，就想服务器发起ajax请求、获取咱们的三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可。
export const reqgetCategoryList = () => requests.get(`/product/getBaseCategoryList`);
//获取banner轮播图数据
export const reqGetBannerList = ()=>mockRequests.get('/banner');
//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchList = (params)=> requests({url:"/list",method:"post",data:params})

//----------------商品详情页---------------------
//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get   

export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  请求方式：POST
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车列表数据接口
//URL:/api/cart/cartList   method:get 
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'});

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId}   method:DELETE  
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//获取验证码 /api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//用户注册  /api/user/passport/register  method:post   data:phone,password,code
export const reqUserRegister = (user)=>requests({url:'/user/passport/register',method:'post',data:user});
//用户登录  /api/user/passport/login  method:post    data:phone,password
export const reqUserLogin = (user)=>requests({url:'/user/passport/login',method:'post',data:user});
//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqGetUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = ()=> requests({url:'/user/passport/logout',method:'get'});
///api/order/auth/trade  get
export const reqGetOrder = ()=>requests({url:'/order/auth/trade',method:'get'});
///api/user/userAddress/auth/findUserAddressList   get
export const reqGetAddress = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//提交订单
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});