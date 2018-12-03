/**
 * 常量类
 * @author 
 */

// 接口域名
// mobileRegister接口调整
// const domain = 'http://gccj.lzyunying.com'
const domain = 'http://api.cf69.com'
// 接口地址
const API_URL = {
  // 签约列表
  PROTOCOL_LIST: '/api/protocol/protocolList.do',
  // 签约接口
  PROTOCOL_SIGN: '/api/protocol/sign.do',
  // 投资资质公示
  PUBLICITY: '/api/bigname/qualificationsList.do',
  // 国诚内刊
  DAILY_POINT:'/api/dailypoint/detail.do',
  // 获取用户token
  GET_TOKEN: '/api/zbToken/getToken',
  // 获取用户openid
  GET_OPENID: '/api/user/getOpenId.do',
  // 大咖战绩
  DAKA_RECORD: '/api/product/dakaRecord.do',
  // 进度页面
  PAY_STATE_TO:'/api/product/pay/state2.do',
  // 产品列表
  PRODUCT_LIST:'/api/product/list.do',
  // 产品详情
  PRODUCT_DETAIL: '/api/product/detail.do',
  // 主力布局调仓记录
  PRODUCT_MAIN_LAYOUT: '/api/product/mainLayoutHistory.do',
  // 产品订阅 
  PRODUCT_STATE: '/api/product/pay/state1.do',
  // 牛人掌股分页
  PRODUCT_SUPERMAN: '/api/product/superSteerPage.do',
  // 列表判断跳转路径
  PRODUCT_ACTION: '/api/product/userAction.do',
  // 产品档次接口
  GRADE_LIST: '/api/grade/list.do', 
  
  // 产品支付接口 
  PAYMENT_ORDER:'/api/payment/wx/order.do',
  // 订单num
  PAYMENT_BACK: '/api/payment/wx/callback.do',

  // 首页推荐
  AUTHOR_FRESH:'/api/noteInterface/autoFresh.do',
  // 启动页
  APP_START:'/api/getAppStartPage.do',
  // 直播
  TAB_LIVE:'/live/liveroom/tab.do',
  // 首页主题
  INDEX_SET: '/api/index/set.do',
  // 首页大咖推荐
  INDEX_HOT: '/api/index/hot.do',
  // 推荐接口
  RECOMMEND: '/api/index/reccontent.do',

  //根据auth登录
  LOGIN_BY_AUTH: '/api/user/loginByAuth.do',
  //根据手机号登录
  LOGIN_BY_MOBILE: '/api/user/loginByMobile.do',
  //根据微信code登录
  MINI_APP_LOGIN: '/api/mini_app/login.do',
  // 公众号登录
  WX_MP_LOGIN: '/api/user/wxMpLogin.do',
  //jssdk签名接口
  WX_PUBLIC: '/api/wx_public/jssdk.do',
  // 退出登录
  LOGIN_OUT: '/api/user/logout.do',

  //用户详情
  USER_DETAIL: '/api/user/detail.do',
  //查询牛币
  QUERY_COIN: '/api/user/queryCoin.do',
  //充值推荐
  RECHARGE_RECOMMEND: '/api/recharge/recommend.do',

  //下单接口 
  PAY_ORDER: '/api/mini_app/order.do',
  //支付接口
  PAY_RESULT: '/api/recharge/recharge.do',

  //牛币支付记录
  COIN_RECHARGE_LOG: '/api/payment/wx/log.do',
  //获取验证码
  GET_YZ_CODE: '/api/phone/sendCode.do', 
  //检查手机号是否可用
  CHECK_MOBILE: '/api/user/checkMobile.do',
  //绑定手机号
  BIND_MOBILE: '/api/phone/bindMobile.do',
  //验证原手机号
  CHECK_OLD_MOBILE: '/api/phone/checkOldMobile.do',
  //获取原手机号信息
  GET_OLD_MOBILE: '/api/phone/bindInfo.do',
  //修改密码
  MODIFY_PWD: '/api/user/forgetPassword.do',
  //注册
  REGISTER: '/api/user/register.do',
  //收入记录
  INCOME_LOG: '/api/user/queryIncome.do',
  //消费记录
  CONSUME_LOG: '/api/user/queryConsume.do',
  //获取用户登记信息
  GET_USER_REGISTRATION: '/api/user/queryByUserid.do',
  //保存用户登记
  SAVE_USER_REGISTRATION: '/api/user/saveUserRegistration.do',
  //风险测评题目列表
  FXCP_LIST: '/api/answer/all.do',
  //提交风险测评
  FXCP_SUBMIT: '/api/answer/result.do',
  //风险测评确认
  FXCP_CONFIRM: '/api/answer/submit.do',
  //合规判断
  HG_CONFIRM: '/api/business/pay/confirmingOrder.do',
  //查询风险测评结果
  FXCP_RESULT: '/api/mini_app/fxcpResult.do',

  // 系列列表 note_type=2
  SERIES_LIST: '/api/course/series/list.do',
  // 系列详情
  SERIES_DETAIL: '/api/course/series/detail.do',
  // 系列课程支付
  SERIES_PAY: '/api/business/course/series/pay.do',
  // 课程列表
  COURSE_LIST: '/api/course/dk/list.do',
  // 课程详情
  COURSE_DETAIL: '/api/course/contentDetail.do',
  // 课程上的广告
  COURSE_ADS: '/api/course/ads.do',

  // 笔记列表
  NOTE_LIST: '/api/noteInterface/list.do',
  // 笔记详情
  NOTE_DETAIL: '/api/noteInterface/detail.do',
  // 笔记获取评论
  NOTE_COMMENT: '/api/noteInterface/queryComments.do',
  // 笔记点赞
  NOTE_SATISFY: '/api/noteInterface/satisfy_set.do',
  // 笔记支付
  NOTE_PAY: '/api/business/note/pay.do',
  // 笔记评论点赞
  NOTE_COMMENT_SATISFY: '/api/noteInterface/setAgree.do',
  // 笔记发表评论
  NOTE_SAVE_COMMENT: '/api/noteInterface/saveComment.do',

  // app数据
  APP_INIT: '/api/silent/init.do', 

  // 研报列表
  REPORT_LIST: '/api/report/list.do',
  // 研报配置
  REPORT_CONFIG: '/api/report/config.do',
  // 热门研报列表
  REPORT_HOT_LIST: '/api/report/hot/list.do',
  // 热门研报详情
  REPORT_HOT_DETAIL: '/api/report/hot/detail.do',
  // 研报详情
  REPORT_DETAIL: '/api/report/detail.do',
  // 研报评论列表
  REPORT_COMMENT_LIST: '/api/report/commentList.do',
  // 研报发表评论
  REPORT_COMMENT_POST: '/api/report/comment.do',
  // 研报评论点赞
  REPORT_COMMENT_AGREE: '/api/report/commentAgree.do',

  // VIP专区
  VIP_ZONE: '/api/user/card/vipZone.do',
  // 大咖月卡专享笔记列表
  VIP_NOTE: '/api/noteInterface/getMonthCardVIPNote.do',
  // VIP专享交流圈
  VIP_LIVE: '/api/user/card/vipLiveRoom.do',
  // VIP服务介绍
  VIP_SERVER_PAGE:'/api/stock/info/page.htm?name=ykvip',

  // 获取openid
  CODE_TO_OPENID: '/api/mini_app/code2openId.do',

  // 大咖列表
  DAKA_LIST: '/api/bigname/list.do',

  // 总经理信箱投诉
  Mailbox: "/api/mailbox/save.do"
}

//解决Object.entries不兼容的问题
if (!Object.entries
  || typeof Object.entries !== 'function') {
  Object.entries = function (obj) {
    let objData = [];
    for (let k in obj) {
      objData.push([k, obj[k]]);
    }
    return objData;
  }
}

for (let [k, v] of Object.entries(API_URL)) {
  API_URL[k] = domain + v
}

// 全局配置
const config = {
  // 日志级别 DEBUG/INFO/WARN/ERROR
  LogLevel: 'DEBUG'
}

export default {
  API_URL: API_URL,
  config: config,
  domain,
  //合规状态常量
  hgStatus: {
    NO_ALL: -3, //未登记 未测评
    NO_REGISTRATED: -2,//未登记  已测评
    NO_ANSWER: -1, //已登记 未测评
    NO_SHOW: 0,//直接支付
    IS_RETSET: 1,//重测
    SHOW_CONFIRM: 2//弹确认书
  },
  //订阅主题常量
  subjects: {
    //风险测评
    fxcp: 'fxcp',
    //用户登记
    userCheckIn: 'checkIn',
    //同意支付确认书
    agreePayRule: 'agreePayRule',
    //登录成功
    loginSuccess: 'loginSuccess',
  },
  //个股行情接口
  stockTick:'http://stock.gp58.com/front/stock/stockTick.do',
}
