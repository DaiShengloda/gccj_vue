<style lang="scss">
@import "../../sass/pages/userCenter/bossMail";
</style>
<template>
<div class="bossMail">
	<div class="user-msg">
		<div class="msg-name">
			<div class="name-txt">您的姓名</div>
			<input type="text" 
				   placeholder="请输入您的姓名" 
				   class="name-input"
				   v-model="plainName"/>
		</div>
		<div class="msg-phone">
			<div class="phone-txt">联系方式</div>
			<input type="number"
				   placeholder="请输入手机号方便我们联系您" 
				   class="phone-input"
				   @input.stop="inputPhone"
				   v-model.number="plainPhone"/>
		</div>
	</div>
	<div class="plain-cont">
		<div class="cont-title">投诉内容</div>
		<textarea class="cont-area"
				  placeholder="请详细描述您的问题或意见"
				  v-model="plainCont">	
		</textarea>
	</div>
	<div class="mail-bom">
		<div class="bom-btn"
			 @click.stop="submit">提交</div>
		<div class="bom-txt">我们将在24小时内对您的问题进行反馈</div>
	</div>
	<div class="plain-process">
		<img class="process-img" src="/static/images/plainImg.png"/>
	</div>
</div>
</template>
<script>
export default {
	name: 'BossMail',
	data(){
		return{
			plainName: null,
			plainPhone: null,
			plainCont: null,
			layerIndex: null,
		}
	},
	methods: {
		inputPhone(e) {
			let v = e.currentTarget.value
			if(v.length>11) {
				v = v.slice(0,v.length-1)  
				this.plainPhone = v
			}
		},
		submit() {
			var that = this;
			if (!this.plainName){
				layer.msg('请输入姓名')
				return false
			}
			if (!this.$tool.regular().isName(this.plainName)){
				layer.msg('请输入正确的姓名')
				return false
			}
			if (!this.plainPhone){
				layer.msg('请输入手机号')
				return false
			}
			if (!this.$tool.regular().isPhone(this.plainPhone)) {
		    	layer.msg('请输入正确的手机号')
		        return false
		    }
		    if (!this.plainCont){
				layer.msg('请输入投诉内容')
				return false
			}
			this.$http.getRequest(this.$conster.API_URL.Mailbox, {
				userName: this.plainName,
				telphone: this.plainPhone,
				sourceType: 2,
				descript: this.plainCont
			}).then(data => {
				console.log(data);
				layer.msg("您反馈的问题我们已收到，稍后会有专属客服与您联系！");
				setTimeout(function(){
					that.$router.go(-1)
				},1000)
			});
		}
	}
}
</script>