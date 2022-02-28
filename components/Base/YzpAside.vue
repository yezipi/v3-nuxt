<script lang="ts" setup>
</script>

<template>
  <aside class="yzp-aside">
    
    <aside-yzp-user />

    <aside-yzp-search class="yzp-aside-panel" />

    <aside-yzp-mood class="yzp-aside-panel" />

  </aside>
</template>

<style scoped lang="less">
.yzp-aside {
  flex: 0.43;
  margin-left: 15px;
  height: 100%;
  flex-shrink: 0;
  max-width: 365px;
  .yzp-aside-panel {
    margin-top: var(--space-15);
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
