<script lang="ts" setup>
  import api from '@/api'

  const { $flatColumns } = useNuxtApp()
  const route = useRoute()
  const column = $flatColumns.find((e: any) => route.name === e.url)
  console.log(column)
  const articles = await api.getArticles({ column_id: column.id, type: 'case' })
</script>

<template>
  <div class="yzp-article-category">
    <!--文章列表-->
    <feature-article-list :data="articles" :column="column"></feature-article-list>
    <!--end 文章列表-->
  </div>
</template>