<script lang="ts" setup>

const props = defineProps({

  /**
   * 筛选条件
   */
  condition: {
    type: Object,
    default: () => {
      return {
        album_id: ''
      }
    }
  },

  isPicture: {
    type: Boolean,
    default: false
  },

  info: {
    type: Object,
    default: () => {
      return {}
    }
  },
})

const emit = defineEmits(['load'])

const { albumApi } = useApi()

const { $lightbox } = useNuxtApp()

const route = useRoute()

const filter = ref<any>(props.condition)

const albums = ref<any>({ count: 0, rows: [] as any })

const getList = async () => {
  const params = { ...filter.value, ...route.query }
  if (props.condition.album_id) {
    albums.value = await albumApi.getPictures(params)
  } else {
    albums.value = await albumApi.getList(params)
  }
  emit('load', albums)
}

const previewImage = (item: any) => {
  if (props.isPicture) {
    $lightbox.preview(item.origin_path, albums.value.rows, 'origin_path')
  }
}

watch(() => route.query, () => {
  getList()
})

// 组件里加载不这样写顶级await会报警告
await getList()

</script>

<template>
  <div class="yzp-album-list">

    <div class="yzp-album-list-head flex-between yzp-box">
      <div class="yzp-album-list-head-left">
        共有 <span class="color-primary">{{ albums.count }}</span> 条
      </div>
      <div v-if="condition && condition.album_id" class="yzp-case-list-head-right">
        <i class="iconfont iconleimupinleifenleileibie2-copy"></i>
        <span class="color-primary">{{ info.title }}</span>
      </div>
    </div>

    <ul v-if="albums && albums.rows" class="yzp-album-ul">
      <li v-for="(item) in albums.rows" :key="item.id" class="yzp-album-item">
        <nuxt-link :to="isPicture ? 'javascript:void(0)' : `/album/${item.id}`" class="yzp-album-item-block yzp-box">
          <div class="yzp-album-item-cover">
            <base-yzp-image class="yzp-album-item-img" :src="item.cover || item.thumb_path" @click.native="previewImage(item)"></base-yzp-image>
          </div>
          <div class="yzp-album-item-info yzp-box">
            <span :style="{ 'text-align' : item.thumb_path ? 'center' : 'left'  }" class="yzp-album-item-title color-primary">{{ item.title }}</span>
            <!-- <div v-if="item.description" class="yzp-album-item-desc">{{ item.description.substring(0, 45) }}...</div> -->
            <div v-if="item.cover" class="yzp-album-item-bottom">
              <div class="yzp-album-item-icon">
                <i class="iconfont iconyanjing"></i>
                <span class="yzp-album-item-data">{{ item.view }}</span>
              </div>
              <div class="yzp-album-item-icon">
                <i class="iconfont iconxiaoxi3"></i>
                <span class="yzp-album-item-data">{{ item.comments_count }}</span>
              </div>
              <div class="yzp-album-item-icon">
                <span class="yzp-album-data">{{ item.picture_count }}</span>
                <span class="yzp-album-data" style="margin-left: 5px">张</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <!--分页-->
    <base-yzp-pagination v-if="albums && albums.count" :data="albums"></base-yzp-pagination>
    <!--end 分页-->
    <base-yzp-empty v-else desc="暂无内容" />

  </div>
</template>

<style lang="less">
.yzp-album-list {
  margin-bottom: var(--space-15);
  .yzp-album-list-head {
    padding: var(--space-15);
    margin-bottom: var(--space-15);
    .yzp-album-list-head-right {
      .iconfont {
        display: inline-block;
        margin-right: 5px;
        color: var(--color-gray);
      }
      &:hover {
        text-decoration: underline;
      }
    }
    .yzp-case-list-head-right {
      .iconfont {
        display: inline-block;
        margin-right: 5px;
        color: var(--color-gray);
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .yzp-album-ul {
    display: flex;
    flex-wrap: wrap;
    .yzp-album-item {
      width: 32.33%;
      max-width: 32.33%;
      flex: auto;
      margin-right: 1.5%;
      margin-bottom: var(--space-15);
      border: 1px solid transparent;
      box-sizing: border-box;
      border-radius: var(--border-radius);
      transition: all 0.3s;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 0 0 5px rgba(var(--rgb-primary), 0.5);
        border-color: var(--color-primary);
        .yzp-album-item-cover {
          .yzp-album-item-img {
            transform: scale(1.2);
            filter: saturate(200%);
          }
        }
      }
      .yzp-album-item-block {
        display: block;
      }
      .yzp-album-item-cover {
        width: 100%;
        height: 150px;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        overflow: hidden;
        .yzp-album-item-img {
          width: 100%;
          height: 100%;
          transition: all 0.3s;
          object-fit: cover;
        }
      }
      .yzp-album-item-info {
        padding: var(--space-15);
        box-shadow: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        &:after {
          display: none;
        }
        .yzp-album-item-title {
          font-size: var(--font-16);
          display: block;
        }
        .yzp-album-item-bottom {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-12);
          color: var(--color-gray);
          margin-top: var(--space-5);
          .iconfont {
            display: inline-block;
            margin-right: var(--space-5);
          }
        }
      }
    }
  }
}
</style>
