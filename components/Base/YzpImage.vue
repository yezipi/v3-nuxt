<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
})
</script>

<template>
  <img :src="src" onerror="this.src=/img/nopic.jpg" />
</template>