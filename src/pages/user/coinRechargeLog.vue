<style lang="scss" scoped>
.coinRechargeLog{
  height: 100%;
  background: #efeff4;
}
.coinRechargeLog .list{
  padding: 0px r(30);
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  height: r(100);
  background: #fff;
  padding-top: r(10);
  border-bottom: 1px solid #ccc;
}
.coinRechargeLog .list .left{
  font-size: 16px;
}
.coinRechargeLog .list .right{
  text-align: right;
  .red{
    color: red;
  }
  .result{
    font-size: 16px;
  }
  .time{
    font-size: 13px;
    color: #999;
  }
}
</style>
<template>
  <base-scroll :url='url' 
               :param='param' 
               :pageNoName='pageNoName'
               :pageSizeName='pageSizeName'
               :pageSize='pageSize' 
               @send-data="setPageData" 
               ref="baseScroll">
    <div slot='content' class='coinRechargeLog'>
      <div class='list' v-for="item in logs">
        <div class='left'>{{item.productName}}</div>
        <div class='right'>
          <span v-if='item.status == 2' class='result red'>支付成功</span>
          <span v-else class='result'>订单正在处理中</span>
          <div class='time'>{{item.createTime}}</div>
        </div>
      </div>
    </div>
  </base-scroll>
</template>

<script>
import BaseScroll from '@/components/BaseScroll';
export default {
  name: 'CoinRechargeLog',
  components: {
    BaseScroll
  },
  data() {
    return{
      url: this.$conster.API_URL.COIN_RECHARGE_LOG,
      param: {
        page_no: 1,
        page_size: 10,
        type: 'DK_COIN',
        category:'GOODS'
      },
      pageSize:'15',
      pageNoName:'pageNo',
      pageSizeName:'pageSize',
      logs: [],
    }
  },
  mounted: function() {
    this.$refs.baseScroll.refresh()
  },
  methods: {
    setPageData(data,type) {
      if(type==0){
        this.logs = []
      }
      data.forEach(v=>{
        v.createTime = this.$filter.formatTimeLocal(v.createTime);
        this.logs.push(v);
      });
    }
  }
}
</script>

<style>
</style>
