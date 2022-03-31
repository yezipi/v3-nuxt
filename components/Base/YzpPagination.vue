<script lang="ts" setup>
const props = defineProps({
  /**
   * 列表数据
   */
  data: {
    type: Object,
    default: () => { 
      return {
        rows: [],
        count: 0,
      }
    }
  },
})

const route = useRoute()

const page = ref<any>(+route.query.page || 1)
const size = ref(10)

const num = computed(() => Math.ceil(props.data.count / size.value))

watch(() => route.query, (query: { page: any }) => {
  page.value = +query.page
})

</script>

<template>
  <div class="yzp-pagination-wrap">
    <div clas="yzp-pagination-left">
      总共 <span clas="color-primary">{{ data.count }}</span> 条
    </div>
    <ul class="yzp-pagination-list">
      <li index="page_pre" :class="{ 'yzp-pagination-item-disabled': page === 1 }" class="yzp-pagination-item yzp-pagination-prev yzp-box">
        <div v-if="page === 1" to="/" class="yzp-pagination-item-link">
          <i class="iconfont iconright"></i>
        </div>
        <nuxt-link v-else :to="`${route.path}?page=${page - 1}`" class="yzp-pagination-item-link">
          <i class="iconfont iconright"></i>
        </nuxt-link>
      </li>
      <li
        v-for="item in num"
        :index="`page_${item}`"
        :class="{ 'yzp-pagination-item-active': item === page }"
        class="yzp-pagination-item yzp-box"
      >
        <span v-if="item === page" class="yzp-pagination-item-link">{{ item }}</span>
        <nuxt-link v-else :to="`${route.path}?page=${item}`" class="yzp-pagination-item-link">
          {{ item }}
        </nuxt-link>
      </li>
      <li index="page_next" :class="{ 'yzp-pagination-item-disabled': page === num }" class="yzp-pagination-item yzp-pagination-next yzp-box">
        <div v-if="page === num" class="yzp-pagination-item-link">
          <i class="iconfont iconright"></i>
        </div>
        <nuxt-link v-else :to="`${route.path}?page=${page + 1}`" class="yzp-pagination-item-link">
          <i class="iconfont iconright"></i>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
  .yzp-pagination-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .yzp-pagination-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 var(--space-15);
      .yzp-pagination-item {
        display: flex;
        min-width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin-right: var(--space-10);
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
        &:hover, &.yzp-pagination-item-active {
          background: var(--color-primary);
          color: #ffffff;
        }
        &.yzp-pagination-item-disabled {
          background: #eeeeee;
          color: #999999;
          cursor: not-allowed;
        }
        .iconfont {
          display: inline-block;
          transform: translateY(-1px) rotate(0);
        }
        &.yzp-pagination-prev {
          .iconfont {
            transform: translateY(-2px) rotate(-180deg);
          }
        }
        .yzp-pagination-item-link {
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
    }
  }
</style>