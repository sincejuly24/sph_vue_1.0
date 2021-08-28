<template>
<div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(fl,index) in floorList" :key="fl.id" :list="fl"/>
    <Brand/>
</div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
    name:'Home',
    components:{
        ListContainer,TodayRecommend,Rank,Like,Floor,Brand
    },
    mounted() {
        this.$store.dispatch("getFloorList");
        //在路由守卫里面统一派发就行了在跳转任何页面之前
        //当前只是在home挂载时派发只能管这一个页面的事儿，跳别的就白搭了。
        // this.$store.dispatch("getUserInfo");
    },
    computed:{
        ...mapState({
            floorList:(state)=> state.home.floorList,
        })
    }
}
</script>

<style>

</style>