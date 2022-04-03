<script lang="ts" setup>
  const { $flatColumns } = useNuxtApp()
  const route = useRoute()

  const column = $flatColumns.find((e: any) => route.name === e.url)
  const condition = { column_id: column.id, type: 'case' }
</script>

<template>
  <div class="yzp-article-case">
    <!--文章列表-->
    <feature-case-list :condition="condition" :column="column"></feature-case-list>
    <!--end 文章列表-->
  </div>
</template>