<style lang='scss'>
.aboutApp {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
.aboutApp .header {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  color: #333238;
  background: #efeff5;
}
.aboutApp .header .logo {
  width: 80px;
  height: 80px;
  border-radius: 20px;
}
.aboutApp .list {
  background: #fff;
}
.aboutApp .list .list_item {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  .l {
    font-size: 15px;
  }
  .r {
    font-size: 13px;
    display: flex;
    align-items: center;
    .jiantou {
      width: 10px;
      height: 15px;
      margin-left: 10px;
    }
  }
  .blue {
    color: #507cbe;
  }
}
</style>
<template>
  <div class='aboutApp'>
    <div class='header'>
      <img class='logo' src='/static/images/userCenter/logo.png'/>
      <div>Version1.1</div>
    </div>
    <div class='list'>
      <div class='list_item' @click.stop='toGc'>
        <div class='l'>
          <span>关于国诚</span>
        </div>
        <div class='r'>
         <img class='jiantou' src='/static/images/youjiantou@3x.png'/>
        </div>
      </div>
      <div class='list_item' @click.stop='toMzsm'>
        <div class='l'>
          <span>免责声明</span>
        </div>
        <div class='r'>
         <img class='jiantou' src='/static/images/youjiantou@3x.png'/>
        </div>
      </div>
      <div class='list_item'>
        <div class='l'>
          <span>客服QQ</span>
        </div>
        <a class='r' href="http://q.url.cn/abJOpH?_type=wpa&qidian=true">
          <span class='blue'>3007115961</span>
          <img class='jiantou' src='/static/images/youjiantou@3x.png'/>
        </a>
      </div>
      <div class='list_item'>
        <div class='l'>
          <span>客服电话</span>
        </div>
        <a class='r' href="tel://400-966-3020">
          <span class='blue'>400-966-3020</span>
          <img class='jiantou' src='/static/images/youjiantou@3x.png'/>
        </a>
      </div>
      <div class='list_item'>
        <div class='l'>
          <span>投诉电话</span>
        </div>
        <a class='r' href="tel://0755-28702860">
          <span class='blue'>0755-28702860</span>
          <img class='jiantou' src='/static/images/youjiantou@3x.png'/>
        </a>
      </div>
      <div class='list_item' @click.stop='toBossMail'>
        <div class='l'>
          <span>总经理信箱</span>
        </div>
        <div class='r'>
         <img class='jiantou' src='/static/images/youjiantou@3x.png'/>
        </div>
      </div>
    </div>  
  </div>  
</template>
<script>
import userManager from '@/api/user-manager';
export default {
  name: 'AboutApp',
  data() {
    return{
    }
  },
  methods: {
    // 跳转国诚官网
    toGc() {
      let src=this.$conster.domain+'/static/about_us.html'
      src = 'webview?src='+encodeURIComponent(src)
      this.$myRouter.navigateTo({path:src},this)
    },
    //跳转免责声明
    toMzsm() {
      let src=this.$conster.domain+'/static/app_mzsm.html'
      src = 'webview?src='+encodeURIComponent(src)
      this.$myRouter.navigateTo({path:src},this)
    },
    // 总经理信箱
    toBossMail() {
      this.$myRouter.navigateTo({path:'bossMail'},this)
    },
  }
}
</script>
