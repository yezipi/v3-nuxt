<script lang="ts" setup>
import { timeAgao, replaceFace } from '@/utils/index'
const baseSettings: any = useBaseSettings()
const { $lightbox, $db, $message } = useNuxtApp()
const { web_avatar, web_name } = baseSettings.value

const { moodApi } = useApi()

const originUrl = ref()

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
})

const previewImage = (src: string) => {
  const imgs = props.item.images.map((e: string) => {
    return {
      url: e.replace('thumb', 'origin'),
    }
  })
  $lightbox.preview(src.replace('thumb', 'origin'), imgs, 'url')
}

// 文章点赞
const like = async (item: any) => {
  const localId = +$db.get(`moodLikeId_${item.id}`)
  // if (localId === item.id) {
  //   item.isLike = true
  //   $message.warning('您已经点过赞了')
  //   return
  // }
  try {
    await moodApi.like({ id: item.id, like: item.like + 1 })
    item.like += 1
    item.isLike = true
    $db.set(`moodLikeId_${item.id}`, item.id)
    $message.success('点赞成功')
  } catch (error: any) {
    $message.error(error.toString())
  }
}

onMounted(() => {
  originUrl.value = location.origin
})

</script>

<template>
  <div class="yzp-mood-item yzp-box">
    <a href="1" class="yzp-mood-item-avatar">
      <img :src="web_avatar" onerror="this.src='/img/default-avatar.png'" />
    </a>
    <div class="yzp-mood-item-info">
      <div class="yzp-mood-item-top flex-between">
        <span class="yzp-mood-item-nickname color-primary">{{ web_name }}</span>
      </div>

      <div class="yzp-mood-item-data">
        <div class="yzp-mood-item-data-item">
          <i class="iconfont iconshijian1"></i>
          <span>{{ timeAgao(item.created_at, true) }}</span>
        </div>
        <div v-if="item.province || item.city || item.address" class="yzp-mood-item-data-item">
          <i class="iconfont iconweizhi"></i>
          <span v-if="item.province || item.city">{{ item.province + item.city }}</span>
          <span v-if="item.address">{{ item.address }}</span>
        </div>
        <div class="yzp-mood-item-data-item">
          <i class="iconfont iconiPhone"></i>
          <span>{{ item.ua || '未知' }}</span>
        </div>
        <div v-if="item.browser" class="yzp-mood-item-data-item">
          <i class="iconfont iconwangzhan"></i>
          <span>{{ item.browser }}</span>
        </div>
      </div>
      <div v-if="item.content" class="yzp-mood-item-text">
        <p v-html="replaceFace(item.content)" class="yzp-mood-item-content"></p>
      </div>
      <div v-if="item.images && item.images.length" class="yzp-mood-item-imgs">
        <div
          v-for="(img, idx) in item.images"
          :index="idx"
          :class="{ one: item.images.length === 1, two: item.images.length === 2, three: item.images.length === 3, four: item.images.length > 3 }"
          class="yzp-mood-item-img-cell"
        >
           <base-yzp-image
            class="yzp-mood-item-img-main"
            :src="img.indexOf('aliyuncs') > -1 ? `${img}?x-oss-process=image/resize,w_375` : img"
            @click.native="previewImage(img)"
          >
          </base-yzp-image>
        </div>
      </div>
      <div class="yzp-mood-item-btn">
        <div class="yzp-mood-item-btn-cell">
          <i class="iconfont iconfenxiang"></i>
          <base-yzp-share
            :title="item.content ? item.content.substring(0, 50) : ''"
            :description="item.content"
            :cover="item.images.length ? item.images[0] : ''"
            :summary="''"
            :url="`${originUrl}/mood/${item.id}`"
          ></base-yzp-share>
        </div>
        <nuxt-link :to="`/mood/${item.id}`" class="yzp-mood-item-btn-cell">
          <i class="iconfont iconxiaoxi3"></i>
          <span>{{ item.comments_count }}</span>
        </nuxt-link>
        <div :class="{ isLike: item.isLike }" class="yzp-mood-item-btn-cell" @click="like(item)">
          <i class="iconfont iconzan"></i>
          <span>{{ item.like || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.yzp-mood-item {
  padding: var(--space-15);
  margin-bottom: var(--space-15);
  display: flex;
  &:last-child {
    margin-bottom: 0;
  }
  .iconfont {
    display: inline-block;
    margin-right: 5px;
  }
  .yzp-mood-item-avatar {
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
  .yzp-mood-item-info {
    flex: 1;
    .yzp-mood-item-data {
      display: flex;
      align-items: center;
      color: var(--color-gray);
      font-size: var(--font-12);
      .yzp-mood-item-data-item {
        margin-right: var(--space-15);
      }
    }
    .yzp-mood-item-content {
      padding: var(--space-10) 0;
      white-space: pre-line;
    }
    .yzp-mood-item-imgs {
      display: flex;
      flex-wrap: wrap;
      .yzp-mood-item-img-cell {
        margin-right: 2%;
        .yzp-mood-item-img-main {
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          object-fit: cover;
          cursor: zoom-in;
        }
        &.one {
          width: 30%;
          height: auto;
          margin: 0;
        }
        &.two {
          width: 30%;
          height: 200px;
          &:last-child {
            margin-right: 0;
          }
        }
        &.three {
          width: 31%;
          height: 200px;
          flex-grow: auto;
          &:last-child {
            margin-right: 0;
          }
        }
        &.four {
          width: 25%;
          height: 200px;
          flex-grow: auto;
          margin-bottom: var(--space-15);
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
  .yzp-mood-item-btn {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-15);
    .yzp-mood-item-btn-cell {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid var(--border-1);
      position: relative;
      &.isLike {
        color: var(--color-primary);
      }
      &:hover {
        cursor: pointer;
        color: var(--color-primary);
        .yzp-share-layer {
          display: block;
          left: initial!important;
          top: var(--space-30);
          .iconfont {
            display: block;
            margin-right: 0;
            padding: var(--space-5) var(--space-10);
          }
        }
      }
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
