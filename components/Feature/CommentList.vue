<script lang="ts" setup>
import api from '@/api'
import { timeAgao } from '@/utils/index'

const { $baseSettings } = useNuxtApp()
const { web_avatar, web_name } = $baseSettings.value

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  parentId: {
    type: Number,
    default: 0
  }
})

const parentType = {
  article: 'article_id',
  mood: 'mood_id',
  almun: 'album_id'
}

const typeText = props.type !== 'feedback' ? '评论' : '留言'

const condition = ref<any>({ size: 10, page: 1 })
const list = ref<any>({ count: 0, rows: [] as any })

if (props.type !== 'feedback') {
  condition.value[parentType[props.type]] = props.parentId  
  const result = await api.getComments(condition.value)
  list.value = result.value
} else {
  const result = await api.getFeedbacks(condition.value)
  list.value = result.value
}

</script>

<template>
  <div class="yzp-comment-wrap">

    <div v-if="list && list.count" class="yzp-comment-box">
      <div class="yzp-comment-head flex-between yzp-box">
        <div class="yzp-comment-head-left">
          共有 <span class="color-primary">{{ list.count || 0 }}</span> 条{{ typeText }}
        </div>
        <a href="#yzp-form-box" class="yzp-comment-head-right color-primary">
          <i class="iconfont iconpinglun"></i>
          <span>发表{{ typeText }}</span>
        </a>
      </div>

      <ul class="yzp-comment-list">
        <li v-for="(item, index) in list.rows" :key="index" class="yzp-comment-item yzp-box">
          <a href="" class="yzp-comment-item-avatar">
            <img :src="item.avatar" />
          </a>
          <div class="yzp-comment-item-info">

            <div class="yzp-comment-item-top flex-between">
              <span class="yzp-comment-item-nickname color-primary">{{ item.nickname }}</span>
              <span class="yzp-comment-item-id" :id="'#' + item.id">#{{ item.id }}</span>
            </div>

            <div class="yzp-comment-item-data">
              <div class="yzp-comment-item-data-item">
                <i class="iconfont iconshijian1"></i>
                <span>{{ timeAgao(item.createdAt, true) }}</span>
              </div>
              <div class="yzp-comment-item-data-item">
                <i class="iconfont iconweizhi"></i>
                <span v-if="item.province">{{ item.province + item.city }}</span>
                <span v-if="item.address">{{ item.address }}</span>
                <span v-if="!item.province && !item.city && !item.address">未知</span>
              </div>
              <div class="yzp-comment-item-data-item">
                <i class="iconfont iconiPhone"></i>
                <span>{{ item.ua || '未知' }}</span>
              </div>
              <div v-if="item.browser" class="yzp-comment-item-data-item">
                <i class="iconfont iconwangzhan"></i>
                <span>{{ item.browser }}</span>
              </div>
            </div>
            
            <div class="yzp-comment-item-text">
              <p class="yzp-comment-item-content">{{ item.content }}</p>
              <div v-if="item.reply_content" class="yzp-comment-item-reply">
                <div class="yzp-comment-item-reply-avavtar">
                  <img :src="web_avatar" />
                </div>
                <div class="yzp-comment-item-reply-info">
                  <div class="yzp-comment-item-reply-top">
                    <span class="color-primary"><i class="iconfont iconzuozhe"></i>{{ web_name }}</span>
                    <span class="yzp-comment-item-reply-date">2022-03-27 回复</span>
                    <span class="color-primary">@{{ item.nickname }}</span>
                  </div>
                  <div class="yzp-comment-item-reply-content">{{ item.reply_content }}</div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <base-yzp-empty v-else />

  </div>
</template>

<style scoped lang="less">
.yzp-comment-wrap {
  margin-bottom: var(--space-15);
  .iconfont {
    display: inline-block;
    margin-right: 5px;
  }
  .yzp-comment-head {
    padding: var(--space-15);
    margin-bottom: var(--space-15);
    .yzp-comment-head-right {
      .iconfont {
        display: inline-block;
        margin-right: 5px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .yzp-comment-list {
    .yzp-comment-item {
      padding: var(--space-15);
      margin-bottom: var(--space-15);
      display: flex;
      &:last-child {
        margin-bottom: 0;
      }
      .yzp-comment-item-avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        transition: transform 0.3s;
        flex-shrink: 0;
        margin-right: var(--space-15);
        &:hover {
          transform: rotate(360deg);
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .yzp-comment-item-info {
        flex: 1;
        .yzp-comment-item-top .yzp-comment-item-id {
          color: var(--color-gray);
          font-size: var(--font-s);
        }
        .yzp-comment-item-data {
          display: flex;
          align-items: center;
          color: var(--color-gray);
          font-size: var(--font-s);
          .yzp-comment-item-data-item {
            margin-right: var(--space-15);
          }
        }
        .yzp-comment-item-content {
          padding: var(--space-10) 0;
        }
        .yzp-comment-item-reply {
          display: flex;
          .yzp-comment-item-reply-avavtar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: var(--space-15);
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .yzp-comment-item-reply-top {
            display: flex;
            align-items: center;
            font-size: var(--font-s);
          }
          .yzp-comment-item-reply-date {
            display: inline-block;
            margin: 0 var(--space-5);
            white-space: pre;
            color: var(--color-gray);
          }
          .yzp-comment-item-reply-content {
            padding: var(--space-10) 0;
          }
        }
      }
    }
  }
}
</style>