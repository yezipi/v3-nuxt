<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  noPadding: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="yzp-panel-wrap bg box">
    <div v-if="title" class="yzp-panel-title">
      <i :class="icon" class="iconfont"></i>
      <span>{{ title }}</span>
    </div>
    <div :class="{ noPadding }" class="yzp-panel-main">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.yzp-panel-wrap {
  box-sizing: border-box;
  .yzp-panel-title {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 0 var(--space-15);
    height: 45px;
    color: var(--text-primary);
    font-size: var(--font-m);
    .iconfont {
      margin-right: 10px;
    }
  }
  .yzp-panel-main {
    padding: var(--space-15);
    &.noPadding {
      padding: 0;
    }
  }
}
</style>
