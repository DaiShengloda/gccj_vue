<style lang="scss">
@import '../../../sass/pages/detail/shareDetail';
</style>
<template>
    <div class="content-recommend">
        <div class="content-top">
            <div class="content-top-container" v-if="productDetailData.productInfo">
                <div class="detail-left">
                    <div class="p-time">{{productDetailData.productInfo.proposeTime}}推荐</div>
                    <div class="p-title">{{productDetailData.productInfo.stockName}} {{productDetailData.productInfo.stockCode}}.{{exchangeMark}}</div>
                </div>
                <div class="detail-right" :style="{color:productDetailData.productInfo.txtColor}">
                    <div class="h3">{{productDetailData.productInfo.proposedPrice}}</div>
                    <div class="p-num">
                    {{productDetailData.productInfo.proposedInflation}}({{productDetailData.productInfo.proposedIncrease}}%)
                    </div>
                </div>
            </div>
            <span class="describe">所示的行情为该股票推荐时刻的状态</span>
            <div class="count">
                <div class="count-left">
                    <div class="today">
                        <span>今开:</span>
                        <span v-if='stockDetail[0].openPrice>=stockDetail[0].closePrice'
                              style="color:#eb3530">
                            {{stockDetail[0].openPrice}}
                        </span>
                        <span v-else='stockDetail[0].openPrice<stockDetail[0].closePrice'
                              style="color:#177b0f">
                            {{stockDetail[0].openPrice}}
                        </span>
                    </div>
                    <div class="yesterday">
                        <span>昨收:</span>
                        <span>
                          {{stockDetail[0].closePrice}}
                      </span>
                    </div>
                </div>
                <div class="count-right">
                    <div class="max">
                        <span>最高:</span>
                        <span v-if='stockDetail[0].highPrice>=stockDetail[0].closePrice'
                              style="color:#eb3530">
                            {{stockDetail[0].highPrice}}
                        </span>
                        <span v-else='stockDetail[0].highPrice<stockDetail[0].closePrice'
                              style="color:#177b0f">
                            {{stockDetail[0].highPrice}}
                        </span>
                    </div>
                    <div class="min">
                        <span>最低:</span>
                        <span v-if='stockDetail[0].lowPrice>=stockDetail[0].closePrice'
                              style="color:#eb3530">
                            {{stockDetail[0].lowPrice}}
                        </span>
                        <span v-else='stockDetail[0].lowPrice<stockDetail[0].closePrice'
                              style="color:#177b0f">
                            {{stockDetail[0].lowPrice}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line-15"></div>
        <div class="content-mid" v-if="productDetailData.productInfo">
            <div class="p-top">
                <div class="icon_reason">
                    <img src="/static/images/reason.png" alt=""  class="reason"/>
                </div>
                <span>推荐理由</span>
            </div>
            <div class="p-mid">{{productDetailData.productInfo.proposeInfo}}</div>
            <div class="p-bot">操作建议：{{productDetailData.productInfo.operationAdvice}}</div>
        </div>
        <div class="line-1" v-if="productDetailData.marker"></div>
        <div class="content-bot" v-if="productDetailData.marker">
            <div class="bot-span">
                市场综述：{{productDetailData.marker.propose}}
            </div>
            <div class="icon-foot">
                <div class="rel li">
                    <img src="/static/images/middle.png" alt="" class="middle"/>
                    <div class="ab">
                        <div class="h3">{{productDetailData.marker.moneyLevel}}</div>
                        <span class="effect">大盘赚钱效应</span>
                    </div> 
                </div>
                <div class="li">
                    <div class="data">
                    <div class="box">
                        <div class="p-1">全局数据</div>
                        <div class="p-2">{{productDetailData.marker.baseData}}</div>
                    </div>
                    </div>
                </div>
                <div class="li">
                    <div class="data">
                        <div class="box">
                            <div class="p-1">建议整体仓位</div>
                            <div class="p-2">{{productDetailData.marker.proposePosition}}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShareDetail',
    data(){
        return{
            //SWIFT_PAN MAIN_LAYOUT  SUPERMAN_STEER
            productType:'',  
            productId:'',
            productDetailData:'',
            // 个股行情
            stockDetail:[{
                openPrice:'-',
                closePrice:'-',
                highPrice:'-',
                lowPrice:'-',
            }],
            exchangeMark:'',
        }
    },
    computed: {
        aDouble: function () {
          
        },
    },
    created: function(){
        this.productType=this.$route.query.productType
        this.productId=this.$route.query.productId
        this.loadProductDetail()
    },
    mounted: function(){
        
    },
    methods: {
        loadProductDetail(){
            var self=this
            this.$http.getRequest(this.$conster.API_URL.PRODUCT_DETAIL,{
                productType:this.productType,
                productId:this.productId,
            }).then(data=>{
                self.productDetailData=data
                self.formateDate(self.productDetailData)
                self.getStockByCode()
                self.setPageTitle()
            })
        },
        setPageTitle(){
            var productInfo=this.productDetailData.productInfo
            this.exchangeMark=productInfo.exchangeMark.toUpperCase()
            this.pageTitle=productInfo.stockName+' '+productInfo.stockCode+'.'+this.exchangeMark
            document.title=this.pageTitle
        },
        // 处理时间戳
        formateDate(productDetailData){
            var time=productDetailData.productInfo.proposeTime
            productDetailData.productInfo.proposeTime=this.$filter.formatTimestamp(time)
            productDetailData.productInfo.proposedInflation=parseFloat(productDetailData.productInfo.proposedInflation).toFixed(2)
            productDetailData.productInfo.proposedIncrease=(productDetailData.productInfo.proposedIncrease*100).toFixed(2)
            productDetailData.productInfo.proposedPrice=parseFloat(productDetailData.productInfo.proposedPrice).toFixed(2)
            if(productDetailData.productInfo.proposedInflation){
                if(productDetailData.productInfo.proposedInflation>0){
                    productDetailData.productInfo.txtColor='#eb3530'
                }else if(productDetailData.productInfo.proposedInflation<0){
                    productDetailData.productInfo.txtColor='#187b0f'
                }else{
                    productDetailData.productInfo.txtColor='#666'
                }
            }
        },
        // 获取个股行情
        getStockByCode(){
            var self=this
            var code=this.productDetailData.productInfo.exchangeMark+this.productDetailData.productInfo.stockCode
            // this.$http.getRequest(this.$conster.stockTick,{
            //     code:code
            // }).then(data=>{
            //     self.stockDetail=data 
            //     self.formateStock()
            // })
            $.ajax({
                type: "get",
                url:"http://stock.gp58.com/front/stock/jsonp/stockTick.do",
                data:{
                    code:code
                },
                dataType: 'jsonp',
                jsonp: "callback", //请求的参数名
                jsonpCallback: "jsonhandle", //要执行的回调函数
                success: function jsonhandle(result) { //请求成功后处理  
                    self.stockDetail=result 
                    self.formateStock()
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                },
            })
        },
        // 格式化行情数据
        formateStock(){
            this.stockDetail[0].closePrice=this.stockDetail[0].closePrice.toFixed(2)
            this.stockDetail[0].highPrice=this.stockDetail[0].highPrice.toFixed(2)
            this.stockDetail[0].lowPrice=this.stockDetail[0].lowPrice.toFixed(2)
            this.stockDetail[0].openPrice=this.stockDetail[0].openPrice.toFixed(2)
        },
    }
}
</script>