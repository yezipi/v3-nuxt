<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
  isAvatar: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load'])

const load = (data: any) => {
  emit('load', data)
}

</script>

<template>
  <img v-if="!isAvatar" :src="src" onerror="this.src=/img/nopic.jpg" @load="load" />
  <img v-else :src="src" onerror="this.src=/img/default-avatar.png" />
</template>