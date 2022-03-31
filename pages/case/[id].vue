<script lang="ts" setup>
  

  const { $flatColumns } = useNuxtApp()
  const route = useRoute()
  
  const subcolumn = $flatColumns.find((e: any) => route.params.id === e.url)

  const articles = await getArticles({ subcolumn_id: subcolumn.id, type: 'case' })
</script>

<template>
  <div class="yzp-article-category">
    <!--文案例列表-->
    <feature-article-list :data="articles" :column="subcolumn"></feature-article-list>
    <!--end 案例列表-->
  </div>
</template>