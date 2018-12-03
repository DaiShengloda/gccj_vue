<style lang="scss" scoped>
@import '../sass/pages/product';
</style>
<template>
<pull-down-refresh @pull-down-refresh="pullDownRefresh" 
                   ref="pullDownRefresh"> 
    <div class="product" slot="content">
        <!-- 未登录及登录未添加-->
        <div class="unlogin-product" 
             v-if="!productList.productType||!hasUser">
            <div class="pro-list">
                <div class="pro-box"
                     v-for="(item, index) in productList.recommendList"
                     @click.stop="handlerAction(item.id)">
                    <div class="box-top">
                        <img class="top-img" 
                             :src="item.imgUrl" 
                             v-if="item.imgUrl&&item.imgUrl!='test-png'"
                             @error="productImgError(index)"/>
                        <img class="top-img" src="/static/images/zw/list.png" v-else/>
                        <div class="top-rig">
                            <div class="rig-title">
                                <div class="title-txt">{{item.name}}</div>
                                <div class="title-sign">{{item.tags}}</div>
                            </div>
                            <div class="rig-cont">{{item.discript}}</div>
                            <div class="rig-price" 
                                 v-if="item.priceDescription">
                                {{item.priceDescription}}
                            </div>
                            <div class="rig-price" v-else>￥<span class="price-num">{{item.price}}</span>元起/{{item.period}}天</div>
                        </div>
                    </div>
                    <div class="box-recommend" v-if="item.type=='SWIFT_PAN'">
                        <div class="rec-stock">
                            <div class="stock-lef">
                                <div class="lef-txt">最新荐股:</div>
                                <div class="lef-name">****</div>
                            </div>
                            <div class="stock-rig">
                                <img class="rig-img" src="/static/images/index/pay.png"></img>
                                <span class="rig-txt">开通可见</span>
                            </div>
                        </div>
                        <div class="rec-advice">
                            <div class="ad-txt">建议:</div>
                            <div class="ad-detail">
                                <div class="detail-box">
                                    关注价位<span class="box-value">**</span>
                                </div>
                                <div class="detail-box">
                                    压力位<span class="box-value">**</span>
                                </div>
                                <div class="detail-box">
                                    支撑位<span class="box-value">**</span>
                                </div>
                                <div class="detail-box">
                                    仓位建议<span class="box-value"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-recommend" v-else-if="item.type=='MAIN_LAYOUT'">
                        <div class="rec-stock">
                            <div class="stock-lef">
                                <div class="lef-txt">最新荐股:</div>
                                <div class="lef-name">****</div>
                            </div>
                            <div class="stock-rig">
                                <img class="rig-img" src="/static/images/index/pay.png"></img>
                                <span class="rig-txt">开通可见</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pro-btn" v-if="!hasUser">
                <div @click.stop="toLogin(2)" class="product-login">登录查看产品</div>
            </div>
        </div> 
        <!-- 已登录及添加产品 -->
        <div class="login-product" v-else-if="productList.productType&&hasUser">
            <!-- 特权 -->
            <div class="pro-vip">
                <div class="vip-title" v-if="productList.vipSourceList.length>0">
                    <img class="title-img" src="/static/images/product/vip.png"/>
                    <div class="title-txt">你已获得的国诚财经特权</div>
                </div>
                <div class="vip-list" v-if="productList.vipSourceList.length>0">   
                    <div class="tab-box-btn"
                        v-for="(item,index) in productList.vipSourceList"
                        @click.stop="toAction(item.action)">
                        <img class="box-img" 
                             :src="item.imgUrl" 
                             v-if="item.imgUrl&&item.imgUrl!='test-png'"
                             @error="vipImgError(index)"/>
                        <img class="box-img" 
                             src="/static/images/btn_icon.png" 
                             v-else/>
                        <div class="box-title">{{item.title}}</div>
                    </div>
                </div>
                <div class="vip-view" @click.stop="toAction(productList.viewSource.action)" v-if="productList.viewSource">
                    <img class="view-img" 
                         :src="productList.viewSource.imgUrl" 
                         v-if="productList.viewSource.imgUrl
                              &&productList.viewSource.imgUrl!='test-png'"
                         @error="viewSourceImgError(productList.viewSource.imgUrl)"/>
                    <img class="view-img" 
                         src="http://file.dakawengu.com/image/2018-10-23/vipnc.jpg" v-else/>
                </div>
            </div>
            <!-- 短线掘金 -->
            <div class="pro-short" v-if="productList.productType=='SWIFT_PAN'">
                <div class="short-sum">
                    <img class="sum-img" 
                        :src="productList.productSource.imgUrl" 
                        v-if="productList.productSource.imgUrl&&productList.productSource.imgUrl!='test-png'"
                        @error="productSourceImgUrl()"
                    ></img>
                    <img class="sum-img" src="/static/images/zw/list.png" v-else></img>
                    <div class="sum-cont">
                        <div class="cont-title">
                            <div class="title-txt">{{productList.productSource.title}}</div>
                            <div class="title-sign" v-if="productList.productSource.redTags">{{productList.productSource.redTags}}</div>
                        </div>
                        <div class="cont-pointer" v-if="productList.productSource.tags">
                            <div class="pointer-box" v-for="item in productList.productSource.tags">
                                <div class="box-txt">{{item}}</div>
                            </div>
                        </div>
                        <div class="cont-descript" v-else>{{productList.productSource.descript}}</div>
                    </div> 
                </div>
                <div class="short-cont">
                    <div class="cont-stock" v-if="!productList.infoList||productList.infoList.length==0">
                        <div class="stoct-txt">
                            股市变化莫测，老师正在讨论策略，还未到股票推荐时间请耐心等待......
                        </div>
                    </div>
                    <div class="cont-stock" v-else>
                        <div class="stock-box" v-for="item in productList.infoList">
                            <div class="box-time">{{item.proposeTime}}推荐</div>
                            <div class="box-top">
                                <div class="top-lef">
                                    <img class="lef-img" src="/static/images/product/new.png" v-if="item.isNew==1"></img>
                                    <div class="lef-name">{{item.stockName}}</div>
                                    <div class="lef-code">{{item.stockCode}}</div>
                                </div>
                                <div class="top-rig">
                                    <div class="rig-title">{{item.proposeReason}}</div>
                                    <div class="rig-msg" :style="{'color':item.txtColor}">
                                        <div class="msg-price">{{item.proposedPrice}}</div>
                                        <div class="msg-change" v-if="item.proposedInflation>0">+{{item.proposedInflation}}</div>
                                        <div class="msg-change" v-else>{{item.proposedInflation}}</div>
                                        <div class="msg-wave" v-if="item.proposedIncrease>0">+{{item.proposedIncrease}}%</div>
                                        <div class="msg-wave" v-else>{{item.proposedIncrease}}%</div>
                                    </div>
                                </div>
                            </div>
                            <div class="box-sum">{{item.proposeInfo}}</div>
                            <div class="box-btn" @click.stop="toLogDetail(item.id)">
                                查看详情 >>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 主力布局 -->
            <div class="pro-lay" v-else-if="productList.productType=='MAIN_LAYOUT'">
                <div class="lay-sum">
                    <img class="sum-img" :src="productList.productSource.imgUrl" v-if="productList.productSource.imgUrl"></img>
                    <img class="sum-img" src="/static/images/zw/list.png" v-else></img>
                    <div class="sum-cont">
                        <div class="cont-title">
                            <div class="title-txt">{{productList.productSource.title}}</div>
                            <div class="title-sign" v-if="productList.productSource.redTags">{{productList.productSource.redTags}}</div>
                        </div>
                        <div class="cont-pointer" v-if="productList.productSource.tags">
                            <div class="pointer-box" v-for="item in productList.productSource.tags">
                                <div class="box-txt">{{item}}</div>
                            </div>
                        </div>
                        <div class="cont-descript" v-else>{{productList.productSource.descript}}</div>
                    </div>
                </div>
                <div class="lay-cont">
                    <div class="cont-stock" v-if="!productList.infoList||productList.infoList.length==0">
                        <div class="stoct-txt">布局即将开始，请耐心等待!</div>
                    </div>
                    <div class="cont-stock" v-else>
                        <div class="stock-head">
                            <div class="head-name">代码名称</div>
                            <div class="head-reason">推荐理由</div>
                            <div class="head-time">入选时间</div>
                            <div class="head-detail">入选详情</div>
                        </div>
                        <div :class="['stock-list',{'even':index%2==0,'odd':index%2!=0}]"
                            v-for="(item, index) in productList.infoList">
                            <div class="list-msg">
                                <div class="msg-name">{{item.stockName}}</div>
                                <div class="msg-code">{{item.stockCode}}</div>
                            </div>
                            <div class="list-reason">{{item.proposeReason}}</div>
                            <div class="list-time">{{item.proposeTime}}</div>
                            <div class="list-detail" @click.stop="toLogDetail(item.id)">查看></div>
                        </div>
                        <div class="stock-detail" @click.stop="toStockPool()">查看调仓历史记录>></div>
                    </div>
                </div>
            </div>
            <!-- 牛人掌股 -->
             <div class="pro-man">
                <div class="pro-box" v-if="productList.productType!='SUPERMAN_STEER'" @click.stop="handlerAction(productList.recommendList[0].id)">
                    <div class="box-top">
                        <img class="top-img" :src="productList.recommendList[0].imgUrl" v-if="productList.recommendList[0].imgUrl"></img>
                        <img class="top-img" src="/static/images/zw/list.png" v-else></img>
                        <div class="top-rig">
                            <div class="rig-title">
                                <div class="title-txt">{{productList.recommendList[0].name}}</div>
                                <div class="title-sign">{{productList.recommendList[0].tags}}</div>
                            </div>
                            <div class="rig-cont">{{productList.recommendList[0].discript}}</div>
                            <div class="rig-price rig-des" 
                                 v-if="productList.recommendList[0].priceDescription">
                                {{productList.recommendList[0].priceDescription}}
                            </div>
                            <div class="rig-price" v-else>￥<span class="price-num">{{productList.recommendList[0].price}}</span>元起/{{productList.recommendList[0].period}}天</div>
                        </div>
                    </div>
                    <div class="box-recommend">
                        <div class="rec-stock">
                            <div class="stock-lef">
                                <div class="lef-txt">最新调仓</div>
                            </div>
                            <div class="stock-rig">
                                <img class="rig-img" src="/static/images/index/pay.png"></img>
                                <span class="rig-txt">开通可见</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="man-buy" v-else-if="productList.productType=='SUPERMAN_STEER'">
                    <div class="man-sum">  
                        <img class="sum-img" :src="productList.productSource.imgUrl" v-if="productList.productSource.imgUrl"></img>
                        <img class="sum-img" src="/static/images/zw/list.png" v-else></img>
                        <div class="sum-cont">
                            <div class="cont-title">
                                <div class="title-txt">{{productList.productSource.title}}</div>
                                <div class="title-sign" v-if="productList.productSource.redTags">{{productList.productSource.redTags}}</div>
                            </div>
                            <div class="cont-pointer" v-if="productList.productSource.tags">
                                <div class="pointer-box" v-for="item in productList.productSource.tags">
                                    <div class="box-txt">{{item}}</div>
                                </div>
                            </div>
                            <div class="cont-descript" v-else>{{productList.productSource.descript}}</div>
                        </div>           
                    </div>
                    <div class="man-cont">
                        <div class="cont-stock" v-if="!productList.infoList||productList.infoList.length==0">
                            <div class="stoct-txt">老师还没有交易，请等待......</div>
                        </div>
                        <div class="cont-stock" v-else>
                            <div class="stock-list" v-for="item in productList.infoList">
                                <div class="list-msg">
                                    <div class="msg-lef">
                                        <div class="lef-type" v-if="item.operationType==1" style="background:#eb3531">建</div>
                                        <div class="lef-type" v-else-if="item.operationType==2" style="background:#eb3531">买</div>
                                        <div class="lef-type" v-else-if="item.operationType==3" style="background:#b89448">卖</div>
                                        <div class="lef-type" v-else-if="item.operationType==4" style="background:#999999">清</div>
                                        <div class="lef-name">{{item.stockName}}</div>
                                        <div class="lef-code">{{item.stockCode}}</div>
                                    </div>
                                    <div class="msg-rig">
                                        <div class="rig-time">{{item.operationTime}}</div>
                                    </div>
                                </div>
                                <div class="list-do">
                                    <div class="do-price">
                                        <div class="price-txt">成交价</div>
                                        <div class="price-num">{{item.operationPrice}}</div>
                                    </div>
                                    <div class="do-buy">
                                        <div class="buy-txt" v-if="item.operationType==1||item.operationType==2">买入</div>
                                        <div class="buy-txt" v-if="item.operationType==3||item.operationType==4">卖出</div>
                                        <div class="buy-num"><span class="num-color">{{item.operationCount}}</span>股</div>
                                    </div>
                                </div>
                            </div>
                            <div class="stock-detail" @click.stop="toManDetail(productList)">查看详情>></div>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
        <!-- 客服 -->
        <!-- <div class="login-contact" v-if="hasUser">
            <a class="contact-msg" href="tel:400-966-3020">国诚财经客服：400-966-3020</a>
            <a class="contact-btn" href="http://q.url.cn/abJOpH?_type=wpa&qidian=true">
                <img class="btn-img" src="/static/images/product/contact.png"/>
                <span class="btn-txt">在线客服</span>
            </a>
        </div> -->
        <!-- 页脚信息 -->
        <div class="dex-footer">
            <!-- <div class="footer-top">
                <img class="top-img" src="/static/images/footer_name.png">
            </div> -->
            <div class="footer-mid">
                <img class="mid-img" src="/static/images/footer_blank.png">
                <div class="mid-msg">
                    <img class="msg-img" src="/static/images/footer_per.png">
                    <div class="msg-box">
                        <div class="box-des">24小时客服热线</div>
                        <a class="box-phone"
                         href="tel://400-966-3020">400-966-3020</a>
                    </div>
                </div>
            </div>
            <div class="footer-bom">
                <div class="bom-title">
                    <img class="title-img" src="/static/images/footer_qus.png">
                    <div class="title-txt">违法和不良信息投诉渠道</div>
                </div>
                <div class="bom-phone">
                    电话:<a href="tel://0755-28702860" class="phone-num">0755-28702860</a>(工作日9:00-18:00)邮箱:ts@cf69.com
                </div>
            </div>
        </div>
    </div> 
</pull-down-refresh>
</template>
<script>
import userManager from '@/api/user-manager'
import PullDownRefresh from '@/components/pullDownRefresh'
export default {
    name: 'Product',
    components: {
        PullDownRefresh
    },
    data() {
        return{
            hasUser: false,
            // 产品列表
            productList:{},
            // 个股详情
            stockDetail:'',  
            layerIndex:'',
            // 下拉刷新
            isTopLoading: false,
        }   
    },
    activated: async function() {
        await this.loadProductList() 
        this.getDetail()
    },
    methods: {
        pullDownRefresh(){
            this.loadProductList()
            this.getDetail()
        },
        // 协议跳转
        toAction(action){
            var action=action.replace("note?id","noteDetail?id")
            this.$myRouter.navigateTo({path:action},this)
        },
        // 跳转登录
        toLogin() {
            this.$myRouter.navigateTo({ path: 'mobileLogin?redirect=product'},this)
        },
        // 个股详情
        toLogDetail(productId){
            var productType=this.productList.productType
            this.$myRouter.navigateTo({
                path:'shareDetail?productId='+productId+'&productType='+productType
            },this)
        },
        // 股票池
        toStockPool(){
            this.$myRouter.navigateTo({path:'stockPool'},this)
        },
        // 牛人掌股
        toManDetail(productList){
            var productId=productList.productId
            var productType=productList.productType
            this.$myRouter.navigateTo({ path: `cowManDetail` },this)
        },
        handlerAction(productId){
            var self=this
            if(!this.checkLogin())return
            this.$http.getRequest(this.$conster.API_URL.PRODUCT_ACTION,{
                productId:productId
            }).then(data=>{
                if(!data.action){
                    return
                }
                self.$myRouter.navigateTo({path:data.action},self)
            })
        },
        loadProductList(){
            var self=this
            this.$http.getRequest(this.$conster.API_URL.PRODUCT_LIST,{}).then(data=>{
                self.isTopLoading = false
                self.productList=data
                self.formateTags(self.productList)
                self.formateDate(self.productList)
                self.$refs.pullDownRefresh.refreshOver()
            })    
        },
        getDetail() {
            var self=this
            if (!this.hasUser) {
                this.layerIndex=layer.load(1, {shade: false}) 
            }
            userManager.getUserDetail()
            .then(data => {
                if(!data){
                  self.hasUser = false  
                }else{
                    self.hasUser = true
                }  
                layer.close(self.layerIndex)
            }).catch(err=>{
                console.error(err)
                self.hasUser = false 
                layer.close(self.layerIndex)
            })
        },
        // 处理tags
        formateTags(productList){
            if(!productList.productSource)return
            var tags=productList.productSource.tags
            if(!tags)return
            tags=tags.split(',')
            productList.productSource.tags=tags
        }, 
        // 处理时间戳
        formateDate(productList){
            var infoList=productList.infoList
            for(var i in infoList){
                var list=infoList[i]
                if(list.operationTime){
                    productList.infoList[i].operationTime=this.$filter.formatTimestamp(list.operationTime)
                }
                if(list.proposeTime){
                    productList.infoList[i].proposeTime=this.$filter.formatTimestamp(list.proposeTime)
                } 
                if(list.operationPrice){
                    productList.infoList[i].operationPrice=(list.operationPrice).toFixed(2)
                }
                if(list.proposedPrice){
                    productList.infoList[i].proposedPrice=(list.proposedPrice).toFixed(2)
                }
                if(list.proposedInflation){
                    if(list.proposedInflation>0){
                       productList.infoList[i].txtColor='#eb3530'
                    }else if(list.proposedInflation<0){
                        productList.infoList[i].txtColor='#187b0f'
                    }else{
                        productList.infoList[i].txtColor='#666'
                    }
                    productList.infoList[i].proposedInflation=parseFloat(productList.infoList[i].proposedInflation).toFixed(2)
                    productList.infoList[i].proposedIncrease=(productList.infoList[i].proposedIncrease*100).toFixed(2)
                } 

            }
        },
        // 是否登录
        checkLogin(){
            if(!this.hasUser){
                userManager.triggerIntercept()
                return false
            }
            return true
        },
        productImgError(index){
          this.productList.recommendList[index].imgUrl = 'test-png'
        },
        viewSourceImgError(){
          this.productList.viewSource.imgUrl = 'test-png'
        },
        vipImgError(index){
          this.productList.vipSourceList[index].imgUrl = 'test-png'
        },
        productSourceImgUrl(){
            this.productList.productSource.imgUrl = 'test-png';
        }
    },
}
</script>