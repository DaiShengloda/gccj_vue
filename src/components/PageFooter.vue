<style lang="scss">
@import '../sass/components/pageFooter';
</style>
<template>
<div class="page-footer">
    <div class="footer-blank"></div>
    <div class="footer-tab"> 
        <div class="tab-box"
             v-for="(item, index) in list"
             @click.stop="select(index,item)"
             replace>
            <div class="box-img">
                <img :class="['img-icon', {'img-big':item.class}]" :src="item.selectedIconPath" v-if="activeIndex==index">
                <img :class="['img-icon', {'img-big':item.class}]" :src="item.iconPath" v-else/>
            </div>
            <!-- bd9e55 -->
            <div class="box-text" style="color:#b79448" v-if="activeIndex==index">{{item.text}}</div>
            <div class="box-text" style="color:#575757" v-else>{{item.text}}</div>
        </div>
    </div> 
</div>
</template>
<script>
export default {
    name: 'PageFooter',
    data(){
        return {
            // 选中tab
            activeIndex:0,
            // 
            curRoutePath:'',
            // tab栏数据
            list: [
                {
                    pagePath: 'index',
                    text: '首页',
                    iconPath: '/static/images/home2.png',
                    selectedIconPath: '/static/images/home1.png',
                },
                {
                    pagePath: 'note', 
                    text: '观点',
                    iconPath: '/static/images/note2.png',
                    selectedIconPath: '/static/images/note1.png',
                },
                {
                    pagePath: 'live', 
                    text: '掌舵',
                    iconPath: '/static/images/live.png',
                    selectedIconPath: '/static/images/live.png',
                    class:true,
                    routerType:1,
                },
                // {
                //     pagePath: 'course',
                //     text: '课程',
                //     iconPath: '/static/images/course2.png',
                //     selectedIconPath: '/static/images/course1.png',
                // },      
                {
                    pagePath: 'product',
                    text: '产品',
                    iconPath: '/static/images/product2.png',
                    selectedIconPath: '/static/images/product1.png',
                }, 
                {
                    pagePath: 'userCenter',
                    text: '我的',
                    iconPath: '/static/images/user2.png',
                    selectedIconPath: '/static/images/user1.png',
                },      
            ],
        }
    },
    watch: {
        '$route': {
          handler: function (to, from) {
            this.initRouter()
          },
          immediate: true
        }
    },
    methods: {
        select(index,item){
            var pagePath=item.pagePath
            var routerType=item.routerType
            this.activeIndex=index
            if(routerType==1){  //1--navigateTo; 默认--redirectTo
              this.$myRouter.navigateTo({path:pagePath},this)  
            }else{
              this.$myRouter.redirectTo({path:pagePath},this)
            }      
        },
        initRouter(){
            this.curRoutePath=this.$route.path;
            this.list.forEach((route,index)=>{
                if(this.curRoutePath.indexOf(route.pagePath)>-1){
                    this.activeIndex=index
                    return false
                }
            })
        }
    },
}
</script>