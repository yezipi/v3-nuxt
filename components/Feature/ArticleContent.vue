<script lang="ts" setup>
import { timeAgao, setRandomTag, setAticleLink, isNewest } from '@/utils/index'

interface ArticleFields {
  id?: number
  value: any
  title?: string
  content?: string
  type?: string
  sub_column_id?: number | string
  comments_count?: number
  column_id?: number
  keywords?: string
  description?: string
  view?: number
  like?: number
  status?: boolean
  top?: boolean
  recommend?: boolean
  comment_open?: boolean
  tags?: Array<any>
  created_at?: Date
  updated_at?: Date
  lock: boolean
  user?: {
    nickname: string
    id: number
  },
  subcolumn?: {
    name: string
    id: number
  },
  prev?: {
    title?: string
    id?:number
    type?: string
  },
  next?: {
    title?: string
    id?: number
    type?: string
  },
  similar?: Array<any>
  cover?: '',
}

const props = defineProps({
  /**
   * 文章id
   */
  id: {
    type: Number,
  },
  /**
   * 文章类型
   */
  type: {
    type: String,
    default: 'article',
  }
})

const { $message, $db } = useNuxtApp()
const { articleApi } = useApi()
const { value: { web_name, alipay_code, wxpay_code } } = useBaseSettings()

const dashangTabIndex = ref(0)
const tags = ref<any>([])
const timer = ref()
const count = ref(0)
const password = ref('')
const loading = ref(false)
const info = ref<ArticleFields>({} as any)
const tempComments = ref<any>()
const articleUrl = ref()

info.value = await articleApi.getDetail(Number(props.id))

const onDashangTypeChange = (index: number) => {
  dashangTabIndex.value = index
}

if (info.value.tags) {
  tags.value = info.value.tags.map((e: string) => {
    return {
      name: e,
      color: setRandomTag()
    }
  })
}

// 不断查找hljs
const checkHljsIsLoad = () => {
  if (count.value === 30 * 10000) {
    clearTimeout(timer.value)
    console.log('hljs加载超时')
    return
  }
  try {
    // @ts-ignore
    if (hljs) {
      clearTimeout(timer.value)
      // @ts-ignore
      hljs.highlightAll()
      console.log('hljs已加载')
      return
    }
    timer.value = setTimeout(() => {
      console.log('hljs未加载')
      count.value ++
      checkHljsIsLoad()
    })
  } catch (e) {
    console.log('hljs加载失败', e)
  }
}

// 查看加密文章
const unclock = async () => {
  if (!password.value) {
    $message.error('请输入密码')
    return
  }
  try {
    loading.value = true
    const { data } = await articleApi.unlock({ id: props.id, password: password.value })
    info.value.content = data
    info.value.lock = false
    console.log(info)
  } catch (error: any) {
    $message.error(error.msg)
  } finally {
    loading.value = false
  }
}

// 文章点赞
const like = async () => {
  const localId = +$db.get(`articleLikeId_${props.id}`)
  if (localId === props.id) {
    $message.warning('您已经点过赞了')
    return
  }
  try {
    await articleApi.like({ id: props.id, like: info.value.like + 1 })
    info.value.like += 1
    $db.set(`articleLikeId_${props.id}`, props.id)
    $message.success('点赞成功')
  } catch (error: any) {
    $message.error(error.toString())
  }
}

// 未开启审核的时候，评论直接插入
const refreshComments = (data: any) => {
  tempComments.value = data
}

useHead({
  title: info.value.title + '-' + web_name,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: info.value.description || '',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: info.value.keywords || '',
    }
  ],
  link: [
    { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.5.0/styles/atom-one-dark-reasonable.min.css' }
  ],
  script: [
    { type: 'text/javascript', src: 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.5.0/highlight.min.js' },
  ]
})

onMounted(() => {
  setTimeout(() => {
    checkHljsIsLoad()
  }, 100)
  articleUrl.value = location.href
})

</script>

<template>
  <div :class="{ hot: info.view >= 1000, recommend: info.recommend, new: isNewest(info.created_at)}" class="yzp-article-wrap">
    <article class="yzp-article-main yzp-box">
      <!--文章上半部分-->
      <div class="yzp-article-header">
        <h1 class="yzp-article-title">{{ info.title }}</h1>
        <div class="yzp-article-count">
          <div class="yzp-article-icon">
            <i class="iconfont iconshijian"></i>
            <span class="yzp-article-data">{{ timeAgao(info.created_at, true) }}</span>
          </div>
          <div class="yzp-article-icon">
            <i class="iconfont iconren"></i>
            <span class="yzp-article-data">{{ info.user && info.user.nickname }}</span>
          </div>
          <div class="yzp-article-icon">
            <i class="iconfont iconyanjing"></i>
            <span class="yzp-article-data">{{ info.view }}</span>
          </div>
          <div class="yzp-article-icon">
            <i class="iconfont iconxiaoxi3"></i>
            <span class="yzp-article-data">{{ info.comments_count }}</span>
          </div>
          <div class="yzp-article-icon">
            <i class="iconfont icon03"></i>
            <span class="yzp-article-data">{{ info.like }}</span>
          </div>
          <div v-if="info.subcolumn" class="yzp-article-icon">
            <i class="iconfont iconfenlei"></i>
            <span class="yzp-article-data">{{ info.subcolumn && info.subcolumn.name }}</span>
          </div>
        </div>
      </div>
      <!--文章上半部分-->

      <!--文章描述-->
      <p v-if="info.description" class="yzp-article-description">
        <span class="ft26">“</span>
        {{ info.description }}
        <span class="ft26">”</span>
      </p>
      <!--end 描述-->

      <!--文章正文-->
      <div v-if="!info.lock && info.content" class="yzp-article-content" v-html="info.content"></div>
      <!--end 正文-->

      <div v-else class="yzp-article-lock">
        <input v-model="password" type="text" placeholder="请输入密码查看" />
        <button :disabled="loading" :class="{ disbaled: loading }" @click="unclock">{{ loading? 'loading...': '确定' }}</button>
      </div>

      <!--编辑时间-->
      <!-- <div class="yzp-article-edittime">编辑时间： {{ timeAgao(info.updated_at, true) }}</div> -->
      <!--end 编辑时间-->

      <!--文章底部按钮-->
      <div class="yzp-article-btn">
        <div class="yzp-article-dashang">
          <span class="ft16">赏</span>
          <div class="yzp-dashang-wrap">
            <div class="yzp-dashang-main">
              <div class="yzp-dashang-code">
                <base-yzp-image v-show="dashangTabIndex === 0" :src="alipay_code" />
                <base-yzp-image v-show="dashangTabIndex === 1" :src="wxpay_code" style="display: none" />
              </div>
              <div class="yzp-dashang-tab">
                <span :class="{ active: dashangTabIndex === 0 }" @click="onDashangTypeChange(0)">支付宝</span>
                <span :class="{ active: dashangTabIndex === 1 }" @click="onDashangTypeChange(1)">微信</span>
              </div>
              <span class="yzp-dashang-triangle"></span>
            </div>
          </div>
        </div>
        <div class="yzp-article-zan" @click="like">
          <i class="iconfont iconicon-test"></i>
          <span>{{ info.like || 0 }}</span>
        </div>
        <div class="yzp-article-share">
          <i class="iconfont iconfenxiang"></i>
          <base-yzp-share :title="info.title" :description="info.description" :summary="info.title" :cover="info.cover" :url="articleUrl"></base-yzp-share>
        </div>
      </div>
      <!--end 文章底部按钮-->

      <!--文章标签-->
        <div v-if="tags && tags.length" class="yzp-article-tags">
          <base-yzp-tag v-for="(tag, k) in tags" :key="k" :color="tag.color">{{ tag.name }}</base-yzp-tag>
        </div>
      <!--end 文章标签-->

    </article>

    <!--上一篇下一篇-->
    <div class="yzp-article-neighbor yzp-box">
      <div class="yzp-article-neighbor-item">
        <i class="iconfont iconzuijin"></i>
        <nuxt-link v-if="info.prev.id" :to="setAticleLink(info.prev.id, info.prev.type)" class="yzp-article-neighbor-link color-primary">{{ info.prev.title }}</nuxt-link>
        <span v-else>没有了</span>
      </div>
      <div class="yzp-article-neighbor-item">
        <i class="iconfont iconzuijin" style="transform: rotate(-180deg)"></i>
        <nuxt-link v-if="info.next.id" :to="setAticleLink(info.next.id, info.next.type)" class="yzp-article-neighbor-link color-primary">{{ info.next.title }}</nuxt-link>
        <span v-else>没有了</span>
      </div>
    </div>
    <!--end-->

    <!--相似文章-->
    <div class="yzp-article-similar">
      <ul v-if="info.similar && info.similar.length">
        <li v-for="(ele, idx) in info.similar" :key="idx" class="yzp-article-similar-item">
          <a :href="`/article/detail/${ele.id}`" class="yzp-box">
            <div class="yzp-article-similar-cover">
              <base-yzp-image class="yzp-article-similar-img" :src="ele.cover"></base-yzp-image>
            </div>
            <span class="yzp-article-similar-title">{{ ele.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    <!--end-->

    <!--评论列表-->
    <feature-comment-list v-if="info && info.id" :temp="tempComments" :type="type" :parent-id="id"></feature-comment-list>
    <!--end评论列表-->

    <!--评论表单-->
    <base-yzp-form v-if="info && info.id" :type="type" :parent-id="id" @refresh="refreshComments" />
    <!--end 评论表单-->

  </div>
</template>

<style lang="less">
.yzp-article-main {
  padding: var(--space-30);
  position: relative;
  z-index: 1;
  .yzp-article-header {
    text-align: center;
    border-bottom: 1px solid var(--border-1);
    margin-bottom: var(--space-30);
  }
  .yzp-article-title {
    font-size: var(--font-30);
    margin-bottom: var(--space-30);
  }
  .yzp-article-count {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray);
    font-size: 12px;
    margin-bottom: var(--space-30);
    .yzp-article-icon {
      margin-right: var(--space-15);
    }
    .iconfont {
      display: inline-block;
      margin-right: 5px;
    }
  }
  .yzp-article-description {
    color: var(--color-gray);
    margin-bottom: var(--space-30);
    padding: var(--space-15);
    background: var(--bg-primary);
    border-radius: var(--border-radius);
    span {
      font-style: italic;
      font-family: fantasy;
    }
  }
  .yzp-article-content {
    font-size: var(--font-16);
    line-height: var(--font-32);
    img, video {
      height: auto;
      max-width: 100%;
      vertical-align: middle;
      border: 0;
    }
  }
  .yzp-article-lock {
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
  .yzp-article-edittime {
    color: var(--color-gray);
    font-size: var(--font-12);
    margin-top: var(--space-15);
  }
  .yzp-article-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    margin-top: var(--space-30);
    .yzp-article-dashang, .yzp-article-share {
      height: 38px;
      width: 40px;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      background: var(--color-white);
      &:hover {
        background: var(--color-primary);
        color: #ffffff;
      }
      .iconfont {
        position: relative;
        z-index: 1;
      }
    }
    .yzp-article-dashang {
      margin-right: -41px;
      &:hover {
        .yzp-dashang-wrap {
          display: block;
        }
      }
    }
    .yzp-article-share {
      margin-left: -41px;
      &:hover {
        .yzp-share-layer {
          display:block
        }
      }
    }
    .yzp-article-zan {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-white);
      border-radius: 40px;
      position: relative;
      z-index: 0;
      cursor: pointer;
      padding: 0 50px;
      background: var(--color-primary);
      &:hover {
        filter:saturate(150%) brightness(90%);
      }
      .iconfont {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .yzp-dashang-wrap {
      display:none;
      position:absolute;
      width: 150px;
      left: -50px;
      top: 47px;
      background:rgba(255,255,255,0.8);
      backdrop-filter: saturate(100%) blur(10px);
      border-radius:5px;
      border-bottom:1px solid var(--border-1);
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      animation: toTop 0.3s ease;
      &:after{
        content:'';
        display:block;
        height: 5px;
        opacity:0
      }
      .yzp-dashang-main{
        padding: 10px;
      }
      .yzp-dashang-code {
        text-align:center;
        height: 120px;
      }
      img{
        display: block;
        width: 120px;
        margin: auto;
        height: 120px;
      }
      .yzp-dashang-tab{
        position: relative;
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      .yzp-dashang-tab span {
        display: inline-block;
        text-align: center;
        width: 35%;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        box-sizing: border-box;
        color: var(--color-dark);
      }
      .yzp-dashang-tab span.active{
        border-bottom:1px solid var(--color-primary);
        color: var(--color-primary);
      }
      .yzp-dashang-tab:before {
        content:'';
        display:block;
        position:absolute;
        left:0;
        right:0;
        margin:auto;
        width:1px;
        height:20px;
        background: var(--color-white)
      }
      .yzp-dashang-triangle {
        width: 0;
        height: 0;
        line-height:0;
        border-bottom: 10px solid var(--color-white);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position:absolute;
        top: -10px;
        left:0;
        right:0;
        margin:auto;
        z-index:9;
      }
    }
  }
  .yzp-article-tags {
    border-top: 1px dashed var(--border-1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: var(--space-30);
    padding-top: var(--space-30);
  }
}

.yzp-article-neighbor {
  margin: var(--space-15) 0;
  padding: var(--space-15);
  .yzp-article-neighbor-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &:first-child {
      margin-bottom: 5px;
    }
    .yzp-article-neighbor-link {
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      color: var(--color-gray);
    }
  }
  .color-link {
    &:hover {
      text-decoration: underline;
    }
  }
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    color: var(--color-gray);
  }
}
  .yzp-article-similar {
    margin-bottom: var(--space-15);
    ul {
      margin-left: -2%;
    }
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    li {
      width: 23%;
      margin-left: 2%;
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 5px rgba(var(--rgb-primary), 0.5);
        border-color: var(--color-primary);
        .yzp-article-similar-cover {
          .yzp-article-similar-img {
            transform: scale(1.2);
            filter: saturate(200%);
          }
        }
        .yzp-article-similar-title {
          color: var(--color-primary);
          text-decoration: underline;
        }
      }
      a {
        width: 100%;
        display: block;
        position: relative;
        z-index: 1;
      }
      .yzp-article-similar-cover {
        width: 100%;
        overflow: hidden;
        height: 105px;
        background: var(--bg-primary);
        border: 1px solid rgba(255,255,255,0);
        box-sizing: border-box;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        position: relative;
        z-index: -1;
        .yzp-article-similar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s;
        }
      }
      .yzp-article-similar-title {
        text-align: center;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: var(--font-14);
        padding: var(--space-5) var(--space-15);
      }
    }
}
</style>
