<style lang="scss">
    @import '../../sass/pages/vipBook';
</style>
<template>
<div class="book-detail" 
     v-if="bookDetail.authority==1"
     @touchstart.stop="touchStart($event)">
    <div class="detail-cont"> 
        <div class="cont-msg-blank"></div>
        <div class="cont-msg">
            <div class="cont-title" 
                 v-if="bookDetail.title&&bookDetail.title!=' '">
                {{bookDetail.title}}
            </div>   
            <div class="cont-title" v-else>VIP内参</div> 
            <div class="msg-time">{{bookDetail.createTime}}</div>
        </div>
        <div class="cont-guide" 
             v-if="bookDetail.summry&&bookDetail.summry!=' '">
            {{bookDetail.summry}}
        </div>
        <div class="cont-sum"
             v-html="bookDetail.content">
        </div>
        <div class="cont-dec-blank" 
             :style="{'height':blankHeight+'px'}"></div>
        <div class="cont-dec" ref="dec">{{bookDetail.contentDeclare}}</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'VipBook',
    data(){
        return{
            // 内刊详情
            bookDetail:{},
            layerIndex:null,
            blankHeight:0,
        }
    },
    created: function(){
        this.layerIndex=layer.load(1, {shade: false}) 
        this.loadBookDetail()     
    },
    methods:{
        loadBookDetail(){
            var self=this
            this.$http.getRequest(this.$conster.API_URL.DAILY_POINT)
            .then(data => {
                this.bookDetail=data
                this.formatData(this.bookDetail)   
                layer.close(this.layerIndex)
                this.checkVip()
            }).catch(err=>{
                layer.close(this.layerIndex)
            })
        },
        // 处理时间戳
        formatData(data){
            var time = data.createTime
            time = this.$filter.formatTimestamp(time)
            data.createTime = time
        },
        checkVip(){
            var self=this
            if(this.bookDetail.authority==0){
                this.layerIndex=layer.confirm(this.bookDetail.tips, {
                    closeBtn: 0,
                    title:'提示',
                    area:'8rem',
                    btn: ['确定'] 
                },function(){
                    self.$myRouter.redirectTo({path:'index'},self)
                    layer.close(self.layerIndex)
                })
            }
        },
        touchStart(){
            this.blankHeight=this.$refs.dec.clientHeight
        },
    }
}
</script>