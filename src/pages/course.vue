<style lang="scss">
@import "../sass/pages/course";
</style>
<template>
<div class="big-course"
     @touchstart.stop="touchStart($event)"
     @touchmove.stop="touchMove($event)">
  <!-- banner -->
  <div class="course-banner" v-if="recommendList.length">
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in recommendList" @click="bannerEvt(item.action)">
              <img class="swiper-img" :src="item.image" @error="bannerImg(index)" v-if="item.image&&item.image!='test-png'" />
              <img class="swiper-img" src="/static/images/zw/course_banner.png" v-else />
          </div>
      </div>
      <div class="swiper-pagination"
           v-if="recommendList.length>1">
      </div>
    </div>
  </div>
  <!-- tab切换 -->
  <div :class="['tab-blank', {'show-box':tabBoxFixed}]"></div>
  <div :class="['tab-box', {'fixed':tabBoxFixed}]" ref="tab">
      <div :class="{'active':activeTabIndex == 'seriesScroll','default':true}" @click="swichNav(0)">精品系列</div>
      <div :class="{'active':activeTabIndex == 'courseScroll','default':true}" @click="swichNav(1)">优质课程</div>
  </div>
  <!-- 内容区 -->
  <div class="content-box">
      <!-- 精品系列 -->
      <div class="series" v-show="activeTabIndex=='seriesScroll'">
        <base-scroll :url="seriesUrl" 
                     :param="seriesParam" 
                     :pageNoName="pageNoName"
                     :pageSizeName="pageSizeName"
                     @send-data="sendSeriesData" 
                     ref="seriesScroll">
          <div slot="content">
            <div class="series-box" 
                 v-for="(item, index) in seriesData"
                 v-if="item.type==1" 
                 @click.stop="toSeriesDetail(item.id)">
                <img class="box-img-play" src="/static/images/play.png"  v-if="item.type==1"/>
                <div class="box-lesson" v-if="item.type==1">共{{item.lesson}}课时</div>
                <img class="box-img" 
                    :src="item.coverImage" 
                    v-if="item.coverImage&&item.coverImage!='test-png'"
                    @error="coverImgError(index)"
                  />
                <img class="box-img" mode="aspectFill" src="/static/images/zw/report_list.png" v-else/>
                <div class="box-msg">
                    <div class="msg-title">{{item.title}}</div>
                    <span class="msg-summry">{{item.profile}}</span>
                    <div class="msg-label" v-if="item.keywords.length>0">
                        <span class="label-txt" 
                              v-for="(value,key_i) in item.keywords"
                              v-if="value&&key_i<4">
                          {{value}}
                        </span>
                    </div>
                    <div class="msg-man">
                        <img class="man-pic" :src="item.authorIco" v-if="item.authorIco"/>
                        <img class="man-pic" src="/static/images/person.png" v-else/>
                        <span class="man-name">{{item.authorName}}</span>
                        <!-- <span class="man-readNum">{{item.playNum}}人看过</span> -->
                    </div>
                </div>
            </div>
          </div>
        </base-scroll>
      </div>
      <!-- 优质课程 -->
      <div class="course" v-show="activeTabIndex=='courseScroll'">
        <base-scroll :url="courseUrl" 
                     :param="courseParam" 
                     @send-data="sendCourseData" 
                     ref="courseScroll">
          <div slot="content">
            <div class="course-box" 
                 v-for="(item,index) in courseData"
                 @click.stop="toCourseDetail(item.contentid)">
                <div class="box-top">
                    <div class="top-title">{{item.title}}</div>
                </div>
                <div class="box-mid">
                    <img class="mid-img-play" src="/static/images/play.png"/>
                    <img class="mid-img" 
                         :src="item.video_img" 
                         v-if="item.video_img" 
                         @error="imgErr(index)"/>
                    <img class="mid-img" src="/static/images/zw/course.png" v-else/>
                    <div class="mid-msg"> 
                    <div class="mid-man" 
                         @click.stop="toDakaHtml(item.authorDetailAction)">
                        <img class="icon" :src="item.user_ico" v-if="item.user_ico"/> 
                        <img class="icon" src="/static/images/person.png" v-else/>
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
</div>
</template>
<script>
import userManager from "@/api/user-manager";
import BaseScroll from "@/components/BaseScroll";
export default {
  name: "Course",
  components: {
    BaseScroll
  },
  data() {
    return {
      // 推荐系列课程数据
      recommendList: [],
      //当前选中的tab
      activeTabIndex: "seriesScroll",
      // tab滚动距离
      scrollTop: 0,
      offsetTop: 0,
      tabBoxFixed: false,
      //   精品系列列表
      seriesData:[],
      seriesUrl: this.$conster.API_URL.SERIES_LIST,
      seriesParam: {
        pageNo: 1,
        pageSize: 10
      },
      pageNoName:'pageNo',
      pageSizeName: 'pageSize',
      // 优质课程列表
      courseData: [],
      courseUrl: this.$conster.API_URL.NOTE_LIST,
      courseParam: {
        page_no: 1,
        page_size: 10,
        note_type: 2
      },
      layerIndex: ""
    };
  },
  computed: {},
  created: function() {
    this.loadRecommendData()
  },
  mounted: function() {
    this.layerIndex = layer.load(1, { shade: false })
    this.$refs[this.activeTabIndex].refresh()
  },
  methods: {
    // 加载系列课程数据
    loadRecommendData() {
      this.$http.getRequest(this.$conster.API_URL.COURSE_ADS, {}).then(data => {
        this.recommendList = data
        this.initSwiper()
      });
    },
    initSwiper(){
      var self=this
      setTimeout(function() {
        //轮播
        var swiper = new Swiper(".swiper-container", {
          autoplay: {
            delay: 2000 //2秒切换一次
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        })
        if(self.recommendList.length==1){
          swiper.allowTouchMove= false
        }
      }, 100)
    },
    sendSeriesData(data, type) {
      this.formatSeriesData(data)
      if (!type) {
        this.seriesData = data;
      } else {
        this.seriesData.push(...data);
      }
      layer.close(this.layerIndex);
    },
    sendCourseData(data,type) {
      this.formatCourseData(data);
      if (!type) {
        this.courseData = data;
      } else {
        this.courseData.push(...data);
      }
      layer.close(this.layerIndex);
    },
    // tab切换
    swichNav(index) {
      let activeTabIndex = index == 0 ? "seriesScroll" : "courseScroll";
      if (activeTabIndex != this.activeTabIndex) {
        this.activeTabIndex = activeTabIndex;
      }
      if (
        (activeTabIndex == "seriesScroll" && this.seriesData.length == 0) ||
        (activeTabIndex == "courseScroll" && this.courseData.length == 0)
      ) {
        this.$refs[this.activeTabIndex].refresh();
      }
    },
    // 监听图片加载错误
    imgErr(index) {
      this.courseData[index].video_img = "";
    },
    // 系列课程详情
    toSeriesDetail(id) {
      this.$myRouter.navigateTo({ path: "seriesDetail?id=" + id }, this);
    },
    // 优质课程详情
    toCourseDetail(productId) {
      this.$myRouter.navigateTo({ path: "courseDetail?id=" + productId }, this);
    },
    // banner跳转
    bannerEvt(action) {
      this.$myRouter.navigateTo({ path: action }, this);
    },
    // 处理精品系列关键字
    formatSeriesData(data){
        var list,keywords,playNum
        for(var i in data){
            list = data[i]
            keywords = list.keywords
            if(!keywords){
              keywords=[]  
            }else{
                keywords=keywords.split(',')
            }       
            data[i].keywords = keywords
            playNum=list.playNum
            playNum=this.$filter.dealReadNum(playNum)
            data[i].playNum = playNum
        }
    },
    //时间戳
    formatCourseData(data) {
      var list, time, video_img, readnum;
      for (var i in data) {
        list = data[i];
        time = list.create_time;
        time = this.$filter.formatTimeLocal(time);
        video_img = list.video_img;
        if (!video_img.startsWith("http")) {
          video_img = "";
        }
        data[i].create_time = time;
        readnum = list.readnum;
        readnum = this.$filter.dealReadNum(readnum);
        data[i].readnum = readnum;
      }
    },
    touchStart(e){
      if(!this.tabBoxFixed){
        this.offsetTop=this.$refs.tab.offsetTop
      } 
    },
    touchMove(e){
      this.scrollTop=window.scrollY
      if(this.scrollTop>=this.offsetTop&&!this.tabBoxFixed){
          this.tabBoxFixed=true
      }else if(this.tabBoxFixed&&this.scrollTop<this.offsetTop){
          this.tabBoxFixed=false
      }
    },
    // 跳转大咖专题
    toDakaHtml(action){
        if(!action)return
        this.$myRouter.navigateTo({path:action},this)
    },
    bannerImg(inx) {
      this.recommendList[inx].image = 'test-png';
    },
    coverImgError(inx){
      this.seriesData[inx].coverImage = 'test-png';
    }
  }
};
</script>
