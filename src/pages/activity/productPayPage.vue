<style lang="scss">

</style>
<template>
<!--微信支付组件 -->
<pay-product @pay-sucess="paySucess" @pay-faild="payFaild" ref='payProduct'></pay-product>
</template>
<script>
import PayProduct from '@/components/payProduct'
export default {
    name:'ProductPayPage',
    components: {
        PayProduct,
    },
    data(){
        return{
            // 支付参数及信息
            payObj:{},
            _options:'',
        }
    },
    mounted: function(){
        this.payObj.productId=this.$route.query.productId
        this.payObj.type=this.$route.query.type
        this.payObj.productPrice=this.$route.query.price
        this.payObj.payInfo=this.$route.query.payInfo
        this.payObj.payType=this.$route.query.payType
        this.payObj.productType=this.$route.query.productType
        this.showPayment()
    },
    methods:{
        // 支付成功回调
        paySucess(){
            var self=this
            var url=this.$conster.domain+'/product/payment.html?productType='+this.payObj.productType
            var param={
                path:'webview?url='+url,
            }
            window.history.go(-2)      
        },
        payFaild(){
            this.$myRouter.navigateBack({delta: 1})
        },
        // 显示产品信息
        showPayment(){
            this.$refs.payProduct.show(this.payObj)
        },
    }  
}
</script>