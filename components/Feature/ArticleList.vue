<script lang="ts" setup>
import { timeAgao, setAticleLink } from '~~/utils/index'

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

const filter = ref<any>(props.condition)

const articles = ref<any>({ count: 0, rows: [] as any })

const getArticles = async () => {
  const data = await useArticles({ ...filter.value, ...route.query })
  articles.value = data.value
}

watch(() => route.query, () => {
  getArticles()
})

// 组件里加载不这样写顶级await会报警告
await getArticles()

</script>

<template>
  <div class="yzp-article-list">
    <div v-if="column.id || keywords" class="yzp-article-list-head flex-between yzp-box">
      <div class="yzp-article-list-head-left">
        共有 <span class="color-primary">{{ articles.count }}</span> 条
      </div>
      <div v-if="!keywords" class="yzp-article-list-head-right">
        <i class="iconfont iconleimupinleifenleileibie2-copy"></i>
        <span class="color-primary">{{ column.name }}</span>
      </div>
      <div v-else class="yzp-article-list-head-right">
        关键词：
        <span class="color-primary">{{ keywords }}</span>
      </div>
    </div>
    <ul v-if="articles && articles.rows" class="yzp-article-ul">
      <li v-for="(item) in articles.rows" :key="item.id" class="yzp-article-item yzp-box">
        <div class="yzp-article-item-cover">
          <base-yzp-image class="yzp-article-item-img" :src="item.cover"></base-yzp-image>
        </div>
        <div class="yzp-article-item-info">
          <nuxt-link :to="setAticleLink(item.id, item.type)" class="yzp-article-item-link color-primary" :title="item.title">
            <span v-if="!keywords" class="yzp-article-item-title">{{ item.title }}</span>
            <span v-else v-for="(txt, i) in item.title" :index="i" class="yzp-article-item-title">
              <strong v-if="keywords.indexOf(txt.toLocaleLowerCase()) > -1" style="color: red">{{ txt }}</strong>
              <i v-else style="font-style: normal">{{ txt }}</i>
            </span>
          </nuxt-link>
          <div class="yzp-article-item-desc">{{ item.content }}...</div>
          <div class="yzp-article-item-bottom">
            <div class="yzp-article-item-icon">
              <i class="iconfont iconshijian"></i>
              <span class="yzp-article-item-data">{{ timeAgao(item.created_at) }}</span>
            </div>
            <div class="yzp-article-item-icon">
              <i class="iconfont iconyanjing"></i>
              <span class="yzp-article-item-data">{{ item.view }}</span>
            </div>
            <div class="yzp-article-item-icon">
              <i class="iconfont iconxiaoxi3"></i>
              <span class="yzp-article-item-data">{{ item.comments_count }}</span>
            </div>
            <div class="yzp-article-item-icon">
              <i class="iconfont icon03"></i>
              <span class="yzp-article-data">{{ item.like }}</span>
            </div>
            <div class="yzp-article-item-icon">
              <i class="iconfont iconfenlei"></i>
              <span class="yzp-article-data">{{ item.subcolumn.name }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!--分页-->
    <base-yzp-pagination v-if="articles && articles.count" :data="articles"></base-yzp-pagination>
    <!--end 分页-->
    <base-yzp-empty v-else desc="暂无内容" />
  </div>
</template>

<style lang="less">
.yzp-article-list {
  .yzp-article-list-head {
    padding: var(--space-15);
    margin-bottom: var(--space-15);
    .yzp-article-list-head-right {
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
  .yzp-article-ul {
    .yzp-article-item {
      display: flex;
      transition: all 0.3s;
      padding: var(--space-15);
      margin-bottom: var(--space-15);
      transition: all 0.3s;
      min-height: 90px;
      &:hover {
        box-shadow: 0 0 15px rgba(0,0,0,0.1);
        .yzp-article-item-cover {
          .yzp-article-item-img {
            transform: scale(1.2);
            filter: saturate(200%);
          }
        }
      }
      .yzp-article-item-title {
        font-size: var(--font-xl);
        &:hover {
          text-decoration: underline;
        }
      }
      .yzp-article-item-cover {
        width: 170px;
        height: 90px;
        flex-shrink: 0;
        border-radius: 5px;
        overflow: hidden;
        margin-right: var(--space-15);
        background: var(--bg-primary);
        .yzp-article-item-img {
          transition: all 0.3s;
          width: 100%;
          height: 100%;
          background-size: cover!important;
        }
      }
      .yzp-article-item-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        flex: 1;
      }
      .yzp-article-item-desc {
        font-size: var(--font-m);
        color: var(--color-gray);
        line-height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: var(--space-5) 0;
      }
      .yzp-article-item-bottom {
        display: flex;
        align-items: center;
        color: var(--color-gray);
        font-size: 12px;
        .yzp-article-item-icon {
          margin-right: var(--space-15)
        }
        .iconfont {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
