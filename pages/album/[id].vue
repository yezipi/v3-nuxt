<script lang="ts" setup>
const route = useRoute()
const album_id = computed(() => Number(route.params.id))
</script>

<template>
  <div class="yzp-article-album">
    <!--相册列表-->
    <feature-picture-list :condition="{ album_id }" isPicture></feature-picture-list>
    <!--end 相册列表-->
    
    <!--评论列表-->
    <feature-comment-list v-if="album_id" type="album" :parent-id="album_id"></feature-comment-list>
    <!--end评论列表-->

    <!--评论表单-->
    <base-yzp-form v-if="album_id" type="album" :parent-id="album_id" />
    <!--end 评论表单-->
  </div>
</template>