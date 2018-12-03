<style lang="scss" scoped>
@import '../../sass/pages/report';
</style>
<template>
<div :class="['report', {'unscroll':showSelect}]">
    <!-- tab -->
    <div class="report-tab-blank"></div>
    <div class="report-tab">
        <div :class="['default', {'active':activeTabIndex==0 }]" 
             @click.stop="swichNav(0)">
            全部研报
            <img class="active-arrow" 
                 src="/static/images/up-white.png" 
                 v-if="activeTabIndex==0"/>
        </div>
        <div :class="['default', {'active':activeTabIndex==1}]" 
             @click.stop="swichNav(1)">
            热门研报
            <img class="active-arrow" 
                 src="/static/images/up-white.png" 
                 v-if="activeTabIndex==1"/>
        </div>
    </div>
    <!-- 全部研报 -->
    <div :class="['report-all', {'contShow':activeTabIndex==0,'contHid':activeTabIndex!=0}]">
        <!--select  -->
        <div class="report-select-blank"></div>
        <div class="report-select">
            <div :class="['select-box', {'active' : navindex == 0}]" 
                 @click.stop="togNav(0)">
                <div class="box-text box-text-red" v-if="param.category">{{param.category}}</div>
                <div class="box-text" v-else>分类</div>
                <img class="box-arrow" 
                     src="/static/images/up.png" 
                     v-if="navindex==0&&showSelect&&!param.category"/>
                <img class="box-arrow" 
                     src="/static/images/up-red.png" 
                     v-else-if="navindex==0&&showSelect&&param.category"/>
                <img class="box-arrow" 
                     src="/static/images/down-red.png" 
                     v-else-if="param.category"/>
                <img class="box-arrow" 
                     src="/static/images/down.png" 
                     v-else/>          
            </div>
            <div :class="['select-box', { 'active' : navindex == 1}]" 
                 @click.stop="togNav(1)">
                <div class="box-text box-text-red" v-if="param.level">{{param.level}}</div>
                <div class="box-text" v-else>评级</div>
                <img class="box-arrow" 
                     src="/static/images/up.png" 
                     v-if="navindex==1&&showSelect&&!param.level"/>
                <img class="box-arrow" 
                     src="/static/images/up-red.png" 
                     v-else-if="navindex==1&&showSelect&&param.level"/>
                <img class="box-arrow" 
                     src="/static/images/down-red.png" 
                     v-else-if="param.level"/>
                <img class="box-arrow" 
                     src="/static/images/down.png" 
                     v-else/>
            </div>
            <div :class="['select-box', {'active':navindex == 2}]" 
                 @click.stop="togNav(2)">
                <div class="box-text box-text-red" v-if="param.industry">{{param.industry}}</div>
                <div class="box-text" v-else>行业</div>
                <img class="box-arrow" 
                     src="/static/images/up.png" 
                     v-if="navindex==2&&showSelect&&!param.industry"/>
                <img class="box-arrow" 
                     src="/static/images/up-red.png" 
                     v-else-if="navindex==2&&showSelect&&param.industry"/>
                <img class="box-arrow" 
                     src="/static/images/down-red.png" 
                     v-else-if="param.industry"/>
                <img class="box-arrow" 
                     src="/static/images/down.png"
                     v-else/>
            </div>
        </div>
        <div class="select-cont" 
             v-if="navindex==0&&showSelect" 
             @click.stop="hideSelect">
            <div class="cont-area">
                <div class="cont-cat">
                    <div :class="['cat-box', {'choosed':item.status}]"
                         v-for="(item, index) in reportConfig.category" 
                         @click.stop="choose(item,navindex,index)">
                        <span class="box-text">{{item.value}}</span>
                        <img class="box-choose" src="/static/images/choose-red.png" v-if="item.status"/>
                    </div>
                </div>
                <div class="cont-btn">
                    <div class="btn-refresh" 
                         @click.stop="refreshReport(navindex)">
                         重置
                     </div>
                    <div class="btn-submit" 
                         @click.stop="submitReport()">
                         确定
                    </div>
                </div>
            </div>
        </div>
        <div class="select-cont" 
             v-if="navindex==1&&showSelect" 
             @click.stop="hideSelect">
            <div class="cont-area">
                <div class="cont-level">
                    <div :class="['level-box', {'choosed':item.status}]"
                         v-for="(item, index) in reportConfig.level" 
                         @click.stop="choose(item,navindex,index)">
                         {{item.value}}
                    </div>
                </div>
                <div class="cont-btn">
                    <div class="btn-refresh" 
                         @click.stop="refreshReport(navindex)">重置</div>
                    <div class="btn-submit" 
                         @click.stop="submitReport()">确定</div>
                </div>
            </div>
        </div>
        <div class="select-cont" 
             v-if="navindex==2&&showSelect" 
             @click.stop="hideSelect">
            <div class="cont-area">
                <div class="cont-ins">
                    <div :class="['ins-box', {'choosed':item.status}]"
                         v-for="(item, index) in reportConfig.industry" 
                         @click.stop="choose(item,navindex,index)">
                        <span class="box-text">{{item.value}}</span>
                        <img class="box-choose" src="/static/images/choose-red.png" v-if="item.status"/>
                    </div>
                </div>
                <div class="cont-btn">
                    <div class="btn-refresh" 
                         @click.stop="refreshReport(navindex)">重置</div>
                    <div class="btn-submit" 
                         @click.stop="submitReport()">确定</div>
                </div>
            </div>
        </div>
        <!-- scroll-div -->
        <div class="report-scroll-blank" 
             v-if="reportConfig.sign&&reportConfig.sign.length>0">
        </div>
        <div class="report-scroll" 
             v-if="reportConfig.sign&&reportConfig.sign.length>0">
            <div class="swiper-report">
                <div class="box-slider swiper-wrapper" 
                     :style="{'width':1.1*reportConfig.sign.length+'rem'}">
                    <div :class="['box-sign','swiper-slide', {'choosed':item.status}]" 
                         v-for="(item, index) in reportConfig.sign"
                         @click.stop="choose(item,3,index)" 
                         hover-class="none">
                         {{item.value}}
                    </div>
                </div>
            </div>
        </div>
        <!-- report-list -->
        <base-scroll :url="url" 
                     :param="param" 
                     ref="listScroll"
                     @send-data="setReportData">
            <div slot="content">
                <div class="report-list">
                    <div class="list-box" 
                         v-for="(item, index) in allReport"
                         @click.stop="toReportDetail(item.id)">
                        <div class="box-lef">
                            <img class="lef-img" 
                                 :src="item.coverImage" 
                                 v-if="item.coverImage"/>
                            <img class="lef-img" 
                                 src="/static/images/zw1-2.png" 
                                 v-else/>              
                            <div class="lef-cat">{{item.category}}</div>
                            <div class="lef-text" 
                                 v-if="item.markText">
                                 {{item.markText}}
                             </div>
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
                                      v-for="(value, key_i) in item.label"
                                      v-if="value&&key_i<4">
                                      {{value}}
                                </span>
                            </div>
                            <div class="right-com">
                                <span class="com-name" 
                                      v-if="item.company">{{item.company}}</span>
                                <span class="com-time">{{item.createTime}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </base-scroll>
    </div>
    <!-- 热门研报 -->
    <div :class="['report-hot', {'contShow':activeTabIndex==1,'contHid':activeTabIndex!=1}]">
        <base-scroll :url="urlHot" 
                     :param.sync="paramHot" 
                     :objArryField="objArryField" 
                     ref='hotScroll'
                     @send-data="setHotReportData">
            <div slot="content">
                <div class="hot-top">
                    <div class="swiper-hot-report">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"
                                 v-for="(item, index) in hotReportList.ads" 
                                 @click.stop="bannerEvt(item.action)">
                                <img class="slide-image" @error="adsImgError(index)" :src="item.image" v-if="item.image&&item.image!='test-png'"  />
                                <img class="slide-image" src="/static/images/zw/report_banner.png" v-else />
                            </div>
                        </div>
                        <div class="swiper-pagination" 
                             v-if="hotReportList.ads.length>1">
                        </div>
                    </div>
                </div>
                <!-- 列表 -->
                <div class="hot-list">
                    <div class="list-box" 
                         v-for="(item, index) in hotReportList.list"
                         @click.stop="toHotReportDetail(item.id)">
                        <div class="box-lef">
                            <img class="lef-img" 
                                 :src="item.coverImage" 
                                 v-if="item.coverImage"/> 
                            <img class="lef-img" 
                                 src="/static/images/zw1-2.png" 
                                 v-else/>  
                        </div>
                        <div class="box-rig">
                            <div class="rig-title">
                                <div class="title-lef">
                                    <div class="lef-text">{{item.title}}</div>
                                    <div class="lef-mark" v-if="item.markText">
                                        {{item.markText}}
                                    </div>
                                </div>    
                                <span class="title-time">{{item.updateTime}}更新</span>
                            </div>
                            <div class="rig-mid">{{item.summary}}</div>
                            <div class="right-bom">
                                <span class="bom-num">{{item.reportNum}}篇研报</span>
                                <!-- <span class="bom-read">{{item.readNum}}人已读</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </base-scroll>
    </div>
</div>
</template>
<script>
import BaseScroll from '@/components/BaseScroll'
export default {
    name: 'Report',
    components: {
        BaseScroll
    },
    data(){
        return{
            // 研报配置项
            reportConfig:'',
            //当前选中的tab
            activeTabIndex:0,
            //所有tab列表
            tabs:['listScroll','hotScroll'],
            // 全部研报url及参数
            url:this.$conster.API_URL.REPORT_LIST,
            param:{
                page_no:1,
                page_size:10,
                category:'',
                level:'',
                industry:'',
                label:'',
            },
            // 全部研报数据
            allReport:'',
            // 热门研报url及参数
            urlHot:this.$conster.API_URL.REPORT_HOT_LIST,
            paramHot:{
                page_no:1,
                page_size:10
            },
            objArryField:'list',
            // 热门研报数据
            hotReport:'',
            // select切换
            navindex:0,
            // 显示select
            showSelect:false,
            // 热门研报数据
            hotReportList:{
                'ads':[],
                'list':[]
            },
            layerIndex:null,
            hotSwiper:null,
        }
    },
    mounted: function(){
        this.layerIndex=layer.load(1, {shade: false}) 
        this.loadReportConfig()
        this.$refs[this.getCurrScroll()].refresh()
        this.initSwiper()
    },
    methods:{
        // 加载研报配置
        loadReportConfig(){
            this.$http.getRequest(this.$conster.API_URL.REPORT_CONFIG, {      
            }).then(data => {
                this.reportConfig = data  
                this.formatConfig(this.reportConfig)
            })
        },
        // 处理研报配置数据
        formatConfig(data){
            var list,value,status,newData={}
            for(var i in data){
                list=data[i]
                newData[i]=[]
                for(value in list){
                    var obj={}
                    obj.value=list[value]
                    obj.status=0 
                    if(obj.value=='我的自选')continue
                    newData[i].push(obj)        
                }
            }
            this.reportConfig=newData
        },
        //获取当前激活的tab
        getCurrScroll(){
           return this.tabs[this.activeTabIndex] 
        },
        initSwiper(){
            var self=this
            setTimeout(()=> {
                new Swiper(".swiper-report", {
                    centeredSlides : false,
                    slidesPerView : 5,
                    spaceBetween : 10,
                    slidesOffsetAfter : 80,
                })
            }, 100)
        },
        initHotSwiper(){
            var self=this
            setTimeout(()=> {
                self.hotSwiper=new Swiper(".swiper-hot-report", {
                    autoplay: {
                        delay: 2000 
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                })
                if(self.hotReportList.ads.length==1){
                  self.hotSwiper.allowTouchMove= false
                }
            }, 100)
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
        formatHotData(data){
            var list,time;
            for(var i in data){
                list = data[i];
                time = list.updateTime;
                time = this.$filter.formatTimeLocal(time);
                data[i].updateTime = time;
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
        // 清除下拉框样式
        clearSelect(field){
            var data=this.reportConfig[field]
            for(var i in data){
                data[i].status=0
            }
        },
        // tab切换
        swichNav(index){
            this.activeTabIndex=index
            let currScroll = this.getCurrScroll()
            var items = this.$refs[currScroll].getItems()
            //没有数据时才重新加载,否则不做任何处理        
            if(items.length <= 0){
                this.$refs[currScroll].refresh()
            }
            if(!this.hotSwiper){
                this.initHotSwiper()
            }
        },
        // config切换
        togNav(index){
            this.navindex=index
            this.showSelect=this.showSelect?false:true
        },
        // all研报
        setReportData (data,type) {
            this.formatData(data)
            this.formatlev(data)
            if(!type){
                this.allReport=data
            }else{
                this.allReport.push(...data)
            }
            layer.close(this.layerIndex)  
        },
        // 获取热门研报数据
        setHotReportData(data,type){
            this.formatHotData(data.list)
            if(type==0){
                this.hotReportList = data
            }else{
                this.hotReportList.ads = data.ads
                this.hotReportList.list.push(...data.list)
            }    
            layer.close(this.layerIndex)   
        },
        // 研报详情跳转
        toReportDetail (id) {
            this.$myRouter.navigateTo({
                path: `reportDetail?id=${id}`,
            },this)     
        },
        // 热门研报详情
        toHotReportDetail(id){
           this.$myRouter.navigateTo({
                path: `hotReportDetail?id=${id}`,
            },this)  
        },
        // 下拉框click
        choose(item,type,index){
            var value,status,str
            value=item.value
            status=item.status    
            str=value+','
            if(type==0){
                this.reportConfig.category[index].status=status?0:1
                if(this.param.category.indexOf(value)>-1){
                    this.param.category=this.param.category.replace(str,'')
                }else{
                    this.param.category=this.param.category+str
                }
            }else if(type==1){
                this.reportConfig.level[index].status=status?0:1
                if(this.param.level.indexOf(value)>-1){
                    this.param.level=this.param.level.replace(str,'')
                }else{
                    this.param.level=this.param.level+str
                }
            }else if(type==2){
                this.reportConfig.industry[index].status=status?0:1
                if(this.param.industry.indexOf(value)>-1){
                    this.param.industry=this.param.industry.replace(str,'')
                }else{
                    this.param.industry=this.param.industry+str
                }
            }else if(type==3){
                // label
                this.reportConfig.sign[index].status=status?0:1
                if(this.param.label.indexOf(value)>-1){
                    this.param.label=this.param.label.replace(str,'')
                }else{
                    this.param.label=this.param.label+str
                }
                this.layerIndex=layer.load(1, {shade: false}) 
                this.$refs[this.getCurrScroll()].refresh()
            }
        },
        // 重置
        refreshReport(type){
            if(type==0){
                this.param.category=''
                this.clearSelect('category')
            }else if(type==1){
                this.param.level=''
                this.clearSelect('level')
            }else if(type==2){
                this.param.industry=''
                this.clearSelect('industry')
            }
            this.showSelect=false
            this.layerIndex=layer.load(1, {shade: false}) 
            this.$refs[this.getCurrScroll()].refresh()
        },
        // 确定
        submitReport(){
            this.showSelect=false
            this.layerIndex=layer.load(1, {shade: false}) 
            this.$refs[this.getCurrScroll()].refresh()
        },
        // 隐藏select
        hideSelect(){
            this.showSelect=false
        },
        //hotreport的广告跳转
        bannerEvt(action){
            action=action.replace('report?','reportDetail?')
            this.$myRouter.navigateTo({path:action},this)
        },
        adsImgError(inx){
            this.hotReportList.ads[inx].image = 'test-png';
        }
    }
}
</script>