<script setup lang="ts">

const route = useRoute()
const { moodApi } = useApi()

const temp = ref<any>();
const mood = await moodApi.getDetail(Number(route.params.id))
const id = computed(() => mood.value && mood.value.id)

const refresh = (data: any) => temp.value = data
</script>
</script>

<template>
  <div class="yzp-mood-wrap">

    <feature-mood-item :item="mood"></feature-mood-item>

    <!--评论列表-->
    <feature-comment-list v-if="mood && mood.id" type="mood" :parent-id="id"></feature-comment-list>
    <!--end评论列表-->

    <!--评论表单-->
    <base-yzp-form v-if="mood && mood.id" type="mood" :parent-id="id" @refresh="refresh" />
    <!--end 评论表单-->

  </div>
</template>
