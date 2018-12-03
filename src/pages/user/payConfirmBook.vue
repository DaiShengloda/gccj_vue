<!--支付确认书-->
<style lang='scss' scoped>
page {
  background: #fff;
}
.w {
  width: 100%;
  margin: 0 auto;
  height: 100%;
}
.w .top_title {
  font-size: 16px;
  text-align: center;
  padding: 30px 0 30px;
}
.w .top_title .jg {
  font-size: 18px;
  font-weight: bold;
  color: #e92e30;
}
.w .md_tab {
  border: 1px solid #dadada;
  border-right: 0;
  border-bottom: 0;
  margin: 0 20px;
  color: #333;
  font-size: 14px;
}
.w .md_tab .row {
  display: flex;
  // justify-content: space-between;
  .width25 {
    width: 25%;
  }
  .width35 {
    width: 35%;
  }
  .width20 {
    width: 15%;
  }
}
.w .md_tab .row div {
  padding: 5px;
  border-bottom: 1px solid #dadada;
  border-right: 1px solid #dadada;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 18px;
    height: 18px;
  }
  overflow: scroll;
}
.w .md_jsy {
  border-top: 1px solid #efefef;
  font-size: 15px;
  margin: 20px 0 0;
  padding: 10px 20px;
  line-height: 1.8;
  color: #666;
}
.color-black {
  color: black;
}
.color-red {
  color: red;
}
.font13 {
  font-size: 13px;
}
.text-indent2 {
  text-indent: 2em;
}
.text-underline {
  text-decoration: underline;
}
.w .bottom_fix {
  -webkit-appearance: none;
  border-top: 1px solid #efefef;
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  padding: 0 20px;
  max-width: 600px;
  overflow: hidden;
  box-sizing: border-box;
  height: 170px;
  .rule {
    display: flex;
    font-size: 14px;
    line-height: 1.6;
    margin: 10px 0 0;
  }
  .pay_btn {
    border: none;
    background: #e92e30;
    color: #fff;
    display: block;
    padding: 10px 0;
    font-size: 18px;
    text-align: center;
    margin: 10px 0;
    width: 100%;
    border-radius: 5px;
  }
  .disable-btn {
    background: #666;
  }
}
.pop-bac {
  max-width: r(850);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.8);
  z-index: 999;
}
.pop-bac .pop-c {
  width: 90%;
  height: 80%;
  margin: 0px auto;
  background: rgba($color: #fff, $alpha: 1);
  z-index: 1000;
  padding: 0 10px;
  box-sizing: border-box;
}
.pop-bac .pop-c .header {
  text-align: center;
  font-size: 18px;
  line-height: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .close {
    float: right;
    width: 20px;
    height: 20px;
  }
  .left {
    width: 10%;
  }
  .left img {
    width: r(60);
    height: r(60);
  }
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.pop-bac .pop-c .body {
  max-height: 85%;
  font-size: 15px;
  overflow: scroll;
  .item {
    background: #efefef;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
    line-height: 1.6;
    .link {
      font-size: 13px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    .left {
      width: 10%;
      overflow: hidden;
    }
    .left img {
      width: r(60);
      height: r(60);
    }
    .right {
      width: 90%;
    }
  }
  overflow-x: hidden;
}
</style>
<template>
<div class='w'>
  <div class='top_title'>
    适当性匹配结果:
    <span class='jg'>
      <span v-if='answerResult.isMatch == 0'>不匹配</span>
      <span v-else>匹配</span>
    </span>  
  </div>
  <div class='md_tab'>
      <div class='row'>
        <div class='width25'></div>
        <div class='width35'>客户</div>
        <div class='width25'>服务</div>
        <div class='width20'>匹配</div>
      </div>
      <div class='row'>
        <div class='width25'>风险等级</div>
        <div class='width35'>{{answerResult.levelName}}</div>
        <div class='width25'>中高风险</div>
        <div class='width20'>
          <img v-if='answerResult.level_match == 1' src="/static/images/ok_ico01.png"/>
          <img v-else src="/static/images/no_ico02.png"/>
        </div>
      </div>
      <div class='row'>
        <div class='width25'>投资期限</div>
        <div class='width35'>{{answerResult.qx}}</div>
        <div class='width25'>短期</div>
        <div class='width20'>
          <img src="/static/images/ok_ico01.png"/>
        </div>
      </div>
      <div class='row'>
        <div class='width25'>投资品种</div>
        <div class='width35'>{{answerResult.pz}}</div>
        <div class='width25'>权益类</div>
        <div class='width20'>
          <img v-if='answerResult.pz_match == 1' src="/static/images/ok_ico01.png" />
          <img v-else src="/static/images/no_ico02.png" />
        </div>
      </div>
  </div>


  <div class="md_jsy">
    <div v-if='answerResult.isMatch==0'>
      <div class="color-black">产品或服务不适当警示书</div>
      <div class="font13" style="margin-bottom: 30px;">
        <div>
          尊敬的投资者(姓名/名称:{{answerResult.userName}};
          平台ID:{{answerResult.userId}}):
        </div>
        <div>您拟投资的产品或拟申请的服务,存在以下情形:</div>
        <div class="text-indent2">
          您拟接受的投顾服务,
          其风险等级为
          <span class="color-red">中高风险</span>,
          与您的风险承受能力等级{{answerResult.levelName}}
          <span v-if='answerResult.level_match==1'>一致</span>
          <span v-else>不一致</span>;
          其投资期限为
          <span class="color-red">短期</span>,
          与您预期的投资期限{{answerResult.qx}}一致;
          其投资品种为
          <span class="color-red">权益类</span>,
          与您预期的投资品种{{answerResult.pz}}
          <span v-if='answerResult.pz_match==1'>一致</span>
          <span v-else>不一致</span>。
          投资该产品/申请该项服务，可能产生超出您的风险承受能力之外的损失。
        </div>
        <div class="text-indent2">
          本公司就上述情况向您提出警示，并建议您关注该产品或服务的特征及风险，审慎作出投资决策。
        </div>
      </div>
      <div style='width:100%;border:1px solid #ccc;margin-top:20px'></div>
      <div class="font13">
          <div class="text-indent2 color-black">
            本人已认真阅读了贵司的相关提示,
            并已充分了解该产品或服务的特征和风险，充分知悉上述不匹配情况。
          </div>
          <div class="text-indent2 color-black">
            本人经审慎考虑后，仍坚持投资该项产品或接受服务，
            并愿意承担投资该项产品或接受服务可能引起的损失和其他后果。
            投资该项产品或接受服务的决定，系本人独立、自主、
            真实的意思表示，与贵公司、贵营业部及相关从业人员无关。
          </div>
      </div>
    </div>
    <div v-else>
      <div>
        尊敬的投资者（姓名/名称:{{answerResult.userName}};
        平台ID:{{answerResult.userId}}）：
      </div>
      <div class="text-indent2">
        本公司已经向您充分揭示了您所接受的投顾服务的风险。您的风险等级、拟投资期限、
        投资品种等投资目标与您接收服务的风险等级、投资期限、投资品种相匹配。
        本适当性评估意见供您决策参考，并不代表本公司对上述服务的风险或收益作出实质性判断和保证。
      </div>
      <div class="text-indent2">
        本公司就上述适当性评估结果与您进行确认，
        并建议您审慎考察该服务的特征及风险，进行充分风险评估，自行作出投资决定。
      </div>
      <div style="margin: 10px 0;height:0px;border-top:1px solid #ccc"></div>
      <div class="text-indent2">
        本人已认真阅读了贵司的风险揭示书，
        并已充分了解该产品或服务的特征和风险，签署了风险揭示书。
      </div>
      <div class="text-indent2">
        本人在此确认自身风险等级、拟投资期限、投资品种等投资目标与接收服务的风险等级、投资期限、投资品种相匹配。
      </div>
      <div class="text-indent2 color-black">
        本人投资该产品或接受该服务的决定系本人独立、自主、
        真实的意思表示，与贵公司、贵营业部及相关从业人员无关。
      </div>
    </div>
    <!-- <div style='text-align:right' class='color-black'>
      <div>投资者签名:{{answerResult.userSign}}</div>
      <div>日期:{{answerResult.currDate}}</div>
    </div> -->
  </div>
  <div style='height:170px'></div>
  <div class="bottom_fix">
    <div class='rule' for='ck'>
      <div>
        <input type="checkbox" color='red' id='ck'  @click.stop='agreeRule'/>
      </div>
      <div>
        我阅读并同意《<span class='color-red text-underline' @click.stop='toFxjjs'>深圳市国诚投资咨询有限公司投顾产品服务风险揭示书</span>》。
        本次签署默认与平台全部投顾签署服务协议《<span class='color-red text-underline' @click.stop='lookDaKa'>投顾产品服务协议</span>》
      </div>
    </div>
    <div :class="['pay_btn', {'disable-btn':!isAgree}]" @click.stop='confirm'>确认并立即支付</div>
  </div>
</div>
</template>
<script>
import userManager from '@/api/user-manager';
export default {
  name: 'payConfirmBook',
  data() {
    return{
      answerResult: {},
      isAgree: false,
      layerIndex:null,
      // 大咖id
      bignameId: null,
    }
  },
  mounted: async function() {
    var self=this
    var options=this.$route.query
    this.bignameId = options.bignameId
    this.layerIndex=layer.load(1, {shade: false}) 

    this.$http
      .getRequest(this.$conster.API_URL.FXCP_RESULT, {
        bignameId: options.bignameId
      })
      .then(data => {
        self.answerResult = data
        layer.close(self.layerIndex)
      })  
  },
  methods: {
    agreeRule() {
      this.isAgree = !this.isAgree;
    },
    async confirm() {
      if (!this.isAgree) {
        layer.msg('请勾选声明');
        return false;
      }
      this.$myRouter.observer(this.$route,this) 
    },
    //跳转风险揭示书
    toFxjjs() {
      let userInfo = userManager.getLocalUserInfo();
      let src = `${this.$conster.domain}/api/business/riskProtocolHtml.do?name=fxjss&userid=${
          userInfo.userid 
      }`;
      src = encodeURIComponent(src);
      this.$myRouter.navigateTo({ path: 'webview?src=' + src },this);
    },
    //查看全部大咖
    lookDaKa() {
      let src = `${this.$conster.domain}/api/business/riskProtocolHtml.do?name=syxy&bignameId=${
          this.bignameId
      }`;
      src = encodeURIComponent(src);
      this.$myRouter.navigateTo({ path: 'webview?src=' + src },this);
    },
  },
}
</script>

