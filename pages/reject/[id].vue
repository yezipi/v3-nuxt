<script lang="ts" setup>
const route = useRoute()
const id = route.params.id
console.log(id)
</script>

<template>
  <div class="yzp-error-page">
    <error-not-found v-if="id === '404'"></error-not-found>
    <error-no-permission v-else-if="id === '403'"></error-no-permission>
    <error-server v-else></error-server>
  </div>
</template>

<style scoped lang="less">

</style>