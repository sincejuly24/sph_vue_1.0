import axios from "axios"
import nprogress from "nprogress"
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";
//底下的代码也是创建axios实例
let requests = axios.create({
    baseURL:"/api",
    timeout:5000*2,
});
//二次封装axios
//请求拦截器（请求没发出去之前做一些事情，比如进度条子）
requests.interceptors.request.use((config)=>{
    //config是配置对象(以后会用)
    //可以让进度条开始动
    nprogress.start();
    return config;
});
//相应拦截器（服务器做出相应之后执行，也可以做一些事）
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()
    return res.data;
},(err)=>{
    alert("服务器响应数据失败");
});
//最终需要对外暴露（不对外暴露外面模块没办法使用）
//不要忘记暴露requests
export default requests;