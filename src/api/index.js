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
//获取search页面数据，需要传参
//获取搜索模块数据 地址:/api/list  请求方式:post  参数:需要带参数
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchList = (params)=> requests({url:"/list",method:"post",data:params})

//----------------商品详情页---------------------
//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get   

export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

