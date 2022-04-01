<script lang="ts" setup>
  const { $flatColumns } = useNuxtApp()
  const route = useRoute()
  
  const column = $flatColumns.find((e: any) => route.name === e.url)
  const condition = { column_id: column.id, type: 'article' }
</script>

<template>
  <div class="yzp-article-category">
    <!--文章列表-->
    <feature-article-list :condition="condition" :column="column"></feature-article-list>
    <!--end 文章列表-->
  </div>
</template>