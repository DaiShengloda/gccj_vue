// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import rem from '../static/js/flexible.js' //rem转换
import http from './api/httpList.js'  //ajax请求
import tool from './api/motheds.js'  //工具
import title from 'vue-wechat-title'  //工具
import filter from './api/filter.js' //公共过滤器
import conster from './api/const.js'  //接口参数
import myRouter from './api/myRouter.js'  //封装路由跳转 
import Calendar from 'vue2-datepick'  //日期插件
Vue.config.productionTip = false
//公共sass文件
import './sass/helper/_variables.scss';
import './sass/helper/_function.scss';


Vue.use(rem)
Vue.use(http)
Vue.use(tool)
Vue.use(filter)
Vue.use(title)
Vue.use(conster)
Vue.use(myRouter)
Vue.use(Calendar)

// 将API方法绑定到全局
Vue.prototype.$http = http
Vue.prototype.$tool = tool
Vue.prototype.$filter = filter.methods
Vue.prototype.$conster = conster
Vue.prototype.$myRouter = myRouter
/* eslint-disable no-new */
window.vueIns=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})