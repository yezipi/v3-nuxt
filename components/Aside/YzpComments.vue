<script lang="ts" setup>
import { timeAgao } from '@/utils/index'

const { commentApi } = useApi()

const result = await commentApi.getList({ page: 1, size: 5 })
const comments = result.value ? result.value.rows : []

const commentType = {
  article: {
    name: '文章',
    color: 'orange',
    url: '/article/detail/',
  },
  mood: {
    name: '微语',
    color: 'cyan',
    url: '/mood/detail/',
  },
  album: {
    name: '相册',
    color: 'blue',
    url: '/album/detail/',
  },
  case: {
    name: '案例',
    color: 'pink',
    url: '/case/detail/',
  },
}
const getCommentLink = (item: any) => {
  let parentId = ''
  const type = item.type
  if (type === 'article') {
    parentId = item.article_id
  }
  if (type === 'case') {
    parentId = item.article_id
  }
  if (type === 'mood') {
    parentId = item.mood_id
  }
  if (type === 'album') {
    parentId = item.album_id
  }
  return commentType[type].url + parentId + '#comment-' + item.id
}
</script>

<template>
  <!--最新评论-->
  <base-yzp-panel v-if="comments && comments.length" title="最新评论" noPadding icon="iconxiaoxi3">
    <ul class="yzp-aside-comment-wrap">
      <li v-for="(item, index) in comments" :key="index" class="yzp-aside-comment-item">
        <a
          :href="item.site || 'javascript:void(0)'"
          :title="item.site ? `去${item.nickname}的网站看看`: '没有登记网站'"
          target="_blank"
          rel="nofollow"
          class="yzp-aside-comment-item-avatar-link"
        >
          <img class="yzp-aside-comment-item-avatar-img" :src="item.avatar" onerror="this.src='/img/default-avatar.png'" />
        </a>
        <nuxt-link :to="getCommentLink(item)" class="yzp-aside-comment-item-link">
          <div class="yzp-aside-comment-item-user">
            <div class="yzp-aside-comment-item-top">
              <span class="yzp-aside-comment-item-nickname">{{ item.nickname }}</span>
              <span class="yzp-aside-comment-item-ua color-primary">{{ item.ua }}</span>
            </div>
            <span class="yzp-aside-comment-item-date">{{ timeAgao(item.createdAt) }}</span>
          </div>
          <div class="yzp-aside-comment-item-article">
            <base-yzp-tag :color="commentType[item.type].color" size="small">{{ commentType[item.type].name }}</base-yzp-tag>
            <span class="yzp-aside-comment-item-article-content">{{ item.content }}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </base-yzp-panel>
  <!--end 最新评论-->
</template>

<style lang="less">
.yzp-aside-comment-wrap {
  .yzp-aside-comment-item {
    display: flex;
    padding: var(--space-10) var(--space-15);
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: var(--space-10);
      right: var(--space-10);
      bottom: 0;
      height: 1px;
      background: var(--border-1);
    }
    &:hover {
      background: var(--bg-primary);
      
      .yzp-aside-comment-item-article-content {
        text-decoration: underline;
        color: var(--color-primary);
      }
      .yzp-aside-comment-item-avatar-link {
        transform: rotate(360deg);
      }
    }
    &:last-child:after {
      display: none;
    }
    .yzp-aside-comment-item-avatar-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      transition: all 0.3s;
      margin-right: 10px;
      .yzp-aside-comment-item-avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .yzp-aside-comment-item-link {
      flex: 1;
      font-size: 12px;
      .yzp-aside-comment-item-user {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .yzp-aside-comment-item-ua {
        display: inline-block;
        margin-left: 10px;
      }
      .yzp-aside-comment-item-date {
        color: var(--color-gray);
      }
    }
  }
}
</style>