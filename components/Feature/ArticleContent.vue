<script lang="ts" setup>
import api from '@/api'
import { timeAgao, setRandomTag, setAticleLink } from '@/utils/index'

interface ArticleFields {
  value: any,
  title?: string,
  content?: string,
  type?: string,
  sub_column_id?: number | string,
  comments_count?: number,
  column_id?: number,
  keywords?: string,
  description?: string,
  view?: number,
  like?: number,
  status?: boolean,
  top?: boolean
  recommend?: boolean
  comment_open?: boolean
  tags?: Array<any>,
  created_at?: Date,
  updated_at?: Date,
  user?: {
    nickname: string,
    id: number,
  },
  subcolumn?: {
    name: string,
    id: number,
  },
  prev?: {
    title?: string,
    id?:number,
    type?: string,
  },
  next?: {
    title?: string,
    id?: number,
    type?: string,
  },
  similar?: Array<any>
}

const props = defineProps({
  /**
   * 文章id
   */
  id: {
    type: Number,
  }
})

const { $baseSettings, $config } = useNuxtApp()

const dashangTabIndex = ref(0)
const tags = ref<any>([])

const info: ArticleFields = await api.getArticleDetil(Number(props.id))

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

useMeta({
  title: info.value.title + '-' + $baseSettings.value.web_name,
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
    { rel: 'stylesheet', type: 'text/css', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/atom-one-dark-reasonable.min.css' }
  ],
  script: [
    { type: 'text/javascript', src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js' },
  ]
  // link: [
  //   { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/themes/prism-tomorrow.min.css' }
  // ],
  // script: [
  //   { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.26.0/prism.min.js' },
  // ]
})

onMounted(() => {
  setTimeout(() => {
    // @ts-ignore
    hljs.highlightAll()
  }, 100)
})

</script>

<template>
  <div class="yzp-article-wrap">
    <article class="yzp-article-main bg p30 box">
      <!--文章上半部分-->
      <div class="yzp-article-header mb30 pb30">
        <h1 class="yzp-article-title ft28">{{ info.title }}</h1>
        <div class="yzp-article-count mt15">
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconshijian"></i>
            <span class="yzp-article-data">{{ timeAgao(info.created_at, true) }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconren"></i>
            <span class="yzp-article-data">{{ info.user && info.user.nickname }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconyanjing"></i>
            <span class="yzp-article-data">{{ info.view }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconxiaoxi3"></i>
            <span class="yzp-article-data">{{ info.comments_count }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont icon03"></i>
            <span class="yzp-article-data">{{ info.like }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconfenlei"></i>
            <span class="yzp-article-data">{{ info.subcolumn && info.subcolumn.name }}</span>
          </div>
        </div>
      </div>
      <!--文章上半部分-->

      <!--文章描述-->
      <p v-if="info.description" class="yzp-article-description ft14 mb30">
        <span class="ft26">“</span>
        {{ info.description }}
        <span class="ft26">”</span>
      </p>
      <!--end 描述-->

      <!--文章正文-->
      <div class="yzp-article-content ft14 line28 mb15" v-html="info.content"></div>
      <!--end 正文-->

      <!--编辑时间-->
      <div class="yzp-article-edittime ft12 mb30">编辑时间： {{ timeAgao(info.updated_at, true) }}</div>
      <!--end 编辑时间-->

      <!--文章底部按钮-->
      <div class="yzp-article-btn mb30">
        <div class="yzp-article-dashang">
          <span class="ft16">赏</span>
          <div class="yzp-dashang-wrap">
            <div class="yzp-dashang-main">
              <div class="yzp-dashang-code">
                <img v-show="dashangTabIndex === 0" src="https://yezipi.net/_nuxt/img/f718a2a.png" />
                <img v-show="dashangTabIndex === 1" src="https://yezipi.net/_nuxt/img/9e42ad9.jpg" style="display: none" />
              </div>
              <div class="yzp-dashang-tab">
                <span :class="{ active: dashangTabIndex === 0 }" @click="onDashangTypeChange(0)">支付宝</span>
                <span :class="{ active: dashangTabIndex === 1 }" @click="onDashangTypeChange(1)">微信</span>
              </div>
              <span class="yzp-dashang-triangle"></span>
            </div>
          </div>
        </div>
        <div class="yzp-article-zan">
          <i class="iconfont iconicon-test"></i>
          <span class="ft14">{{ info.like || 0 }}</span>
        </div>
        <div class="yzp-article-share">
          <i class=" ft16 iconfont iconfenxiang"></i>
        </div>
      </div>
      <!--end 文章底部按钮-->

      <!--文章标签-->
        <div v-if="tags && tags.length" class="yzp-article-tags pt30">
          <yzp-tag v-for="(tag, k) in tags" :key="k" :color="tag.color">{{ tag.name }}</yzp-tag>
        </div>
      <!--end 文章标签-->

    </article>

    <!--上一篇下一篇-->
    <div class="yzp-article-neighbor bg box p15 mb15 mt15">
      <div class="yzp-article-neighbor-item ft14">
        <i class="iconfont iconzuijin"></i>
        <nuxt-link v-if="info.prev.id" :to="setAticleLink(info.prev.id, info.prev.type)" class="color-link">{{ info.prev.title }}</nuxt-link>
        <span v-else>没有了</span>
      </div>
      <div class="yzp-article-neighbor-item ft14">
        <i class="iconfont iconzuijin" style="transform: rotate(-180deg)"></i>
        <nuxt-link v-if="info.next.id" :to="setAticleLink(info.next.id, info.next.type)" class="color-link">{{ info.next.title }}</nuxt-link>
        <span v-else>没有了</span>
      </div>
    </div>
    <!--end-->

    <!--相似文章-->
    <div v-if="info.similar && info.similar.length" class="yzp-article-similar mb15">
      <ul>
        <li v-for="(ele, idx) in info.similar" :key="idx" class="yzp-article-similar-item">
          <a :href="`/article/detail/${ele.id}`">
            <div class="yzp-article-similar-cover box bg">
              <img :src="$config.baseURL + ele.cover" />
            </div>
            <span class="yzp-article-similar-title ft12">{{ ele.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    <!--end-->

  </div>
</template>

<style scoped lang="less">
.yzp-article-main {
  .yzp-article-header {
    text-align: center;
    border-bottom: 1px solid #eeeeee;
  }
  .yzp-article-count {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
    font-size: 12px;
    .iconfont {
      display: inline-block;
      margin-right: 5px;
    }
  }
  .yzp-article-description {
    color: #999999;
    span {
      font-style: italic;
      font-family: fantasy;
    }
  }
  .yzp-article-content {
    img, video {
      height: auto;
      max-width: 100%;
      vertical-align: middle;
      border: 0;
    }
  }
  .yzp-article-edittime {
    color: #999999;
  }
  .yzp-article-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    .yzp-article-dashang, .yzp-article-share {
      height: 38px;
      width: 40px;
      border-radius: 50%;
      color: #555555;
      text-align: center;
      line-height: 40px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      background: #ffffff;
      &:hover {
        background: #eeeeee;
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
        .bdsharebuttonbox{
          display:block
        }
      }
    }
    .yzp-article-zan {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      border-radius: 40px;
      position: relative;
      z-index: 0;
      cursor: pointer;
      padding: 0 50px;
      background: -webkit-linear-gradient(left,#f3a3a3,#f56c6c);
      &:hover {
        background: #f56c6c;
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
      border-bottom:1px solid #e1dfdf;
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
        color: #555;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        box-sizing: border-box;
      }
      .yzp-dashang-tab span.active{
        border-bottom:1px solid #ff4300;
        color:#ff4300;
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
        background:#ddd;
      }
      .yzp-dashang-triangle {
        width: 0;
        height: 0;
        line-height:0;
        border-bottom: 10px solid #fff;
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
    border-top: 1px dashed #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.yzp-article-neighbor {
  .yzp-article-neighbor-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    span {
      color: #999999;
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
    color: #999;
  }
}
.yzp-article-similar {
  ul {
    margin-left: -2%;
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
      &:hover {
        .yzp-article-similar-cover {
          border-color: #f56c6c;
          img {
            transform: scale(1.15) rotate(5deg);
            filter: contrast(1.5);
          }
        }
      }
      a {
        width: 100%;
        display: block;
      }
      .yzp-article-similar-cover {
        width: 100%;
        overflow: hidden;
        height: 105px;
        background: #f5f5f5;
        border: 1px dashed #eeeeee;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s;
        }
      }
      .yzp-article-similar-title {
        text-align: center;
        margin-top: 5px;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
