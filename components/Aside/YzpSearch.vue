<script lang="ts" setup>
const router = useRouter()

const keywords = ref<any>('')
const toSearch = () => {
  router.push({
    name: 'search',
    query: {
      keywords: keywords.value,
    }
  })
}
</script>

<template>
  <!--搜索-->
  <base-yzp-panel title="搜索" icon="iconsousuo">
    <form id="yzp-search" class="yzp-aside-search-wrap" onsubmit="return false">
      <input v-model="keywords" class="yzp-aside-search-input yzp-box" type="text" name="keywords" placeholder="请输入关键字" @enter="toSearch" />
      <i class="iconfont iconsousuo" @click="toSearch"></i>
    </form>
  </base-yzp-panel>
  <!--end 搜索-->
</template>

<style lang="less">
.yzp-aside-search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 6px 0;
  .yzp-aside-search-input {
    flex: 1;
    line-height: 45px;
    height: 45px;
    border-radius: 22px;
    padding: 0 var(--space-15);
  }
  .iconfont {
    font-size: var(--font-18);
    color: var(--color-gray);
    display: inline-block;
    position: absolute;
    right: var(--space-15);
    cursor: pointer;
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>