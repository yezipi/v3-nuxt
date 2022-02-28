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
  border-bottom: 1px solid #eeeeee;
  height: 43px;
  .yzp-aside-search-input {
    flex: 1;
    border: none;
    line-height: 43px;
    &:focus {
      box-shadow: none;
    }
  }
  .iconfont {
    font-size: var(--font-xl);
    color: var(--text-gray);
    display: inline-block;
    margin-right: 10px;
    &:hover {
      color: var(--text-primary);
    }
  }
}
</style>