<script lang="ts" setup>
</script>

<template>
  <!--搜索-->
  <base-yzp-panel title="搜索" icon="iconsousuo">
    <div class="yzp-aside-search-wrap">
      <input class="yzp-aside-search-input" type="text" placeholder="请输入关键字" />
      <i class="iconfont iconsousuo"></i>
    </div>
  </base-yzp-panel>
  <!--end 搜索-->
</template>

<style lang="less" scoped>
.yzp-aside-search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .yzp-aside-search-input {
    flex: 1;
    line-height: 43px;
    height: 43px;
    border-radius: 22px;
    padding: 0 var(--space-15);
  }
  .iconfont {
    font-size: var(--font-xl);
    color: var(--color-gray);
    display: inline-block;
    position: absolute;
    right: var(--space-15);
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>