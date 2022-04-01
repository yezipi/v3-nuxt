<script lang="ts" setup>
  console.log(11111111111)
  definePageMeta({
    layout: 'error',
  });
</script>

<template>
  <NuxtErrorBoundary>
    <!-- You use the default slot to render your content --> 
    <template #error="{ error }">
      You can display the error locally here.
      <button>
        This will clear the error.
      </button>
    </template>
  </NuxtErrorBoundary>
</template>