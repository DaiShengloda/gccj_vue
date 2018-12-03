/**
 * 路由跳转处理
 */
//根目录
const PageNav = {
  root: "/",
  activity: "/activity/",
  content: "/content/",
  user: "/user/"
}
//页面链接配置
const PageIndex = {
  /*-----------主要模块--------*/
  root: {
    index: `index`,//首页
    product:'product', //产品
    note:'note',//笔记
    course:`course`,//大咖课程
    userCenter: `userCenter`,//个人中心
  },

  /** ----------活动------------- */
  activity: {
    live:'live',  //直播
    productPayPage:'productPayPage',  //产品支付
    agreement: 'agreement',  //签署协议
  },
  /** ----------内容---------------*/
  content: {
    noteDetail: `detail/noteDetail`,//笔记详情 
    courseDetail: `detail/courseDetail`,//课程详情 
    seriesDetail:'detail/seriesDetail',//系列详情
    seriesCourse:'detail/seriesDetail',//系列详情
    reportDetail:'detail/reportDetail',//研报详情
    hotReportDetail:'detail/hotReportDetail',//热门研报
    shareDetail:'detail/shareDetail',//个股详情
    stockPool:'detail/stockPool',//股票池历史记录
    cowManDetail:'detail/cowManDetail',//牛人掌股详情
    vip:`vip`,//vip专区 
    cardExclusive:`vip`,//vip个人中心--vip专区 
    report:'report',//研报 
    dialog:'dialog', //公共弹窗
    internalPublication:'vipBook', //国诚内刊
    vipBook:'vipBook', //国诚内刊
  },
  /**------------用户中心--------------- */
  user: {
    login: `login`,//登录
    aboutApp: `aboutApp`,//关于app
    coinRecharge: `coinRecharge`,//牛币充值
    coinRechargeLog: `coinRechargeLog`,//牛币充值记录
    fxcp: `fxcp`,//风险测评
    identifyCode: `identifyCode`,//验证码验证
    incomeLog: `incomeLog`,//收支记录
    payConfirmBook: `payConfirmBook`,//支付确认书
    userCheckIn: `userCheckIn`,//用户登记
    recharge: `coinRecharge`,//牛币充值
    mobileLogin: 'mobileLogin', //手机号登录
    mobileRegister: 'mobileRegister', //手机号登录
    identifyCode:'identifyCode', //手机号注册、找回密码
    publicity:'publicity', //投资资质公示
    bossMail:'bossMail', //总经理投诉信箱
  }
}
/** 跳外链协议 */
const webViewPath=['web?', 'webview?', 'subscribeProduct?']
// 高级顾问的企点链接
const openAppUrl='http%3a%2f%2fq.url.cn%2fabYCWH%3f_type%3dwpa%26qidian%3dtrue'

let routes = {};
for (let name in PageIndex) {
  for (let page in PageIndex[name]) {
    routes[page] = PageNav[name] + PageIndex[name][page]
  }
}

function parseUrl(url) {
  url=formatUrl(url)
  let index = url.indexOf('?');
  let path, queryString;
  if (index == -1) {
    path = url;
    queryString = '';
  } else {
    path = url.substring(0, index);
    queryString = url.substr(index);
  }
  let page = routes[path];
  if (!page) {
    throw '不支持的跳转链接:' + page;
  }
  return page + queryString;
}

function formatUrl(url){
  var arr
  url=url.replace("dkwg://","")
  url=url.replace("jingu://","")
  if(checkWebView(url))return
  if(url.indexOf('redirect')==-1){ 
    url=decodeURIComponent(url)  //跳登录redirect链接observer--内刊
  }
  arr=url.split('/')
  url=arr[arr.length-1]
  return url
}

function checkWebView(url){
  var path
  if(url.startsWith('openApp?')){
    toWebView('scheme='+openAppUrl)
    return true
  }
  for(var i in webViewPath){
    path=webViewPath[i]
    if(url.startsWith(path)){
      toWebView(url)
      return true
    }
  }
  return false
}

/**
 * 跳转外链页面
 */
function toWebView(queryString){
  var url=queryString.split('=')[1]
  url = decodeURIComponent(url)  //只能这里解码不然无法跳转产品
  url=sprangUrl(url)
  window.location.href=url
}

function sprangUrl(url){
  var token=localStorage.getItem('auth')
  if(url.includes('?')){
    url += '&r=3.8'
  } else {
    url += '?r=3.8'
  }
  url+='&toKen='+token+'&deviceType=3'+'&envirType=web'  
  return url
}

/** ---------暴露出去的api------ */

/**
 * 保留当前页面，跳转到应用内的某个页面
 */
function navigateTo(param,that) {
  param.path = parseUrl(param.path)
  if(!param.path)return
  that.$router.push(param)
}

/**
 *关闭当前页面，返回上一页面或多级页面
 */
function navigateBack(param,that) {
  var delta=param.delta
  that.$router.go(-delta)
}

/**
 *关闭当前页面，跳转到应用内的某个页面
 */
function redirectTo(param,that) {
  param.path = parseUrl(param.path)
  if(!param.path)return
  that.$router.replace(param)
}

/**
 * 路由监听跳转
 */
function observer(route, that){
  var path=route.query.redirect
  var delta=route.query.delta
  if(delta){
    that.$router.go(-delta)
    return
  }
  if(path){
    path = parseUrl(path)   
  }else{
    path = parseUrl('userCenter')
  }
  that.$router.replace({path:path})
}

export default{ 
  navigateTo, 
  navigateBack, 
  redirectTo,
  observer,
}