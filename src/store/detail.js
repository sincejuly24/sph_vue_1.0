import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api" 
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
};
const mutations = {
    GETGOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取商品信息的action
    async getGoodInfo({commit},skuId){
        // console.log(skuId,"skuid");
        let res = await reqGoodsInfo(skuId);
        if (res.code == 200) {
            commit("GETGOODSINFO",res.data)
        }
    },
    //添加购物车结果,修改数量(没有返回什么数据，所以不用继续mutations，state二连了)
    async willAddCart ({commit},{skuId,skuNum}){
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了）
        //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let res = await reqAddOrUpdateShopCart(skuId,skuNum);
        if (res.code == 200) {
            return "addcart successfully"
        }else{
            return new Promise.reject( new Error("faile"))
        }
    }
};
//简化数据（有点意思了昂）
const getters = {
    //------------------------优化---------------------------
    //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    state,
    mutations,
    actions,
    getters,
}