<style lang="scss" scoped>
@import '../../../sass/pages/detail/CowManDetail';
</style>
<template>
<div style="background:#fff;">
    <base-scroll :url='url' 
                 :param='param' 
                 :pageSizeName='pageSizeName' 
                 :pageNoName='pageNoName' 
                 @send-data="setPageData" 
                 ref="baseScroll">
        <div slot='content'>
            <div class="content-genius"
                 v-for="item in productDetailData">
                <div class="genius">
                    <div class="icon_photo">
                        <img src="/static/images/photo.png" alt="" class="icon-photo"/>
                    </div>
                    <div class="genius-right">
                        <div class="h3" v-if="item.stockName">{{item.stockName}}</div>
                        <div class="p" v-if="item.operationType==0">{{item.operationLog}}</div>
                        <div class="p" v-if="item.operationType==1">
                            {{item.operationPrice}}元附近建仓买入{{item.stockCode}}{{item.stockName}}{{item.operationCount}}股
                        </div>
                        <div class="p" v-if="item.operationType==2">
                            {{item.operationPrice}}元附近买入{{item.stockCode}}{{item.stockName}}{{item.operationCount}}股
                        </div>
                        <div class="p" v-if="item.operationType==4">
                            {{item.operationPrice}}元附近清仓卖出{{item.stockCode}}{{item.stockName}}{{item.operationCount}}股
                        </div>
                        <div class="p" v-if="item.operationType==3">
                            {{item.operationPrice}}元附近卖出{{item.stockCode}}{{item.stockName}}{{item.operationCount}}股
                        </div>
                        <div class="genius-time">{{item.operationTime}}</div>
                    </div>
                </div>
            </div>
        </div>
    </base-scroll>
</div>
</template>
<script>
import BaseScroll from '@/components/BaseScroll'
export default {
    name: 'CowManDetail',
    components: {
        BaseScroll
    },
    data() {
        return {
            productType:'SUPERMAN_STEER',  //SWIFT_PAN MAIN_LAYOUT  SUPERMAN_STEER
            productId:'1',
            productDetailData:'',
            //分页url及参数
            url:this.$conster.API_URL.PRODUCT_SUPERMAN,
            param:{
                pageNo: 0,
                pageSize: 10
            },
            pageNoName:'pageNo',
            pageSizeName:'pageSize',
            layerIndex:'',
        }
    },
    mounted: function(){
        this.layerIndex=layer.load(1, {shade: false})
        this.$refs.baseScroll.refresh()
    },
    methods: {
        setPageData(data,type) {
            this.formateDate(data)
            if(type==0){
                this.productDetailData=data
            }else(
                this.productDetailData.push(...data)
            )
            layer.close(this.layerIndex)
        },
        // 处理时间戳
        formateDate(productDetailData){
            for(var i in productDetailData){
                var list=productDetailData[i]
                productDetailData[i].operationTime=this.$filter.formatTimestamp(list.operationTime)
            }    
        },
    } 
}
</script>