<script lang="ts" setup>
const { albumApi } = useApi();
const route = useRoute();
const album_id = computed(() => Number(route.params.id));
const hasPicture = ref(false);
const info = ref<any>({});
const password = ref("");
const loading = ref(false);

const { $message } = useNuxtApp();
const baseSettings = useBaseSettings();

try {
  info.value = await albumApi.getDetail(+album_id.value);
  hasPicture.value = info.value.picture_count;
} catch (e) {
  console.log(e);
}

// 查看加密文章
const unclock = async () => {
  if (!password.value) {
    $message.error("请输入密码");
    return;
  }
  try {
    loading.value = true;
    await albumApi.unlock({ id: info.value.id, password: password.value });
    info.value.lock = false;
    console.log(info);
  } catch (error: any) {
    $message.error(error.msg);
  } finally {
    loading.value = false;
  }
};

useHead({
  title: info.value.title + "-相册-" + baseSettings.value.web_name,
  meta: [
    {
      hid: "description",
      name: "description",
      content: info.value.description || "",
    },
  ],
});
</script>

<template>
  <div class="yzp-article-album">
    <!--相册列表-->
    <feature-picture-list
      v-if="!info.lock"
      :condition="{ album_id }"
      :info="info"
      isPicture
    ></feature-picture-list>
    <!--end 相册列表-->

    <template v-else>
      <div class="yzp-album-detail-head flex-between yzp-box">
        <div class="yzp-album-detail-head-left">
          共有 <span class="color-primary">{{ info.picture_count }}</span> 条
        </div>
        <div class="yzp-album-detail-head-right">
          <i class="iconfont iconleimupinleifenleileibie2-copy"></i>
          <span class="color-primary">{{ info.title }}</span>
        </div>
      </div>

      <div class="yzp-album-lock">
        <input v-model="password" type="text" placeholder="请输入密码查看" />
        <button :disabled="loading" :class="{ disbaled: loading }" @click="unclock">
          {{ loading ? "loading..." : "确定" }}
        </button>
      </div>
    </template>

    <!--评论列表-->
    <feature-comment-list
      v-if="album_id && hasPicture"
      type="album"
      :parent-id="album_id"
    ></feature-comment-list>
    <!--end评论列表-->

    <!--评论表单-->
    <base-yzp-form v-if="album_id && hasPicture" type="album" :parent-id="album_id" />
    <!--end 评论表单-->
  </div>
</template>

<style lang="less">
.yzp-album-detail-head {
  padding: var(--space-10);
  .iconfont {
    display: inline-block;
    margin-right: 5px;
    color: var(--color-gray);
  }
  &:hover {
    text-decoration: underline;
  }
}
.yzp-album-lock {
  display: flex;
  min-height: 285px;
  align-items: center;
  justify-content: center;
  input {
    height: 40px;
    padding: 0 var(--space-10);
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  button {
    height: 40px;
    padding: 0 var(--space-20);
    background: var(--color-primary);
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    color: var(--color-white);
    &.disabled {
      background: var(--border-1);
      cursor: not-allowed;
    }
  }
}
</style>
