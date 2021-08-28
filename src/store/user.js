import { reqGetCode , reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogout } from '@/api'
import { getToken,setToken,clearToken } from '@/utils/token';
const state = {
    code : '',
    token : getToken(),
    userinfo : {},
};
const mutations = {
    GETCODE(state,code){
      state.code = code;
    },
    USERLOGIN(state,token){
      state.token = token;
    },
    GETUSERINFO(state,userinfo){
      state.userinfo = userinfo
    },
    //退出登录
    USERLOGOT(state){
      //清空仓库用户TOKEN和用户信息
      state.token = '';
      state.userinfo = {};
      clearToken();
    }
};
const actions = {
  //获取验证码
  async getCode({commit},phone){
      let res = await reqGetCode(phone);
      if (res.code == 200) {
          commit("GETCODE",res.data);
          return 'ok';
      }else{
          return Promise.reject(new Error('faile'));
      }
  },
  //用户注册
  async userRegister({commit},user){
    let res = await reqUserRegister(user);
    if (res.code == 200) {
      // console.log(res);
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'));
    }
  },
  //用户登录
  async userLogin({commit},data){
    let res = await reqUserLogin(data);
    if (res.code == 200) {
      commit("USERLOGIN",res.data.token)
      //持久化存储TOKEN
      setToken(res.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error("faile"));
    }
  },
  //根据token获取用户信息
  async getUserInfo({commit}){
    let res = await reqGetUserInfo();
    // console.log(res);
    if (res.code == 200) {
      commit("GETUSERINFO",res.data)
      return 'ok';
    }else{
      return Promise.reject(new Error("faile"));
    }
  },
  //退出登录
  async userLogot({commit}){
    let res = await reqLogout();
    if (res.code == 200) {
      commit("USERLOGOT");
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}