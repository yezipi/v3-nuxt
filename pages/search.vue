<script lang="ts" setup>
  

  const route = useRoute()
  const keywords = ref<any>(route.query.keywords.toString())

  const articles = ref<any>({})

  const getArticles = async () => {
    const result = await getArticles({ keywords: keywords.value })
    articles.value = result.value
  }

  watch(() => route.query, (val: any) => {
    keywords.value = val
    getArticles()
  })

  getArticles()
</script>

<template>
  <div class="yzp-article-category">
    <!--搜索列表-->
    <feature-article-list :data="articles" :keywords="keywords.toLocaleLowerCase()"></feature-article-list>
    <!--end 搜索列表-->
  </div>
</template>