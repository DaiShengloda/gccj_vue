<style lang='scss'>
.mobileLogin {
  width: 100%;
  padding: r(30) 0;
  background: #fff;
  height: 100%;
  min-height: 100vh;
}
.form {
  width: 100%;
  .border-top {
    border-top: 1px solid #ccc;
  }
  .border-bottom {
    border-bottom: 1px solid #ccc;
  }
  .form-item {
    height: r(120);
    display: flex;
    align-items: center;
    .icon {
      width: r(50);
      height: r(50);
      margin: 0 r(20);
    }
    input {
      height: 90%;
      width: 90%;
      font-size: 16px;
      border: none;
      background: #fff;
      :-moz-placeholder {
        color: #cdcdcd;
      }
      :-ms-input-placeholder {
        color: #cdcdcd;
      }
      ::-webkit-input-placeholder {
        color: #cdcdcd;
      }
    }
  }
  .forget_text {
    text-align: right;
    margin: r(40);
    color: #b79448;
    font-size: 14px;
  }
  .submit_btn {
    width: 90%;
    height: r(80);
    line-height:r(80);
    margin:0 auto;
    background: #b79448;
    color: #fff;
    font-size: 16px;
    border-radius:r(10);
    text-align:center;
  }
}
.to_register {
  text-align: center;
  font-size: 14px;
  text-decoration: underline;
  margin: r(80) 0;
  color: #b79448;
}
</style>
<template>
<div class='mobileLogin'>
  <div class="form">
    <div class='form-item border-top'>
      <img class='icon' src='/static/images/username@3x.png'/>
      <input class='border-bottom'
             type='text'  
             v-model="phoneNum"
             placeholder='请输入手机号'
             style="border-bottom:1px #ccc solid;"
             @input="phoneInput($event)"
      />
    </div>
    <div class='form-item border-bottom'>
      <img class='icon' src='/static/images/password@3x.png'/>
      <input type='password' 
             v-model="password"
             maxlength='20'
             placeholder='请输入密码'
             adjust-position='true'
             @input="passwordInput($event)"
      />
    </div>
    <div class='forget_text'><span @click.stop='forgetPwd'>忘记密码?</span></div>
    <div class='submit_btn' @click.stop="submit">登录</div>
  </div>
  <div class='to_register'>
    <span @click.stop='toRegister'>没有账户?去注册</span>
  </div>
</div>
</template>
<script>
import userManager from '@/api/user-manager';
export default {
  name: 'MobileLogin',
  data() {
    return{
      phoneNum:'',
      password:null,
      // code
      mp_code:null,
      layerIndex:null,   
    }
  },
  created: function(){
    this.mp_code=userManager.getMpcode()
  },
  methods: {
    phoneInput(e){
      if(!this.$tool.regular().isNum(e.target.value)){
        this.phoneNum=e.target.value!=''?e.target._value:''
      }else{
        this.phoneNum=e.target.value
      }
      if(!this.phoneNum)return
      if(this.phoneNum.length>11){
        this.phoneNum=this.phoneNum.slice(0,11)
      }
    },
    passwordInput(e){
      this.password=e.target.value
    },
    submit() {
      if (!this.$tool.regular().isPhone(this.phoneNum)) {
        layer.msg('请填写合法的手机号');
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
      this.layerIndex=layer.load(1, {shade: false})  
      userManager
        .loginByMobile(this.phoneNum, this.password, this.mp_code)
        .then(data => {
          layer.close(this.layerIndex)
          this.$myRouter.observer(this.$route,this)
        })
        .catch(err => {
          layer.close(this.layerIndex)
          layer.msg(err.errmessage);
        });
    },
    forgetPwd() {
      this.$myRouter.navigateTo({path:'mobileRegister?register=false'},this);
    },
    toRegister() {
      this.$myRouter.navigateTo({path:'mobileRegister?register=true'},this);
    },
  }
}
</script>

