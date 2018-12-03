<style lang="scss">
@import "../sass/pages/index";
</style>
<template>
<pull-down-refresh @pull-down-refresh="pullDownRefresh" 
                   ref="pullDownRefresh">
    <div class="index" slot="content">
      <!-- banner -->
      <div class="dex-banner" 
           v-if="indexData.ads">
          <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide"
                     v-for="(item, index) in indexData.ads"
                     @click.stop="bannerEvt(item.action)">
                  <img class="slide-image" 
                       :src="item.icon" 
                       v-if="item.icon&&item.icon!='test-png'"
                       @error="bannerImgError(index)"/>
                  <img class="slide-image" 
                       src="/static/images/zw/banner.png" 
                       v-else/>
                </div>
              </div>
              <div class="swiper-pagination" v-if="indexData.ads.length>1"></div>
          </div>
      </div>
      <!-- tab -->
      <div class="dex-tab">
          <div class="swiper-tab" >
            <div class="swiper-wrapper">
              <div class="swiper-slide" 
                   v-for="(value,i) in indexData.buttons">
                <div class="tab-box-btn" 
                     v-for="(item, index) in value" 
                     @click.stop="bannerEvt(item.action)">
                  <img class="box-img" 
                       :src="item.icon" 
                       v-if="item.icon&&item.icon!='test-png'"
                       @error="tabImgError(i,index)"/>
                  <img class="box-img" 
                       src="/static/images/btn_icon.png" 
                       v-else/>
                  <div class="box-title">{{item.title}}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <!-- 公告 -->
      <div class="dex-notice"
           v-if="indexData.public_notice&&indexData.public_notice.length>0">
        <div class="not-lef"
             v-if="indexData.public_notice.length>0">
          <div class="lef-text">公告</div>
          <img class="lef-icon" src="/static/images/notice.png">
        </div>
        <div class="not-rig"
             v-if="indexData.public_notice.length>0">
          <div class="swiper-notice">
            <div class="swiper-wrapper">
              <div class="swiper-slide"
                   v-for="item in indexData.public_notice"
                   @click.stop="bannerEvt(item.action)">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 股市直播 -->
      <div class="vip-live" v-if="indexData.live_place">
          <div class="live-box"
               @click.stop="bannerEvt(indexData.live_place.action)">
              <img class="box-img" 
                   :src="indexData.live_place.image" 

                   v-if="indexData.live_place.image&&
                         indexData.live_place.image!='test-png'"
                   @error="liveImgError()"/>
              <img class="box-img" 
                   src="/static/images/zw/home_Live.png" 
                   v-else/>
          </div>
      </div>
      <!-- 产品列表 -->
      <div class="dex-product" v-if="recommendData.recommendList">
          <div class="pro-box" 
               v-for="(item, index) in recommendData.recommendList"
               @click.stop="handlerAction(item.id)">
              <div class="box-top">
                  <img class="top-img" 
                       :src="item.imgUrl" 
                       v-if="item.imgUrl&&item.imgUrl!='test-png'"
                       @error="productImgError(index)"/>
                  <img class="top-img" src="/static/images/zw/list.png" v-else/>
                  <div class="top-rig">
                      <div class="rig-title">
                          <div class="title-txt">{{item.name}}</div>
                          <div class="title-sign">{{item.tags}}</div>
                      </div>
                      <div class="rig-cont">{{item.discript}}</div>
                      <div class="rig-price rig-des" 
                           v-if="item.priceDescription">
                        {{item.priceDescription}}
                      </div>
                      <div class="rig-price" v-else>￥<span class="price-num">{{item.price}}</span>元起/{{item.period}}天</div>
                  </div>
              </div>
              <div class="box-recommend" v-if="item.type=='SWIFT_PAN'">
                  <div class="rec-stock">
                      <div class="stock-lef">
                          <div class="lef-txt">最新荐股:</div>
                          <div class="lef-name">****</div>
                      </div>
                      <div class="stock-rig">
                          <img class="rig-img" src="/static/images/index/pay.png">
                          <span class="rig-txt">开通可见</span>
                      </div>
                  </div>
                  <div class="rec-advice">
                      <div class="ad-txt">建议:</div>
                      <div class="ad-detail">
                          <div class="detail-box">
                              关注价位<span class="box-value"> **</span>
                          </div>
                          <div class="detail-box">
                              压力位<span class="box-value"> **</span>
                          </div>
                          <div class="detail-box">
                              支撑位<span class="box-value"> **</span>
                          </div>
                          <div class="detail-box">
                              仓位建议<span class="box-value"> **</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="box-recommend" v-else-if="item.type=='MAIN_LAYOUT'">
                  <div class="rec-stock">
                      <div class="stock-lef">
                          <div class="lef-txt">最新荐股:</div>
                          <div class="lef-name">****</div>
                      </div>
                      <div class="stock-rig">
                          <img class="rig-img" src="/static/images/index/pay.png">
                          <span class="rig-txt">开通可见</span>
                      </div>
                  </div>
              </div>
              <div class="box-recommend" v-else-if="item.type=='SUPERMAN_STEER'">
                  <div class="rec-stock">
                      <div class="stock-lef">
                          <div class="lef-txt">最新调仓</div>
                      </div>
                      <div class="stock-rig">
                          <img class="rig-img" src="/static/images/index/pay.png">
                          <span class="rig-txt">开通可见</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>        
      <!-- 大咖战绩 -->
      <div class="dex-record" v-if="dakaRecordData.length>0">
          <!-- <div class="record-title">大咖战绩</div> -->
          <div class="record-list">
              <div class="list-box"
                   v-for="item in dakaRecordData"
                   @click.stop="bannerEvt(item.action)">
                  <div class="box-lef">
                      <div class="lef-circle">
                          <div class="circle-top">{{item.tags}}</div>
                          <div class="circle-bom">收益率</div>
                      </div>
                  </div>
                  <div class="box-rig">
                      <div class="rig-title">{{item.title}}</div>
                      <div class="rig-cont">{{item.descript}}</div>
                  </div>
              </div>
          </div>
      </div>
      <!-- 今日话题 -->
      <div class="dex-theme" 
            v-if="indexData.hots&&(indexData.hots.oneItem.length>0||indexData.hots.twoItem.length>0)">
          <div class="theme-title"
               v-if="indexData.hots.oneItem.length>0||indexData.hots.twoItem.length>0">
             今日话题
          </div>
          <div class="theme-col"
               v-if="indexData.hots.oneItem.length>0">
              <div class="col-box"
                   v-for="item in indexData.hots.oneItem"
                   @click.stop="bannerEvt(item.action)">
                  <div class="box-top">
                      <img class="top-img" 
                           :src="item.icon"
                           v-if="item.icon"/>
                      <div class="top-sign" 
                           v-else-if="item.sign"
                           :style="{'background':item.template.color}">{{item.sign}}</div>
                      <div class="top-sign-rig" 
                           v-if="item.sign&&!item.icon"
                           :style="{'border-left-color':item.template.color}">
                      </div>
                      <span class="top-title">{{item.title}}</span>
                  </div>      
                  <div class="box-bom">{{item.profile}}</div>    
              </div>
          </div>
          <div class="theme-row"
               v-if="indexData.hots.twoItem.length>0"
               :style="{'height':1.34*Math.ceil(indexData.hots.twoItem.length/2)+'rem'}">
              <div class="row-box"
                   v-for="item in indexData.hots.twoItem"
                   @click.stop="bannerEvt(item.action)">
                  <div class="box-msg">
                      <img class="msg-img" 
                           :src="item.icon"
                           v-if="item.icon"/>
                      <div class="msg-sign" 
                           v-else-if="item.sign"
                           :style="{'background':item.template.color}">{{item.sign}}</div>
                      <div class="msg-title">{{item.title}}</div>
                  </div>
              </div>
          </div>
      </div>
      <!-- 热门推荐 -->
      <div class="dex-recommend" v-if="recommend.length>0&&isContent">
        <div class="recom-title">热门推荐</div>
            <div class="recom-box" 
                 v-for="(item, index) in recommend"
                 v-if="item.hotcontents.length>0">
              <div class="box-top" 
                   @click.stop="bannerEvt(item.authorDetailAction)">
                  <div class="li-lef">
                      <img :src="item.user_ico" v-if="item.user_ico" />
                      <img src="/static/images/person.png" v-else />
                  </div>
                  <div class="li-btw">
                      <div>
                          <span class="man-name">{{item.user_name}}</span>
                          <span class="man-title"> | {{item.user_title}}</span>
                      </div>
                      <div class="man-int">
                        <div class="int-time">发表于{{item.hotcontents[0].create_time}}</div>
                        <div class="int-sign-index">{{item.hotcontents[0].sign}}</div>
                      </div>
                  </div>
              </div>
              <div class="box-mid" @click.stop="bannerEvt(item.hotcontents[0].content_action)">
                  <div class="mid-title" v-if="item.hotcontents[0].summry">{{item.hotcontents[0].title}}</div>
                  <div class="mid-int" v-if="item.hotcontents[0].summry">{{item.hotcontents[0].summry}}</div>
                  <div class="mid-int" v-else>{{item.hotcontents[0].title}}</div>
                  <div class="mid-audio" v-if="item.hotcontents[0].content_type==4">
                      <img class="audio-icon" :src="wg_image_2" v-if="item.hotcontents[0].listen_price==0">
                      <img class="audio-icon" :src="wg_image_0" v-else-if="item.hotcontents[0].audio_txt!='已付费'"> 
                      <img class="audio-icon" :src="wg_image_3" v-else-if="item.hotcontents[0].audio_txt=='已付费'">
                      <span class="audio-txt" v-if="item.hotcontents[0].audio_txt!='已付费'&&item.hotcontents[0].listen_price>0">{{item.hotcontents[0].listen_price}}牛币付费听</span>
                      <div class="audio-len">{{item.hotcontents[0].audio_length}}"</div>
                  </div>
                  <div class="mid-video" v-if="item.hotcontents[0].video_img">
                      <img class="video-img" 
                           :src="item.hotcontents[0].video_img" 
                           v-if="item.hotcontents[0].video_img!='test-png'"
                           @error="imgError(index)"/>
                      <img class="video-img" 
                           src="/static/images/zw1.png" 
                           v-else/>
                      <img class="video-play" 
                           src="/static/images/play.png"/>
                  </div> 
                  <div class="mid-img" v-if="item.hotcontents[0].noteImgs&&item.hotcontents[0].noteImgs[0]">
                      <img class="img-noteImgs" 
                           :src="item.hotcontents[0].noteImgs[0].img_url" 
                           v-if="item.hotcontents[0].noteImgs[0].img_url!='test-png'"
                           @error="noteImgError(index)"/>
                      <img class="img-noteImgs" 
                           src="/static/images/zw2.png" 
                           v-else/>
                  </div>
              </div>
              <div class="box-bom">
                <span class="bom-value" v-if="item.hotcontents[0].value>0&&item.hotcontents[0].noteImgs&&item.hotcontents[0].noteImgs[0]">{{item.hotcontents[0].descritption}}</span>
              </div>
          </div>
      </div>
      <!-- 页脚信息 -->
      <div class="dex-footer">
        <!-- <div class="footer-top">
          <img class="top-img" src="/static/images/footer_name.png">
        </div> -->
        <div class="footer-mid">
          <img class="mid-img" src="/static/images/footer_blank.png">
          <div class="mid-msg">
            <img class="msg-img" src="/static/images/footer_per.png">
            <div class="msg-box">
              <div class="box-des">24小时客服热线</div>
              <a class="box-phone"
                 href="tel://400-966-3020">400-966-3020</a>
            </div>
          </div>
        </div>
        <div class="footer-bom">
          <div class="bom-title">
            <img class="title-img" src="/static/images/footer_qus.png">
            <div class="title-txt">违法和不良信息投诉渠道</div>
          </div>
          <div class="bom-phone">
            电话:<a href="tel://0755-28702860" class="phone-num">0755-28702860</a>(工作日9:00-18:00)邮箱:ts@cf69.com
          </div>
        </div>
      </div>
    </div>
</pull-down-refresh>
</template>
<script>
import userManager from "@/api/user-manager"
import PullDownRefresh from '@/components/pullDownRefresh'
export default {
  name: "Index",
  components: {
    PullDownRefresh
  },
  data() {
    return {
      // 推荐位数据
      indexData: {},
      // 产品列表
      recommendData: {},
      // 大咖战绩
      dakaRecordData: {},
      // 推荐数据
      recommend: {},
      //免费听
      wg_image_2:
        "https://dakaname.oss-cn-hangzhou.aliyuncs.com/mini_app_icons/wgmft.png",
      //已付费
      wg_image_3:
        "https://dakaname.oss-cn-hangzhou.aliyuncs.com/mini_app_icons/wgyff.png",
      wg_image_0:
        "https://dakaname.oss-cn-hangzhou.aliyuncs.com/mini_app_icons/wgfft.png",
      // 首页swiper
      bannerSwiper:null,
      // tab-swiper
      tabSwiper:null,
      // 公告swiper
      noticeSwiper:null,
      // 热门库推荐是否有内容
      isContent: false
};
  },
  computed: {},
  activated: function() {
    this.home()
    this.recommendList()
    this.dakaRecord()
    this.dakaRecommend()  
  },
  methods: {
    // 获取推荐位数据
    // banner、button、公告、支部广告、今日话题
    home() {
      this.$http.getRequest(this.$conster.API_URL.INDEX_SET, {
          position: 100101
      }).then(data => {
        this.indexData = data
        //测试数据--start
        // this.indexData.buttons.push({
        //   title:'vip专区',
        //   action: 'vip',
        //   icon:'http://file.dakawengu.com/image/2018-07-24/1532413206266.png'
        // })
        // 测试数据--end
        this.formatButton(this.indexData.buttons);
        // 轮播图设置
        this.initSwiper();
        // 调用子组件pullDownRefresh中终止刷新的方法
        this.$refs.pullDownRefresh.refreshOver()
      });
    },
    // 处理按钮数据
    formatButton(data) {
      var button, n, r
      var buttons = []
      for (var i in data) {
        button = data[i]
        n = Math.floor(i / 12);
        r = i % 12
        if (r == 0 && button) {
          buttons[n] = []
        }
        buttons[n][r] = button
      }
      this.indexData.buttons = buttons
    },
    // 轮播图banner和button轮播设置
    initSwiper(){
      var self=this
      setTimeout(()=> {
        // 判断轮播是否存在
        if(self.bannerSwiper||self.tabSwiper)return
        // 创建swiper
        self.bannerSwiper=new Swiper(".swiper-container", {
          autoplay: {
            delay: 2000 //2秒切换一次
          },
          loop:true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        })
        // 当只有一张轮播时停止滑动
        if(self.indexData.ads.length==1){
          self.bannerSwiper.allowTouchMove= false
        }
        // 创建button轮播
        self.tabSwiper=new Swiper(".swiper-tab", {
        })
        if(self.indexData.buttons.length==1){
          self.tabSwiper.allowTouchMove= false
        }
        // 创建公告轮播
        self.noticeSwiper=new Swiper(".swiper-notice", {
          autoplay: {
            delay: 3000 
          },
          direction : 'vertical',
          loop : true,
          allowTouchMove: false,
        })
      }, 100)
    },
    // 下拉刷新
    pullDownRefresh(){
      this.home();
      this.recommendList();
    },
    // 获取最新推荐列表
    recommendList() {
      this.$http
        .getRequest(this.$conster.API_URL.PRODUCT_LIST, {})
        .then(data => {
          this.recommendData = data;
        });
    },
    // 获取大咖战绩列表
    dakaRecord() {
      this.$http
        .getRequest(this.$conster.API_URL.DAKA_RECORD, {})
        .then(data => {
          this.dakaRecordData = data;
        });
    },
    // 获取大咖推荐列表
    dakaRecommend() {
      this.$http.getRequest(this.$conster.API_URL.INDEX_HOT, {
      }).then(data => {
        this.recommend = data;
        this.formateDate(this.recommend);
        for(let i = 0; i < data.length; i++ ){
          if (data[i].hotcontents.length > 0) {
            this.isContent = true;
            return
          }
        }
      });
    },
    async handlerAction(productId) {
      var self=this
      await userManager.triggerIntercept()
      this.$http.getRequest(this.$conster.API_URL.PRODUCT_ACTION,{
          productId: productId
      }).then(data=>{
          if(!data.action){
            return
          }
          self.$myRouter.navigateTo({path:data.action},self)
      })
    },
    // 点击页面跳转
    bannerEvt(action) {
      action=action.replace('note?','noteDetail?')
      action=action.replace('course?','courseDetail?')
      this.$myRouter.navigateTo({ path: action }, this);
    },
    //大咖推荐数据转换
    formateDate(recommend) {
      var list,time,sign,readnum
      for (var i in recommend) {
        list = recommend[i];
        if(!list.hotcontents[0])continue
        time = list.hotcontents[0].create_time;
        // 时间转换
        time = this.$filter.formatTimeLocal(time);
        recommend[i].hotcontents[0].create_time = time;
        // sign=this.$filter.matchColor(list.hotcontents[0])
        // recommend[i].hotcontents[0].sign = sign
        readnum=list.hotcontents[0].readnum
        readnum=this.$filter.dealReadNum(readnum)
        recommend[i].hotcontents[0].readnum = readnum
      }
    }, 
    // 监听图片加载
    imgError(index){
      this.recommend[index].hotcontents[0].video_img = 'test-png'
    },
    productImgError(index){
      this.recommendData.recommendList[index].imgUrl = 'test-png'
    },
    bannerImgError(index){
      this.indexData.ads[index].icon = 'test-png'
    },
    noteImgError(index){
      this.recommend[index].hotcontents[0].noteImgs[0].img_url = 'test-png'
    },
    tabImgError(i,index){
      this.indexData.buttons[i][index].icon = 'test-png';
	},
    liveImgError(){
      this.indexData.live_place.image = 'test-png';
    }
  }

}
</script>