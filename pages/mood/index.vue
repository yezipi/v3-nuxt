<script setup lang="ts">

const route = useRoute()

const moods = ref<any>({})

const getMoods = async () => {
  const result = await useMoods(route.query)
  moods.value = result.value
}

await getMoods()

watch(() => route.query, () => {
  getMoods()
})
</script>

<template>
  <div class="yzp-mood-wrap">
    <ul v-if="moods && moods.rows" class="yzp-mood-list">
      <li v-for="(item, index) in moods.rows" :key="index" class="yzp-mood-cell">
        <feature-mood-item :item="item"></feature-mood-item>
      </li>
    </ul>
    <!--分页-->
    <base-yzp-pagination v-if="moods && moods.count" :data="moods"></base-yzp-pagination>
    <!--end 分页-->
    <base-yzp-empty v-else desc="暂无内容" />
  </div>
</template>

<style lang="less">
.yzp-mood-wrap {
  .yzp-mood-list {
    margin-bottom: var(--space-15);
    .yzp-mood-cell {
      margin-bottom: var(--space-15);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>