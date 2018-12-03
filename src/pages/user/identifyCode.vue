<!--校验验证码页面 用户手机号注册或者找回密码-->
<style lang='scss'>
.code_form {
  min-height: 100vh;
  height: 100%;
  background: #fff;
}
.msg {
  height: r(50);
  line-height: r(50);
  padding-left: r(30);
  font-size: r(24);
  color: #b1b1b2;
  background: #f1f5fb;
}
.input {
  height: r(100);
  width: 100%;
  padding: 0 r(30);
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  .yz_code {
    width: 60%;
    height: 100%;
    font-size: r(26);
    float: left;
    border:none;
  }
  .get_btn {
    background: #4691ee;
    font-size: r(26);
    color: #fff;
    height: r(60);
    float: right;
    margin: r(20) 0;
    line-height: r(60);
    padding:0 r(10);
    border-radius:r(10);
  }
  .get_btn_disabled {
    background: #d6d6da;
    font-size: r(26);
    color: #fff;
    height: r(60);
    float: right;
    margin: r(20) 0;
    line-height: r(60);
    padding:0 r(10);
    border-radius:r(10);
  }
  .input_item {
    border:none;
    font-size: r(26);
    height: 100%;
    width:100%;
  }
}
#comfirm {
  height:r(80);
  line-height: r(80);
  width: 90%;
  background: #b79448;
  color: white;
  margin: r(40) auto;
  border-radius:r(10);
  text-align:center;
  font-size: r(32);
}
</style>
<template>
<div class='code_form'>
  <div class='msg'><span>已发送验证码到您的手机</span></div>
  <div class='input'>
    <input class='yz_code'
           type='number'
           :value="idCode"
           placeholder='输入验证码'
           @input='codeInput($event)'
    />
    <div class='get_btn' v-show='time <= 0' @click.stop='getCode'>重新获取</div>
    <div class='get_btn_disabled' v-show='time > 0'>{{time}}s后获取</div>
  </div>
  <div class='input'>
    <input class='input_item'
           type='password'
           :value="password"
           maxlength='20'
           placeholder='输入密码(6-20位,请使用字母或者数字)'
           @input='passwordInput($event)'
    />
  </div>
  <div id='comfirm' @click.stop="submit">确定</div>
</div>
</template>
<script>
import userManager from '@/api/user-manager';
export default {
  name: 'IdentifyCode',
  data() {
    return{
      pageTitle:'找回密码',
      //是否是注册
      register: false,
      //手机号
      mobile: null,
      // 密码
      password: null,
      // 验证码
      idCode: null,
      //倒计时
      time: 60,
      layerIndex:null,
      // code
      mp_code:null,
    }
  },
  created: function(){
    this.mp_code=userManager.getMpcode()
  },
  mounted:function() {
    var options=this.$route.query
    if(options.register=='true'){
      this.register = true
      this.pageTitle='手机号注册'
    } else {
      this.register = false
      this.pageTitle='找回密码'
    }
    this.mobile = options.mobile
    document.title=this.pageTitle
    this.countDown()
  },
  methods: {
    codeInput(e){
      this.idCode=e.target.value
      if(this.idCode.length>4){
        this.idCode=this.idCode.slice(0,4)
      }
    },
    passwordInput(e){
      this.password=e.target.value
      if(this.password.length>20){
        this.password=this.password.slice(0,20)
      }
    },
    //倒计时
    countDown() {
      let timer = setInterval(() => {
        if (this.time <= 0) {
          clearInterval(timer);
        }
        this.time -= 1;
      }, 1000);
    },
    getCode() {
      this.layerIndex=layer.load(1, {shade: false})
      this.$http
        .getRequest(this.$conster.API_URL.GET_YZ_CODE, {
          mobile: this.mobile
        })
        .then(data => {
          layer.close(this.layerIndex)
          this.time = 60
          this.countDown()
        })
        .catch(err => {
          layer.close(this.layerIndex)
          layer.msg(err.errmessage)
        })
    },
    submit() {
      if (!this.idCode || this.idCode.length < 4) {
        layer.msg('请填写4位验证码');
        return false;
      }
      if (!this.password || this.password.length < 6) {
        layer.msg('密码请至少填写6位');
        return false;
      }
      if (/[\u4e00-\u9fa5]+|\s+/.test(this.password)) {
        layer.msg('密码不合法,请填写数字、字母、下划线');
        return false;
      }
      let url=this.register ? this.$conster.API_URL.REGISTER : 
                              this.$conster.API_URL.MODIFY_PWD;
      this.layerIndex=layer.load(1, {shade: false})
      this.$http
        .getRequest(url, {
          mobile: this.mobile,
          password: this.password,
          code: this.idCode
        })
        .then(data => {
          // userManager.logout()
          // this.$myRouter.redirectTo({ path: 'mobileLogin' },this);
          this.submitSuccsee()
        })
        .catch(err => {
          layer.close(this.layerIndex)
          layer.msg(err.errmessage)
        });
    },
    submitSuccsee(){
      userManager
        .loginByMobile(this.mobile, this.password, this.mp_code)
        .then(data => {
          layer.close(this.layerIndex)
          this.$myRouter.redirectTo({path: 'index'},this)
        })
        .catch(err => {
          layer.close(this.layerIndex)
          layer.msg(err.errmessage);
        });
    },
  }
}
</script>

