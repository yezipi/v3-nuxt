<script lang="ts" setup>
import { setAticleLink } from '~~/utils/index'

const props = defineProps({

  /**
   * 筛选条件
   */
  condition: {
    type: Object,
    default: () => {}
  },

  /**
   * 栏目信息
   */
  column: {
    type: Object,
    default: () => {
      return {
        id: undefined,
        name: undefined,
      }
    },
  },

  /**
   * 是否搜索
   */
  keywords: {
    type: String,
    default: '',
  },
})

const route = useRoute()

const { articleApi } = useApi()

const filter = ref<any>(props.condition)

const articles = ref<any>({ count: 0, rows: [] as any })

const getArticles = async () => {
  const data = await articleApi.getList({ ...filter.value, ...route.query })
  articles.value = data.value
}

watch(() => route.query, () => {
  getArticles()
})

// 组件里加载不这样写顶级await会报警告
await getArticles()

</script>

<template>
  <div class="yzp-case-list">

    <div v-if="column.id || keywords" class="yzp-case-list-head flex-between yzp-box">
      <div class="yzp-case-list-head-left">
        共有 <span class="color-primary">{{ articles.count }}</span> 条
      </div>
      <div v-if="!keywords" class="yzp-case-list-head-right">
        <i class="iconfont iconleimupinleifenleileibie2-copy"></i>
        <span class="color-primary">{{ column.name }}</span>
      </div>
      <div v-else class="yzp-case-list-head-right">
        关键词：
        <span class="color-primary">{{ keywords }}</span>
      </div>
    </div>

    <ul v-if="articles && articles.rows" class="yzp-case-ul">
      <li v-for="(item) in articles.rows" :key="item.id" class="yzp-case-item">
        <nuxt-link :to="setAticleLink(item.id, item.type)" class="yzp-case-item-block">
          <div class="yzp-case-item-cover">
            <base-yzp-image class="yzp-case-item-img" :src="item.cover"></base-yzp-image>
          </div>
          <div class="yzp-case-item-info yzp-box">
            <span v-if="!keywords" class="yzp-case-item-title color-primary">{{ item.title }}</span>
            <!-- <div v-if="item.description" class="yzp-case-item-desc">{{ item.description.substring(0, 45) }}...</div> -->
            <div class="yzp-case-item-bottom">
              <div class="yzp-case-item-icon">
                <i class="iconfont iconyanjing"></i>
                <span class="yzp-case-item-data">{{ item.view }}</span>
              </div>
              <div class="yzp-case-item-icon">
                <i class="iconfont iconxiaoxi3"></i>
                <span class="yzp-case-item-data">{{ item.comments_count }}</span>
              </div>
              <div class="yzp-case-item-icon">
                <i class="iconfont icon03"></i>
                <span class="yzp-case-data">{{ item.like }}</span>
              </div>
              <div class="yzp-case-item-icon">
                <i class="iconfont iconfenlei"></i>
                <span class="yzp-case-data">{{ item.subcolumn.name }}</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <!--分页-->
    <base-yzp-pagination v-if="articles && articles.count" :data="articles"></base-yzp-pagination>
    <!--end 分页-->
    <base-yzp-empty v-else desc="暂无内容" />

  </div>
</template>

<style lang="less">
.yzp-case-list {
  .yzp-case-list-head {
    padding: var(--space-15);
    margin-bottom: var(--space-15);
    .yzp-case-list-head-right {
      .iconfont {
        display: inline-block;
        margin-right: 5px;
        color: var(--color-gray);
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .yzp-case-ul {
    display: flex;
    flex-wrap: wrap;
    .yzp-case-item {
      width: 32.33%;
      max-width: 32.33%;
      flex: auto;
      margin-right: 1.5%;
      margin-bottom: var(--space-15);
      border: 1px solid transparent;
      box-sizing: border-box;
      border-radius: var(--border-radius);
      transition: all 0.3s;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 0 0 5px rgba(var(--rgb-primary), 0.5);
        border-color: var(--color-primary);
        .yzp-case-item-cover {
          .yzp-case-item-img {
            transform: scale(1.2);
            filter: saturate(200%);
          }
        }
      }
      .yzp-case-item-block {
        display: block;
      }
      .yzp-case-item-cover {
        width: 100%;
        height: 150px;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        overflow: hidden;
        .yzp-case-item-img {
          width: 100%;
          height: 100%;
          transition: all 0.3s;
          object-fit: cover;
        }
      }
      .yzp-case-item-info {
        padding: var(--space-15);
        box-shadow: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        .yzp-case-item-title {
          font-size: var(--font-l);
          display: block;
          margin-bottom: var(--space-5);
        }
        .yzp-case-item-bottom {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-s);
          color: var(--color-gray);
          .iconfont {
            display: inline-block;
            margin-right: var(--space-5);
          }
        }
      }
    }
  }
}
</style>
