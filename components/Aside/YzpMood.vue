<script lang="ts" setup>
const { commentApi } = useApi()
const moods = await commentApi.getList({ page: 1, size: 5 })
</script>

<template>
  <!--微语-->
  <base-yzp-panel v-if="moods.rows && moods.rows.length" title="微语" icon="iconzuijin1">
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
  <!--end 微语-->
</template>

<style lang="less">
.yzp-aside-mood-wrap {
  margin: -5px 0;
 .yzp-aside-mood-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: var(--space-5);
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
        color: var(--color-link);
      }
      .yzp-aside-mood-title {
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover {
          color: var(--color-primary);
        }
        cursor: pointer;
      }
    }
    .yzp-aside-mood-date {
      font-size: var(--font-12);
      color: var(--color-gray);
      flex-shrink: 0;
    }
  }
}
</style>