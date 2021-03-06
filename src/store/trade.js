import {reqGetOrder, reqGetAddress } from "@/api"
const state = {
    addressList : [],
    orderInfo : {},
};
const mutations = {
    GETUSERADDRESSLIST(state,addressList){
        state.addressList = addressList;
    },
    GETUSERORDERINFO(state,orederInfo){
        state.orderInfo = orederInfo;
    },
};
const actions = {
    //获取用户地址信息
    async getUserAddressList({commit}){
        let res = await reqGetAddress();
        if (res.code == 200) {
            commit("GETUSERADDRESSLIST",res.data);
            return "ok"
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    //获取用户订单信息
    async getUserOrderInfo({commit}){
        let res = await reqGetOrder();
        if (res.code == 200) {
            commit("GETUSERORDERINFO",res.data);
            return "ok"
        }else{
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters,
}