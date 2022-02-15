<script lang="ts" setup>
import { timeAgao } from '@/utils/index'
const props = defineProps({

  /**
   * 列表数据
   */
  list: {
    type: Array,
    default: () => [] as any,
  },
})
const { $config } = useNuxtApp()
</script>

<template>
  <ul class="yzp-article-list">
    <li v-for="(item, index) in list as any" :key="index" class="yzp-article-item p15 bg mb15 box">
      <div class="yzp-article-cover mr15">
        <!-- <div :style="{ background: `#eeeeee url(${$config.baseURL + item.cover}) no-repeat center` }" class="yzp-article-img"></div> -->
        <img :src="$config.baseURL + item.cover" class="yzp-article-img" :alt="item.title" />
      </div>
      <div class="yzp-article-info">
        <div class="yzp-article-text">
          <nuxt-link :to="'/article/detail/' + item.id" class="yzp-article-link ft20" :title="item.title">{{ item.title }}</nuxt-link>
        </div>
        <p class="yzp-article-desc">{{ item.description }}</p>
        <div class="yzp-article-bottom">
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconshijian"></i>
            <span class="yzp-article-data">{{ timeAgao(item.created_at) }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconyanjing"></i>
            <span class="yzp-article-data">{{ item.view }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconxiaoxi3"></i>
            <span class="yzp-article-data">{{ item.comments_count }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont icon03"></i>
            <span class="yzp-article-data">{{ item.like }}</span>
          </div>
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconfenlei"></i>
            <span class="yzp-article-data">{{ item.subcolumn.name }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
.yzp-article-list {
  .yzp-article-item {
    display: flex;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
      .yzp-article-img {
        transform: scale(1.5) rotate(-15deg);
        filter:contrast(150%)
      }
    }
    .yzp-article-link:hover {
      text-decoration: underline;
      color: #ff6666;
    }
    .yzp-article-cover {
      width: 160px;
      height: 90px;
      flex-shrink: 0;
      border-radius: 5px;
      overflow: hidden;
      .yzp-article-img {
        transition: all 0.3s;
        width: 100%;
        height: 100%;
        background-size: cover!important;
      }
    }
    .yzp-article-info {
      height: 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .yzp-article-desc {
      font-size: 12px;
      color: #666666;
      line-height: 18px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .yzp-article-bottom {
      display: flex;
      align-items: center;
      color: #999999;
      font-size: 12px;
      .iconfont {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}
</style>
