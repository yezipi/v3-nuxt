<script lang="ts" setup>
const { blogrollApi } = useApi()

const result = await blogrollApi.getList({ page: 1, size: 50, recommend: 1 })
const blogroll = result && result.rows ? result.rows : []
</script>

<template>
  <!--搜索-->
  <base-yzp-panel v-if="blogroll && blogroll.length" title="友情链接" icon="iconlianjie">
    <template #titleRight>
      <nuxt-link to="/" class="yzp-aside-blogroll-apply color-primary">+ 申请</nuxt-link>
    </template>
    <div class="yzp-aside-blogroll-wrap">
      <a
        v-for="(item, index) in blogroll"
        :index="index"
        :href="item.site"
        target="_blank"
        class="yzp-aside-blogroll-item color-primary"
      >
        {{ item.nickname }}
      </a>
    </div>
  </base-yzp-panel>
  <!--end 搜索-->
</template>

<style lang="less">
.yzp-aside-blogroll-wrap {
  margin-right: -10px;
  .yzp-aside-blogroll-item {
    padding: var(--space-5) var(--space-10);
    cursor: pointer;
    transition: all 0.3s;
    border-radius: var(--border-radius);
    background: var(--color-primary-01);
    margin: var(--space-5);
    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }
}
</style>