<script lang="ts" setup>
import { timeAgao, setAticleLink } from '@/utils/index'

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

</script>

<template>
  <div class="yzp-article-list">
    <div v-if="column.id || keywords" class="yzp-article-list-head flex-between yzp-box">
      <div class="yzp-article-list-head-left">
        共有 <span class="color-primary">{{ data.count }}</span> 条
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
    <ul class="yzp-article-ul">
      <li v-for="(item, index) in data.rows" :key="item.id" class="yzp-article-item yzp-box">
        <div class="yzp-article-item-cover">
          <img :src="item.cover" class="yzp-article-item-img" onerror="this.src='/assets/img/nopic.jpg'" />
        </div>
        <div class="yzp-article-item-info">
          <div class="yzp-article-text">
            <nuxt-link :to="setAticleLink(item.id, item.type)" target="_blank" class="yzp-article-item-link color-primary" :title="item.title">
              <span v-if="!keywords" class="yzp-article-item-title">{{ item.title }}</span>
              <span v-else v-for="(txt, i) in item.title" :index="i" class="yzp-article-item-title">
                <strong v-if="keywords.indexOf(txt.toLocaleLowerCase()) > -1" style="color: red">{{ txt }}</strong>
                <i v-else style="font-style: normal">{{ txt }}</i>
              </span>
            </nuxt-link>
          </div>
          <p class="yzp-article-item-desc">{{ item.description }}</p>
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
  </div>
</template>

<style scoped lang="less">
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
      align-items: center;
      transition: all 0.3s;
      padding: var(--space-15);
      margin-bottom: var(--space-15);
      &:hover {
        box-shadow: 0 0 15px rgba(0,0,0,0.1);
        .yzp-article-img {
          transform: scale(1.5) rotate(-15deg);
          filter:contrast(150%)
        }
      }
      .yzp-article-item-link {
        line-height: 30px;
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
        height: 90px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        flex: 1;
      }
      .yzp-article-item-desc {
        font-size: 12px;
        color: var(--color-gray);
        line-height: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
