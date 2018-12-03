<style lang="scss" scoped>
@import '../../sass/pages/vip';
</style>
<template>
<div class="vip">
    <div class="tab-box-blank box-block"></div>
    <div class="tab-box fixed">
        <div :class="['default', {'active':activeTabIndex==0 }]" 
             @click.stop="swichNav(0)">观点</div>
        <div :class="['default', {'active':activeTabIndex==1}]" 
             @click.stop="swichNav(1)">课程</div>
    </div>
    <!-- note -->
    <div :class="['note', {'contShow':activeTabIndex==0,'contHid':activeTabIndex!=0}]">
        <base-scroll :url='url_note' 
                     :param='param_note'
                     ref="scrollNote" 
                     @send-data="setNoteData">
            <div slot="content">
                <div class="note-box" 
                     v-for="(item, index) in noteData"
                     @click.stop="toNoteDetail(item)">
                    <img class="time-line" src="/static/images/timeLine.png"/>
                    <!-- <div class="box-top">
                        <div class="top-time">{{item.create_time}}</div>
                    </div> -->
                    <div class="box-mid">
                        <div class="mid-msg">
                            <img class="icon" 
                                 :src="item.user_ico" 
                                 v-if="item.user_ico&&item.user_ico!='test-png'"
                                 @error="icoError(index)"
                                 />
                            <img class="icon" 
                                 src="/static/images/person.png" 
                                 v-else/>
                            <div class="msg-vip">
                                <span class="msg-name">{{item.user_name}}</span>
                                <span class="msg-title"> | {{item.user_title}}</span>
                                <div class="msg-pro">{{item.user_profiles}}</div>
                            </div>
                        </div>
                        <div class="mid-title" v-if="item.summry">
                            {{item.title}}
                        </div>
                        <div class="mid-int">
                            <div class="int-sign-vip" v-if="item.sign">{{item.sign}}</div>
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
                             v-if="item.noteImages.length&&item.noteImages[0].imgUrl&&item.noteImages[0].imgUrl!='text-png'"
                             :src="item.noteImages[0].imgUrl"
                             @error="errorNotImg(index)" />
                        <img class="mid-img" src="/static/images/zw2.png" v-else-if="item.noteImages.length"/>
                    </div>
                    <div class="box-bom">
                        <div class="bom-time">{{item.create_time}}</div>
                        <!-- <div class="bom-value" 
                             v-if="item.value>0">
                             价值{{item.value}}牛币
                        </div>
                        <div class="bom-scan" 
                             v-if="item.readnum>0">
                             {{item.readnum}}人读过
                        </div>
                        <div class="bom-finger" 
                             v-if="item.satifynum>0">
                             {{item.satifynum}}人点赞
                        </div> -->
                    </div>
                </div>
            </div>
        </base-scroll>
    </div>
    <!--course  -->
    <div :class="['course', {'contShow':activeTabIndex==1,'contHid':activeTabIndex!=1}]">
        <base-scroll :url='url_course' 
                     :param='param_course' 
                     ref="scrollCourse"
                     @send-data="setCourseData">
            <div slot="content">
                <div class="course-box" 
                     v-for="(item, index) in courseData"
                     @click.stop="toCourseDetail(item)">
                    <div class="box-top">
                        <div class="top-title">{{item.title}}</div>
                    </div>
                    <div class="box-mid">
                        <img class="mid-img-play" src="/static/images/play.png"/>
                        <img class="mid-img" 
                             :src="item.video_img" 
                             v-if="item.video_img&&item.video_img!='text-png'"
                             @error="errorCourseImg(index)" />
                        <img class="mid-img" 
                             src="/static/images/zw1.png" 
                             v-else/>
                        <div class="mid-msg"> 
                            <div class="mid-man">
                                <img class="icon" 
                                     :src="item.user_ico" 
                                     v-if="item.user_ico"/> 
                                <img class="icon" 
                                     src="/static/images/person.png" 
                                     v-else/> 
                                <div class="name">{{item.user_name}}</div>
                            </div>
                            <div class="mid-int">{{item.summry}}</div>
                        </div>
                    </div>
                    <div class="box-bom">
                        <div class="top-time">{{item.create_time}}</div>
                        <!-- <div class="top-float">
                            <span class="bom-finger">{{item.satifynum}}人点赞</span>
                            <span class="bom-scan">{{item.readnum}}人看过</span>
                        </div> -->
                    </div>
                </div>
            </div>
        </base-scroll>
    </div>
</div>
</template>
<script>
import BaseScroll from '@/components/BaseScroll'
import userManager from '@/api/user-manager'
export default {
    name: 'Vip',
    components: {
        BaseScroll,
    },
    data(){
        return{
            activeTabIndex:0,
            //所有tab列表
            tabs:['scrollNote','scrollCourse'],
            //数据
            noteData:[],
            courseData:[],
            //下拉组件url及参数
            url_note:this.$conster.API_URL.VIP_NOTE,
            param_note:{
                'page_no': 1,
                'page_size': 10,
                'type': 1
            },
            url_course:this.$conster.API_URL.VIP_NOTE,
            param_course:{
                'page_no': 1,
                'page_size': 10,
                'type': 2
            }, 
            layerIndex:null,
        }
    },
    mounted: function(){
        if(this.$route.query.type=='note'){
            this.activeTabIndex=0
        }else if(this.$route.query.type=='course'){
            this.activeTabIndex=1
        }
        this.layerIndex=layer.load(1, {shade: false}) 
        this.$refs[this.getCurrScroll()].refresh()
    },
    methods: {
        // tab切换
        swichNav(index){
            this.activeTabIndex=index
            var items = this.$refs[this.getCurrScroll()].getItems()
            if(items.length <= 0){
                this.$refs[this.getCurrScroll()].refresh()
            }
        },
        // 
        setNoteData(data,type){
            if(type==0){
                this.noteData=[]
            }
            this.formatNoteData(data)         
            this.noteData.push(...data)
            layer.close(this.layerIndex)
        },
        // 
        setCourseData(data,type){
            if(type==0){
                this.courseData=[]
            }
            this.formatCourseData(data) 
            this.courseData.push(...data)
            layer.close(this.layerIndex)
        },
        // 链接跳转
        async toNoteDetail(item){
            await userManager.triggerIntercept()
            var action=item.content_action
            action=action.replace('note?','noteDetail?')
            this.$myRouter.navigateTo({path:action},this)
        },
        async toCourseDetail(item){
            await userManager.triggerIntercept()
            var action=item.content_action
            action=action.replace('course?','courseDetail?')
            this.$myRouter.navigateTo({path:action},this)
        },
        //获取当前激活的tab
        getCurrScroll(){
           return this.tabs[this.activeTabIndex]; 
        },
        // 时间戳
        formatNoteData(data){
            var list,time,sign
            for(var i in data){
                list = data[i]
                time = list.create_time
                time = this.$filter.formatTimeLocal(time)
                data[i].create_time = time
                sign=list.sign
                if(sign&&sign.length){
                    data[i].signIndent=sign.length
                }
            }
        },
        formatCourseData(data){
            var list,time,video_img
            for(var i in data){
                list = data[i]
                time = list.create_time
                time = this.$filter.formatTimeLocal(time)
                video_img=list.video_img
                if(!video_img.startsWith('http')){
                    video_img=''
                }
                data[i].create_time = time
            }
        },
        errorNotImg(inx) {
            this.noteData[inx].noteImages[0].imgUrl ='text-png'
        },
        errorCourseImg(inx) {
            this.courseData[inx].video_img ='text-png';
        },
        icoError(inx) {
            this.noteData[inx].user_ico = 'test-png';
        }
    }
}
</script>