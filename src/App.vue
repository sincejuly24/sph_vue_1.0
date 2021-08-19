<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{
    Header,
    Footer,
  },
  mounted(){
    //在这里派发action获取TypeNav组件所需要的数据（三级导航的数据），提升性能
    this.$store.dispatch("getCategoryList");
  }
};
</script>

<style>

</style>