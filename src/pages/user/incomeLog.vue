<!--收支记录-->
<style lang='scss' scoped> 
.incomeLog {
  height: 100%;
  overflow: hidden;
}
.header {
  height: r(120);
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  color: #000;
  font-size: 15px;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
  .left {
    display: flex;
    align-items: center;
  }
  .left img {
    width: r(40);
    height: r(45);  
    margin-right: r(10);
  }
  img {
    height: r(40);
    width: r(40);
  }
}
.tab {
  font-size: 15px;
  display: flex;
  height: r(90);
  line-height: r(90);
  color: #000;
  background: #fff;
  .tab-h {
    width: 50%;
    text-align: center;
  }
  .active {
    color: #b79448;
    border-bottom: 1px solid #b79448;
  }
}
.tab-c {
  width: 100%;
  height: 80%;
  overflow: scroll;
  background: #fff;
  .list-item {
    padding: 0 r(30);
    height: r(140);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .f {
      display: block;
      color: #000;
      font-size: 15px;
    }
    .l {
      font-size: 12px;
      color: #999;
    }
    .left {
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .right {
      text-align: right;
    }
  }
}
</style>
<template>
  <div class='incomeLog'>
    <div class='header'>
        <div class='left'>
          <img src='/static/images/my_spent_money.png'/>
          <span>牛币余额: {{coin}}</span> 
        </div>
        <img src='/static/images/my_spent_unknow.png' @click.stop='toSm'/>
    </div>
    <div class='tab'>
      <div 
        :class="['tab-h', {'active':curScroll=='scrolldivB'}]"
        @click.stop='switchTab(2)'
      >支出</div>
      <div 
        :class="['tab-h', {'active':curScroll=='scrolldivA'}]"
        @click.stop='switchTab(1)'
      >收入</div>
    </div>
    <div class='tab-c'>
      <div style='height:100%' v-show="curScroll == 'scrolldivA'">
        <base-scroll
          :url='incomeLogUrl' 
          :param='param' 
          @send-data='setIncomeLog'
          ref='scrolldivA'
        >
          <div slot='content'>
            <div class='list-item' v-for="item in incomeLog">
              <div class='left'>
                <span class='f'>{{item.title}}</span>
                <span class='l'>{{item.content}}</span>
              </div>
              <div class='right'>
                <span class='f'>+ {{item.coin}}</span>
                <span class='l'>{{item.createTime }}</span>
              </div>
            </div>
          </div>
        </base-scroll>
      </div>
      <div style='height:100%' v-show="curScroll == 'scrolldivB'">
        <base-scroll 
          :url='consumeLogUrl' 
          :param='param' 
          @send-data='setConsumeLog'
          ref='scrolldivB'
        >
          <div slot='content'>
            <div class='list-item' v-for="item in consumeLog">
              <div class='left'>
                <span class='f'>{{item.title}}</span>
                <span class='l'>{{item.content}}</span>
              </div>
              <div class='right'>
                <span class='f'>- {{item.coin}}</span>
                <span class='l'>{{item.createTime }}</span>
              </div>
            </div>
          </div>
        </base-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import BaseScroll from '@/components/BaseScroll';
export default {
  name: 'IncomeLog',
  data() {
    return{
      //牛币余额
      coin: 0,
      //收入记录
      incomeLog: [],
      //消费记录
      consumeLog: [],
      incomeLogUrl: this.$conster.API_URL.INCOME_LOG,
      consumeLogUrl: this.$conster.API_URL.CONSUME_LOG,
      param: {
        page_no: 1,
        page_size: 10,
      },
      //当前tab
      curScroll: 'scrolldivB',
    }
  },
  components: {
    BaseScroll,
  },
  mounted() {
    var self=this
    this.$refs[this.curScroll].refresh()
    this.$http.getRequest(this.$conster.API_URL.QUERY_COIN).then(data => {
      self.coin = data;
    });
  },
  methods: {
    setIncomeLog(data,type) {
      if(type==0){
        this.incomeLog = []
      }
      data.forEach(v => {
        v.createTime = this.$filter.formatTimeLocal(v.createTime)
        v.content = v.content.replace(/[\r\n]+/g, '')
        this.incomeLog.push(v)
      })
    },
    setConsumeLog(data,type) {
      if(type==0){
        this.consumeLog = []
      }
      data.forEach(v => {
        v.createTime = this.$filter.formatTimeLocal(v.createTime)
        v.content = v.content.replace(/[\r\n]+/g, '')
        this.consumeLog.push(v)
      })
    },
    switchTab(index) {
      let curScroll = index == 1 ? 'scrolldivA' : 'scrolldivB'
      if (curScroll != this.curScroll) {
        this.curScroll = curScroll
      }
      if (
        (curScroll == 'scrolldivA' && this.incomeLog.length == 0) ||
        (curScroll == 'scrolldivB' && this.consumeLog.length == 0)
      ) {
        this.$refs[this.curScroll].refresh()
      }
    },
    toSm() {
      let src = encodeURIComponent(this.$conster.domain+'/static/app_gydkb.html')
      this.$myRouter.navigateTo({ path: `webview?src=${src}` },this)
    },
  }
}
</script>

