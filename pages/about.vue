
<script lang="ts" setup>
import { timeAgao } from '~~/utils/index'

type LogTypeConfig = 'add' | 'fix' | 'update' | 'delete'

const logTypes = {
  fix: {
    color: '#ff8c00',
    icon: '\ue60b',
    label: '修复',
  },
  add: {
    color: '#10993f',
    icon: '\ue622',
    label: '新增',
  },
  delete: {
    color: '#a60aff',
    icon: '\ue63a',
    label: '删除',
  },
  update: {
    color: '#00a4da',
    icon: '\ue68a',
    label: '优化',
  }
} 

const route  = useRoute()
const { $columns } = useNuxtApp()
const { columnApi, settingsApi } = useApi()

const currColumn = $columns.value ? $columns.value.find((e: any) => e.url === route.name) : {}

const info = ref(undefined)

try {
  info.value = await columnApi.getDetail(Number(currColumn.id))
} catch(e) {
  console.log(e)
}

const changeLogs = await settingsApi.getChangeLogs()
</script>

<template>
  <div class="yzp-about-wrap">
    <div v-if="info" class="yzp-about-info" v-html="info.content"></div>
    <base-yzp-panel title="更新日志" icon="iconxinxi" noBg noPadding>
      <ul class="yzp-changelogs-list">
        <li v-for="(item, index) in changeLogs.rows" :key="index" class="yzp-changelogs-item">
          <div class="yzp-changelogs-item-top">
            <span class="color888">v{{ item.version }} {{ timeAgao(item.created_at, true) }}</span>
          </div>
          <div v-for="(log, i) in item.content" class="yzp-changelogs-item-content">
            <span :style="{color: logTypes[log.type as LogTypeConfig].color}" class="yzp-changelogs-item-type iconfont">
              {{ logTypes[log.type as LogTypeConfig].icon }}  {{ logTypes[log.type as LogTypeConfig].label }}
            </span>
            <div>{{ log.text }}</div>
          </div>
        </li>
      </ul>
    </base-yzp-panel>
  </div>
</template>

<style lang="less">
.yzp-about-info {
  margin-bottom: var(--space-15);
  }
  .yzp-changelogs-list {
    position: relative;
    margin-top: var(--space-15);
    &:before {
      display: block;
      position: absolute;
      content: '';
      top: 6px;
      width: 1px;
      height: 100%;
      bottom: 0;
      background: #dddddd;
      left: 4px;
    }
    .yzp-changelogs-item {
      overflow:hidden;
      color:#777;
      padding-left: 20px;
      position: relative;
      margin-bottom: var(--space-15);
      &:before {
        display: block;
        position: absolute;
        content: '';
        top: 6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #cccccc;
        left: 0;
      }
      .yzp-changelogs-item-top {
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 24px;
      }
      &:last-child {border: 0}
    }
    .yzp-changelogs-item-content {
      display: flex;
      .yzp-changelogs-item-type {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
</style>
