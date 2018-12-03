<style lang="scss">
@import '../sass/components/payProduct';
</style>
<template>
  <div>
   <div class='cover' style="background:rgba(0,0,0,0.8)"></div>
    <div id='dialog'>
      <div class='title'>
          <img class='close' @click.stop='closeConfirm' src='/static/images/close2.png'/>
          <span>确认支付</span>
      </div>
      <div class='pay_info'>
        <div class='total'><span>￥{{productPrice}}</span></div>
        <div class='pay_item'>
          <span class='l'>支付信息</span>
          <span class='r'>{{payInfo}}</span>
        </div>
        <div class='pay_item'>
          <span class='l'>支付方式</span>
          <span class='r' v-if="payType=='wx'">微信支付</span>
        </div>
      </div>
      <!-- <label class='mz' for='ck' @click.stop='checkRule'>
        <input type="checkbox" :checked='isReadRule' id='ck'/>
        <div style='display:inline'>我已认真阅读并同意签署
          《<span style='color:#e93030' @click.stop='toCpxy'>国诚投资产品用户电子注册协议</span>》与
          《<span style='color:#e93030' @click.stop='toFxjjs'>风险揭示书</span>》
        </div>
      </label> -->
      <button class='pay_btn active' @click.stop='pay'>立即支付</button>
    </div>
    <he-gui @finish='finish' ref="hegui"></he-gui>
  </div>
</template>
<script>
import userManager from '@/api/user-manager'
import HeGui from '@/components/hegui'
export default {
  name: 'PayProduct',
  components: {
    HeGui
  },
  data(){
    return{
      // 合规状态
      status:0,
      //是否显示确认弹窗
      confirmPay: false,
      //是否阅读支付条款
      isReadRule: false,
      // 产品id
      productId:'',
      // 商品类型
      type:'',
      // 产品价格
      productPrice:'',
      // 支付信息
      payInfo:'',
      // 支付类型
      payType:'',
      // 产品类型
      productType:'',
      // layer
      layerIndex:'',
      //openid
      openid:'',
    }
  }, 
  props: {
    // 支付接口
    payUrl: String,
    // 参数
    payParam: {}
  },
  created: async function(){
    //合规
    await this.requireHegui() 
    this.$refs.hegui.startHeguiForRecharge(this.status)
    this.openid=localStorage.getItem('openid')
  },
  mounted: function(){
    this.$http.getRequest(this.$conster.API_URL.WX_PUBLIC,{
        url:encodeURIComponent(document.URL)
    }).then(wx.config);
    wx.error(function () { errorAlert('抱歉,签名校验失败啦') })
  },
  methods: {
    show(payObj) {
        this.productId=payObj.productId
        this.type=payObj.type
        this.productPrice=payObj.productPrice
        this.payInfo=payObj.payInfo
        this.payType=payObj.payType
        this.productType=payObj.productType
    },
    //合规结束
    finish(data) {
        this.confirmPay = true;
    },
    //关闭确认框
    closeConfirm() {
      this.confirmPay = false;
      this.$myRouter.navigateBack({delta: 1},this)
    },
     //点击支付条款
    checkRule(e) {
      this.isReadRule = !this.isReadRule;
    },
    //点击支付
    pay(){
      var self=this
      // this.$emit('pay-sucess')
      // return     
      
      if(!this.confirmPay){
        this.$refs.hegui.startHeguiForRecharge(this.status)
        return
      }
      //下单
      this.layerIndex=layer.load(1, {shade: false}) 
      this.$http.getRequest(this.$conster.API_URL.PAYMENT_ORDER, {
          productId: this.productId,
          type: this.type, // MAIN_PRODUCT--产品  GOODS--牛币
          source: 'WX_MP', //公众号
          openid: this.openid,
      }).then(response=>{
        var param = response;
        param.timestamp = response.timeStamp;
        param.success = function (resp) {
          // alert('success')
          self.paymentBack(param.outTradeNo)
        }
        param.fail = function (error) {
          alert(JSON.stringify(error))
          layer.alert('充值失败,请检查微信余额是否充足');
        }
        param.cancel = function (cancel) {
          layer.alert('充值失败,支付取消');
        }
        wx.chooseWXPay(param);
      })
      //隐藏弹窗
      layer.close(this.layerIndex) 
    },
    paymentBack(outTradeNo) {
      var self = this
      this.layerIndex=layer.load(1, {shade: false}) 
      this.$http.getRequest(this.$conster.API_URL.PAYMENT_BACK, {
        outTradeNo: outTradeNo,
      }).then(data => {
        layer.msg('提交成功');
        self.$emit('pay-sucess');
      }).catch(err => {
        layer.msg(err.errmessage);
      })
    },
    notAgree(e) {
      layer.msg('请勾选声明');
    },
    //跳转风险揭示书
    toFxjjs() {
      let userInfo = userManager.getLocalUserInfo();
      let src=this.$conster.domain+'/api/business/riskProtocolHtml.do?name=fxjss'
      src = 'webview?src='+encodeURIComponent(src)
      this.$myRouter.navigateTo({path:src},this)
    },
    // 跳转产品协议
    toCpxy() {
      let src=this.$conster.domain+
      '/api/protocol/page.do?category=MAIN_PRODUCT&productId='+this.productId
      src = 'webview?src='+encodeURIComponent(src)
      this.$myRouter.navigateTo({path:src},this)
    },
    async requireHegui() {
      let data = await userManager.getUserDetail();
      //是否风险测评
      let answerResult = JSON.parse(data.answerResult);
      //是否登记
      let registration = data.isRegistration == 1;
      this.status = this.$conster.hgStatus.NO_SHOW;
      //是否风险测评
      let answer =
        answerResult &&
        answerResult.answer_result &&
        answerResult.answer_result.level >= 0;
      if (!registration && !answer) {
        this.status = this.$conster.hgStatus.NO_ALL;
      } else if (!registration) {
        //未登记
        this.status = this.$conster.hgStatus.NO_REGISTRATED;
      } else if (!answer) {
        //未风险测评
        this.status = this.$conster.hgStatus.NO_ANSWER;
      } else {
        //合规完成可充值
        this.status = this.$conster.hgStatus.NO_SHOW;
        // this.status=-3
      }
    },
  },
}
</script>