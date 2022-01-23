
<script lang="ts" setup>
import api from '@/api'
import { setAticleLink } from '@/utils'

const { $config } = useNuxtApp()

const banners = await api.getBanners()
const swipers = banners.value.map((e: any) => {
  return {
    ...e,
    title: e.name,
    url: e.cover ? $config.baseURL + e.cover : '/assets/img/nopic.jpg',
  }
})

const hots = await api.getHotArticle()
const articles = await api.getIndexArticle()

</script>

<template>
  <div class="yzp-index">
    <div class="yzp-index-top mb15">
      <!--轮播图部分-->
      <yzp-swiper :list="swipers" class="yzp-top-swiper">
        <template #swiperItem="{ item }">
          <nuxt-link
            v-if="item.type === 1 || item.type === 2"
            :to="setAticleLink(item.target, item.type === 1 ? 'article' : 'case')"
            :title="item.name"
            class="yzp-swiper-a"
            target="_blank"
          >
          </nuxt-link>
          <a v-if="item.type === 3" :href="item.url" class="yzp-swiper-a" target="_blank"></a>
        </template>
      </yzp-swiper>
      <!--end 轮播图部分-->
      <!--热门排行-->
      <div :class="{ noSwiper: !swipers || !swipers.length }" class="yzp-top-hot bg box">
        <yzp-title icon="iconhuoyan" title="热门排行"></yzp-title>
        <div class="yzp-hot-wrap">
          <ul v-if="hots && hots.length" class="yzp-hot-list p1015">
            <li v-for="(el, i) in hots" :key="i" class="yzp-hot-item">
              <span class="yzp-hot-sort ft12">{{ parseInt(String(i + 1)) }}</span>
              <nuxt-link :to="setAticleLink(el.id, el.type)" class="yzp-hot-title" :title="el.title">{{ el.title }}</nuxt-link>
            </li>
          </ul>
          <yzp-empty v-else></yzp-empty>
        </div>
      </div>
      <!--end 热门排行-->
    </div>

    <!--文章列表-->
    <article-list :list="articles.rows"></article-list>
    <!--end 文章列表-->
  </div>
</template>

<style scoped lang="less">

  .yzp-index-top {
    display: flex;
    justify-content: space-between;
    height: 250px;
    .yzp-top-swiper {
      height: 100%;
      width: 520px;
      flex: 1;
      border-radius: 5px;
      flex-shrink: 0;
    }
    .yzp-top-hot {
      margin-left: 15px;
      &.noSwiper {
        flex: 1
      }
      .yzp-hot-wrap {
        position: relative;
        height: 100%;
      }
    }
    .yzp-hot-item {
      &:nth-of-type(1) .yzp-hot-sort { background: #ec5b5b }
      &:nth-of-type(2) .yzp-hot-sort { background: #f78989 }
      &:nth-of-type(3) .yzp-hot-sort { background: #f7acac }
      &:nth-of-type(4) .yzp-hot-sort { background: #cccccc }
      &:nth-of-type(5) .yzp-hot-sort { background: #dddddd }
      display: flex;
      padding: 9px 0;
      .yzp-hot-sort {
        display: block;
        flex-shrink: 0;
        color: #ffffff;
        border-radius:6px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
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
          color: #000;
          text-decoration: underline;
        }
      }
    }
  }
  .yzp-swiper-a {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>