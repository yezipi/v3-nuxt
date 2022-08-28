<script lang="ts" setup>
defineProps({
  error: Object,
})
</script>

<template>
  <div class="yzp-maintenance-wrap">
    <div class="yzp-maintenance-main max-w1200">
      <h1 style="text-align: center;font-size: xx-large;">网站维护中...</h1>
      <div v-html="error.message" class="yzp-maintenance-box"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.yzp-maintenance-wrap {
  height: 100vh;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  .yzp-maintenance-box {
    padding: var(--space-30);
    margin: var(--space-30);
  }
}
</style>
