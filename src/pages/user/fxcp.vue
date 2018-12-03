<style lang='scss' scoped>
@import '../../sass/pages/userCenter/fxcp'
</style>
<template>
<div class='fxcp'>
  <div class='top'>本问卷共21道题，旨在了解您可承受的风险程度等情况，借此协助您选择合适的产品或服务类别。</div>
  <div class='list'>
    <div style='height:100%'>
      <div v-for='(item,index) in list' 
           class='list_item' 
           :id="'id-'+item.question.questionId">
        <div class='title'>{{item.question.question}}</div>
        <div v-if="item.question.type==1" 
             @click.stop="select(item.question.questionId,$event)">
          <div v-for='op in item.list'
               class="op_item">
            <input type="radio" 
                   :name="'id-'+item.question.questionId" 
                   :value='op.optionId' 
                   :id='op.optionId'
                   class="lz-radio"/>
            <span class="item_span">{{op.answer}}</span>
          </div>
        </div>
        <div v-else 
             @click.stop='mutileSelect(item.question.questionId,$event)'>
          <div v-for='(op,i) in item.list'
               class="op_item">  
            <div @click="togSelected(index,i)"
                 :class="{'checkLi':op.selected}">
              <input type="checkbox" 
                     :name="'id-'+item.question.questionId" 
                     :value='op.optionId' 
                     :id='op.optionId'
                     class="lz-checkbox-02"/>
            </div>
            <span class="item_span">{{op.answer}}</span>
          </div>
        </div>
      </div>
      <div style='text-indent:2em;font-size:15px;padding:0 20px;'>
        本人已经了解并愿意遵守国家有关证券市场管理的法律、法规、
        规章及相关业务规则，本人在此郑重承诺以上填写的内容真实、准确、完整。
      </div>
      <div style='height:50px'></div>
    </div>
  </div>
  <div class='bottom' style='height:50px' v-if="showSubmit">
    <button class='submit_btn' @click.stop='submit'>提交</button>
  </div>
  <div class='dialog' v-show='showDialog'></div>
  <div class='tan'  v-if='showConfirm'>
      <div class='header'>
        <div class='title'>风险承受能力评估结果确认书</div>
        <img class='close' @click.stop='cancel' src='/static/images/close2.png'/>
      </div>
      <div class='body'>
        <div>
          尊敬的投资者(姓名/名称:{{result.userName}};平台ID:{{result.userId}}):
        </div>
        <div>根据您填写的总分为100分的《投资者风险承受能力问卷调查》</div>
        <div>您的得分为：<span>{{result.score}}</span></div>
        <div>您的风险承受能力等级为：<span>{{result.levelName}}</span></div>
        <div>您的拟投资期限为：<span>{{result.tzqx}}</span></div>
        <div>您的拟投资品种为：<span>{{result.tzpz}}</span></div>
        <div>与您的风险等级相匹配的产品或服务为：<span>{{result.serveritem}}</span></div>
        <div>
          本公司在此郑重提醒：本公司向您销售的产品或提供的服务将以您的风险承受能力等级和投资品种、
          期限为基础，若您提供的信息发生任何重大变化，您都应当及时书面通知本公司。
          本公司建议您审慎评判自身风险承受能力、结合自身投资行为，认真反馈您的投资品种、期限，作出审慎的投资判断。
        </div>
        <div class='line'></div>
        <div>
          本人经贵公司提示，已充分知晓贵公司向本人销售的产品或
          提供的服务将以本人此次确认的风险承受能力等级和投资品种、
          期限为基础。若本人提供的信息发生任何重大变化，本人都会及时书面通知贵公司。
        </div>
        <div>
          本确认函系本人独立、自主、真实的意思表示，特此确认。
        </div>
        <div style='margin-top:20px;text-align:right;'>
          <div>投资者姓名:{{result.userSign}}</div>
          <div>日期:{{result.currDate}}</div>
        </div>
      </div>
      <div class='foot'>
        <div class='btn' @click.stop='confirm'>我已阅读并同意</div>
      </div>
  </div>
  <div class='tan2' v-if='showDownDialog'>
    <div class='header2'>您的风险测评结果为:</div>
    <div class='result'>{{result.levelName}}</div>
    <div class='sm'>
      【深圳市国诚投资咨询有限公司】由于您的风险承受能力测评结果发生了下调，
       由原来的{{result.lastLevelName}}调整为{{result.levelName}}，
       您在我司签署的投顾服务风险级别可能高于您目前的风险承受能力，现提醒您注意相应业务的投资风险，谨慎投资。如有疑问，可联系在线客服
       <span style='color:red'>4009663020</span>
    </div>
    <button @click.stop='confirmDown'>确认下调</button>
  </div>
  <div class='tan3' v-if='showSm'>
    <div class='title'>投资者风险承受能力评估问卷</div>
    <div class='content'>
      <div>
        风险承受能力评估是本公司履行投资者适当性管理职责的一个环节，
        旨在了解您的风险承受能力等情况，借此协助您选择合适的金融产品或金融服务类别，
        使本公司所提供的产品或服务与您的风险承受能力等级相匹配。
      </div>
      <div>
        本公司特别提醒您：本公司向投资者履行风险承受能力评估等适当性职责，
        并不能取代您自己的投资判断，也不会降低产品或服务的固有风险。
        同时，与产品或服务相关的投资风险、履约责任以及费用等将由您自行承担。
      </div>
      <div>
        本公司提示您：本公司根据您提供的信息对您进行风险承受能力评估，
        开展适当性工作。您应当如实提供相关信息及证明材料，
        并对所提供的信息和证明材料的真实性、准确性、完整性负责。
      </div>
      <div>
        本公司建议：当您的各项状况发生重大变化时，需对您所投资的产品及时进行重新审视，
        以确保您的投资决定与您可承受的投资风险程度等实际情况一致。
      </div>
      <div>
        本公司在此承诺，对于您在本问卷中所提供的一切信息，
        本公司将严格按照法律法规要求承担保密义务。
        除法律法规规定的有权机关依法定程序进行查询以外，
        本公司保证不会将涉及您的任何信息提供、泄露给任何第三方，或者将相关信息用于违法、不当用途。
      </div>
      <div style='margin-top:20px'>
        为了让您能正确了解自身的风险承受能力。便于为您提供相适合的产品和服务，我们为您设计了一套科学的评估问卷。
      </div>
    </div>
    <button class='start-btn' @click.stop='startCp'>开始测评</button>
  </div>
</div>
</template>

<script>
import userManager from '@/api/user-manager';
export default {
  name: 'Fxcp',
  components: {
  },
  data() {
    return{
      list: [],
      showDialog: false,
      showConfirm: false,
      showDownDialog: false,
      result: {},
      todiv: '',
      //是否显示声明
      showSm: true,
      // 是否显示提交按钮
      showSubmit:false,
      // 
      layerIndex:null,
    }
  },
  mounted: async function(){
    let self = this
    this.layerIndex=layer.load(1, {shade: false})
    let userInfo = await userManager.getUserDetail();
    layer.close(this.layerIndex)
    if (userInfo.isRegistration != 1) {
      this.layerIndex=layer.confirm('您还没有完成信息登记,是否去完成信息登记?', {
        title: '温馨提示',
        area:'8rem',
        closeBtn: 0,
        btn: ['确定','取消'] 
      }, function(){
        layer.close(self.layerIndex)
        self.$myRouter.redirectTo({ path: 'userCheckIn?redirect=fxcp' },self);
      },function(){
        layer.close(self.layerIndex)
        self.$myRouter.navigateBack({delta:1},self)
      })
    } else {
      this.showSm = true;
    }
  },
  methods: {
    //开始测评
    async startCp() {
      this.showSm = false;
      if (this.list.length == 0) {
        this.layerIndex=layer.load(1, {shade: false})
        this.list = await this.$http.getRequest(this.$conster.API_URL.FXCP_LIST);
        layer.close(this.layerIndex)
      }
      this.showSubmit=true
    },
    //单选
    select(questionId, e) {
      let q = this.list.find(e => {
        return e.question.questionId == questionId;
      });
      if(!e.target.value)return;
      q.selected = e.target.value;
    },
    //多选
    mutileSelect(questionId, e) {
      let q = this.list.find(e => {
        return e.question.questionId == questionId;
      });
      if(!e.target.value)return;
      
      let v = e.target.value;
      if(!q.selected){
        q.selected = v+','
      }else{
        if (q.selected.indexOf(v)>-1){
          q.selected=q.selected.replace(v+',','')
        }else{
          q.selected += v+','
        }
      }
    },
    /**
     * [togSelected description]
     * @param  {[type]} index [第几题]
     * @param  {[type]} i     [某一题的第几个答案]
     */
    togSelected(index,i){
      var v = this.list[index].list[i].selected
      this.list[index].list[i].selected = v ? false : true 
      this.$forceUpdate()
    },
    //提交服务器
    submit() {
      let self = this
      let unSelectedIndex = this.list.findIndex(v => {
        return !v.selected;
      });
      if (unSelectedIndex > -1) {
        layer.msg(`第${unSelectedIndex + 1}题还没有填写`);
        let id = this.list[unSelectedIndex].question.questionId;
        this.todiv = `id-${id}`;
        return false;
      }
      let selected = this.list.map(v => {
        if(v.selected.endsWith(',')){
          v.selected = v.selected.substring(0, v.selected.lastIndexOf(','))
        }
        return v.selected
      });
      this.layerIndex=layer.load(1, {shade: false})
      this.$http.getRequest(this.$conster.API_URL.FXCP_SUBMIT, {
        optionIdList: selected.join(',')
      })
      .then(data => {
        layer.close(self.layerIndex)
        self.showDialog = true;
        self.result = data;
        if (self.result.low == 0) {
          self.showConfirm = true;
          self.showDownDialog = false;
        } else {
          self.showDownDialog = true;
          self.showConfirm = false;
        }
      })
      .catch(err => layer.msg(err.errmessage));
    },
    //确认下调
    confirmDown() {
      this.showConfirm = true;
      this.showDownDialog = false;
    },
    //确认提交
    confirm() {
      let self = this
      let selected = this.list.map(v => {
        return v.selected;
      });
      this.layerIndex=layer.load(1, {shade: false})
      this.$http.getRequest(this.$conster.API_URL.FXCP_CONFIRM, {
          optionIdList: selected.join(',')
        })
        .then(data => {
          layer.close(self.layerIndex)
          self.$myRouter.observer(self.$route,self)
        })
        .catch(err => layer.msg(err.errmessage));
    },
    cancel() {
      this.showDialog = false;
      this.showConfirm = false;
      this.showDownDialog = false;
      this.result = {};
    },
  }
}
</script>
