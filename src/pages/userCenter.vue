<style lang="scss" scoped>
@import '../sass/pages/userCenter';
</style>

<template>
<div class='userCenter'>
    <!--顶部-->
    <div class='header'>
        <div v-if='hasUser'>
            <div :class="['ico-box', {'ico-box-vip':user.vip==1}]">
              <img class="ico" 
                   :src="user.userIco"
                   v-if="user.userIco&&user.userIco!='test-png'"
                   @error="userImgError()"/>
              <img class="ico" 
                   src="http://dakaname.oss-cn-hangzhou.aliyuncs.com/pubimages/headImg.png"
                   v-else/>
              <img class='ico-vip' 
                   src="/static/images/vip_icon.png" 
                   v-if="user.vip==1"/>
            </div>
            <div class='btns'>{{user.userName}}</div>
            <div class='time' v-if="user.vip==1">VIP有效期至{{user.vipExpiryDate}}</div>
        </div>
        <div v-else>
            <img class='ico' 
                 @click.stop='toLogin()'
                 src='/static/images/person.png'/>
            <div class='btns'>
                <span @click.stop='toRegister()'>注册</span> |
                <span @click.stop='toLogin()'>登录</span>
            </div>
        </div>
    </div>
    <!--分割线-->
    <div v-if='hasUser' class='recharge'>
        <span>牛币余额:{{user.coin}}</span>
        <button id='recharge_btn' @click.stop='toRecharge'>充值</button>
    </div>
    <div class='delivider'></div>
    <div class='item'>
        <div v-if='hasUser'>
            <div class='item-list' @click.stop="btnSendForm('incomeLog')">
                <div class='left'>
                    <img src='/static/images/userCenter/xfjl3x.png' class='icon'/>
                    <span>收支记录</span>
                </div>
                <div class='right'>
                    <img src='/static/images/youjiantou@3x.png' class='jt'/>
                </div>
            </div>
            <div class='delivider'></div>
            <div class='item-list border-b' @click.stop="toCheckIn">
                <div class='left'>
                    <img src='/static/images/userCenter/xxdj.png' class='icon'/>
                    <span>用户登记信息</span>
                </div>
                <div class='right'>
                    <span v-if='user.isRegistration == 1'>已登记</span>
                    <span v-else>未登记</span>
                    <img src='/static/images/youjiantou@3x.png' class='jt'/>
                </div>
            </div>
            <div class='item-list border-b' @click.stop="toFxcp">
                <div class='left'>
                    <img src='/static/images/userCenter/fxcp.png' class='icon'/>
                    <span>风险测评</span>
                </div>
                <div class='right'>
                    <span v-if='answerResult.answer_result'>{{answerResult.answer_result.levelName}}</span>
                    <span v-else>未测评</span>
                    <img src='/static/images/youjiantou@3x.png' class='jt'/>
                </div>
            </div>
            <div class='item-list border-b' @click.stop="toAgree">
                <div class='left'>
                    <img src='/static/images/userCenter/agree.png' class='icon'/>
                    <span>签署协议</span>
                </div>
                <div class='right'>
                    <img src='/static/images/youjiantou@3x.png' class='jt'/>
                </div>
            </div>
            <div class='delivider'></div>
        </div>
        <div class='item-list border-b' @click.stop="btnSendForm('aboutApp')">
          <div class='left'>
              <img src='/static/images/userCenter/gywm.png'  class='icon'/>
              <span>关于我们</span>
          </div>
          <div class='right'>
              <img src='/static/images/youjiantou@3x.png' class='jt'/>
          </div>
        </div>
        <a class='item-list border-b' href="http://q.url.cn/abJOpH?_type=wpa&qidian=true">
            <div class='left'>
                <img src='/static/images/userCenter/lxkf.png'  class='icon'/>
                <span>联系客服</span>
            </div>
            <div class='right'>
                <img src='/static/images/youjiantou@3x.png' class='jt'/>
            </div>
        </a>
        <div class='item-list border-b' @click.stop="toPublic">
          <div class='left'>
              <img src='/static/images/userCenter/public.png'  class='icon'/>
              <span>投顾资质公示</span>
          </div>
          <div class='right'>
              <img src='/static/images/youjiantou@3x.png' class='jt'/>
          </div>
        </div>
    </div>
    <div class='bottom' v-if='hasUser'>
        <button id='exitBtn' @click.stop='logout'>退出登录</button>
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

    <!-- 合规弹窗 -->
    <div class="user-layer" v-if="showHegui">
      <div class="layer-hg">
        <div class="hg-cont">{{hgCont}}</div>
        <div class="hg-notice">注:以上信息仅作监管备案用，不会以任何形式泄露给第三方，请放心填写。</div>
        <div class="hg-btn">
          <div class="btn-cancle" @click.stop="hgCancle">取消</div>
          <div class="btn-sure" @click.stop="hgSure">确定</div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import userManager from '@/api/user-manager'
export default {
  name: 'UserCenter',
  components: {
  },
  data() {
    return{
      hasUser: false,
      user: {},
      answerResult: {},
      layerIndex:null,
      // 签署前合规
      showHegui: false,
      hgCont: null,
      hgType: null,
    }
  },
  activated: async function() { 
    this.getDetail()
  },
  methods: {
    toLogin() {
      this.$myRouter.navigateTo({ path: 'mobileLogin?redirect=userCenter'},this)
      // this.$myRouter.navigateTo({ path: 'login?redirect=userCenter'},this)
    },
    toRegister() {
      this.$myRouter.navigateTo({ path: 'mobileRegister?register=true'},this)
      // this.$myRouter.navigateTo({ path: 'login?redirect=userCenter'},this)
    },
    //退出登录
    logout() {
      var self = this
      this.layerIndex=layer.confirm('确定退出登录?', {
        area:'8rem',
        title: '提示',
        closeBtn: 0,
        btn: ['确定','取消'] 
      }, function(){
        userManager.logout(() => {
          layer.close(self.layerIndex)
          self.hasUser = false;
          window.location.href=window.location.href.replace(window.location.search,'')
        })
      })
    },
    //点击充值按钮
    toRecharge() { 
      this.$myRouter.navigateTo({ path: `coinRecharge` },this);
    },
    //跳转风险测评
    toFxcp() {
      this.$myRouter.navigateTo({ path: 'fxcp?redirect=userCenter' },this)
    },
    //跳转用户信息登记
    toCheckIn() {
      this.$myRouter.navigateTo({ path: 'userCheckIn?redirect=userCenter' },this)
    },
    // 跳转签署协议
    toAgree(){
      var notice = '应证监会要求，为保障您的资金安全，请您在签署协议前完成'
      if (this.user.isRegistration!=1 || this.answerResult.answer_result.level==-1){     
        if (this.user.isRegistration!=1) {
          notice += '投资者信息登记'
          this.hgType = 1
        }
        if (this.user.isRegistration!=1 && this.answerResult.answer_result.level==-1){
          notice += '和风险能力测评。'
          this.hgType = 3
        } else if(this.answerResult.answer_result.level==-1){
          notice += '风险能力测评。'
          this.hgType = 2
        }
        this.hgCont = notice
        this.showHegui = true
        return false
      }
      this.$myRouter.navigateTo({ path: 'agreement' },this)
    },
    hgCancle(){
      this.showHegui = false
    },
    hgSure(){
      this.showHegui = false
      if(this.hgType==2){
        this.$myRouter.navigateTo({ path: 'fxcp?redirect=userCenter' },this)
      } else{
        this.$myRouter.navigateTo({ path: 'userCheckIn?redirect=userCenter' },this)
      }
    },
    btnSendForm(path){
      if(path=='null')return
       this.$myRouter.navigateTo({path:path},this)
    },
    // 投资资质公示
    toPublic(){
      this.$myRouter.navigateTo({ path: 'publicity' },this)
    },
    getDetail() {
      var self = this
      if (!this.hasUser) {
        this.layerIndex=layer.load(1, {shade: false}) 
      }
      userManager
        .getUserDetail()
        .then(data => {
          if(!data){
            self.hasUser = false  
          }else{
            self.hasUser = true
            self.user = data;
            self.formatData(self.user)
            self.hasUser = true;
            if (self.user.answerResult) {
              self.answerResult = JSON.parse(self.user.answerResult)
            }
          }
          layer.close(self.layerIndex)
        }).catch(err=>{
          console.error(err)
          self.hasUser = false 
          layer.close(self.layerIndex)
        })
    },
    // 时间戳
    formatData(data){
        var time;
        time=data.vipExpiryDate;
        if(!time)return
        time=this.$filter.formatTimestamp(time)
        time=time.split(' ')[0]
        data.vipExpiryDate = time
    },
    userImgError(){
      this.user.userIco = 'test-png'
    },
  },
}
</script>

