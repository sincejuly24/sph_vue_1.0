import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
//大仓库，统一管理所有的小仓库
import home from './home'
import search from './search'
import detail from './detail';
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
export default new Vuex.Store({
    //模块：把小仓库进行合并变为大仓库
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})