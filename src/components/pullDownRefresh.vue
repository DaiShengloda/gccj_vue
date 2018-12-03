<style lang="scss">
.vue-pull-down{
    min-height:100%;
    .scroll-loading{
        display:flex;
        align-items: center;
        justify-content: center;
        height: r(120);
        width:100%;
        font-size: r(28);
        text-align: center;
        color: #999;
        background: #efeff5;
        img{
          width:r(80);
          height:r(80);
        }
    }
}
</style>
<template>
<div class="vue-pull-down"
    @touchstart.stop="touchStart($event)"
    @touchmove.stop="touchMove($event)"
    @touchend.stop="touchEnd($event)"> 
    <div class="scroll-loading" v-if="isTopLoading">
      <img src="https://dakaname.oss-cn-hangzhou.aliyuncs.com/mini_app_icons/load.gif"/>
    </div>
    <slot name="content"></slot>
</div>
</template>
<script>
export default {
    name:'PullDownRefresh',
    data(){
        return{
            // 滚动开始页面距顶距离
            scrollTopStart:'',
            // 滚动结束页面距顶距离
            scrollTopEnd:'',
            // 触摸距离页面起点
            startY: '',
            // 触摸距离屏幕起点
            clientY: '',
            // 下拉刷新
            isTopLoading: false,
            // 是否滑动
            hasMove:false,
        }
    },
    props:{

    },
    methods:{
        touchStart(e) {  
            //滚动开始页面距顶距离
            this.scrollTopStart=window.scrollY    
            // 触摸距离页面起点
            this.startY = e.targetTouches[0].pageY 
            // 触摸距离屏幕起点 
            this.clientY = e.targetTouches[0].clientY
        },
        touchEnd(e) {
            if(!this.hasMove)return
            this.hasMove=false
            // 滚动结束页面距顶距离
            this.scrollTopEnd=window.scrollY 
            var sLength=this.scrollTopEnd-this.scrollTopStart
             if(sLength<=0){
                if(this.startY+sLength<=this.clientY){
                    this.isTopLoading = true;
                    this.$emit('pull-down-refresh');
                }
            }      
        },
        touchMove(e) {
            this.hasMove=true
        },
        refreshOver(){
            this.isTopLoading = false
        },
    }
}
</script>