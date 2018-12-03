<style lang="scss" scoped>
@import '../../../sass/pages/detail/hotReportDetail';
</style>
<template>
<div class="hot-report-detail">
    <base-scroll :url="url" 
                 :param="param" 
                 :objArryField="objArryField"
                 ref="basescoll" 
                 @send-data="setReportData">
        <div slot="content">
            <div class="detail-top">
                <img class="top-img" 
                     :src="hotReportDetail.bannerImage" 
                     v-if="hotReportDetail.bannerImage"/>
                <img class="top-img" src="/static/images/zw2.png" v-else/>
                <div class="top-title">{{hotReportDetail.title}}</div>
                <div class="top-sum">{{hotReportDetail.summary}}</div>
                <div class="top-msg">
                    <span class="msg-num">{{hotReportDetail.reportNum}}篇研报</span>
                    <!-- <span class="msg-read">{{hotReportDetail.readNum}}人阅读</span> -->
                </div>
            </div>
            <!-- 列表 -->
            <div class="detail-list">
                <div class="list-box" 
                     v-for="item in hotReportDetail.reportList"
                     @click.stop="toReportDetail(item.id)">
                    <div class="box-lef">
                        <img class="lef-img" 
                             :src="item.coverImage" 
                             v-if="item.coverImage"/>   
                        <img class="lef-img" 
                             src="/static/images/zw1.png" 
                             v-else/>               
                        <div class="lef-cat">{{item.category}}</div>
                    </div>
                    <div class="box-rig">
                        <div class="rig-title">{{item.title}}</div>
                        <div class="rig-level">
                            <div class="level-word">研报评级:</div>
                            <img class="level-start" 
                                 v-for="value in item.level"
                                 :src="value?'/static/images/star-red.png':'/static/images/star.png'"/>
                        </div>
                        <div class="rig-label">
                            <span class="label-txt" 
                                  v-for="(value,key_i) in item.label"
                                  v-if="value&&key_i<4">
                                  {{value}}
                            </span>
                        </div>
                        <div class="right-com">
                            <span class="com-name" v-if="item.company">{{item.company}}</span>
                            <span class="com-time">{{item.createTime}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </base-scroll>
</div>
</template>
<script>
import BaseScroll from '@/components/BaseScroll'
export default{
    name: 'HotReportDetail',
    components: {
        BaseScroll
    },
    data(){
        return{
            // 分页URL及参数
            url:this.$conster.API_URL.REPORT_HOT_DETAIL,
            param:{
                id:'',
                page_no:1,
                page_size:10,
            },
            objArryField:'reportList',
            // 研报系列数据
            hotReportDetail:'',
            // 研报系列Id
            report_id:'',
            layerIndex:null,
        }
    },
    mounted: function(){
        this.layerIndex=layer.load(1, {shade: false}) 
        this.param.id=this.$route.query.id
        this.$refs.basescoll.refresh()
    },
    methods: {
        // 接受热门研报详情分页数据
        setReportData(data,type){
            this.formatData(data.reportList)
            this.formatlev(data.reportList)
            if(type==0){
                this.hotReportDetail = data
            }else{
                this.hotReportDetail.reportList.push(...data.reportList)
            }    
            layer.close(this.layerIndex)
        },
        // 研报详情
        toReportDetail(id){
            this.$myRouter.navigateTo({
                path: `reportDetail?id=${id}`,
            },this)
        },
        // 处理时间戳
        formatData(data){
            var list,time;
            for(var i in data){
                list = data[i];
                time = list.createTime;
                time = this.$filter.formatTimeLocal(time);
                data[i].createTime = time;
            }
        },
        // 处理评级、关键字
        formatlev(data){
            var levelData={
                '一星':[1,0,0,0,0],
                '二星':[1,1,0,0,0],
                '三星':[1,1,1,0,0],
                '四星':[1,1,1,1,0],
                '五星':[1,1,1,1,1],                      
            }
            var list,level,label
            for(var i in data){
                list=data[i]
                label=list.label
                label=label?label.split(','):[]
                data[i].label=label

                level= list.level
                for(var name in levelData){
                    if(level==name){
                       data[i].level=levelData[name]
                       break
                    }
                }
            }
        },
    }
}
</script>