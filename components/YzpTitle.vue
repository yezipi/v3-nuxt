<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="yzp-title p1015 ft14 color-primary">
    <i :class="icon" class="iconfont"></i>
    <span>{{ title }}</span>
  </div>
</template>

<style scoped lang="less">
.yzp-title {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  .iconfont {
    margin-right: 10px;
  }
}
</style>
