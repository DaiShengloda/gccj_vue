<!--用户信息登记-->
<style lang='scss' scoped>
@import '../../sass/pages/userCenter/userCheckIn'
</style>
<template>
  <form class='ck-form'>
    <div class='top'>
      <div class='input'>
        <span>投资者姓名</span>
        <input type="text" placeholder='请输入真实姓名' :value='info.name' @input.stop='inputName'/>
      </div>
      <div class='input'>
        <span>实际投资控制人</span>
        <input type="text" placeholder='实际投资控制者姓名' :value='info.realOperator' @input.stop="setValue('realOperator',$event)"/>
      </div>
      <div class='input'>
        <span>实际投资受益人姓名</span>
        <input type="text" placeholder='交易的实际受益人姓名' :value='info.realBeneficiary' @input.stop="setValue('realBeneficiary',$event)"/> 
      </div>
      <div class='input'>
        <span>二代身份证号码</span>
        <input type='text' :value='info.identityCard' maxlength='18' @input.stop="setValue('identityCard',$event)"/>
      </div>
      <div class='input'>
        <span>出生日期</span>
        <div class="picker" @click.stop="setDate">
          <div type="text">
            {{info.birthday}}
            <img src='/static/images/youjiantou@3x.png'/>
          </div>
        </div>
      </div>
      <div class='input'>
        <span>手机号码</span>
        <input type='text' :value='info.mobile'  maxlength='11' placeholder='请输入手机号码'
        @input.stop="setValue('mobile',$event)"/>
      </div>
      <!-- 学历 -->
      <div class='input'>
        <span>学历</span>
        <div class="picker" @click.stop="setEdu">
          <div type='text'>
            {{xlEnum[info.educationBackground]}}
            <img src='/static/images/youjiantou@3x.png'/>
          </div>
        </div>
      </div>
      <div class="picker-box" v-if='showEduPicker' @click.stop="hidePickBox">
        <div class="box-select" @click.stop="preventClick($event)">
          <div class="box-li" v-for="(item, index) in xlEnum" :key="item" @click.stop="setValue('educationBackground',$event,index)">
            {{item}}
          </div>
        </div>
      </div>
      <!-- 职业 -->
      <div class='input'>
        <span>职业</span>
        <div class="picker" @click.stop="setJob">
          <div type='text'>
            {{jobEnum[info.job]}}
            <img src='/static/images/youjiantou@3x.png'/>
          </div>
        </div>
      </div>
      <div class="picker-box" v-if='showJobPicker' @click.stop="hidePickBox">
        <div class="box-select" @click.stop="preventClick($event)">
          <div class="box-li" v-for="(item, index) in jobEnum" :key="item" @click.stop="setValue('job',$event,index)">
            {{item}}
          </div>
        </div>
      </div>
      <!-- 不良诚信记录 -->
      <div class='input'>
        <span>不良诚信记录</span>
        <div class="picker" @click.stop="setRecord">
          <div type='text'>
            {{creditRecordEnum[info.creditRecord]}}
            <img src='/static/images/youjiantou@3x.png'/>
          </div>
        </div>
      </div>
      <div class="picker-box" v-if='showRecordPicker' @click.stop="hidePickBox">
        <div class="box-select" @click.stop="preventClick($event)">
          <div class="box-li" v-for="(item, index) in creditRecordEnum" :key="item" @click.stop="setValue('creditRecord',$event,index)">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div style='height:120px'></div>
    <div class='bottom'>
      <div class='mz' for='ck'>
        <input type="checkbox" id='ck' @click.stop='agreeRule'/>
        <span>本人保证资金来源的合法性和所提供资料的真实性、有效性、准确性、完整性，并对其承担责任。认同本声明视为本人已签名。</span>
      </div>
      <button v-if='isSelectRule' class='btn_act' @click.stop.prevent="submit">提交</button>
      <button v-else class='btn_dis' @click.stop.prevent='notAgreeRule'>提交</button>
    </div>
  </form>  
</template>

<script>
export default {
  name:'UserCheckIn',
  components: {
  },
  data() {
    return{
      //学历枚举
      xlEnum: [],
      showEduPicker:false,
      //职业枚举
      jobEnum: [],
      showJobPicker: false,
      //不良诚信记录枚举
      creditRecordEnum: [
        '无不良诚信记录',
        '中国人民银行征信中心',
        '最高人民法院失信被执行人名单',
        '工商行政管理机构',
        '税务管理机构',
        '监督机构、自律组织',
        '证券经营机构投资的失信记录',
        '恶意维权等不当行为',
        '其他'
      ],
      showRecordPicker: false,
      // 当前时间
      curDate: null,
      info: {},
      //是否同意条款
      isSelectRule: false,
      layerIndex: null,
    }
  },
  mounted: function(){
    let self = this
    let date = new Date()
    this.curDate = date.toLocaleDateString().replace(/\//g, '-')
    this.layerIndex=layer.load(1, {shade: false}) 
    this.$http.getRequest(this.$conster.API_URL.GET_USER_REGISTRATION).then(data => {
      layer.close(self.layerIndex)
      //学历枚举
      for (let v of data.educationList) {
        self.xlEnum.push(v.desc);
      }
      //职业枚举
      for (let v of data.jobList) {
        self.jobEnum.push(v.desc);
      }
      self.info = {
        name: data.name,
        realOperator: data.realOperator,
        realBeneficiary: data.realBeneficiary,
        birthday: self.$filter.formatTimestampToDate(data.birthday),
        identityCard: data.identityCard,
        mobile: data.mobile,
        //学历
        educationBackground: data.educationBackground-1,
        job: data.job-1,
        jobDesc: self.jobEnum[data.job-1],
        creditRecord: self.creditRecordEnum.findIndex(
          e => data.creditRecord == e
        )
      }
    })
  },
  methods: {
    inputName(e) {
      let v = e.currentTarget.value;
      this.info.name = v;
      this.info.realOperator = v;
      this.info.realBeneficiary = v;
    },
    setDate(){
      var pickDate
      this.$picker.show({
         type:'datePicker',
         date:this.info.birthday,  
         endTime:this.curDate, 
         startTime:'1949-01-01',
         format:"yyyy-MM-dd",
         onOk:(e)=>{
           pickDate = e.split('-')
           pickDate[1] = pickDate[1]>9 ? pickDate[1] : '0'+pickDate[1]
           pickDate[2] = pickDate[2]>9 ? pickDate[2] : '0'+pickDate[2]
           pickDate = pickDate.join('-')
           this.info.birthday = pickDate
         }
       })
    },
    setEdu(){
      this.showEduPicker=true
    },
    setJob(){
      this.showJobPicker=true
    }, 
    setRecord(){
      this.showRecordPicker=true
    },
    hidePickBox(){
      this.showEduPicker=false
      this.showJobPicker=false
      this.showRecordPicker=false
    },
    preventClick(e){
      e.preventDefault()
    },
    setValue(name, e, index) {
      if(index==null){
        this.info[name] = e.currentTarget.value
      }else {
        this.info[name] = index
        this.showEduPicker=false
        this.showJobPicker=false
        this.showRecordPicker=false
      }    
    },
    agreeRule() {
      this.isSelectRule = !this.isSelectRule;
    },
    notAgreeRule(event) {
      layer.msg('请勾选声明');
      event.preventDefault()
    },
    submit() {
      let self = this
      let info = Object.assign({}, this.info)
      let regularUtil = this.$tool.regular()

      if (!info.name) {
        layer.msg('请输入投资者姓名');
        return false;
      }
      if (!regularUtil.isName(info.name.trim())) {
        layer.msg('投资者姓名为2到10位汉字或字母');
        return false;
      }
      if (!info.realOperator) {
        layer.msg('请输入实际投资控制人姓名');
        return false;
      }
      if (!regularUtil.isName(info.realOperator.trim())) {
        layer.msg('实际投资控制人姓名为2到10位汉字或字母');
        return false;
      }
      if (!info.realBeneficiary) {
        layer.msg('请输入实际投资受益人姓名');
        return false;
      }
      if (!regularUtil.isName(info.realBeneficiary.trim())) {
        layer.msg('实际投资受益人姓名为2到10位汉字或字母');
        return false;
      }
      if (!regularUtil.issfz(info.identityCard)) {
        layer.msg('请输入正确的18位身份证号');
        return false;
      }
      if (!info.birthday) {
        layer.msg('出生日期不能为空');
        return false;
      }
      // 获取身份证上的出生日期
      let idCard = info.identityCard;
      let birthday = null;
      if(idCard.length == 15){  
        birthday = "19"+idCard.substr(6,6);  
      } else if(idCard.length == 18){  
        birthday = idCard.substr(6,8);  
      }  
      birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-"); 
      if (birthday != info.birthday) {
        layer.msg('出生日期与身份证信息不匹配');
        return false;
      }
      if (!regularUtil.isPhone(info.mobile)) {
        layer.msg('请输入正确的11位手机号码');
        return false;
      }
      if (
        info.educationBackground == undefined ||
        info.educationBackground == null
      ) {
        layer.msg('学历不能为空');
        return false;
      }
      info.educationBackgroundDesc = this.xlEnum[info.educationBackground];
      if (info.job == -1) {
        layer.msg('职业不能为空');
        return false;
      }
      if (info.creditRecord == -1) {
        layer.msg('不良诚信记录不能为空');
        return false;
      }
      info.creditRecord = this.creditRecordEnum[info.creditRecord]
      info.jobDesc = this.jobEnum[info.job]
      this.layerIndex=layer.load(1, {shade: false}) 
      this.$http.getRequest(this.$conster.API_URL.SAVE_USER_REGISTRATION, info)
        .then(data => {
          layer.close(self.layerIndex)
          self.$myRouter.observer(self.$route,self)
        })
        .catch(err => {
          layer.close(self.layerIndex)
          layer.msg(err.errmessage);
        });
    }
  }
}
</script>

