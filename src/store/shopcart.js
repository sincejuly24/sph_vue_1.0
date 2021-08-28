import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if(result.code==200){
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
  //promiseAll(理解体会)
  updateAllCartchecked({state,dispatch},isChecked){
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch("updateCheckedById",{
        skuId:item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  //批量删除选中的商品
  delALLCheckedCart({getters,dispatch}){
    //{getters,dispatch}由context解构来的，context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组）
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = (item.isChecked ==1) ? dispatch("deleteCartListBySkuId",item.skuId):"";
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
