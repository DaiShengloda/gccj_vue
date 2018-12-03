<style lang="scss">
@import '../../../sass/pages/detail/noteDetail';
</style>
<template>
<div class="note-detail">
    <!-- 作者信息 -->
    <div class="detail-man" @click.stop="toDakaHtml(noteDetailData.authorDetailAction)">
        <div class="li-lef">
            <img :src="noteDetailData.author_ico" v-if="noteDetailData.author_ico"/>
            <img src="/static/images/person.png" v-else/>
        </div>
        <div class="li-btw">
            <div class="btw-man">
                <div>
                    <span class="man-name">{{noteDetailData.note_author_name}}</span>
                    <span class="man-title"> | {{noteDetailData.user_title}}</span>
                </div>
                <span class="msg-time">{{noteDetailData.note_time}}</span>    
            </div>
            <div class="man-int">{{noteDetailData.author_profiles}}</div>
        </div>
        <div class="li-rig" @click.stop='preventTap'>   
        </div>
    </div>
    <!-- 笔记内容 -->
    <div class="note-content">
        <!-- 付费内容 -->
        <div class="pay-content" v-if="noteDetailData.authority==0">
            <div class="cont-summry" 
                v-if="noteDetailData.note_summry&&noteDetailData.note_type==3">
                <span>{{noteDetailData.note_summry}}</span>
            </div>
            <div class="cont-free" 
                 v-if="noteDetailData.free_note_content"
                 v-html="noteDetailData.free_note_content">
            </div> 
            <div class="cont-pay-guide" 
                 v-if="noteDetailData.pay_guide">
                 {{noteDetailData.pay_guide}}
             </div>
            <div class="cont-pay-text"
                 @click.stop="payment(noteDetailData.noteid)">
                {{noteDetailData.payText}}
            </div>
        </div>
        <!-- 免费内容 -->
        <div class="free-content" v-if="noteDetailData.authority==1">
            <div class="cont-summry" 
                 v-if="noteDetailData.note_summry&&noteDetailData.note_type==3"><span>{{noteDetailData.note_summry}}</span></div>
            <div class="cont-free" 
                 v-if="noteDetailData.free_note_content"
                 v-html="noteDetailData.free_note_content">
            </div>     
            <div class="cont-pay-guide" v-if="noteDetailData.pay_guide">{{noteDetailData.pay_guide}}</div> 
            <div class="cont-note" 
                 v-if="noteDetailData.note_content" 
                 v-html="noteDetailData.note_content">
            </div>
            <div class="cont-declar">{{noteDetailData.declare_content}}</div>
        </div>
        <!-- bottom -->
        <div class="cont-bom">
            <!-- <div class="finger">
                <button class="finger-btn" 
                        @click.stop="noteSatisfy(noteDetailData.noteid)">
                    <img v-if="!noteDetailData.mysatisfied" src="/static/images/finger.png"/>
                    <img v-if="noteDetailData.mysatisfied==1"  src="/static/images/finger2.png"/>
                </button>
                <div>点赞</div>
            </div>
            <div class="bom-msg">
                <span class="msg-time">{{noteDetailData.note_time}}</span>
                <span class="msg-price" 
                      v-if="noteDetailData.note_price>0">
                  价值{{noteDetailData.note_price}}牛币
                </span>
                <span class="msg-scan">{{noteDetailData.reader_nums}}人读过</span>
                <span class="msg-finger">{{noteDetailData.satisfied_nums}}人点赞</span>
            </div> -->
        </div>
    </div>
    <payment :payUrl="payUrl" 
             :payParam="payParam" 
             :vipType="vipType"
             @payCallBack="payCallBack" 
             ref="payment">
        <div slot="payCont"
             class="payCont"
             v-html="noteDetailData.free_note_content">
        </div>
        <span slot="payNum">{{noteDetailData.note_price}}</span>
        <span slot="payType_o">笔记</span>
        <span slot="payType_t">笔记</span>
        <span slot="vipPayNum" v-if="noteDetailData.enablePayModel">
            {{noteDetailData.enablePayModel[0].name}}
        </span>
        <span slot="vipExpireNum" v-if="noteDetailData.enablePayModel">
            {{noteDetailData.enablePayModel[0].num}}
        </span>
    </payment>
</div>
</template>
<script>
import Payment from '@/components/payment'
export default {
    name: 'NoteDetail',
    components: {
        Payment,
    },
    data() {
        return{
            // 笔记详情
            noteDetailData: {},
            // 笔记id
            _noteid:'',
            // 是否有权限
            _authority:'',
            // 笔记支付Url及参数
            payUrl:this.$conster.API_URL.NOTE_PAY, 
            payParam:{
                noteid:'',
                version:3.8,
                type:1,
            },
            layerIndex:'',
            vipType:1,
        }
    },
    computed:{
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        var callback=from.meta.callback  
        if(callback){
            vm.$refs.payment.agreeRule()
        }
      })
    },
    //页面生命周期函数
    created: function() {  
        var option = this.$route.query
        if(!option.id){
           this._noteid=option.noteid
            this.payParam.noteid=option.noteid;  //获取笔记id用于支付 
        }else{
            this._noteid=option.id
             this.payParam.noteid=option.id;  //获取笔记id用于支付
        }
    },
    mounted: function(){
        this.layerIndex=layer.load(1, {shade: false})
        this.loadNoteData(this._noteid); 
    },
    //事件处理函数
    methods: {
        // 加载笔记详情数据
        loadNoteData (noteid) {
            var self = this
            this.$http.getRequest(this.$conster.API_URL.NOTE_DETAIL, {
                noteid: noteid
            }).then(data => {
                self.noteDetailData = data  
                self.formatNoteDetailData(self.noteDetailData) 
                layer.close(self.layerIndex)
                if(self.noteDetailData.enablePayModel){
                    self.vipType=self.noteDetailData.enablePayModel[0].type   
                }   
            })
        },
        // 处理时间戳
        formatNoteDetailData(data){
            var list,time,reader_nums;
            time = data.note_time;
            time = this.$filter.formatTimeLocal(time);
            data.note_time = time;
            reader_nums=data.reader_nums
            reader_nums=this.$filter.dealReadNum(reader_nums)
            data.reader_nums = reader_nums 
        },
        // 点赞
        noteSatisfy(noteid){
            var self = this
            this.$http.getRequest(this.$conster.API_URL.NOTE_SATISFY, {
                noteid: noteid
            }).then(data => {
                self.noteDetailData.mysatisfied =1
                self.noteDetailData.satisfied_nums++
                layer.msg('点赞成功')
            })
        },
        // 支付
        payment(noteid){
            var self=this
            if(this.noteDetailData.pay_type==2){
                this.layerIndex=layer.confirm(self.noteDetailData.noPayModelText, {
                    title: '提示',
                    area:'8rem',
                    closeBtn: 0,
                    btn: ['确定'] 
                  }, function(){
                    layer.close(self.layerIndex)
                  })
                return
            }
            let {note_price,note_authorid,cert_code} = this.noteDetailData;
            this.$refs.payment.show(note_price,note_authorid,cert_code);
        },
        // 支付成功回调
        payCallBack(data){
            this.noteDetailData.authority=1
            this.noteDetailData.declare_content=data.declare_content
            this.noteDetailData.note_content=data.note_content
        },
        toDakaHtml(action){
            if(!action)return
            this.$myRouter.navigateTo({path:action},this)
        },
        // 
        preventTap(){
            return false;
        },
        fxcpFinish(){
            this.$myRouter.redirectTo({
                path:'noteDetail?noteid='+this._noteid
            },this)
        },
    }
}
</script>