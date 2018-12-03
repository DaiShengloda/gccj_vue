<style lang="scss">
@import '../../../sass/pages/detail/stockPool';
</style>
<template>
    <div style="background:#fff;overflow:hidden;min-height:100%">
        <base-scroll :url='url' 
                     :param='param' 
                     :pageSize='pageSize' 
                     :pageSizeName='pageSizeName' 
                     :pageNoName='pageNoName' 
                     @send-data="setPageData" 
                     ref="baseScroll">
            <div slot='content' class="stock-pool-nav">
                <div class="stock-nav-first">
                    <div class="p-1 p-t">股票名称</div>
                    <div class="p-2 p-t">调仓理由</div>
                    <div class="p-3 p-t">调仓时间</div>
                    <div class="p-4 p-t">操作</div>
                </div>
                <div class="stock-pool-li"
                    v-for="item in mainLayoutHistory">
                    <div class="p-1 p">
                        <div class="p-word">{{item.stockName}}</div>
                        <div class="p-id">{{item.stockCode}}</div>
                    </div>
                    <div class="p-2 p">{{item.siloReason}}</div>
                    <div class="p-3 p">{{item.proposeTime}}</div>
                    <div class="p-4 p" v-if="item.siloType==0">调出</div>
                    <div class="p-4 p" style="color:#b79448" v-else-if="item.siloType==1">调入</div>
                </div>
            </div>
        </base-scroll>
    </div> 
</template>
<script>
import BaseScroll from '@/components/BaseScroll'
export default {
    name: 'StockPool',
    components: { 
        BaseScroll 
    },
    data(){
        return{
            // 调仓记录
            mainLayoutHistory:'',
            // 调仓url及参数
            url:this.$conster.API_URL.PRODUCT_MAIN_LAYOUT,
            param:{
                page_no: 1,
                page_size: 10
            },
            pageSize:15,
            pageSizeName:'pageSize',
            pageNoName:'pageNo'
        }
    },
    created: function(){
    },
    mounted: function(){
        this.$refs.baseScroll.refresh()
    },
    methods:{
        setPageData(data,type) {
            this.formateDate(data)
            if(type==0){
                this.mainLayoutHistory=data
            }else(
                this.mainLayoutHistory.push(...data)
            )
        },
        formateDate(data){
            for(var i in data){
                var list=data[i]
                data[i].proposeTime=this.$filter.formatTimeLocal(list.proposeTime)
            }
        },
    }
}
</script>