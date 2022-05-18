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
  },
  noBg: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="{ 'yzp-box': !noBg }" class="yzp-panel-wrap">
    <div v-if="title" :class="{ 'yzp-box': noBg }" class="yzp-panel-title">
      <div class="yzp-panel-title-left">
        <i :class="icon" class="iconfont"></i>
        <span>{{ title }}</span>
      </div>
      <slot name="titleRight"></slot>
    </div>
    <div :class="{ noPadding }" class="yzp-panel-main">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.yzp-panel-wrap {
  .yzp-panel-title {
    border-bottom: 1px solid var(--border-1);
    display: flex;
    align-items: center;
    padding: 0 var(--space-15);
    height: 45px;
    font-size: var(--font-m);
    display: flex;
    justify-content: space-between;
    background: var(--color-white);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    .iconfont {
      margin-right: 5px;
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
