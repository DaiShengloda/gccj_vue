<style lang='scss'>
.mobile-reg{
  min-height: 100vh;
  height: 100%;
  background: #fff;
  padding-top: r(30);
  .input-div {
    padding: r(0) r(20);
    height: r(100);
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    display:flex;
    align-items:center;
    .icon {
      width: r(52);
      height: r(72);
      display:block;
    }
    input {
      padding-left:r(20);
      border: none;
      max-width:80%;
      width: 80%;
      font-size: r(28);
      float: right;
      height: 100%;
    }
  }
  #yzm_btn {
    width: 90%;
    height:r(80);
    line-height: r(80);
    font-size: 16px;
    background: #b79448;
    color: white;
    margin: r(40) auto;
    border-radius:r(10);
    text-align:center;
  }
}
</style>
<template>
<div class="mobile-reg">
  <div class='input-div'>
    <img class='icon' src='/static/images/sjicon@3x.png'/>
    <input type='text'     
           v-model="mobile"
           placeholder='请输入手机号码'
           adjust-position='true'
           @input='inputMobile($event)'
    />
  </div>
  <div id='yzm_btn' @click.stop='getCode'>获取验证码</div>
</div>
</template>
<script>
import userManager from '@/api/user-manager';
export default {
  name: 'MobileRegister',
  data() {
    return{
      pageTitle:'注册',
      //是否是注册
      register: false,
      mobile: '',
      layerIndex:null,
    }
  },
  created: function(){
    if (this.$route.query.register == 'true') {
      this.register = true;
      this.pageTitle='注册'
    } else {
      this.register = false;
      this.pageTitle='找回密码'
    }   
  },
  mounted: function(){
    document.title=this.pageTitle
  },
  methods: {
    inputMobile(e) {
      if(!this.$tool.regular().isNum(e.target.value)){
        this.mobile=e.target.value!=''?e.target._value:''
      }else{
        this.mobile=e.target.value
      }
      if(!this.mobile)return
      if(this.mobile.length>11){
        this.mobile=this.mobile.slice(0,11)
      }
    },
    checkMobile() {
      var self=this
      return new Promise((resolve, reject)=>{
        $.ajax({
          type: "get",
          url: "/api/user/checkMobile.do",
          // url:'http://gccj.lzyunying.com/api/user/checkMobile.do',
          dataType: 'json',
          data:{mobile:self.mobile},
          xhrFields: {
              withCredentials: true
          },
          success: function (response) {
              resolve(response)
          },
          error: function (error) {
              reject(error)
          }
        })
      })
    },
    async getCode() {
      if (!this.$tool.regular().isPhone(this.mobile)) {
        layer.msg('请输入正确的手机号码')
        return false
      }
      this.layerIndex=layer.load(1, {shade: false})
      let result = null;
      if (this.register) {
        try {
          await this.$http.getRequest(this.$conster.API_URL.CHECK_MOBILE, {
            mobile: this.mobile
          });
        } catch (error) {
          layer.close(this.layerIndex)
          layer.msg(error.errmessage)
          throw error
        }
      }else{
        result=await this.checkMobile()
        if(result.errcode!=104){
          layer.close(this.layerIndex)
          layer.msg('该手机号未注册')
          return
        }   
      }
      try {
        await this.$http.getRequest(this.$conster.API_URL.GET_YZ_CODE, {
          mobile: this.mobile
        });
      } catch (error) {
        layer.close(this.layerIndex)
        layer.msg(error.errmessage)
        throw error;
      }
      layer.close(this.layerIndex)
      this.$myRouter.navigateTo({
        path: `identifyCode?register=${this.register}&mobile=${this.mobile}`
      },this) 
    }
  },
}
</script>

