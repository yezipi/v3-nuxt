
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
   * 自动播放
   */
  autoplay: true

})
const newX = ref(-1) // 因为是translateX里面有异步的，所以用这个来替换衔接后的值
const swiperRefs = ref()
const swiperWidth = ref(0)
const swiperConfig = reactive({
  index: 0,
  arrow: true,
  inter: null,
})
const direction = ref('next') // 滑动的方向: prev, next
const noAnimated = ref(true) // 防止刷新页面的时候有过度效果
const isAnimating = ref(false) // 点击间隔控制

const isPrevEnd = computed(() => (swiperConfig.index === props.list.length - 1) && direction.value === 'prev') // 第一张往后
const isNextEnd = computed(() => (swiperConfig.index === 0) && direction.value === 'next') // 下一张到了最后一张

const translateX = computed(() => {
  const w = swiperWidth.value
  const index = swiperConfig.index
  let swiperX = -w - (index * w)
  return swiperX
})

// 滑动到最后一张判断
watch(() => isNextEnd.value, (res: boolean) => {
  const w = swiperWidth.value
  if (res && !isPrevEnd.value) {
    console.log('最后一张衔接了')
    newX.value = -(w * props.list.length) + (-w) // 因为末尾多添加了一张开头的，所以距离要多加一个个宽度
    isAnimating.value = true // 改变的时候禁止点击
    setTimeout(() => {
      noAnimated.value = true // 也不要有过渡动画
      isAnimating.value = false
      newX.value = -w // 就把距离替换成第二张的距离, 动画过渡完结束isAnimating
    }, props.duration)
  }
  if (!res && !isPrevEnd.value) {
    newX.value = -1
  }
})

// 如果是第一张开始往左, 距离设置为0
watch(() => isPrevEnd.value, (res: boolean) => {
  const w = swiperWidth.value
  console.log('第一张衔接了')
  if (res && !isNextEnd.value) {
    newX.value = 0 // 因为开头多添加了一张结尾的，所以距离距离设置为0
    isAnimating.value = true // 改变的时候禁止点击
    setTimeout(() => {
      noAnimated.value = true // 也不要有过渡动画
      isAnimating.value = false
      newX.value = -w * (props.list.length) // 就把距离替换成倒数第二张的距离, 动画过渡完结束isAnimating
    }, props.duration)
  }
  if (!res && !isNextEnd.value) {
    newX.value = -1
  }
})

const { $config } = useNuxtApp()

// 循环
const loop = (type: string) => {
  swiperConfig.index = type == 'next' ? 0 : props.list.length - 1
}

// 往左
const next = () => {
  direction.value = 'next'
  if (isAnimating.value) {
    return
  }
  noAnimated.value = false
  swiperConfig.index ++
  if (swiperConfig.index === props.list.length) {
    loop('next')
  }
}

// 往右
const prev = () => {
  direction.value = 'prev'
  if (isAnimating.value) {
    return
  }
  noAnimated.value = false
  swiperConfig.index --
  if (swiperConfig.index <= -1) {
    loop('prev')
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
      next()
    }, props.interval)
  }
}


onMounted(() => {
  swiperWidth.value = swiperRefs.value.clientWidth
  // startAutoPlay()
})
</script>

<template>
  <div
    ref="swiperRefs"
    class="yzp-swiper-wrap"
  >
    <ul
      :style="{
        transform: `translate3d(${newX === -1 ? translateX : newX }px,0,0)`,
        transition: noAnimated ? 'none' : `all ${duration / 1000}s`
      }"
      class="yzp-swiper-list"
    >
      <li v-show="swiperWidth" class="yzp-swiper-item">
        <div 
          class="yzp-swiper-link"
          :style="{ background: `url(${$config.baseURL + (list[list.length -1].cover)}) no-repeat center` }"
        >
        </div>
      </li>
      <li
        v-for="(item, index) in list"
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
      <li v-show="swiperWidth" class="yzp-swiper-item">
        <div
          class="yzp-swiper-link"
          :style="{ background: `url(${$config.baseURL + (list[0].cover)}) no-repeat center` }"
        >
        </div>
      </li>
    </ul>
    <!--swiper btn-->
    <div class="yzp-swiper-btn">
      <i class="yzp-swiper-next iconfont iconright" @click="prev"></i>
      <i class="yzp-swiper-prev  iconfont iconright" @click="next"></i>
    </div>
    <!--end swiper btn-->
     <!--swiper title-->
    <div class="yzp-swiper-text">
      <span class="yzp-swiper-title">{{ list[swiperConfig.index].name }}</span>
      <!-- <span class="yzp-swiper-index" style="red">{{ newX }} / {{ translateX }}</span> -->
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