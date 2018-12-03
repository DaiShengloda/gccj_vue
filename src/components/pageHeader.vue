<style lang="scss">
</style>
<template>
 <div class="header">
    <div class="left">{{headerData.name}}</div>
    <div class="right" @click="popus()"></div>
    <div v-show="active" class="popus-header">
        <div class="shadeBox" @click="close()"></div>
        <ul>
            <li>
              <router-link to="/manage">
              <i class="iconfont icon-yuangongfenpei"></i>推广分配
              </router-link></li>
            <li><i class="iconfont icon-qianyuequerenqianyuedianziqianyue"></i>移动签单</li>
            <li><i class="iconfont icon-peixunjihuaon"></i>计划书</li>
            <li>
              <router-link to="/record">
              <i class="iconfont icon-dianhua2"></i>通话记录
              </router-link>
              </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
  props: {
    headerData: undefined
  },
  data () {
    return {
      // 保险分类数据
      active:false
    }
  },
  methods:{
      //点击切换公共id
    popus:function(){
      this.active=true
    },
    //根据产品id决定产品显示与否
    close(){
       this.active=false
    }
  },
  mounted:function(){
    // this.changes();
    
  },
  watch:{
    headerData(newVal){
      console.log(newVal);
      
    }
  }
  
}
</script>