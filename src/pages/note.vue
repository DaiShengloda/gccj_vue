<style lang="scss">
@import '../sass/pages/note';
</style>
<template>
<base-scroll v-bind:url="url" v-bind:param="param" @send-data="sendData" ref="baseScroll">
    <div class="note" slot="content">
        <!-- 推荐阅读 -->
        <div class="recommend" v-if="recommendList.length>0">
            <div class="rec-title">
                <img src="/static/images/recommend.png"/>
                <span>推荐阅读</span>
             </div>
             <div class="rec-box">
                <div class="content-box" 
                     v-for="item in recommendList"
                     v-if="item.sign"
                     @click.stop="toNoteDetail(item.contents.noteid)">
                    <div class="box-content">
                        <img src="/static/images/label.png"/>
                        <span class="content-sign">{{item.sign}}</span>
                        <span class="content-title">{{item.recommended_msg}}</span>
                    </div>
                    <div class="box-msg" v-if="item.contents">
                        <span class="msg-time">{{item.contents.note_time}}</span>
                        <span class="msg-name">{{item.contents.note_author_name}}</span>
                        <span class="msg-title">| {{item.contents.user_title}}</span>
                    </div>
                </div>
            </div>
        </div>
         <!-- 内容区 -->
        <div class="content-box">
            <div class="note-box"
                 v-for="(item, index) in noteData"
                 @click.stop="toNoteDetail(item.contentid)"
                 >                  
                <img class="time-line" src="/static/images/timeLine.png"/>
                <div class="box-top">
                    <div class="top-time">{{item.create_time}}</div>
                </div>
                <div class="box-mid">
                    <div class="mid-msg" 
                         @click.stop="toDakaHtml(item.authorDetailAction)">
                        <div class="msg-icon">
                            <img class="icon" :src="item.user_ico" v-if="item.user_ico&&item.user_ico!='test-png'" @error="icoError(index)"/>
                            <img class="icon" src="/static/images/person.png" v-else/>  
                        </div>
                        <div class="msg-notebox">
                            <div class="msg-top">
                                <span class="msg-name">{{item.user_name}}</span>
                                <span class="msg-title"> | {{item.user_title}}</span>
                            </div> 
                            <div class="msg-pro">{{item.user_profiles}}</div>
                        </div>
                    </div>
                    <div class="mid-title" v-if="item.summry">{{item.title}}</div>
                    <div class="mid-int">
                        <div class="int-sign-note" v-if="item.sign">{{item.sign}}</div>
                        <span :class="['int-title']" 
                              v-if="!item.summry"
                              :style="{'text-indent':item.signIndent*0.45+'rem'}">
                          {{item.title}}
                        </span>
                        <span :class="['int-title']" 
                              v-if="item.summry"
                              :style="{'text-indent':item.signIndent*0.45+'rem'}">
                          {{item.summry}}
                        </span>
                    </div>
                    <img class="mid-img" 
                        v-if="item.noteImages.length&&item.noteImages[0].imgUrl!='test-png'" 
                        :src="item.noteImages[0].imgUrl"
                        @error="noteImg(index)"
                        />
                    <img class="mid-img" src="/static/images/zw/note.png" v-else-if="item.noteImages.length>0"/>
                </div>
                <div class="box-bom">
                    <div class="bom-value" v-if="item.value>0">{{item.descritption}}</div>
                </div>
            </div>
        </div> 
    </div> 
 </base-scroll>
</template>

<script>
import BaseScroll from '@/components/BaseScroll'
export default {
    name: 'Note',
    components: { 
        BaseScroll 
    },
    data(){
        return {
            //笔记推荐
            recommendList:[],
            noteData:{},
            url:this.$conster.API_URL.NOTE_LIST,
            param: {
                'page_no': 1,
                'page_size': 10,
                'list_type': 2
            },
            layerIndex:'',
        }
    },
    computed:{
    },
    mounted: function() {
        this.layerIndex=layer.load(1, {shade: false}) 
        this.loadRecommendData()
        this.$refs.baseScroll.refresh()
    },
    activated: function() {
        
    },
    methods:{
        // 加载推荐数据
        loadRecommendData () {
            var self=this
            this.$http.getRequest(this.$conster.API_URL.RECOMMEND, {
                positionid: 200102
            }).then(data => {
                self.recommendList = data
                self.formatRecommendData(self.recommendList)
                layer.close(self.layerIndex)
            })
        },
        // 处理时间戳
        formatRecommendData(data){
            var list,time;
            for(var i in data){
                list = data[i];
                if(!list.contents)continue
                time = list.contents.note_time;
                time = this.$filter.formatTimeLocal(time);
                data[i].contents.note_time = time;
            }
        },
        sendData(data,type){
            this.formatNoteData(data)
            if(!type){
                this.noteData=data
            }else{
                this.noteData.push(...data)
            }
        },
        // 处理时间戳
        formatNoteData(data){
            var list,time,readnum,sign
            for(var i in data){
                list = data[i]
                time = list.create_time
                time = this.$filter.formatTimeLocal(time)
                data[i].create_time = time
                readnum=list.readnum
                readnum=this.$filter.dealReadNum(readnum)
                data[i].readnum = readnum
                sign=list.sign
                if(sign&&sign.length){
                    data[i].signIndent=sign.length
                }
            }
        },
        // 跳转观点详情页
        toNoteDetail (noteid) {
            var self=this 
            this.$myRouter.navigateTo({path: `noteDetail?id=${noteid}`,},this)  
        },
        // 跳转大咖专题
        toDakaHtml(action){
            if(!action)return
            this.$myRouter.navigateTo({path:action},this)
        },
        noteImg(inx){
            this.noteData[inx].noteImages[0].imgUrl = 'test-png';
        },
        icoError(inx){
            this.noteData[inx].user_ico = 'test-png';
        }
    }
}
</script>