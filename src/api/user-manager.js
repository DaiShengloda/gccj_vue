import http from "./httpList"
import Conster from './const.js'
import filter from './filter.js' 
const methods=filter.methods
const appid='wx281c19513c9bd19f'
//存储auth信息的key
const AUTH_KEY = "auth";
const USER_INFO = "userInfo";
//是否正在登录,若正在登录则不重复请求
let isLogining = false;
/**
 * 用户信息管理
 * @author 
 */

// 微信号登录
function loginByWeChat() {
  var code=methods.getQueryString('code')
  if(!code){
    return Promise.reject('code不存在');
  }
  if (isLogining) {
    while (isLogining);
  }
  isLogining = true;
  return http.getRequest(Conster.API_URL.WX_MP_LOGIN,{
    code:code
  }).then(data=>{
    loginSuccess(data);
    return Promise.resolve(data);
  }).catch(err => {
    isLogining = false;
    return Promise.reject(err);
  });
}

/**
 * 静默登录
 */
function loginByAuth() {
  if (isLogining) {
    return false;
  }
  let isLogOut = localStorage.getItem('logout');
  if (isLogOut) {
    console.error("用户已退出登录,将不再自动登录");
    return false;
  }
  let auth = localStorage.getItem(AUTH_KEY);
  if (!auth) {
    return false;
  }
  isLogining = true;
  http.getRequest(Conster.API_URL.LOGIN_BY_AUTH, {
    "auth": auth,
    'deviceType':3
  }).then(function (data) {
    loginSuccess(data);
  }).catch(err => {
    console.error('auth登录失败:%o', err);
    isLogining = false;
  });
}

/**
 * 手机号登录
 */
function loginByMobile(mobile, password, mp_code) {
  let deviceType=3
  return http.getRequest(Conster.API_URL.LOGIN_BY_MOBILE, {
    mobile, password, deviceType, mp_code
  }).then(data => {
    loginSuccess(data);
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.reject(err);
  })
}

//登录成功
function loginSuccess(userInfo) {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  //设置登录方式
  if (userInfo.loginType) {
    localStorage.setItem('login_type', userInfo.loginType);
  }
  //设置token
  if (userInfo.toKen) {
    localStorage.setItem(AUTH_KEY, userInfo.toKen);
  }
  // 设置openid
  if (userInfo.open_id) {
    localStorage.setItem('openid', userInfo.open_id);
  }
  try {
    localStorage.removeItem('logout');
  } catch (err) { };
  localStorage.setItem('loginSuccess', true);
  localStorage.removeItem('mp_code');
  isLogining = false;
}

// 获取本地存储用户信息
function getLocalUserInfo() {
  return JSON.parse(localStorage.getItem(USER_INFO));
}

//获取用户详情
function getUserDetail() {
  let isLoginSuccess = localStorage.getItem('loginSuccess')
  if (!isLoginSuccess) {
    return Promise.reject('获取用户信息失败--当前登录状态失效');
  }
  return http.getRequest(Conster.API_URL.USER_DETAIL).then(data => {
    return Promise.resolve(data)
  })
}

//获取用户登录方式 1手机号登录/2微信登录/3公众号登录
function getLoginType() {
  return localStorage.getItem('login_type');
}

//退出登录
function logout(fn) {
  let loginSuccess = localStorage.getItem('loginSuccess');
  if (!loginSuccess) {
    console.warn("用户已退出登录,无需LOGIN_OUT");
    return false;
  }
  localStorage.clear()
  //设置登录状态为false,此时将不再自动登录
  localStorage.setItem('logout', true)
  fn && fn()
  return http.getRequest(Conster.API_URL.LOGIN_OUT)
}

//触发接口拦截
function triggerIntercept() {
  return http.getRequest(Conster.API_URL.USER_DETAIL)
    .then(data => {
      return Promise.resolve(data);
    });
}

// 静默授权获取code
function getMpcode(){
  var code=methods.getQueryString('code')
  if(code){
    localStorage.setItem('mp_code',code)
    return code
  }
  var mp_code=localStorage.getItem('mp_code')
  if(mp_code)return mp_code
  var redirect_uri=encodeURIComponent(window.location.href)
  window.location.href =
  "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
}

//mp_code换取openid
function codeToOpenid(mp_code){
  return http.getRequest(Conster.API_URL.GET_OPENID, {
    code:mp_code
  }).then(data => {
    localStorage.removeItem('mp_code')
    localStorage.setItem('openid', data.openId)
    return Promise.resolve(data)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export default {
  loginByWeChat: loginByWeChat,
  loginByAuth: loginByAuth,
  loginByMobile: loginByMobile,
  getLocalUserInfo: getLocalUserInfo,
  getUserDetail: getUserDetail,
  logout: logout,
  getLoginType: getLoginType,
  triggerIntercept:triggerIntercept,
  getMpcode: getMpcode,
  codeToOpenid:codeToOpenid
}

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx281c19513c9bd19f&redirect_uri=http%3A%2F%2Fapi.cf69.com%2Fstatic%2Findex.html%23%2Findex&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect
// 
// https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx281c19513c9bd19f&secret=c1e56190720494d16014316424eec10e&code=081NOhHw0vUjKi1bUlHw01dgHw0NOhHO&grant_type=authorization_code
// 
// oA1fC0vvqSolgLmIBk8gs9_G-DJQ
// 