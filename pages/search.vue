<script lang="ts" setup>

  const route = useRoute()
  const keywords = ref<any>(route.query.keywords.toString())

  const keys = computed(() => typeof keywords.value !== 'string' ? '' : keywords.value.toLocaleLowerCase())

  watch(() => route.query, (val: any) => {
    keywords.value = val
  })

</script>

<template>
  <div class="yzp-article-category">
    <!--搜索列表-->
    <feature-article-list :condition="{ keywords: keys.value }" :keywords="keys"></feature-article-list>
    <!--end 搜索列表-->
  </div>
</template>