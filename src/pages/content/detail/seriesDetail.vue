<style lang="scss">
@import "../../../sass/pages/seriesDetail";
</style>
<template>
<div class="series-detail"
     @touchstart.stop="touchStart($event)"
     @touchmove.stop="touchMove($event)">
    <img class="series-img" 
         :src="seriesDetailData.adsImage" 
         v-if="seriesDetailData.adsImage&&seriesDetailData.adsImage!='test-png'" 
         @click="bannerEvt(seriesDetailData.adsLink)" 
         @error='coverImg()'/>
    <img class="series-img" src="/static/images/zw/series.png" alt="" v-else />
    <!-- tab切换 -->
    <div :class="['tab-blank',{'show-blank':tabBoxFixed}]"></div>
    <div :class="['tab-box',{'fixed':tabBoxFixed}]" ref='tab'>
        <div :class="{'active':activeTabIndex === 0,'default':true}" @click.stop="swichNav(0,0,0)">课程介绍</div>
        <div :class="{'active':activeTabIndex === 1,'default':true}" @click.stop="swichNav(1,{listTop},1)">课程目录</div>
    </div>
    <!-- 课程介绍 -->
    <div class="series-intro">
        <div class="int-msg">
            <div class="msg-title">{{seriesDetailData.title}}</div>
            <div class="msg-num">
                <span class="num-lesson">共{{seriesDetailData.lesson}}课时</span>
                <!-- <span class="num-play">{{seriesDetailData.playNum}}人看过</span> -->
            </div>
        </div>
        <div class="int-cont">
            <div class="cont-title">
                <span class="title-lef">课程内容</span>
                <span class="title-detail" v-if="seriesDetailData.profileLink" @click.stop="bannerEvt(seriesDetailData.profileLink)">详细介绍></span>
            </div>
            <div class="textHandle" v-html="seriesDetailData.profileHtml"></div>
        </div>
    </div>
    <!-- 课程目录 -->
    <div class="series-list">
        <div class="list-title" v-if="seriesDetailData.items">
            <span class="title-lef">全部课时</span>
            <span class="title-status" v-if="seriesDetailData.lesson==seriesDetailData.items.length">已完结</span>
            <span class="title-status" v-if="seriesDetailData.lesson>seriesDetailData.items.length">更新中</span>
        </div>
        <div class="list-content">
              <div class="list-box" 
                   v-for="(item, index) in seriesDetailData.items"
                   @click="toCourseDetail(item)">
                  <img class="box-img-play" src="/static/images/play.png"/>
                  <img class="box-img" 
                       :src="item.coverImage" 
                       v-if="item.coverImage&&item.coverImage!='test-png'"
                       @error="coverImgErrpr(index)"/>
                  <img class="box-img" src="/static/images/zw/course.png" v-else/>
                  <div class="box-msg">
                      <span class="msg-title">{{item.title}}</span>
                      <span class="msg-try" v-if="item.isTryPlay&&seriesDetailData.payType==2">试看</span>
                      <span class="msg-try" v-if="!item.isTryPlay&&item.sign">{{item.sign}}</span>
                      <div class="msg-detail">
                          <img class="msg-icon" 
                               :src="item.authorIco" 
                               v-if="item.authorIco"/>
                          <img class="msg-icon" 
                               src="/static/images/person.png" 
                               v-else/>
                          <span class="msg-name">{{item.authorName}}</span>
                          <span class="msg-time">{{item.createTime}}</span>
                          <!-- <span class="msg-num">{{item.playNum}}人看过</span> -->
                      </div>
                  </div>              
              </div>
        </div>
    </div>
    <!--老师介绍 -->
    <div class="detail-man" @click.stop="toDakaDetail(seriesDetailData.authorDetailAction)">
        <div class="li-lef">
            <img :src="seriesDetailData.authorIco" 
                 v-if="seriesDetailData.authorIco"/>
            <img src="/static/images/person.png" 
                 v-else/>
        </div>
        <div class="li-btw">
            <div>
                <span class="man-name">{{seriesDetailData.authorName}}</span>
                <span class="man-title"> | {{seriesDetailData.authorTitle}}</span>
            </div>
        </div>
        <div class="li-rig">  
        </div>
    </div>
    <!-- 填补系列空白 -->
    <div class="series-list-blank" 
         v-if="seriesDetailData.items && seriesDetailData.items.length<5 && seriesDetailData.items.length>0 " 
         :style="{height:2.7*(5-seriesDetailData.items.length)+'rem' }" ></div>
    <!-- 课程状态--> 
    <div class="series-blank" 
         v-if="(seriesDetailData.payType&&!seriesDetailData.authority)">    
    </div> 
    <div class="series-type" 
         v-if="(seriesDetailData.payType&&!seriesDetailData.authority)"> 
        <div class="type-pay" v-if="seriesDetailData.payType==2">
            <div class="pay-free" @click.stop="freeScan()" v-if="freeScanId">免费试看</div>
            <div :class="['pay-box', {'pay-box-len':!freeScanId}]" 
                 @click.stop="pay(seriesDetailData.id)">
                <span class="box-num">{{seriesDetailData.price}}</span>
                <span class="box-span">牛币/系列</span>
            </div>
        </div>
        <!-- <div class="type-share" v-if="seriesDetailData.payType==1">
            <button id="share-button" class="share-btn" @click.stop="share(seriesDetailData.id)">分享后可观看</button>
        </div> -->
    </div>

    <payment :payUrl="payUrl" 
             :payParam="payParam" 
             :vipType="vipType"
             @payCallBack="payCallBackSeries"
             ref="payment">
        <span slot="payCont">{{seriesDetailData.title}}</span>
        <span slot="payNum">{{seriesDetailData.price}}</span>
        <span slot="payType_o">系列</span>
        <span slot="payType_t">系列</span>
    </payment>
</div>
</template>
<script>
import userManager from "@/api/user-manager"
import Payment from '@/components/payment'
export default {
  name: "seriesDetail",
  components: {
        Payment,
  },
  data() {
    return {
      // 课程详情
      seriesDetailData: {},
      // 课程id
      _id: "",
      // tab栏
      activeTabIndex: 0,
      // tab滚动
      offsetTop: 0,
      offsetTop:0,
      tabBoxFixed: false,
      // 全部课程位置
      listTop: 0,
      // 试看课程id
      freeScanId: "",
      // 使用url及参数
      payUrl:this.$conster.API_URL.SERIES_PAY,
      payParam:{
          courseid:'',
          version:3.8,
          type:1,
      },
      vipType:1,
      layerIndex:null,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      var callback=from.meta.callback  
      if(callback){
        vm.$refs.payment.agreeRule()
      }
    })
  },
  created: function() {
    this.layerIndex=layer.load(1, {shade: false})
    this._id = this.$route.query.id;
    this.payParam.courseid = this._id;
    this.loadSeriesData();
  },
  mounted: function() {

  },
  methods: {
    loadSeriesData() {
      this.$http
        .getRequest(this.$conster.API_URL.SERIES_DETAIL, {
          id: this._id
        })
        .then(data => {
          this.seriesDetailData = data
          this.formatData(this.seriesDetailData.items)
          this.getFreeScanId()
          document.title=this.seriesDetailData.title
          layer.close(this.layerIndex)
        });
    },
    swichNav(index, top, type) {
      this.activeTabIndex = index;
      this.ImgHeight = $('.series-img').outerHeight(true); // 顶部相片的高度
      this.TitleTop = $( ".list-title" ).offset().top - $('.list-title').outerHeight(true) ;// 全部课时距离顶部的高度
      if (type == 1) {
        if(this.TitleTop>this.offsetTop){
          this.tabBoxFixed=true
        }
        $("html,body").animate({scrollTop:this.TitleTop + 1 }, 500)
      } else {
         $("html,body").animate({scrollTop:this.ImgHeight   }, 500)
      }
    },
    toCourseDetail(item,index){
      var self=this
      var itemAuthority,isTryPlay,id;
      itemAuthority=item.authority;
      isTryPlay=item.isTryPlay;
      id=item.id;
      if(this.seriesDetailData.authority==1&&this.seriesDetailData.payType!=1){
        this.$myRouter.navigateTo({path: `courseDetail?id=${id}`},this)
      }else if(itemAuthority&&isTryPlay&&this.seriesDetailData.payType==2){
        this.$myRouter.navigateTo({path: `courseDetail?id=${id}`},this)
      }else if(this.seriesDetailData.payType==1){
        this.$myRouter.navigateTo({path: `courseDetail?id=${id}`},this)
      }else if(this.seriesDetailData.payType==2){
        this.layerIndex=layer.confirm('购买系列后即可畅观全部课程，是否立即购买?', {
          title: '提示',
          area:'8rem',
          closeBtn: 0,
          btn: ['确定','取消'] 
        }, function(){
          layer.close(self.layerIndex)
          self.payParam.courseid=self._seriesId
          let {price,authorId,authorCertCode} = self.seriesDetailData
          self.$refs.payment.show(price,authorId,authorCertCode)
        })
      } 
    },
    // 老师详情
    toDakaDetail(action){
        this.$myRouter.navigateTo({ path: action  }, this);
    },
    bannerEvt(action) {
      if(!action)return
      this.$myRouter.navigateTo({ path: action }, this);
    },
    // 免费试看
    freeScan() {
      var id = this.freeScanId;
      this.$myRouter.navigateTo({ path: "courseDetail?id=" + id }, this);
    },
    // 获取试看课程id
    getFreeScanId() {
      var list, itemAuthority, isTryPlay;
      for (var i in this.seriesDetailData.items) {
        list = this.seriesDetailData.items[i];
        itemAuthority = list.authority;
        isTryPlay = list.isTryPlay;
        if (isTryPlay && itemAuthority) {
          this.freeScanId = list.id;
          return;
        }
      }
    },
    // 使用
    pay(id) {
      this.payParam.courseid = id
      let { price, authorId, authorCertCode } = this.seriesDetailData
      this.$refs.payment.show(price,authorId,authorCertCode)
    },
    // 处理时间戳
    formatData(data) {
      var list, time;
      for (var i in data) {
        list = data[i];
        time = list.createTime;
        time = this.$filter.formatTimeLocal(time);
        data[i].createTime = time;
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
    // 支付成功回调
    payCallBackSeries(data){
      this.seriesDetailData.authority=1
    },
    // 重写分享
    share(seriesId){
      return false
    },
    coverImg() {
      this.seriesDetailData.adsImage ='test-png';
    },
    coverImgErrpr(inx){
      this.seriesDetailData[inx].coverImage ='test-png';
    }
  }
};
</script>