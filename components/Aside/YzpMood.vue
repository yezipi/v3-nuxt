<script lang="ts" setup>
import BaseYzpPanel from '@/components/Base/YzpPanel.vue'

import api from '@/api'
const moods = await api.getMoods()
console.log(moods)
</script>

<template>
  <!--搜索-->
  <base-yzp-panel title="微语" icon="iconzuijin1">
    <ul class="yzp-aside-mood-wrap">
      <li v-for="(item, index) in moods.rows" :key="index" class="yzp-aside-mood-item">
        <div class="yzp-aside-mood-info">
          <i v-if="item.images.length" class="iconfont icontupian"></i>
          <a class="yzp-aside-mood-title">{{ item.content }}</a>
        </div>
        <span class="yzp-aside-mood-date">2022-2-26</span>
      </li>
    </ul>
  </base-yzp-panel>
  <!--end 搜索-->
</template>

<style lang="less" scoped>
.yzp-aside-mood-wrap {
  margin: -5px 0;
 .yzp-aside-mood-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: var(--space-5);
   &:before {
     content: '';
     display: inline-block;
     width: 10px;
     height: 10px;
     border-radius: 10px;
     background: var(--bg-primary);
     margin-right: 10px;
   }
   &:nth-child(2)::before {
     opacity: 0.7;
   }
   &:nth-child(3)::before {
     opacity: 0.5;
   }
    .yzp-aside-mood-info {
      display: flex;
      align-items: center;
      flex: 1;
      overflow: hidden;
      .iconfont {
        display: inline-block;
        margin-right: 5px;
        color: var(--text-link);
      }
      .yzp-aside-mood-title {
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          color: var(--text-primary);
        }
        cursor: pointer;
      }
    }
    .yzp-aside-mood-date {
      font-size: var(--font-s);
      color: var(--text-gray);
      flex-shrink: 0;
    }
  }
}
</style>