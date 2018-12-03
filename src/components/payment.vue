<style lang="scss">
@import '../sass/components/payment';
</style>
<template>
<div class="ponent">
  <div class="payment"  v-show="showPonent" @click.stop="hide">
      <div class="pay-box" @click.stop="preventHide">
          <div class="pay-top">
              <div class="top-close" @click.stop="hide">
                  <img class="close-img" src="/static/images/close2.png"/>
              </div>
              <div class="top-title">确认支付信息</div>
          </div>
          <div class="pay-mid">
              <div class="mid-cont">
                  <div class="cont-title">支付内容:</div>
                  <div class="cont-sum">
                      <slot name="payCont"></slot>
                  </div>
              </div>
              <div class="mid-price" v-if="vipType==1">
                  <div class="price-title">
                      <span class="title-black">牛币支付:</span>
                      <router-link class="title-red" 
                                   to='/user/coinRecharge' 
                                   v-if="!enough">
                                   牛币余额不足去充值>
                      </router-link>
                  </div>
                  <div class="price-sum">
                      <slot name="payNum"></slot>牛币
                      <div class="balance">
                          <span class="bal-word">余额:</span>
                          <span class="bal-num">{{balance}}</span>
                      </div>
                  </div>
                  <input type="radio" 
                         class="price-radio" 
                         :value="checked" 
                         :disabled="!enough" 
                         :checked="checked" 
                         @click.stop="togCheck()"/>
              </div>  
              <div class="mid-price" v-if="vipType==2">
                  <div class="price-title">
                      <span class="title-black">
                        <slot name="vipPayNum"></slot>支付:
                      </span>
                  </div>
                  <div class="price-sum">
                      免费
                      <div class="balance">
                          <span class="bal-word">
                            <slot name="vipExpireNum"></slot>
                          </span>
                          <span class="bal-num">天后过期</span>
                      </div>
                  </div>
                  <input type="radio" 
                         class="price-radio" 
                         :value="checked" 
                         :disabled="false" 
                         :checked="checked" 
                         @click.stop="togCheck()"/>
              </div>    
          </div>
          <div class="pay-bom">
              <div class="bom-text">
                  <span>注:已付费的产品和内容，不会重复扣费</span>
              </div>
              <div v-if="vipType==2" 
                   :class="['bom-submit', {'active':checked}]" 
                   @click.stop="pay">
                确定
              </div>
              <div v-else-if="enough" 
                   :class="['bom-submit', {'active':checked}]" 
                   @click.stop="pay">
                确定
              </div>
              <div v-else class="bom-submit" @click.stop="recharge">
                余额不足，请先充值
              </div>
          </div>   
      </div>  
  </div>
  <he-gui @finish='finishHeGui' ref="hegui"/> 
</div>
</template>
<script>
/**
 * 支付方式：牛币、vip支付组件  
 * 支付对象：笔记、系列课程、精品课程
 */
import userManager from '@/api/user-manager';
import HeGui from '@/components/hegui'
export default {
  name: 'Payment',
  data() {
    return{
      showPonent: false,
      //用户余额
      balance: 0,
      // 支付按钮状态
      checked: true,
      //是否足够支付
      enough: true,
      //需要支付金额
      payNum:null,
      certCode:null,
      // 用户是否是vip
      isVip:1,
      vip_expire_date:null,
      layerIndex:null,
    }
  },
  computed:{
  },
  components: {
    HeGui,
  },
  props: {
    // 支付接口
    payUrl: String,
    // 参数
    payParam: {},
    //支付方式
    vipType: Number,
  },
  methods: {
    // 确认支付
    pay(e) {
      var self=this
      if (!this.checked) return;
      this.payParam.type=this.vipType
      this.layerIndex=layer.load(1, {shade: false}) 
      this.$http
        .getRequest(this.payUrl, this.payParam)
        .then(data => {
          //关闭加载框
          layer.close(self.layerIndex)
          //提示成功
          layer.msg('支付成功', {icon: 1})
          //将返回数据传个父页面
          let s = localStorage.getItem('hg_cert_code');
          if (s) {
            s = s + ',' + self.certCode;
          }else{
            s = self.certCode;
          }
          localStorage.setItem('hg_cert_code', s)
          self.$emit('payCallBack', data)
          self.showPonent = false
          self.checked = false
        })
        .catch(error => {
          layer.close(self.layerIndex)
          layer.msg('支付失败', {icon: 2})
          self.showPonent = false;
          self.checked = false;
        })
    },
    //跳转充值
    recharge() {
      this.$myRouter.navigateTo({ path: 'coinRecharge' },this);
    },
    /**
     * paySum 支付金额
     * dkId 大咖id
     * certCode 大咖证书编号
     */
    show(paySum, dkId, certCode,callback) {
      localStorage.setItem('payCoinNum',paySum)
      this.payNum = paySum
      this.certCode=certCode
      this.checkUserVip()
      this.$refs.hegui.startHeguiForDaka(dkId, certCode)
    },
    // 隐藏组件
    hide() {
      this.showPonent = false
      this.checked = false
    },
    // 阻止向上冒泡
    preventHide() {
      return false
    },
    // 单选框切换状态
    togCheck() {
      var n = this.checked;
      this.checked = n ? false : true;
    },
    // 充值
    toCoinRecharge() {
      this.$myRouter.navigateTo({ path: `coinRecharge` },this);
    },
    //合规结束
    finishHeGui() {
      this.queryCoin(this.payNum);
    },
    //同意支付
    agreeRule(){
      this.payNum=localStorage.getItem('payCoinNum')
      this.$myRouter.navigateBack({delta:1},this);
      this.queryCoin(this.payNum);
    },
    queryCoin(paySum) {
      var self=this
      this.layerIndex=layer.load(1, {shade: false}) 
      // 获取用户牛币余额
      this.$http
        .getRequest(this.$conster.API_URL.QUERY_COIN, {})
        .then(data => {
          layer.close(self.layerIndex)
          paySum=parseFloat(paySum)
          data=parseFloat(data)
          //余额不足 提示充值
          if (paySum > data) {
            self.enough = false
            self.checked = false
          }else{
            self.enough = true
            self.checked = true
          }
          if(self.isVip==2){
            self.checked = true
          }
          self.showPonent = true
          self.balance = data
        })
        .catch(err => {
          layer.close(self.layerIndex)
        })
    },
    checkUserVip(){
      this.isVip=this.payParam.type
    },
  }
}
</script>