<style lang="scss" scoped>
@import '../../sass/pages/userCenter/login'
</style>

<template>
<div class='login'>
  <div class='top'></div>
  <div class='bottom'>
    <button class='wx' @click.stop="submitLogin">
      <img src='/static/images/weixin@3x.png'/>  
      微信一键登录
    </button>
  </div>
</div>
</template>
<script>
import userManager from '@/api/user-manager'
export default {
  name: 'UserRegister',
  data() {
    return{
      redirect:'',
      btnText: '手机号登录',
      url: null,
      //类型1.注册 /2登录
      type: 1,
    }
  },
  components: {
  },
  created: function() {
    this.redirect = this.$route.query.redirect
    let type = this.$route.query.type
    if (type == 1) {
      //跳转注册
      this.btnText = '手机号注册'
      this.url = 'mobileRegister?register=true'
    } else {
      //跳转登录
      this.btnText = '手机号登录'
      this.url = 'mobileLogin'
    }
    this.type = type
  },
  mounted: function(){
    var self=this
    userManager.loginByWeChat().then(data=>{
      self.$myRouter.observer(self.$route,self)
    }).catch(err=>{
      console.error(err)
    })
  },
  methods: {
    submitLogin(){
      var appid='wx281c19513c9bd19f'
      var redirect_uri=this.$conster.domain+'/static/index.html#/user/login?redirect='+this.redirect
      redirect_uri=encodeURIComponent(redirect_uri)
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
    },
  },
}
</script>
