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
