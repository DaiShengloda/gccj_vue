<style lang="scss">
@import "../../../sass/pages/courseDetail";
</style>
<template>
<div class="course">
  <div class="course-video-blank"></div>
  <div class="course-video">
    <video class="video" 
           :poster="courseDetailData.note_img || '/static/images/zw1.png'" 
           :controls="showControls" 
           :src="courseDetailData.note_video"
           width="100%"
           height='225'
           ref="video"
           @ended="endVideo">
    </video>
    <div class="video-cont">
      <!-- 播放按钮 -->
      <img class="video-play" 
           src="/static/images/play.png" 
           @click.stop="playVideo()" 
           v-if="courseDetailData.authority==1&&showPlayBtn"/>
      <!-- 付费按钮 -->
      <div class="pay-content" 
           v-if="courseDetailData.authority==0&&!courseDetailData.series_id">
          <div class="cont-pay-text">{{courseDetailData.payText}}</div>
          <div class="cont-pay-btn" 
               @click.stop="payment(courseDetailData.noteid)">
             立即观看
           </div>
      </div>
    </div>
  </div>
  <!-- content -->
  <div class="course-detail">
      <div class="course-content">
          <!-- 视频信息 -->
          <div class="video-msg">
              <div class="msg-title">{{courseDetailData.note_title}}</div>
              <div class="msg-summry">
                  {{courseDetailData.note_summry}}
              </div>
          </div>
          <!-- 声明 -->
          <div class="cont-declare">{{courseDetailData.declare_content}}</div>
          <!-- bottom -->
          <div class="cont-bom">
              <!-- <div class="finger">
                  <div @click.stop="noteSatisfy(courseDetailData.noteid)">
                      <div class="finger-btn">
                          <img v-if="!courseDetailData.mysatisfied" src="/static/images/finger.png"/>
                          <img v-if="courseDetailData.mysatisfied==1"  src="/static/images/finger2.png"/>
                      </div>
                  </div>
                  <div>点赞</div>
              </div> -->
              <div class="bom-msg">
                  <span class="msg-time">{{courseDetailData.note_time}}</span>
                  <!-- <span class="msg-scan">{{courseDetailData.reader_nums}}人看过</span>
                  <span class="msg-finger">{{courseDetailData.satisfied_nums}}人点赞</span> -->
              </div>
          </div>
          <!-- 老师信息 -->
          <div class="detail-man" @click.stop="toAction(courseDetailData.authorDetailAction)">
              <div class="li-lef">
                  <img :src="courseDetailData.author_ico" v-if="courseDetailData.author_ico"/>
                  <img src="/static/images/person.png" v-else/>
              </div>
              <div class="li-btw">
                  <div>
                      <span class="man-name">{{courseDetailData.note_author_name}}</span>
                      <span class="man-title"> | {{courseDetailData.user_title}}</span>
                  </div>
              </div>
              <div class="li-rig"></div>
          </div>
          <!-- 课程ppt -->
          <div class="cont-ppt" v-if="courseDetailData.ppts&&courseDetailData.ppts.length>0">
              <div class="ppt-title">课程PPT</div>
              <div class="ppt-scroll">
                  <div class="scroll-tab">
                      <span class="tab-lef" 
                            @click.stop="scrollPre()">
                        {{ppt_pre}}
                      </span>
                      <span class="tab-mid">
                        {{currentIndex+1}}/{{courseDetailData.ppts.length}}
                      </span>
                      <span class="tab-rig" 
                            @click.stop="scrollNext()">
                        {{ppt_next}}
                      </span>
                  </div>
                  <div class="swiper-ppt">
                      <div class="swiper-wrapper">
                          <div class="swiper-slide" 
                               v-for="(item, index) in courseDetailData.ppts">
                            <img class="slide-img" 
                                  v-if="item.pptImage&&item.pptImage!='test-png'"
                                 :src="item.pptImage"
                                 @error="pptImgError(index)"/>
                            <img class="slide-img" src="/static/images/zw/PPT_list.png" v-else />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- 系列选集scroll -->
          <div class="cont-series" v-if="courseDetailData.items&&courseDetailData.items.length>0">
              <div class="series-title">系列选集</div>
              <div class="swiper-scroll series-box">
                  <div class='series-li swiper-wrapper'>
                      <div class="li swiper-slide"  
                           v-for="item in courseDetailData.items" 
                           @click="bannerEvt(item)">
                        <img class="li-img swiper-img" :src="item.coverImage" v-if="item.coverImage"/>
                        <img class="li-img swiper-img" src="/static/images/zw1-2.png" v-else/>
                        <div :class="['li-title',{'li-red':item.id==_id}]">
                          {{item.title}}
                        </div>
                        <!-- <div class="li-msg">{{item.playNum}}人看过</div> -->
                        <div class="li-try" v-if="item.authority&&item.isTryPlay">试看</div>
                        <div class="li-try" v-if="!item.isTryPlay&&item.sign">{{item.sign}}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- 系列课程使用 -->
      <div class="series-blank" 
           v-if="courseDetailData.series_id&&courseDetailData.series_info.authority==0">
      </div>
      <div class="series-pay" 
           v-if="courseDetailData.series_id&&courseDetailData.series_info.authority==0">
          <div class="pay-span">免费试看中，购买专辑后可畅观所有课程</div>
          <div class="pay-btn" 
               @click.stop="buy(courseDetailData.series_id)">
             立即购买
           </div>
      </div>  
  </div>

  <!-- 优质课程使用组件 -->
  <payment :payUrl="payUrl" 
           :payParam="payParam" 
           :vipType="vipType"
           @payCallBack="payCallBack" 
           ref="paymentCourse">
      <span slot="payCont" class="payCont">{{courseDetailData.note_summry}}</span>
      <span slot="payNum">{{courseDetailData.note_price}}</span>
      <span slot="payType_o">课程</span>
      <span slot="payType_t">课程</span>
  </payment>
  <!-- 系列课程使用组件 -->
  <payment :payUrl="paySeriesUrl" 
           :payParam="paySeriesParam"
           :vipType="vipType" 
           @payCallBack="payCallBackSeries" 
           ref="paymentSeries">
      <span slot="payCont" 
            class="payCont"
            v-if="courseDetailData.series_info">
        {{courseDetailData.series_info.title}}
      </span>
      <span slot="payNum"
            v-if="courseDetailData.series_info">
        {{courseDetailData.series_info.price}}
      </span>
      <span slot="payType_o">系列</span>
      <span slot="payType_t">系列</span>
  </payment>
</div>
</template>
<script>
import userManager from "@/api/user-manager"
import Payment from '@/components/payment'
export default {
  name: "courseDetail",
  components: {
    Payment
  },
  data() {
    return {
      // 显示video控件
      showControls: false,
      // video文本
      videoContext:null,
      // 网络类型
      netWorkType: 'wifi',
      // 播放按钮
      showPlayBtn: true,
      // 课程详情
      courseDetailData: {},
      // 课程id
      _id: "",
      // ppt的index
      currentIndex: 0,
      // 转义
      ppt_pre: "<",
      ppt_next: ">", 
      // ppt-swiper
      swiperPpt:null,
      // scroll-swiper
      swiperScroll:null,
      layerIndex:null,
      // 优质课程使用url及参数
      payUrl:this.$conster.API_URL.NOTE_PAY,
      payParam:{
          noteid:'',
          version:3.8,
          type:1,
      },
      // 系列课程使用Url及参数
      paySeriesUrl:this.$conster.API_URL.SERIES_PAY,
      paySeriesParam:{
          courseid:'',
          version:3.8,
          type:1,
      },
      vipType:1,
      curRef:'paymentCourse',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      var callback=from.meta.callback  
      if(callback){
        vm.$refs[vm.curRef].agreeRule()
      }
    })
  },
  created: function() {
    this._id = this.$route.query.id
    this.loadCourseData()
  },
  mounted: function() {
    this.videoContext=this.$refs.video
  },
  methods: {
    loadCourseData() {
      this.layerIndex=layer.load(1, {shade: false})
      this.$http.getRequest(this.$conster.API_URL.COURSE_DETAIL, {
        id: this._id
      }).then(data => {
        this.courseDetailData = data
        this.formatCourseData(this.courseDetailData)
        layer.close(this.layerIndex)
        this.initSwiper()  
        this.vipType=this.courseDetailData.enablePayModel[0].type
      })
    },
    formatCourseData(data) {
      var list, time, reader_nums, satisfied_nums;
      time = data.note_time;
      time = this.$filter.formatTimeLocal(time);
      data.note_time = time;
      reader_nums = data.reader_nums;
      reader_nums = this.$filter.dealReadNum(reader_nums);
      data.reader_nums = reader_nums;
      satisfied_nums = data.satisfied_nums;
      satisfied_nums = this.$filter.dealReadNum(satisfied_nums);
      data.satisfied_nums = satisfied_nums;
    },
    initSwiper(){
      var self=this
      this.currentIndex=0
      if(this.swiperPpt){
        this.swiperPpt.destroy(true)
      }
      if(this.swiperScroll){
        this.swiperScroll.destroy(true)
      }
      setTimeout(function() {
        if(self.courseDetailData.ppts.length>0){
          self.swiperPpt=new Swiper(".swiper-ppt", {
            on: {
              slideChangeTransitionStart: function(){
                self.currentIndex = this.activeIndex; 
              },
            },
          })
        }else{
          self.swiperPpt=null
        }
        
        self.swiperScroll=new Swiper(".swiper-scroll", {
          centeredSlides : false,
          slidesPerView : 2.5,
          spaceBetween :10,
          slidesOffsetAfter : 80,
        })
      }, 100)
    },
    playVideo() {
      var self = this;
      if (this.netWorkType != "wifi") {
        if (!this.videoPlayed) {
          wx.showModal({
            title: "提示",
            content: "您正在使用手机网络，播放会消耗流量",
            success: function(res) {
              if (res.confirm) {
                self.setVideoSrc();
                self.videoPlayed = true;
                self.showPlayBtn = false;
                setTimeout(() => {
                  self.videoContext.play();
                }, 500);
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        }
      } else {
        self.showPlayBtn=false
        self.videoContext.play()
        self.showControls=true
      }
    },
    endVideo() {
      this.showPlayBtn=true
      this.showControls=false
    },
    // 点赞
    noteSatisfy(id) {
      if(this.courseDetailData.mysatisfied==1)return
      this.$http.getRequest(this.$conster.API_URL.NOTE_SATISFY, {
        noteid: id
      }).then(data => {
        this.courseDetailData.mysatisfied =1
        this.courseDetailData.satisfied_nums++
        layer.msg('点赞成功')
      })
    },
    toAction(action){
      if(!action)return
      this.$myRouter.navigateTo({ path: action }, this)
    },
    scrollPre() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.swiperPpt.slidePrev()
      }
    },
    scrollNext() {
      if (this.currentIndex < this.courseDetailData.ppts.length - 1) {
        this.currentIndex++
        this.swiperPpt.slideNext()
      }
    },
    bannerEvt(item){
      var self=this
      var itemAuthority,isTryPlay,id;
      itemAuthority=item.authority;
      isTryPlay=item.isTryPlay;
      id=item.id
      if((!itemAuthority||!isTryPlay)&&
         this.courseDetailData.series_info.authority==0)
      {
        this.layerIndex=layer.confirm('购买系列后即可畅观全部课程，是否立即购买?', {
          title: '提示',
          area:'8rem',
          closeBtn: 0,
          btn: ['确定','取消'] 
        }, function(){
          layer.close(self.layerIndex)
          self.paySeriesParam.courseid=self.courseDetailData.series_id
          let {price,author_id,author_cert_code} = self.courseDetailData.series_info
          self.curRef='paymentSeries'
          self.$refs.paymentSeries.show(price,author_id,author_cert_code)
        })
      }else{
        this._id=id
        this.loadCourseData()
      }     
    },
    // 优质课程使用成功回调
    payCallBack(data){
      this.courseDetailData.authority=1
      this.courseDetailData.note_video=data.note_video
      this.courseDetailData.declare_content=data.declare_content
    },
    // 系列课程使用成功回调
    payCallBackSeries(data){
      this.courseDetailData.series_info.authority=1
    },
    // 系列课程使用
    buy(series_id){
      this.paySeriesParam.courseid=series_id
      let {price,author_id,author_cert_code} = this.courseDetailData.series_info
      this.curRef='paymentSeries'
      this.$refs.paymentSeries.show(price,author_id,author_cert_code)
    },
    // 优质课程支付
    payment(noteid){
      var self=this
      if(this.courseDetailData.pay_type==2){
          this.layerIndex=layer.confirm(self.courseDetailData.noPayModelText, {
            title: '提示',
            area:'8rem',
            closeBtn: 0,
            btn: ['确定'] 
          }, function(){
            layer.close(self.layerIndex)
          })
          return
      }
      this.payParam.noteid=noteid
      let {note_price,note_authorid,cert_code} = this.courseDetailData
      this.curRef='paymentCourse'
      this.$refs.paymentCourse.show(note_price,note_authorid,cert_code)
    },
    pptImgError(inx) {
      this.courseDetailData.ppts[inx].pptImage = 'test-png';
    }
  }
};
</script>