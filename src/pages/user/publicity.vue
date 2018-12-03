<style lang="scss">
.publicity{
	.user-lists{
		padding:r(20);
		.user-box{
			background: #fff;
			border-radius: r(15);
			color: #000;
			margin-bottom: r(20);
			padding: r(20) r(15);
			.box-name{
				font-size: r(36);
			}
			.box-msg{
				.msg-mid{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding:r(8) 0;
					.mid-bus{
						font-size: r(26);
					}
					.mid-code{
						font-size: r(30);
						color: #b79448;
						font-weight: bold;
					}			
				}
				.msg-bom{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: r(22);
					color: #666;
					.bom-com{
						white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
					}
					.bom-date{
						white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
					}	
				}
			}
		}
	}
	.publicity-bom{
		height: r(80);
		line-height: r(80);
		text-align: center;
		.bom-txt{
			color: #999;
			font-size: r(28);
		}
	}
}
</style>
<template>
<div class="publicity">
	<div class="user-lists">
		<div class="user-box"
			 v-for="item in publicData">
			<div class="box-name">{{item.dkName}}</div>
			<div class="box-msg">
				<div class="msg-mid">
					<div class="mid-bus">{{item.business}}</div>
					<div class="mid-code">{{item.certCode}}</div>
				</div>
				<div class="msg-bom">
					<div class="bom-com">{{item.company}}</div>
					<div class="bom-date">
						证书取得日期:
						<span>{{item.effectiveDate}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="publicity-bom">
		<span v-if="publicData.length>0" class="bom-txt">数据加载完毕</span>
		<span v-else class="bom-txt">暂无数据</span>
	</div>
</div>
</template>
<script>
export default {
	name: 'Publicity',
	data(){
		return{
			publicData:[],
		}
	},
	mounted: function() {
		this.loadPublicData()
	},
	methods: {
		loadPublicData(){
			this.$http.getRequest(this.$conster.API_URL.PUBLICITY, {})
	        .then(data => {
	          this.publicData = data
	          this.formatDate(this.publicData)
	        })
		},
		// 处理时间戳
		formatDate(data){
			var list,time,sign,effectiveDate,expiryDate
		     for (var i in data) {
		        list = data[i];
		        effectiveDate = list.effectiveDate;
		        effectiveDate = this.$filter.formatTimestampToDate(effectiveDate);
		        data[i].effectiveDate = effectiveDate
		        expiryDate = list.expiryDate;
		        expiryDate = this.$filter.formatTimestampToDate(expiryDate);
		        data[i].expiryDate = expiryDate
		     }
		}
	}
}
</script>