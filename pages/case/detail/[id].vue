<script lang="ts" setup>
const route = useRoute()
const { params } = route

</script>

<template>
  <div class="yzp-article-detail">
    <feature-article-content :id="Number(params.id)" type="case"></feature-article-content>
  </div>
</template>

<style scoped lang="less">

</style>