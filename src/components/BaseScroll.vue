<style lang="scss">
@import '../sass/components/baseScroll';
</style>
<template>
<div class="vue-scroll"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"> 
    <div class="scroll-loading" v-if="isTopLoading">
      <img src="https://dakaname.oss-cn-hangzhou.aliyuncs.com/mini_app_icons/load.gif"/>
    </div>
    <slot name="content"></slot>
    <div class="scroll-loading sBom-loading" v-if="isBottomLoading">
      <img src="https://dakaname.oss-cn-hangzhou.aliyuncs.com/mini_app_icons/load.gif"/>数据正在加载中...
    </div>
    <div class="scroll-loading" v-if="!hasMore&&!isNoData">
      数据加载完毕
    </div>
    <div class="scroll-loading" v-if="isNoData">
      暂无数据
    </div>
</div>
</template>
<script>
export default {
    name:'BaseScroll',
    data(){
        return{
            // 滚动开始页面距顶距离
            scrollTopStart:'',
            // 滚动结束页面距顶距离
            scrollTopEnd:'',
            // 页面高度
            pageHeight:'',
            // 屏幕高度
            clientHeight:'',
            // 触摸距离页面起点
            startY: '',
            // 触摸距离屏幕起点
            clientY: '',
            // 数据
            items: [],
            // 当前页码
            currPageNo: 1,
            // 是否还有更多数据
            hasMore: true,
            // 是否正在加载,若正在加载,不做任何操作
            isLoading: false,
            // 下拉刷新
            isTopLoading: false,
            // 上拉加载
            isBottomLoading: false,
            // 无数据
            isNoData: false,
            // 是否滑动
            hasMove:false,
        }
    },
    props:{
        // 请求数据的地址
        url:'',
        // 请求参数
        param:{
            type: Object,
        },
        // 每页显示数据条数
        pageSize: {
            default:10
        },
        pageNoName: {
            default: 'page_no'
        },
        pageSizeName: {
            default: 'page_size'
        },
        // 分页数据为对象鉴别hasMore
        objArryField: String
    },
    mounted: function() {
        var self=this
        // 屏幕高度
        this.clientHeight=parseInt(`${document.documentElement.clientHeight}`)  
    },
    methods:{
        touchStart(e) {  
            //滚动开始页面距顶距离
            this.scrollTopStart=window.scrollY    
            // 页面高度                 
            this.pageHeight=e.currentTarget.clientHeight
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
            if(this.clientHeight+this.startY+sLength+15>=this.pageHeight+this.clientY){
                this.nextPage()
            }else if(this.startY+sLength<=this.clientY){
                this.refresh()
            }     
        },
        touchMove(e) {
            this.hasMove=true
        },
        refresh(){
            if (this.isLoading) {
              return false
            }
            this.currPageNo = 1
            this.isTopLoading = true
            this.getData(data=>{
               this.isTopLoading = false 
            },0)
        },
        nextPage(){
            if (this.isLoading || !this.hasMore) {
                return false
            }
            this.isBottomLoading = true;
            this.getData(data => {
              this.isBottomLoading = false;
            }, 1)
        },
        getData(callback, type){
            var self=this
            this.isLoading = true;
            // 设置分页参数
            if (typeof this.param === 'string') {
              this.param = JSON.parse(this.param);
            }
            this.param[this.pageNoName]=this.currPageNo
            this.param[this.pageSizeName]=this.pageSize
            this.$http.getRequest(this.url, this.param).then(data=>{
                callback(data)
                let arrayData;
                if (data instanceof Array) {
                  arrayData = self.items=[...data];
                } else {
                  this.items = data;
                  arrayData = data[self.objArryField];
                }
                if (arrayData.length == 0) {
                  if (self.currPageNo == 1) {
                    self.isNoData = true;
                  } else {
                    self.hasMore = false;
                    self.isNoData = false;
                  }
                } else {
                  self.hasMore = self.pageSize <= arrayData.length;
                  self.isNoData = false;
                }
                if(self.isNoData){
                  self.hasMore = false;
                }
                self.currPageNo += 1;     
                self.$emit('send-data', self.items,type)
                self.isLoading = false;
            })
        },
        getItems() {
            return this.items
        }
    }
}
</script>