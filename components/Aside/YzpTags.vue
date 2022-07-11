<script lang="ts" setup>
import { setRandomTag } from '@/utils/index'

const { articleApi } = useApi()

const result = await articleApi.getTags({ page: 1, size: 50 })
const tags = ref(result && result.rows ? result.rows : [] )
tags.value = tags.value.map((e: any) => {
  return {
    ...e,
    color: setRandomTag()
  }
})

</script>

<template>
  <!--标签-->
  <base-yzp-panel v-if="tags && tags.length" title="标签" icon="iconbiaoqian">
    <!-- <base-yzp-tag3d :data="tags">
      <template #item="{ item } ">
        <base-yzp-tag :color="item.color" style="margin-right: 0;">{{ item.name }}</base-yzp-tag>
      </template>
    </base-yzp-tag3d> -->
    <nuxt-link
      class="yzp-tags-link"
      v-for="(item, index) in tags"
      :index="index"
      :to="`/search?keywords=${item.name}`"
    >
      <base-yzp-tag :color="item.color" style="margin-right: 0">{{ item.name }}</base-yzp-tag>
    </nuxt-link>
  </base-yzp-panel>
  <!--end 标签-->
</template>

<style lang="less">
.yzp-tags-link {
  display: inline-block;
  margin: var(--space-5);
}
</style>