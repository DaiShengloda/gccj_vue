<template>
<div class="app">
  <router-view v-wechat-title="$route.meta.title"
               v-if="!$route.meta.keepAlive">
               <!-- 不需要缓存视图组件 -->
  </router-view>

  <keep-alive>
    <router-view v-wechat-title="$route.meta.title"
                 v-if="$route.meta.keepAlive">
                 <!-- 需要缓存的视图组件 -->
    </router-view>
  </keep-alive>
</div> 
</template>
<script>
export default {
  name: 'App',
  watch: {}
}
</script>
<style lang="scss">
  @import './sass/base/reset';
  @import './sass/helper/classes';
  @import './sass/helper/_common';
  @import './sass/helper/spacing';
  @import './sass/helper/layer';
  @import './sass/helper/_function';
  @import url("../static/iconfont/iconfont.css"); 
  .app {
    width: 100%;
    max-width: r(850);
    margin: 0 auto;
    overflow: hidden;
    min-height: 100vh;
    background: #efeff5;
  }
</style>
