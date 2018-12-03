<!--合规组件-->
<style lang="scss">
div{
  white-space: normal;
}
.pop-bg {
  max-width: r(850);
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.6);
  position: fixed;
  top: 0;
  z-index: 999;
}
.pop-c {
  max-width: r(680);
  position: absolute;
  width: 80%;
  background: rgba($color: #fff, $alpha: 1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 5px;
}
.pop-c .top {
  padding: 10px;
}
.pop-c .top .content {
  text-indent: 2em;
  font-size: 15px;
  margin-bottom: 20px;
}
.pop-c .top .sm {
  font-size: 12px;
  color: #999;
}
.pop-c .btns {
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  border-top: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
}
.pop-c .btns .btn {
  width: 50%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
.pop-c .btns .border-l {
  border-right: 1px solid #ccc;
}
</style>
<template>
  <div>
    <div class='pop-bg' v-if='confirm'>
      <div class='pop-c'>
        <div class='top'>
          <div class='content'>{{remind}}</div>
          <div class='sm'>
            注:以上信息仅作监管备案用,不会以任何形式泄漏给第三方,请放心填写。
          </div>
        </div>
        <div class='btns'>
          <div class='btn border-l' @click.stop='cancelFun'>取消</div>
          <div class='btn' @click.stop='sure'>确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'HeGui',
  data() {
    return{
      //是否显示弹窗
      confirm: false,
      //弹窗提示信息
      remind: '',
      //点击确认合规执行方法
      okFun: '',
      //当前风险测评状态
      status: null,
      //合规接口返回数据
      heguiData: null,
      //合规的大咖id
      dakaId: null,
      //合规类型
      type: '',
      layerIndex:'',
      fullPath:'',
    }
  },
  mounted: function(){
    this.fullPath=this.$route.fullPath
  },
  methods: {
    //开始合规流程
    startHeguiForRecharge(status) {
      this.status = status;
      this.type = '充值';
      if (this.status == this.$conster.hgStatus.NO_SHOW) {
        this.$emit('finish');
      } else {
        this.executeHugui();
      }
    },
    //大咖合规
    async startHeguiForDaka(dkId, certCode) {
      var self=this
      var hgStatus=this.$conster.hgStatus 
      this.type = '投资消费'
      //从缓存查询已经合规的证书编号
      let localCode = localStorage.getItem('hg_cert_code') || 'NONE'
      if (localCode.includes(certCode)) {
        this.$emit('finish')
        return false
      }
      this.dakaId = dkId;
      if (this.status == null) {
        this.status = hgStatus.NO_SHOW;
      }
      //本地没有数据,请求服务器判断是否需要合规
      this.layerIndex=layer.load(1, {shade: false}) 
      let result = await this.$http.getRequest(this.$conster.API_URL.HG_CONFIRM, {
        bigNameId: dkId,
        version: '3.8'
      }).catch(err=>{
        layer.close(self.layerIndex)
      })
      layer.close(self.layerIndex)
      if(!result)return
      this.status = result.status
      if (this.status == hgStatus.NO_SHOW) {
        let s = localStorage.getItem('hg_cert_code');
        if (s) {
          s = s + ',' + certCode
        }
        localStorage.setItem('hg_cert_code', s);
        this.$emit('finish')
        return false
      }
      this.heguiData = result
      this.executeHugui()
    },
    //执行合规流程
    executeHugui() {
      if (this.status < this.$conster.hgStatus.NO_SHOW) {
        //提示信息
        let msg = `应证监会要求,为了保障您的资金安全,请您在${this.type}前完成`; 
        if (this.status == this.$conster.hgStatus.NO_ALL) {
          this.okFun = () => {
            this.$myRouter.navigateTo({ path: 'userCheckIn?delta=1' },this);
          };
          msg += '投资者信息登记和风险能力测评。';
        } else if (this.status == this.$conster.hgStatus.NO_REGISTRATED) {
          this.okFun = () => {
            this.$myRouter.navigateTo({ path: 'userCheckIn?delta=1' },this);
          };
          msg += '投资者信息登记。';
        } else if (this.status == this.$conster.hgStatus.NO_ANSWER) {
          this.okFun = () => {
            this.$myRouter.navigateTo({ path: 'fxcp?delta=1' },this);
          };
          msg += '风险能力测评。';
        }
        
        //显示弹窗
        this.confirm = true;
        this.remind = msg;
      } else if (this.status == this.$conster.hgStatus.IS_RETSET) {
        //风险等级不够提示重新测评
        this.layerIndex=layer.confirm(this.heguiData.message, {
          title: '提示',
          area:'8rem',
          closeBtn: 0,
          btn: ['确定'] 
        }, function(){
          layer.close(self.layerIndex)
        })
      } else if (this.status == this.$conster.hgStatus.SHOW_CONFIRM) {
        //显示确认书
        this.$myRouter.navigateTo({
          path: 'payConfirmBook?bignameId=' + this.dakaId+'&redirect='+encodeURIComponent(this.$route.fullPath)
        },this);
      }
    },
    sure() {
      this.okFun && this.okFun()
      this.confirm = false
    },
    cancelFun() {
      this.confirm = false
      this.$myRouter.navigateBack({delta:1},this)
    },
  },
}
</script>

