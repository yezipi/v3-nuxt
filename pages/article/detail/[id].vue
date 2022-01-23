<script lang="ts" setup>
const route = useRoute()
console.log(route.params)
const { params } = route

</script>

<template>
  <div class="yzp-article-detail">
    <article-content :id="Number(params.id)"></article-content>
  </div>
</template>

<style scoped lang="less">

</style>