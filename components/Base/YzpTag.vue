<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'cyan'
  },
  size: {
    type: String,
    default: 'normal' // small, normal
  }
})
</script>

<template>
  <span
    :class="[color.indexOf('#') < 0 ? `yzp-tag-${color}` : 'custom-color', size === 'small' ? 'yzp-tag-small' : '']"
    :style="color.indexOf('#') > -1 ? { 'background-color': color } : undefined"
    class="yzp-tag"
  >
    <slot></slot>
  </span>
</template>

<style lang="less">
.yzp-tag {
  color: #ffffff;
  box-sizing: border-box;
  display: inline-block;
  height: auto;
  padding: 0 var(--space-10);
  white-space: nowrap;
  transition: all 0.3s;
  margin-right: var(--space-10);
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  line-height: 24px;
  font-size: 12px;
  &.yzp-tag-small {
    padding: 0 var(--space-5);
    line-height: 18px;
  }
}
.yzp-tag-pink {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
}
.yzp-tag-red {
  color: #cf1322;
  background: #fff1f0;
  border-color: #ffa39e;
}
.yzp-tag-orange {
  color: #d46b08;
  background: #fff7e6;
  border-color: #ffd591;
}
.yzp-tag-green {
  color: #389e0d;
  background: #f6ffed;
  border-color: #b7eb8f
}
.yzp-tag-cyan {
  color: #08979c;
  background: #e6fffb;
  border-color: #87e8de;
}
.yzp-tag-blue {
  color: #096dd9;
  background: #e6f7ff;
  border-color: #91d5ff;
}
.yzp-tag-purple {
  color: #531dab;
  background: #f9f0ff;
  border-color: #d3adf7;
}
</style>