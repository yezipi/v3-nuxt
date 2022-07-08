<script lang="ts" setup>
  const flatColumns = useFlatColumns()
  const route = useRoute()
  
  const subcolumn = flatColumns.value.find((e: any) => route.params.id === e.url)
  const condition = { subcolumn_id: subcolumn.id, type: 'article' }
</script>

<template>
  <div class="yzp-article-category">
    <!--文章列表-->
    <feature-article-list :condition="condition" :column="subcolumn"></feature-article-list>
    <!--end 文章列表-->
  </div>
</template>