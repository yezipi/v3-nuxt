<script lang="ts" setup>
import api from '~~/api'

const baseSettings = await api.getBaseSettings()
</script>

<template>
  <div class="yzp-wrapper">
    <!--顶部-->
    <yzp-header :settings="baseSettings"></yzp-header>
    <!--end 顶部-->

    <!--内容部分-->
    <article class="yzp-container">

      <div class="yzp-main max-w1200">
        <!--正文-->
        <section class="yzp-section">
          <slot />
        </section>
        <!--end 正文-->

        <!--侧边栏-->
        <yzp-aside></yzp-aside>
        <!--侧边栏-->
      </div>

    </article>
    <!--end 内容部分-->

    <!--页脚-->
    <yzp-footer></yzp-footer>
    <!--end 页脚-->
  </div>
</template>

<style scoped lang="less">
.yzp-wrapper {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
.yzp-container {
  padding: 85px 0;
  display: flex;
  justify-content: center;
}
.yzp-main {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.yzp-section {
  flex: 1;
}
</style>
