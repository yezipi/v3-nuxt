
<!-- 轮播图组件 2022-01-15 yzp -->
<script lang="ts" setup>
import { setAticleLink } from '@/utils'

interface SwiperConfig {
  name: string,
  target: any,
  cover: string,
  type: number,
  url: string,
}

interface Props {
  list?: Array<SwiperConfig>
  duration?: number,
  interval?: number,
  effect?: string,
  loop?: boolean,
  autoplay?: boolean,
}

const props = withDefaults(defineProps<Props>(), {

  /**
   * 列表数据
   */
  list: () => [],

  /**
   * 动画时长，毫秒
   */
  duration: 300,

  /**
   * 间隔时间，毫秒
   */
  interval: 3000,

  /**
   * 效果: slide, fade
   */
  effect: 'slide',

  /**
   * 循环播放
   */
  loop: true,

  /**
   * 自动播放
   */
  autoplay: true

})

const arrs = ref(props.list)
const swiperRefs = ref()
const swiperWidth = ref(0)
const swiperConfig = reactive({
  index: 0,
  arrow: true,
  inter: null,
})
const swiperItemRefs = []

const translateX = computed(() => swiperConfig.index * swiperWidth.value)

const { $config } = useNuxtApp()

// 循环
const startSlide = (type: string) => {
  if (type == 'right') {
    swiperConfig.index = 0
  } else {
    swiperConfig.index = arrs.value.length - 1
  }
}

// 往右
const slideToRight = () => {
  swiperConfig.index ++
  if (props.loop) {
    if (swiperConfig.index === arrs.value.length) {
      startSlide('right')
    }
  } else {
    if (swiperConfig.index > arrs.value.length -1) {
      swiperConfig.index = 0
    }
  }
}

// 左
const slideToLeft = () => {
  if (props.loop) {
    swiperConfig.index --
    if (swiperConfig.index <= -1) {
      startSlide('left')
    }
  } else {
    if (swiperConfig.index  === 0) {
      swiperConfig.index = arrs.value.length -1
      swiperConfig.index --
    }
  }
}

const stopAutoplay = () => {
  if (props.autoplay) {
    clearInterval(swiperConfig.inter)
  }
}

// 初始化
const startAutoPlay = () => {
  if(props.autoplay){
    clearInterval(swiperConfig.inter)
    swiperConfig.inter=setInterval(()=>{
      slideToRight()
    }, props.interval)
  }
}


onMounted(() => {
  swiperWidth.value = swiperRefs.value.clientWidth
  startAutoPlay()
})
</script>

<template>
  <div
    ref="swiperRefs"
    class="yzp-swiper-wrap"
    @mouseover="stopAutoplay"
    @mouseout="startAutoPlay"
  >
    <ul
      :class="{ fade: effect === 'fade' }"
      :style="{
        transform: `translate3d(-${translateX}px,0,0)`,
        transition: `all ${duration / 1000}s`
      }"
      class="yzp-swiper-list"
    >
      <li
        v-for="(item, index) in arrs"
        :style="{ 'z-index': -index }"
        :key="index"
        class="yzp-swiper-item"
      >
        <div class="yzp-swiper-link" :style="{ background: `url(${$config.baseURL + item.cover}) no-repeat center` }">
          <nuxt-link
            v-if="item.type === 1 || item.type === 2"
            :to="setAticleLink(item.target, item.type === 1 ? 'article' : 'case')"
            :title="(list[swiperConfig.index] as any).name"
            target="_blank"
          >
          </nuxt-link>
          <a v-if="item.type === 3" :href="item.url" target="_blank"></a>
        </div>
      </li>
    </ul>
    <!--swiper btn-->
    <div class="yzp-swiper-btn">
      <i class="yzp-swiper-next iconfont iconright" @click="slideToLeft"></i>
      <i class="yzp-swiper-prev  iconfont iconright" @click="slideToRight"></i>
    </div>
    <!--end swiper btn-->
     <!--swiper title-->
    <div class="yzp-swiper-text">
      <span class="yzp-swiper-title">{{ (list[swiperConfig.index] as any).name }}</span>
      <span class="yzp-swiper-index">{{ swiperConfig.index + 1 }} / {{ list.length }}</span>
    </div>
    <!--end swiper title-->
  </div>
</template>

<style scoped lang="less">
.yzp-swiper-wrap {
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  width: 300px;
  &:hover {
    .yzp-swiper-btn {
      .yzp-swiper-next {
        left: 15px;
        transform: rotate(-180deg);
      }
      .yzp-swiper-prev {
        right: 15px;
      }
    }
  }
  .yzp-swiper-btn {
    .iconfont {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      z-index: 2;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
      }
    }
    .yzp-swiper-next {
      left: -55px;
      transform: rotate(-180deg);
    }
    .yzp-swiper-prev {
      right: -55px;
    }
  }
  .yzp-swiper-list {
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    &.fade {
      position: relative;
      .yzp-swiper-item {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .yzp-swiper-item {
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      .yzp-swiper-link {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover!important;
        overflow: hidden;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        .yzp-swiper-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .yzp-swiper-text {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: rgba(0,0,0,0.5);
    backdrop-filter: saturate(100%) blur(5px);
    color: #ffffff;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    justify-content: space-between;
  }
}
</style>