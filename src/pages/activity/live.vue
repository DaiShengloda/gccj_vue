<style lang="scss" scoped>
.live{
	.live-img{
		width:100%;
	}
}
</style>
<template>
<div class="live">
	<img class="live-img" src="/static/images/zw/live.png"/>
</div>
</template>
<script>
import userManager from '@/api/user-manager';
export default {
	name:'Live',
	data(){
		return{
			// 公众号静默登录code
			mp_code:null,
			openid:null,
			layerIndex:null,
			token:null,
			tips:null,
			url:null,
			// url:"http://zb-test.cf69.com/"  //H5测试直播室链接
			// url:"http://vip.cf69.com/"  //H5正式直播室链接
		}
	},
	created: async function(){
		var openId=localStorage.getItem('openid')
		// openId="oA1fC0vvqSolgLmIBk8gs9_G-DJQ"
		if(!openId){
			this.mp_code=userManager.getMpcode()
		    let result=await userManager.codeToOpenid(this.mp_code)
		    this.openid=result.openId
		} else {
			this.openid=openId
		}
		this.getToken() 
	},
	methods: {
		getToken(){
			this.$http.getRequest(this.$conster.API_URL.GET_TOKEN,{
				deviceId:this.openid
			}).then(data=>{
				this.token=data.token
				this.tips=data.tips
				this.url=data.url
				this.toLive()
			})
		},
		toLive(){
			var self=this
			if(this.url.includes('?')){
				this.url+='&envirType=web_mp'
			}else{
				this.url+='?envirType=web_mp'
			}
			window.location.replace(this.url)
		}
	},
}	
</script>