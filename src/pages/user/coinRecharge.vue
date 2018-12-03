<style lang='scss' scoped>
.coinRecharge {
  height: 100%;
  background: #fff;
  min-height: 100vh;
  .iosPay{
    width: r(694);
    height: r(1018);
    margin:  r(40) auto;
    img{
      width: 100%;
      height:100%;
    }
  }
  .kfcz{
    max-width: r(850);
    width: 100%;
    position: fixed;
    bottom: r(0);
    color: #fff;
    button{
       width: 100%;
       color: #fff;
       height:r(100);
       background-color: #b79448; 
       border-radius: 0;
    }
  }
}
.coinRecharge .header {
  height: r(120);
  background: #fff;
  padding: 0 r(30);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #000;
  border-bottom: 1px solid #e6e6e6;
  .item {
    display: flex;
    align-items: center;
    img {
      width: r(40);
      height: r(45);
      margin-right: r(15);
    }
    .czjl {
      width: r(50);
      height: r(50);
      margin-right: r(8);
    }
    .coin-log{
      color:#000;
    }
  }
}
.coinRecharge .fg {
}
.coinRecharge .main {
  padding: r(30);
  background: #fff;
  .title {
    font-size: 16px;
  }
  .content {
    display: flex;
    flex-flow: row wrap;
    width: r(700);
    .rec_item {
      border: 1px solid #dadada;
      border-radius: 5px;
      text-align: center;
      width: r(200);
      margin: r(20) r(15);
      padding: r(20) 0;
      .coin {
        display: block;
        font-size: r(32);
      }
      .price {
        font-size: r(26);
        color: #666;
      }
      .red{
        color: #b79448;
      }
    }
    .click {
      border: 1px solid #b79448;
      color: #b79448 !important;
    }
    .red {
      color: #b79448;
    }
  }
  .ads {
    font-size: 12px;
    color: #666;
    display: flex;
    margin: r(20) 0;
  }
}

.cover {
  max-width: r(850);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 100;
}

#dialog {
  width:100%;
  max-width: r(850);
  width: 100%;
  height: 80%;
  z-index: 2;
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 101;
  .title {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding: r(20) 0;
    font-size: 18px;
    position: relative;
  }
  .close {
    position: absolute;
    left: r(30);
    top: 50%;
    transform: translate(0, -50%);
    width: r(50);
    height: r(50);
  }
  .pay_info {
    padding: 0 r(30);
    .total {
      text-align: center;
      font-size: 30px;
      padding: r(40);
    }
    .pay_item {
      padding: r(20) 0;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      .l {
        color: #929292;
      }
    }
  }
  .mz {
    font-size: 16px;
    margin: 20px 10px;
    display: block;
  }
  .pay_btn {
    max-width:r(765);
    width: 90%;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: r(100);
    color: #fff;
    font-size: 17px;
    height:r(80);
    border-radius: r(10);
  }
  .dis {
    background: #ccc;
  }
  .active {
    background: #b79448;
  }
}
</style>
<template>
  <div class='coinRecharge'>
    <div class='header'>
      <div class='item'>
        <img src='/static/images/my_spent_money.png'/>
        <span>牛币余额: {{coin}}</span>
      </div>
      <div class='item'>
        <img class="czjl" src='/static/images/czjl.png'/>
        <router-link to='/user/coinRechargeLog' class="coin-log">充值记录</router-link>
      </div>
    </div>
    <!--分割线-->
    <div class='fg'></div>
    <div class='main'>
      <span class='title'>充值推荐</span>
      <div class='content'>
        <div v-for="item in recommend"
            :class="['rec_item', {'click':selected.id==item.id}]" 
            @click.stop='confirmPayFun(item)'>
          <span class='coin'>{{item.standardRecharge}}牛币</span>
          <span :class="['price',{'red':selected.id==item.id}]">售价 {{item.paymentRecharge}}元</span>
        </div>
      </div>
      <div class='ads'>
        <div style='width:100px'><span>温馨提示:</span></div>
        <div><span>{{notice}}</span></div>
      </div>
    </div>
    <div class='cover' v-show='confirmPay'></div>
    <!--充值弹窗-->
    <div id='dialog' v-show='confirmPay'>
      <div class='title'>
          <img class='close' @click.stop='closeConfirm' src='/static/images/close2.png'/>
          <span>确认支付</span>
      </div>
      <div class='pay_info'>
        <div class='total'><span>￥{{selected.paymentRecharge}}</span></div>
        <div class='pay_item'>
          <span class='l'>支付信息</span>
          <span class='r'>牛币充值</span>
        </div>
        <div class='pay_item'>
          <span class='l'>支付方式</span>
          <span class='r'>微信支付</span>
        </div>
      </div>
      <label class='mz' for='ck' @click.stop='checkRule'>
        <input type="checkbox" 
               :checked='isReadRule' 
               id='ck'/>
        <div style='display:inline'>我已认真阅读并签署《<span style='color:#e93030' @click.stop='toFxjjs'>风险揭示书</span>》</div>
      </label>
      <button v-if="isReadRule" class="pay_btn active" @click.stop='pay'>立即支付</button>
      <button v-else class='pay_btn dis' @click.stop='notAgree'>立即支付</button>
    </div>
    <he-gui ref="hegui"></he-gui>
  </div>
</template>
<script>
import userManager from '@/api/user-manager';
import HeGui from '@/components/hegui';
export default {
  name: 'CoinRecharge',
  components: {
    HeGui
  },
  data() {
    return{
      //牛币数量
      coin: 0,
      //推荐充值列表
      recommend: null,
      //温馨提示
      notice: '',
      //是否显示确认弹窗
      confirmPay: false,
      //是否阅读使用条款
      isReadRule: false,
      //选中的额度
      selected: {},
      layerIndex:null,
      openid:'',
    }
  },
  created: function() {
    var self=this
    this.openid=localStorage.getItem('openid')
    this.layerIndex=layer.load(1, {shade: false}) 
    //获取推荐额度
    this.$http
      .getRequest(this.$conster.API_URL.RECHARGE_RECOMMEND, {
        type: 1
      })
      .then(data => {
        self.recommend = data.list;
        self.activity = data.activity;
        self.notice = data.notice;
        layer.close(self.layerIndex)
      });
  },
  mounted: function() {
    this.$http.getRequest(this.$conster.API_URL.WX_PUBLIC,{
        url:encodeURIComponent(document.URL)
    }).then(wx.config);
    wx.error(function () { errorAlert('抱歉,签名校验失败啦') })
    this.getCoin()
     //合规
    this.requireHegui() 
  },
  methods: {
    //合规
    async requireHegui() {
      this.layerIndex=layer.load(1, {shade: false}) 
      var data = await userManager.getUserDetail()
      //是否风险测评
      var answerResult = JSON.parse(data.answerResult);
      //是否登记
      var registration = data.isRegistration == 1;
      var hgStatus=this.$conster.hgStatus
      var status = hgStatus.NO_SHOW;
      //是否风险测评
      var answer =
        answerResult &&
        answerResult.answer_result &&
        answerResult.answer_result.level >= 0;
      if (!registration && !answer) {
        status = hgStatus.NO_ALL;
      } else if (!registration) {
        //未登记
        status = hgStatus.NO_REGISTRATED;
      } else if (!answer) {
        //未风险测评
        status = hgStatus.NO_ANSWER;
      } else {
        //合规完成可充值
        status = hgStatus.NO_SHOW;
      }
      layer.close(this.layerIndex)
      if (status != hgStatus.NO_SHOW) {
        this.$refs.hegui.startHeguiForRecharge(status)
      }
    },
    //获取牛币余额
    getCoin() {
      var self=this
      this.$http.getRequest(this.$conster.API_URL.QUERY_COIN).then(data => {
        self.coin = data;
      });
    },
    //点击推荐,弹出确认框
    confirmPayFun(item) {
      this.confirmPay = true;
      this.selected = item;
    },
    //关闭确认框
    closeConfirm() {
      this.confirmPay = false;
    },
    //点击使用条款
    checkRule() {
      this.isReadRule = !this.isReadRule;
    },
    //点击使用
    async pay(e) {
      var self = this
      //商品id
      var id = this.selected.id;
      this.$http.getRequest(this.$conster.API_URL.PAYMENT_ORDER, {
          productId: id,
          type: 'GOODS', // MAIN_PRODUCT--产品  GOODS--牛币
          source: 'WX_MP', //公众号
          openid: this.openid,
      }).then(response=>{
        var param = response;
        param.timestamp = response.timeStamp;
        param.success = function (resp) {
          // alert('success')
          self.paymentBack(param.outTradeNo,id)
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
      this.confirmPay = false;
      layer.close(this.layerIndex)
    },
    paymentBack(outTradeNo,id) {
      var self = this
      this.layerIndex=layer.load(1, {shade: false}) 
      this.$http.getRequest(this.$conster.API_URL.PAYMENT_BACK, {
        outTradeNo: outTradeNo,
      }).then(data => {
        layer.close(self.layerIndex)
        layer.msg('充值成功')
        self.getCoin()
      }).catch(err => {
        layer.close(self.layerIndex)
        layer.msg(err.errmessage);
      })
    },
    notAgree() {
      layer.msg('请勾选声明');
    },
    //跳转风险揭示书
    toFxjjs() {
      var src = this.$conster.domain+'/api/business/riskProtocolHtml.do?name=fxjss'
      src = 'webview?src='+encodeURIComponent(src)
      this.$myRouter.navigateTo({path:src},this)
    },
  },
}
</script>

