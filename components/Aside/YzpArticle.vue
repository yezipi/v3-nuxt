<script lang="ts" setup>
import api from '@/api'
import { timeAgao, setAticleLink } from '@/utils/index'

const tabs = reactive([
  { name: '最多点赞', icon: 'iconicon-test' },
  { name: '最多评论', icon: 'iconxiaoxi' }
])
const tabIndex = ref(0)
const tabActiveLeft = ref(0)
const tabRefs = []

const onTabChange = (index: number) => {
  tabIndex.value = index
  tabActiveLeft.value = tabRefs[index].offsetLeft
}

const setTabRefs = (el: any) => {
  tabRefs.push(el)
}

const result = await api.getMostLikeAndMostComment()
const { mostComment, mostLike } = result.value
const articles = [
  { rows: mostLike },
  { rows: mostComment }
]

</script>

<template>
  <!--人气文章-->
  <base-yzp-panel v-if="mostLike.length || mostComment.length" noPadding icon="iconxiaoxi3">
    <div class="yzp-aside-article-wrap">
      <div class="yzp-aside-article-tab">
        <div class="yzp-aside-article-tab-box">
          <div
            v-for="(item, index) in tabs"
            :ref="setTabRefs"
            :index="index"
            :class="{ active: tabIndex === index }"
            class="yzp-aside-article-tab-item"
            @click="onTabChange(index)"
          >
            <i :class="item.icon" class="iconfont"></i>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div :style="{ left: tabActiveLeft + 'px' }" class="yzp-aside-article-tab-active"></div>
      </div>

      <div lass="yzp-aside-article-most">
        <ul v-for="(el, index) in articles" v-show="tabIndex === index" class="yzp-aside-article-list">
          <li v-for="(item, i) in el.rows" :key="i" class="yzp-aside-article-item">
            <nuxt-link :to="setAticleLink(item.id, item.type)" class="yzp-aside-article-item-link">
              <div class="yzp-aside-article-item-pic">
                <img class="yzp-aside-article-item-img" :src="item.cover || '/assets/img/nopic.jpg'" />
              </div>
              <div class="yzp-aside-article-item-info">
                <span class="yzp-aside-article-item-title">{{ item.title }}</span>
                <div class="yzp-aside-article-item-bottom">
                  <div class="yzp-aside-article-item-data">
                    <i class="iconfont iconshijian1"></i>
                    <span class="yzp-aside-article-item-date">{{ timeAgao(item.created_at) }}</span>
                  </div>
                  <div class="yzp-aside-article-item-data">
                    <i :class="tabs[index].icon" class="iconfont"></i>
                    <span class="yzp-aside-article-item-num">{{ index === 1 ? item.comments_count : item.like }}</span>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>

    </div>
  </base-yzp-panel>
  <!--end 人气文章-->
</template>

<style lang="less" scoped>
.yzp-aside-article-wrap {
  .yzp-aside-article-tab {
    
    height: 40px;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    overflow: hidden;
    border-bottom: 1px solid var(--border-1);
    position: relative;
    z-index: 1;
    .yzp-aside-article-tab-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      flex: 1;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    .yzp-aside-article-tab-active {
      background: var(--color-primary);
      color: var(--color-white);
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 50%;
      transition: all 0.3s;
      z-index: 0;
    }
    .yzp-aside-article-tab-item {
      flex: 1;
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: var(--color-primary);
      &:hover {
        background: var(--bg-primary);
      }
      &.active {
        color: #ffffff;
        background: none;
      }
      .iconfont {
        display: inline-block;
        margin-right: 10px;
        color: inherit;
      }
    }
  }

  .yzp-aside-article-list {
    .yzp-aside-article-item {
      padding:  var(--space-10) var(--space-15);
      position: relative;
      &:hover {
        background: var(--bg-primary);
        .yzp-aside-article-item-link {
          .yzp-aside-article-item-pic {
            .yzp-aside-article-item-img {
              transform: scale(1.2);
            }
          }
        }
        .yzp-aside-article-item-info {
          .yzp-aside-article-item-title {
            color: var(--color-primary);
            text-decoration: underline;
          }
        }
      }
      &:after {
        content: '';
        position: absolute;
        left: var(--space-10);
        right: var(--space-10);
        bottom: 0;
        height: 1px;
        background: var(--border-1);
      }
      &:last-child:after {
        display: none;
      }
      .yzp-aside-article-item-link {
        display: flex;
        .yzp-aside-article-item-pic {
          flex-shrink: 0;
          width: 100px;
          height: 70px;
          border-radius: var(--border-radius);
          overflow: hidden;
          margin-right: 10px;
          background: var(--bg-primary);
          .yzp-aside-article-item-img {
            transition: all 0.3s;
            width: 100%;
            height: 100%;
            border-radius: var(--border-radius);
          }
        }
        .yzp-aside-article-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .yzp-aside-article-item-title {
            line-height: 20px;
            display: block;
            font-size: 12px;
          }
          .yzp-aside-article-item-bottom {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: var(--color-gray);
            .yzp-aside-article-item-data {
              &:first-child {
                margin-right: 15px;
              }
              .iconfont {
                display: inline-block;
                margin-right: 5px;
                color: rgba(var(--rgb-dark), 0.3);
              }
            }
          }
        }
      }
    }
  }

}
</style>