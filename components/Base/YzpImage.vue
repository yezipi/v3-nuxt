<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  isAvatar: {
    type: Boolean,
    default: false
  }
})
const { $config } = useNuxtApp()

const imgUrl = computed(() => props.src && props.src.indexOf('http') > -1 ? props.src : $config.baseURL + props.src)

const emit = defineEmits(['load'])

const load = (data: any) => {
  emit('load', data)
}

</script>

<template>
  <img v-if="!isAvatar" :src="imgUrl" onerror="this.src=/img/nopic.jpg" @load="load" />
  <img v-else :src="imgUrl" onerror="this.src=/img/default-avatar.png" />
</template>