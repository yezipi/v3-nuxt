
<!-- 轮播图组件 2022-01-15 yzp -->
<script lang="ts" setup>

interface SwiperConfig {
  title: string,
  url: string,
  id?: string,
  [x: string]: any,
}

interface Props {
  list: Array<SwiperConfig>
  duration?: number,
  interval?: number,
  autoplay?: boolean,
  direction?: string,
  showTitle?: boolean,
  showDots?: boolean,
  showArrow?: boolean,
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
  autoplay: true,

  /**
   * 方向，prev：往右滚动，next：往左滚动
   */
  direction: 'next',

  /**
   * 显示标题
   */
  showTitle: true,

  /**
   * 显示滑动指示点, 标题和指示点二选一
   */
  showDots: false,

  /**
   * 显示箭头
   */
  showArrow: true,

})

const emit = defineEmits([ 'change' ])

const newSwiperX = ref(-1) // 因为是translateX里面有异步的，所以用这个来替换衔接后的值
const swiperRefs = ref(undefined)
const swiperConfig = reactive({
  index: 0,
  arrow: true,
  inter: null,
  width: 0,
  direction: props.direction
})
const noAnimated = ref(true) // 防止刷新页面的时候有过度效果
const isAnimating = ref(false) // 点击间隔控制
const translateX = computed(() => {
  const { width, index } = swiperConfig
  return -width - (index * width)
})

// 监听索引改变
watch(() => swiperConfig.index, (index: number) => {
  const { width, direction } = swiperConfig
  const len = props.list.length
  const duration = props.duration
  const isNextEnd = (index === 0) && direction === 'next'
  const isPrevEnd = (index === len - 1) && direction === 'prev'
  let nextTimer = undefined
  let prevTimer = undefined
  
  clearTimeout(nextTimer)
  clearTimeout(prevTimer)

  // 滑动到最后一张判断
  if (isNextEnd) {
    console.log('最后一张衔接了')
    newSwiperX.value = -(width * len) + (-width) // 因为末尾多添加了一张开头的，所以距离要多加一个个宽度
    isAnimating.value = true // 改变的时候禁止点击
    nextTimer = setTimeout(() => {
      noAnimated.value = true // 也不要有过渡动画
      isAnimating.value = false
      newSwiperX.value = -width // 就把距离替换成第二张的距离, 动画过渡完结束isAnimating
    }, duration)
  }

  // 如果是第一张开始往左, 距离设置为0
  if (isPrevEnd) {
    console.log('第一张衔接了')
    newSwiperX.value = 0 // 因为开头多添加了一张结尾的，所以距离距离设置为0
    isAnimating.value = true // 改变的时候禁止点击
    prevTimer = setTimeout(() => {
      noAnimated.value = true // 也不要有过渡动画
      isAnimating.value = false
      newSwiperX.value = -width * (len) // 就把距离替换成倒数第二张的距离, 动画过渡完结束isAnimating
    }, duration)
  }

  if (!isNextEnd && !isPrevEnd) {
    newSwiperX.value = -1
    console.log(newSwiperX.value)
  }
  emit('change', index)
})

// 循环
const loop = (type: string) => {
  swiperConfig.index = type == 'next' ? 0 : props.list.length - 1
}

// 往左
const next = () => {
  swiperConfig.direction = 'next'
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
  swiperConfig.direction = 'prev'
  if (isAnimating.value) {
    return
  }
  noAnimated.value = false
  swiperConfig.index --
  if (swiperConfig.index <= -1) {
    loop('prev')
  }
}

const stop = () => {
  if (props.autoplay) {
    clearInterval(swiperConfig.inter)
  }
}

// 初始化
const start = () => {
  if(props.autoplay){
    clearInterval(swiperConfig.inter)
    swiperConfig.inter = setInterval(() => {
      swiperConfig.direction === 'next' ? next() : prev()
    }, props.interval)
  }
}


onMounted(() => {
  if (props.list.length) {
    setTimeout(() => {
      swiperConfig.width = swiperRefs.value.clientWidth
      start()
    }, 100)
  }
})
</script>

<template>
  <div
    v-if="list.length"
    ref="swiperRefs"
    class="yzp-swiper-wrap"
    @mouseover="stop"
    @mouseout="start"
  >
    <ul
      :style="{
        transform: `translate3d(${newSwiperX === -1 ? translateX : newSwiperX }px,0,0)`,
        transition: noAnimated ? 'none' : `all ${duration / 1000}s`
      }"
      class="yzp-swiper-list"
    >
      <li v-show="swiperConfig.width" class="yzp-swiper-item">
        <div 
          class="yzp-swiper-link"
          :style="{ background: `url(${list[list.length -1].url}) no-repeat center` }"
        >
        </div>
      </li>
      <li
        v-for="(item, index) in list"
        :style="{ 'z-index': -index }"
        :key="index"
        class="yzp-swiper-item"
      >
        <div class="yzp-swiper-link" :style="{ background: `url(${item.url}) no-repeat center` }">
          <slot name="swiperItem" :item="item"></slot>
        </div>
      </li>
      <li v-show="swiperConfig.width" class="yzp-swiper-item">
        <div
          class="yzp-swiper-link"
          :style="{ background: `url(${list[0].url}) no-repeat center` }"
        >
        </div>
      </li>
    </ul>
    <!--swiper btn-->
    <div v-if="showArrow && !!$slots.swiperLeftButton && !!$slots.swiperRightButton && !$slots.swiperButton" class="yzp-swiper-btn">
      <div class="yzp-swiper-left" @click="prev">
        <slot name="swiperLeftButton"></slot>
      </div>
      <div class="yzp-swiper-right" @click="next">
        <slot name="swiperRightButton"></slot>
      </div>
    </div>
    <!--自定义箭头按钮-->
    <slot name="swiperButton"></slot>
    <!--end swiper btn-->

    <!--swiper title-->
    <div v-if="showTitle" class="yzp-swiper-text">
      <span class="yzp-swiper-title">{{ list[swiperConfig.index].title || '-' }}</span>
      <span class="yzp-swiper-index">{{ swiperConfig.index + 1 }} / {{ list.length }}</span>
    </div>
    <!--end swiper title-->

    <!--swiper dots-->
    <div v-if="showDots && !showTitle" class="yzp-swiper-dots">
      <ul class="yzp-swiper-dots-list">
        <li
          v-for="(dot, i) in list"
          :key="`dot-${i}`"
          :class="{ active: swiperConfig.index === i }"
          class="yzp-swiper-dots-item"
        >
        </li>
      </ul>
    </div>
    <!--end swiper dots-->
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
      .yzp-swiper-left {
        left: 15px;
      }
      .yzp-swiper-right {
        right: 15px;
      }
    }
  }
  .yzp-swiper-btn {
    > div {
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
    .yzp-swiper-left {
      left: -55px;
    }
    .yzp-swiper-right {
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
        .yzp-swiper-inner {
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
  .yzp-swiper-dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    .yzp-swiper-dots-list {
      display: flex;
      align-items: center;
      .yzp-swiper-dots-item {
        height: 5px;
        width: 10px;
        border-radius: 10px;
        background: rgba(255,255,255,0.5);
        transition: all 0.3s;
        margin: 0 5px;
        &.active {
          background: #ffffff;
          width: 20px;
        }
      }
    }
  }
}
</style>