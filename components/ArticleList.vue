<script lang="ts" setup>
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
      <div :style="{ background: `#eeeeee url(${$config.baseURL + item.cover_thumb}) no-repeat center` }" class="yzp-article-cover mr15"></div>
      <div class="yzp-article-info">
        <div class="yzp-article-text">
          <nuxt-link :to="'/article/detail/' + item.id" class="yzp-article-link ft20" :title="item.title">{{ item.title }}</nuxt-link>
          <!-- <p class="yzp-article-desc">{{ item.description }}</p> -->
        </div>
        <div class="yzp-article-bottom">
          <div class="yzp-article-icon mr15">
            <i class="iconfont iconshijian"></i>
            <span class="yzp-article-data">{{ item.created_at.substring(0, 10) }}</span>
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
    .yzp-article-cover {
      width: 150px;
      height: 80px;
      flex-shrink: 0;
    }
    .yzp-article-info {
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .yzp-article-desc {
      font-size: 12px;
      color: #666666;
      line-height: 18px;
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
