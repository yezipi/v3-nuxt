<script lang="ts" setup>
import { setRandomTag } from '@/utils/index'

const { articleApi } = useApi()

const result = await articleApi.getTags({ page: 1, size: 50 })
const tags = ref(result.value && result.value.rows ? result.value.rows : [] )
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
    <base-yzp-tag3d :data="tags">
      <template #item="{ item } ">
        <base-yzp-tag :color="item.color" style="margin-right: 0;">{{ item.name }}</base-yzp-tag>
      </template>
    </base-yzp-tag3d>
  </base-yzp-panel>
  <!--end 标签-->
</template>

<style lang="less">
</style>