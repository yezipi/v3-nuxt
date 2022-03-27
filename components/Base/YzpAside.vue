<script lang="ts" setup>
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <aside class="yzp-aside">
    
    <aside-yzp-user />

    <aside-yzp-search class="yzp-aside-panel" />

    <!-- <aside-yzp-mood class="yzp-aside-panel" /> -->

    <div :class="{ 'yzp-aside-fixed': isMounted }" class="yzp-aside-behind">
      <aside-yzp-article class="yzp-aside-panel" />

      <aside-yzp-comments class="yzp-aside-panel" />

      <aside-yzp-tags class="yzp-aside-panel" />

      <aside-yzp-blogroll class="yzp-aside-panel" />
    </div>

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
  .yzp-aside-fixed {
    position: sticky;
    top: 70px;
    z-index: 1;
  }
  .yzp-aside-behind {
    margin-top: var(--space-15);
  }
}
</style>
