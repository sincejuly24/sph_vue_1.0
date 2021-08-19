import {
    reqGetBannerList, 
    reqgetCategoryList,
    reqFloorList
} from '@/api';
//home的模块仓库
const state = {
    //home中存三级菜单的数据的地方（目前）
    categoryList:[],
    bannerList:[],
    floorList:[],
};
//mutations是唯一修改state的地方
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    REQGETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
//actions用户处理派发actions的地方，写逻辑和处理异步任务的地方
const actions = {
    //获取导航数据派发action
    async getCategoryList({commit}){
        //reqgetCategoryList返回的是一个Promise对象
        //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
        let res = await reqgetCategoryList();
        if (res.code == 200) {
            commit("GETCATEGORYLIST",res.data);
        };
    },
    //获取轮播图数据派发action
    async getBannerList({commit}){
        let res = await reqGetBannerList();
        if (res.code == 200) {
            commit("REQGETBANNERLIST",res.data)
        }
    },
    //获取floor数据派发action
    async getFloorList({commit}){
        let res = await reqFloorList();
        if (res.code == 200) {
            commit("GETFLOORLIST",res.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
};