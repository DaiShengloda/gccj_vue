<style lang="scss" scoped>
@import '../../sass/pages/activity/agreement';
</style>
<template>
<div class="agreement">
	<!-- 签署协议 -->
	<div class="agreement-sign">
		<div class="agree-list">
			<div class="list-box"
				 v-for="item in protocolList"
				 @click.stop="doSign(item.templateId)">
				<div class="box-msg">
					<div class="msg-name">{{item.name}}</div>
					<div class="msg-status" v-if="item.status==-1">失效</div>
					<div class="msg-status" v-else-if="item.status==0">未签署</div>
					<div class="msg-status" v-else-if="item.status==1">审核驳回</div>
					<div class="msg-status" v-else-if="item.status==2">审核中</div>
					<div class="msg-status" v-else-if="item.status==3">审核通过</div>
				</div>
				<img class="box-icon" src="/static/images/youjiantou@3x.png"/>
			</div>
		</div>
		<div class="agree-ins">
			采用电子签名签订的协议、风险揭示书、投顾协议具有与纸质协议、纸质风险揭示书同等的法律效应。
		</div>
		<div class="agree-bom" v-if="false">
			<div class="bom-ins">
				<div class="ins-input">
					<div class="input-default" @click.stop="agree" v-if="!agreePro"></div>
					<img class="input-default input-active" 
						 @click.stop="agree" 
						 v-else
						 src="/static/images/choosed.png"/>
				</div>
				<div class="ins-txt">本人已阅读并确认签署以上协议，自愿开通使用电子签名约定权限，并承担由此产生的一切法律后果。
				</div>
			</div>
			<div :class="['bom-btn',{'btn-active':agreePro}]" 
			     @click.stop="btnClick">
				已知晓并同意签署
			</div>
		</div>
	</div>
	<!-- 电子签名 -->
	<div class="ele-sign" v-if="false">
		<div class="sign-lef">
			<div class="lef-txt">请于上方工整的签署您的姓名</div>
			<div class="lef-btns">
				<div class="btn-refresh" @click.stop="refreshSign">重新签名</div>
				<div class="btn-save" @click.stop="saveSign">保存签名</div>
			</div>
		</div>
		<div class="sign-pad">
			<canvas class="ctx"></canvas>
		</div>
	</div>
	<!-- 签约结果 -->
	<div class="sign-result" v-if="false">
		<div class="res-img">
			<img class="img-icon" src="/static/images/sign.png"/>
		</div>
		<div class="res-txt">协议已签约</div>
		<div class="res-ins">
			<span>我们将尽快人工审核，审核通过后将短信通知您服务开通。</span>
			<span>请留意个人中心-签署协议审核结果。</span>
		</div>
	</div>
</div>
</template>
<script>
export default {
  name: 'Agreement',
  data(){
  	return{
  	  // 签约列表
  	  protocolList: [],
  	  // 签约地址
  	  signUrl: null,
	  // 显示签约结果
	  showResult: false,
	}
  },
  mounted: function(){
  	this.loadProList()
  },
  updated: function(){
  	this.$nextTick(function () {
      if(!this.showEleSign)return
	  // this.initCanvas()
	})
  },
  methods:{
  	// 获取签约列表
  	loadProList() {
  	  this.$http.getRequest(this.$conster.API_URL.PROTOCOL_LIST, {})
        .then(data => {
          this.protocolList = data
          this.setPageTitle()
      })
  	},
    setPageTitle(){
      var status = this.protocolList[0].status
      if(status==2||status==3){
        document.title = '查看协议'
      }
    },
  	/**
  	 * [doSign 协议签署]
  	 * @param  templateId [模板id]
  	 * @return [签约链接]
  	 */
  	doSign(templateId) {
  	  this.$http.getRequest(this.$conster.API_URL.PROTOCOL_SIGN, {
  	  	templateId: templateId
  	  }).then(data => {
        this.signUrl = data.signUrl
        this.$myRouter.navigateTo({ path: data.signUrl }, this)
      })
  	},
    // 初始化canvas
  	initCanvas() {
  	  this.canvas=$('.ctx').get(0)
  	  this.canvas.width=this.canvas.clientWidth
  	  this.canvas.height=this.canvas.clientHeight
  	  this.signaturePad = new SignaturePad(this.canvas, {
  		 backgroundColor: '#ffffff'
  	  })
  	},
  	agree() {
  	  var n=this.agreePro
  	  this.agreePro=n?false:true
  	},
  	btnClick() {
      if(!this.agreePro){
  		layer.msg("请勾选确认签署协议")
  		return
  	  }
  	  this.toSign()
  	},
  	// 清空画布
  	refreshSign() {
  		this.signaturePad.clear()
  	},
  	// 保存签名
  	saveSign() {
  	  this.signaturePad.saveAsPNG()
  	  this.toResult()
  	},
  	toSign() {
      this.showAgree=false
  	  this.showEleSign=true
  	  this.showResult=false
  	  document.title='电子签名'
  	},
  	toResult() {
  	  this.showAgree=false
      this.showEleSign=false
  	  this.showResult=true
  	  document.title='签约结果'
  	},
  	draw() {
  	  var ctx = this.canvas.getContext("2d")
      ctx.fillStyle = "rgb(200,0,0)"
      ctx.fillRect (10, 10, 50, 50)
  	}
  },
}
</script>