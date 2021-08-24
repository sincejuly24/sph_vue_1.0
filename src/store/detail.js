import { reqGoodsInfo } from "@/api" 
const state = {
    goodInfo: {},
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