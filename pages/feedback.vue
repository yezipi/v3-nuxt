<script setup lang="ts">
const temp = ref<any>();
const refreshFeedback = (data: any) => {
  temp.value = data
  window.scrollTo(0, 0)
}
</script>

<template>
  <div class="yzp-feedback-wrap">
    <!--留言列表-->
    <feature-comment-list type="feedback" :temp="temp"></feature-comment-list>
    <!--end留言列表-->

    <!--评论表单-->
    <base-yzp-form type="feedback" @refresh="refreshFeedback" />
    <!--end 评论表单-->

  </div>
</template>