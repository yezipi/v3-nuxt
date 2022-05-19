
<script lang="ts" setup>
import { setAticleLink } from '@/utils'

const { articleApi } = useApi()

const banners = await articleApi.getBanners()
const swipers = banners.value.map((e: any) => {
  return {
    ...e,
    title: e.name,
    url: e.cover || '/img/nopic.jpg',
  }
})

const hots = await articleApi.getHot()

</script>

<template>
  <div class="yzp-index">
    <div class="yzp-index-top">

      <!--轮播图部分-->
      <base-yzp-swiper :list="swipers" class="yzp-top-swiper">
        <template #swiperItem="{ item }">
          <nuxt-link
            v-if="item.type === 1 || item.type === 2"
            :to="setAticleLink(item.target, item.type === 1 ? 'article' : 'case')"
            :title="item.name"
            class="yzp-swiper-a"
            target="_blank"
          >
            <base-yzp-image class="yzp-swiper-img" :src="item.url"></base-yzp-image>
          </nuxt-link>
          <a v-if="item.type === 3" :href="item.url" class="yzp-swiper-a" target="_blank">
            <base-yzp-image class="yzp-swiper-img" :src="item.url"></base-yzp-image>
          </a>
        </template>
      </base-yzp-swiper>
      <!--end 轮播图部分-->

      <!--热门排行-->
      <base-yzp-panel v-if="hots && hots.length" icon="iconhuoyan" title="热门排行" :class="{ noSwiper: !swipers || !swipers.length }" class="yzp-top-hot">
        <div class="yzp-hot-wrap">
          <ul class="yzp-hot-list">
            <li v-for="(el, i) in hots" :key="i" class="yzp-hot-item">
              <span class="yzp-hot-sort">{{ parseInt(String(i + 1)) }}</span>
              <nuxt-link :to="setAticleLink(el.id, el.type)" class="yzp-hot-title" :title="el.title">{{ el.title }}</nuxt-link>
            </li>
          </ul>
        </div>
      </base-yzp-panel>
      <!--end 热门排行-->
    </div>

    <!--文章列表-->
    <feature-article-list :condition="{ type: 'article' }"></feature-article-list>
    <!--end 文章列表-->

  </div>
</template>

<style lang="less">

  .yzp-index-top {
    display: flex;
    justify-content: space-between;
    height: 250px;
    margin-bottom: var(--space-15);
    .yzp-top-swiper {
      height: 100%;
      flex: 1;
      border-radius: 5px;
    }
    .yzp-top-hot {
      margin-left: 15px;
      flex: 0.6;
      &.noSwiper {
        flex: 1
      }
      .yzp-hot-wrap {
        position: relative;
        height: 100%;
      }
    }
    .yzp-hot-item {
      &:nth-of-type(1) .yzp-hot-sort { background: var(--color-primary) }
      &:nth-of-type(2) .yzp-hot-sort { background: rgba(var(--rgb-primary), 0.8) }
      &:nth-of-type(3) .yzp-hot-sort { background: rgba(var(--rgb-primary), 0.6) }
      &:nth-of-type(4) .yzp-hot-sort { background: rgba(var(--rgb-primary), 0.4) }
      &:nth-of-type(5) .yzp-hot-sort { background: rgba(var(--rgb-primary), 0.2) }
      display: flex;
      padding: 8px 0;
      .yzp-hot-sort {
        display: block;
        flex-shrink: 0;
        color: var(--color-white);
        border-radius:6px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        font-size: var(--font-s);
      }
      .yzp-hot-title {
        line-height: 18px;
        max-width: 220px;
        display: block;
        margin-left: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          color: var(--color-primary);
          text-decoration: underline;
        }
      }
    }
  }
  .yzp-swiper-a {
    display: block;
    width: 100%;
    height: 100%;
    .yzp-swiper-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>