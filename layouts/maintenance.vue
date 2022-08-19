<script lang="ts" setup>
const maintenanceSettings = useMaintenanceSettings()
</script>

<template>
  <div class="yzp-maintenance-wrap">
    <div class="yzp-maintenance-main max-w1200">
      <div v-html="maintenanceSettings.content" class="yzp-maintenance-box"></div>
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
