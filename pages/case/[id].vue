<script lang="ts" setup>

  const { $flatColumns } = useNuxtApp()
  const route = useRoute()
  
  const subcolumn = $flatColumns.find((e: any) => route.params.id === e.url)
  const condition = { subcolumn_id: subcolumn.id, type: 'case' }
</script>

<template>
  <div class="yzp-article-case">
    <!--文案例列表-->
    <feature-case-list :condition="condition" :column="subcolumn"></feature-case-list>
    <!--end 案例列表-->
  </div>
</template>