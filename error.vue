<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<template>
  <div class="yzp-error">
    <error-not-found v-if="error.statusCode === '404'"></error-not-found>
    <error-server v-else :error=" error"></error-server>
  </div>
</template>
