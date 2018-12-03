import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  /**** tabBar start ****/ 
  {
    path: '/',
    component: function (resolve) {
      require.ensure(['@/pages/content'], function () {
        resolve(require('@/pages/content'))
      })
    },
    meta: {
      title: '国诚财经',
      keepAlive: true,
      pageLevel: 1,
    },
    children: [{
        path: 'index',
        component: function (resolve) {
          require.ensure(['@/pages/index'], function () {
            resolve(require('@/pages/index'));
          });
        },
        meta: {
          title: '国诚财经',
          keepAlive: true,
          pageLevel: 1,
        }
      },
      {
        path: 'note',
        component: function (resolve) {
          require.ensure(['@/pages/note'], function () {
            resolve(require('@/pages/note'));
          });
        },
        meta: {
          title: '观点',
          keepAlive: true,
          pageLevel: 1,
        }
      },
      {
        path: 'userCenter',
        component: function (resolve) {
          require.ensure(['@/pages/userCenter'], function () {
            resolve(require('@/pages/userCenter'));
          });
        },
        meta: {
          title: '个人中心',
          keepAlive: true,
          pageLevel: 1,
        }
      },
      {
        path: 'product',
        component: function (resolve) {
          require.ensure(['@/pages/product'], function () {
            resolve(require('@/pages/product'));
          });
        },
        meta: {
          title: '产品',
          keepAlive: true,
          pageLevel: 1,
        }
      },
      {
        path: '',
        redirect: '/index',
      },
    ],
  },
  /**** tabBar end ****/

  /**** content start ****/
  {
    path: '/course',
    component: function (resolve) {
      require.ensure(['@/pages/course'], function () {
        resolve(require('@/pages/course'));
      });
    },
    meta: {
      title: '课程',
      keepAlive: true,
      pageLevel: 2,
    }
  },
  {
    path: '/content/detail/shareDetail',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/shareDetail'], function () {
        resolve(require('@/pages/content/detail/shareDetail'))
      })
    },
    meta: {
      title: '股票详情',
      keepAlive: false,
      pageLevel: 4,
    },
  },
  {
    path: '/content/detail/stockPool',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/stockPool'], function () {
        resolve(require('@/pages/content/detail/stockPool'))
      })
    },
    meta: {
      title: '股票池',
      keepAlive: false,
      pageLevel: 4,
    },
  },
  {
    path: '/content/detail/cowManDetail',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/cowManDetail'], function () {
        resolve(require('@/pages/content/detail/cowManDetail'))
      })
    },
    meta: {
      title: '大咖掌舵',
      keepAlive: false,
      pageLevel: 4,
    },
  },
  {
    path:'/content/detail/noteDetail',
    component: function(resolve){
      require.ensure(['@/pages/content/detail/noteDetail'], function(){
        resolve(require('@/pages/content/detail/noteDetail'))
      })
    },
    meta: {
      title: '观点详情',
      keepAlive: false,
      pageLevel: 4,
    },
  },
  {
    path: '/content/detail/courseDetail',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/courseDetail'], function () {
        resolve(require('@/pages/content/detail/courseDetail'))
      })
    },
    meta: {
      title: '课程详情',
      keepAlive: false,
      pageLevel: 4,
    },
  },
  {
    path: '/content/detail/seriesDetail',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/seriesDetail'], function () {
        resolve(require('@/pages/content/detail/seriesDetail'))
      })
    },
    meta: {
      title: '精品系列课程',
      keepAlive: true,
      pageLevel: 3,
    },
  },
  {
    path: '/content/report',
    component: function (resolve) {
      require.ensure(['@/pages/content/report'], function () {
        resolve(require('@/pages/content/report'))
      })
    },
    meta: {
      title: '研报中心',
      keepAlive: true,
      pageLevel: 2,
    },
  },
  {
    path: '/content/detail/hotReportDetail',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/hotReportDetail'], function () {
        resolve(require('@/pages/content/detail/hotReportDetail'))
      })
    },
    meta: {
      title: '热门研报',
      keepAlive: true,
      pageLevel: 3,
    },
  },
  {
    path: '/content/detail/reportDetail',
    component: function (resolve) {
      require.ensure(['@/pages/content/detail/reportDetail'], function () {
        resolve(require('@/pages/content/detail/reportDetail'))
      })
    },
    meta: {
      title: '研报详情',
      keepAlive: false,
      pageLevel: 4,
    },
  },
  {
    path: '/content/vip',
    component: function (resolve) {
      require.ensure(['@/pages/content/vip'], function () {
        resolve(require('@/pages/content/vip'))
      })
    },
    meta: {
      title: 'VIP专属服务',
      keepAlive: true,
      pageLevel: 2,
    },
  },
  {
    path: '/content/dialog',
    component: function (resolve) {
      require.ensure(['@/pages/content/dialog'], function () {
        resolve(require('@/pages/content/dialog'))
      })
    },
    meta: {
      title: '国诚财经',
      keepAlive: true,
      pageLevel: 3,
    },
  },
  {
    path: '/content/vipBook',
    component: function (resolve) {
      require.ensure(['@/pages/content/vipBook'], function () {
        resolve(require('@/pages/content/vipBook'))
      })
    },
    meta: {
      title: 'VIP内参',
      keepAlive: true,
      pageLevel: 2,
    },
  },
  /**** content end ****/

  /**** user start ****/
  {
    path: '/user/userCheckIn',
    component: function (resolve) {
      require.ensure(['@/pages/user/userCheckIn'], function () {
        resolve(require('@/pages/user/userCheckIn'))
      })
    },
    meta: {
      title: '投资者信息登记',
    },
  },
  {
    path: '/user/fxcp',
    component: function (resolve) {
      require.ensure(['@/pages/user/fxcp'], function () {
        resolve(require('@/pages/user/fxcp'))
      })
    },
    meta: {
      title: '风险测评',
    },
  },
  {
    path: '/user/login',
    component: function (resolve) {
      require.ensure(['@/pages/user/login'], function () {
        resolve(require('@/pages/user/login'))
      })
    },
    meta: {
      title: ''
    },
  },
  {
    path:'/user/aboutApp',
    component: function(resolve){
      require.ensure(['@/pages/user/aboutApp'], function(){
        resolve(require('@/pages/user/aboutApp'))
      })
    },
    meta: {title: '关于我们'},
  },
  {
    path:'/user/coinRecharge',
    component: function(resolve){
      require.ensure(['@/pages/user/coinRecharge'], function(){
        resolve(require('@/pages/user/coinRecharge'))
      })
    },
    meta: {title: '充值'},
  },
  {
    path:'/user/coinRechargeLog',
    component: function(resolve){
      require.ensure(['@/pages/user/coinRechargeLog'], function(){
        resolve(require('@/pages/user/coinRechargeLog'))
      })
    },
    meta: {title: '充值记录'},
  },
  {
    path:'/user/incomeLog',
    component: function(resolve){
      require.ensure(['@/pages/user/incomeLog'], function(){
        resolve(require('@/pages/user/incomeLog'))
      })
    },
    meta: {title: '收支记录'},
  },
  {
    path:'/user/payConfirmBook',
    component: function(resolve){
      require.ensure(['@/pages/user/payConfirmBook'], function(){
        resolve(require('@/pages/user/payConfirmBook'))
      })
    },
    meta: {
      title: '评估结果确认书',
      callback: true  //from到to时是否执行回调
    },
  },
  {
    path:'/user/mobileLogin',
    component: function(resolve){
      require.ensure(['@/pages/user/mobileLogin'], function(){
        resolve(require('@/pages/user/mobileLogin'))
      })
    },
    meta: {
      title: '登录',
    },
  },
  {
    path:'/user/mobileRegister',
    component: function(resolve){
      require.ensure(['@/pages/user/mobileRegister'], function(){
        resolve(require('@/pages/user/mobileRegister'))
      })
    },
    meta: {
      title: '国诚财经',
    },
  },
  {
    path:'/user/identifyCode',
    component: function(resolve){
      require.ensure(['@/pages/user/identifyCode'], function(){
        resolve(require('@/pages/user/identifyCode'))
      })
    },
    meta: {
      title: '国诚财经',
    },
  },
  {
    path:'/user/publicity',
    component: function(resolve){
      require.ensure(['@/pages/user/publicity'], function(){
        resolve(require('@/pages/user/publicity'))
      })
    },
    meta: {
      title: '投资顾问资质公示',
    },
  },
  {
    path:'/user/bossMail',
    component: function(resolve){
      require.ensure(['@/pages/user/bossMail'], function(){
        resolve(require('@/pages/user/bossMail'))
      })
    },
    meta: {
      title: '总经理投诉信箱',
    },
  },
  /**** user end ****/

  /**** activity start ****/
  {
    path: '/activity/productPayPage',
    component: function (resolve) {
      require.ensure(['@/pages/activity/productPayPage'], function () {
        resolve(require('@/pages/activity/productPayPage'))
      })
    },
    meta: {
      title: '购买产品'
    },
  },
  {
    path: '/activity/live',
    component: function (resolve) {
      require.ensure(['@/pages/activity/live'], function () {
        resolve(require('@/pages/activity/live'))
      })
    },
    meta: {
      title: '国诚财经直播室'
    },
  },
  {
    path: '/activity/agreement',
    component: function (resolve) {
      require.ensure(['@/pages/activity/agreement'], function () {
        resolve(require('@/pages/activity/agreement'))
      })
    },
    meta: {
      title: '签署协议'
    },
  },
  /**** activity end ****/
  {
    path: '*',
    redirect: '/'
  },
]

const router = new Router({
  routes,
  /**
   * [scrollBehavior 滚动行为]
   * savedposition [按下 后退/前进 按钮时]
   */
  scrollBehavior(to, from, savedposition){
    if (savedposition) {
      return savedposition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/**
 * [全局前置守卫]
 * @param  {[type]} 
 * to -- 前进页面路由, 
 * from -- 来源页面路由,         
 * next [回调函数]；
 * 1.根据页面等级判断组件是否缓存(user相关页面不做缓存)；
 * 2.关闭所有弹窗；
 */
router.beforeEach((to, from, next) => {
  var fl = from.meta.pageLevel
  var tl = to.meta.pageLevel
  if(fl&&tl){
    if(tl<fl){  //后退(低级回退到高级)不刷新
      to.meta.keepAlive = true
    }else if(tl>fl){  //前进(高级进低级)刷新
      to.meta.keepAlive = false
    }
  }
  layer.closeAll()
  next()
})

export default router;
