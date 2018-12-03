<style lang="scss" scoped>
.wx-dialog{
    width:100%;
    min-height:100vh;
    background:rgba(0,0,0,0.9);
    .dialog-layer{
        background:#fff;
        width:80%;
        margin:0 auto;
        position:relative;
        top:r(300);
        border-radius:r(10);
        .layer-title{
            font-size:r(36);
            text-align:center;
            padding-top:r(30);
        }
        .layer-content{
            padding:r(30);
            font-size:r(35);
            text-align: center;
        }
        .layer-buttons{
            display:flex;
            align-items:center;
            height:r(100);
            border-top:#e6e6e6 1px solid;
            .btn-cancle{
                height:r(100);
                line-height:r(100);
                text-align:center;
                font-size:r(35);
                border-right:#e6e6e6 1px solid;
            }
            .btn-sure{
                width:100%;
                height:r(100);
                line-height:r(100);
                text-align:center;
                font-size:r(35);
            }
            .btn-column{
                width:50%;
            }
        }
    }
}
</style>
<template>
<div class="wx-dialog">
    <div class="dialog-layer">
        <div class="layer-title" v-if="title">{{title}}</div>
        <div class="layer-content">{{message}}</div>
        <div class="layer-buttons">
            <div :class="['btn-cancle', {'btn-column':negative}]" 
                 @click.stop="cancle" 
                 v-if="negative">
                 {{negative}}
            </div>
            <div :class="['btn-sure', {'btn-column':negative}]" 
                 @click.stop="sure" 
                 v-if="positive">
                 {{positive}}
            </div>
            <div :class="['btn-sure', {'btn-column':negative}]" 
                 @click.stop="sure" 
                 v-else>
                 确定
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Dialog',
    data(){
        return{
            // 弹框的内容
            message:'您没有权限访问！',
            // 弹框的标题
            title:'',
            // 确定的动作
            positiveAction:null,
            // 取消的动作
            negativeAction:null,
            // 确定文本 
            positive:'',
            // 取消文本
            negative:'',
        }
    },
    created: function(){
        var options=this.$route.query
        this.message=options.message 
        this.title=options.title 
        this.positiveAction=options.positiveAction 
        this.negativeAction=options.negativeAction 
        this.positive=options.positive 
        this.negative=options.negative  
    },
    methods:{
        cancle(){
            this.$myRouter.navigateBack({delta:1},this)
        },
        sure(){
            this.$myRouter.navigateBack({delta:1},this)
        }
    } 
}
</script>