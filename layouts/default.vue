<script lang="ts" setup>
</script>

<template>
  <div class="yzp-wrapper">
    <!--顶部-->
    <base-yzp-header></base-yzp-header>
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
        <base-yzp-aside></base-yzp-aside>
        <!--侧边栏-->
      </div>

    </article>
    <!--end 内容部分-->

    <!--页脚-->
    <base-yzp-footer></base-yzp-footer>
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
  margin-top: 85px;
  margin-bottom: var(--space-15);
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
  min-height: calc(100vh - 170px);
}
</style>
