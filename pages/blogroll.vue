<script setup lang="ts">
const route  = useRoute()
const { $columns } = useNuxtApp()

const currColumn = $columns.value ? $columns.value.find((e: any) => e.url === route.name) : {}
const info = await useColumnDetail(Number(currColumn.id))

const blogrolls = await useBlogroll()
</script>

<template>
  <div class="yzp-blogroll-wrap">
    
    <base-yzp-panel title="本站友情链接" icon="iconlianjie" noBg noPadding>
      <div class="yzp-blogroll-list">
        <a
          v-for="(item, index) in blogrolls.rows"
          :key="index"
          :href="item.site"
          :title="item.content"
          target="_blank"
          class="yzp-blogroll-item yzp-box"
        >
          <div class="yzp-blogroll-item-main">
            <img :src="item.avatar" class="yzp-blogroll-item-avatar" onerror="this.src='/img/default-avatar.png'" />
            <div class="yzp-blogroll-item-info">
              <div class="yzp-blogroll-item-name color-primary">{{ item.nickname }}</div>
              <div class="yzp-blogroll-item-site">{{ item.site || '暂无' }}</div>
            </div>
          </div>
        </a>
      </div>
    </base-yzp-panel>

    <base-yzp-panel title="申请友情链接条件" icon="iconxinxi" noBg noPadding>
      <div class="yzp-blogroll-desc" v-html="info.content"></div>
    </base-yzp-panel>

    <base-yzp-panel title="填写申请信息" icon="iconpinglun" noBg noPadding>
      <!--表单-->
      <base-yzp-form class="yzp-blogroll-apply" type="blogroll" />
      <!--end 表单-->
    </base-yzp-panel>

  </div>
</template>

<style scoped lang="less">
.yzp-blogroll-list {
  margin-left: -2%;
  margin-top: var(--space-15);
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  .yzp-blogroll-item {
    width: 23%;
    margin-left: 2%;
    float: left;
    justify-content: flex-start;
    transition: all 0.3s;
    height: 60px;
    margin-bottom: var(--space-15);
    &:hover {
      transform: translateY(-5px);
      background: rgba(var(--rgb-primary), 0.05);
      border-color: var(--color-primary);
      box-shadow: 0 0 5px rgba(var(--rgb-primary), 0.5);
    }
    .yzp-blogroll-item-main {
      display: flex;
      align-items: center;
      margin: 0 var(--space-15);
      height: 100%;
    }
    .yzp-blogroll-item-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: var(--space-15);
    }
    .yzp-blogroll-item-info {
      line-height: 16px;
      overflow: hidden;
      font-size: var(--font-s);
      div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .yzp-blogroll-item-name {
        margin-bottom: 5px;
      }
    }
  }
}
.yzp-blogroll-desc {
  margin: var(--space-15) 0;
}
.yzp-blogroll-apply {
  margin-top: var(--space-15);
}
</style>
