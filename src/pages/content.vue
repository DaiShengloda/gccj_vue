<style lang="scss" scoped>
</style>
<template>
<div class="content">
  <!-- MAIN PANEL -->
  <div class="main" role="main">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
  <!-- FOOTER -->
  <page-footer></page-footer>
</div>
</template>
<script>
import PageFooter from '@/components/PageFooter'
export default {
  name: 'MyContent',
  components: {
    PageFooter
  }
}
</script>