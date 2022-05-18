<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<template>
  <div class="yzp-error">
    <error-notfound v-if="error.statusCode === '404'"></error-notfound>
    <error-server v-else :error=" error"></error-server>
  </div>
</template>
