<style lang="scss">
    @import '../../../sass/pages/detail/reportDetail';
</style>
<template>
<div class="report-detail">
    <div class="detail-cont">
        <div class="cont-title">{{reportDetail.title}}</div>
        <div class="cont-msg">
            <div class="msg-lef">
                <span class="msg-name">{{reportDetail.author}}</span>
                <span class="msg-com">{{reportDetail.company}}</span>
            </div>   
            <div class="msg-time">{{reportDetail.createTime}}</div>
        </div>
        <div class="cont-guide">{{reportDetail.guide}}</div>
        <div class="cont-btn" 
             v-if="reportDetail.authority==0" 
             @click.stop="toAction(reportDetail.remindAction)">
             {{reportDetail.remindTxt}}
        </div>
        <div class="cont-sum"
             v-else
             v-html="reportDetail.summary">
        </div>
        <div class="cont-dec">{{reportDetail.contentDeclare}}</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'ReportDeatil',
    data(){
        return{
            // 研报详情
            reportDetail:'',
            // 研报id
            _id:'',
            layerIndex:null,
        }
    },
    created: function(){
        this._id=this.$route.query.id
        this.layerIndex=layer.load(1, {shade: false}) 
        this.loadReportDetail(this._id)     
    },
    methods:{
        loadReportDetail(id){
            this.$http.getRequest(this.$conster.API_URL.REPORT_DETAIL, {
                id: id
            }).then(data => {
                this.reportDetail=data
                this.formatData(this.reportDetail)   
                layer.close(this.layerIndex)
            }).catch(err=>{
                layer.close(this.layerIndex)
            })
        },
        // 处理时间戳
        formatData(data){
            var time = data.createTime
            time = this.$filter.formatTimeLocal(time)
            data.createTime = time
        },
        // 开通权限按钮
        toAction(action){
            this.$myRouter.navigateTo({path:action},this)
        },
    }
}
</script>