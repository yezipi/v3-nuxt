<script lang="ts" setup>
  import api from '@/api'

  const { $flatColumns } = useNuxtApp()
  const route = useRoute()
  
  const subcolumn = $flatColumns.find((e: any) => route.params.id === e.url)

  const articles = await api.getArticles({ subcolumn_id: subcolumn.id, type: 'case' })
</script>

<template>
  <div class="yzp-article-category">
    <!--文案例列表-->
    <feature-article-list :data="articles" :column="subcolumn"></feature-article-list>
    <!--end 案例列表-->
  </div>
</template>