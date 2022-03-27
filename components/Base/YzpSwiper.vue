
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
  clip?: boolean,
}

const props = withDefaults(defineProps<Props>(), {

  /**
   * 列表数据
   */
  list: () => [],

  /**
   * 动画时长，毫秒
   */
  duration: 500,

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

  /**
   * 裁剪效果
   */
  clip: false,

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
const isMoreThanOne = computed(() => props.list.length &&  props.list.length > 1)
const durationStart = ref(false)

// 监听索引改变
watch(() => swiperConfig.index, (index: number) => {
  const { width, direction } = swiperConfig
  const len = props.list.length
  const duration = props.duration
  const isNextEnd = (index === 0) && direction === 'next'
  const isPrevEnd = (index === len - 1) && direction === 'prev'
  let nextTimer = undefined
  let prevTimer = undefined
  let durationTimer = undefined
  
  clearTimeout(nextTimer)
  clearTimeout(prevTimer)

  if (props.clip) {
    durationStart.value = true
    durationTimer = setTimeout(() => {
      durationStart.value = false
    }, duration)
    emit('change', index)
    return
  }

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
    // console.log(newSwiperX.value)
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
  if (isMoreThanOne.value) {
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
    :class="{ clip }"
    @mouseover="stop"
    @mouseout="start"
  >
    <ul
      :style="{
        transform: clip ? 'none' : `translate3d(${newSwiperX === -1 ? translateX : newSwiperX }px,0,0)`,
        transition: noAnimated ? 'none' : `all ${duration / 1000}s`
      }"
      class="yzp-swiper-list"
    >
      <template v-if="!clip">
        <li v-show="swiperConfig.width" :class="{ 'yzp-swiper-item-active': swiperConfig.index == list.length - 1 }" class="yzp-swiper-item">
          <div class="yzp-swiper-link">
            <slot name="swiperItem" :item="list[list.length - 1]" :index="list.length - 1"></slot>
          </div>
        </li>
      </template>
      <li
        v-for="(item, index) in list"
        :key="index"
        :style="{ 'z-index': -index }"
        :class="{ 'yzp-swiper-item-active': swiperConfig.index == index }"
        class="yzp-swiper-item"
      >
        <div class="yzp-swiper-link">
          <slot name="swiperItem" :item="item" :index="index"></slot>
        </div>
      </li>
      <template v-if="!clip">
        <li v-show="swiperConfig.width" :class="{ 'yzp-swiper-item-active': swiperConfig.index == 0 }" class="yzp-swiper-item">
          <div class="yzp-swiper-link">
            <slot name="swiperItem" :item="list[0]" :index="0"></slot>
          </div>
        </li>
      </template>
    </ul>
    <!--swiper btn-->
    <div
      v-if="showArrow && !$slots.swiperCustomButton && isMoreThanOne"
      class="yzp-swiper-btn"
    >
      <div :class="{ hasBtnSlot: !!$slots.swiperLeftButton }" class="yzp-swiper-left" @click="prev">
        <slot name="swiperLeftButton"></slot>
      </div>
      <div :class="{ hasBtnSlot: !!$slots.swiperRightButton }" class="yzp-swiper-right" @click="next">
        <slot name="swiperRightButton"></slot>
      </div>
    </div>
    <!--自定义箭头按钮-->
    <slot name="swiperCustomButton"></slot>
    <!--end swiper btn-->

    <!--swiper title-->
    <div v-if="showTitle && !showDots" class="yzp-swiper-text">
      <span class="yzp-swiper-title">{{ list[swiperConfig.index].title || '-' }}</span>
      <span v-if="isMoreThanOne" class="yzp-swiper-index">{{ swiperConfig.index + 1 }} / {{ list.length }}</span>
    </div>
    <!--end swiper title-->

    <!--swiper dots-->
    <div v-if="showDots && isMoreThanOne" class="yzp-swiper-dots">
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
  &.clip {
    .yzp-swiper-list {
      .yzp-swiper-item {
        position: absolute;
        left: 0;
        top: 0;
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
      &:after, &:before {
        display: block;
        content: '';
        width: 1px;
        height: 12px;
        background: var(--color-gray);
        position: absolute;
        border-radius: 4px;
      }
      &:before {
        transform: rotate(-45deg);
        margin-top: -8px;
      }
      &:after {
        transform: rotate(45deg);
        margin-top: 8px;
      }
      &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
      }
    }
    .yzp-swiper-left {
      left: -55px;
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
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
      z-index: -1;
      &.yzp-swiper-item-active {
        z-index: 2!important;
      }
      &.durationStart {
        animation: clip 0.5s ease;
      }
      .yzp-swiper-link {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover!important;
        overflow: hidden;
        position: relative;
        .yzp-swiper-inner {
          display: block;
          width: 100%;
          height: 100%;
        }
        .yzp-swiper-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 0;
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
    background: rgba(var(--rgb-dark), 0.7);
    backdrop-filter: saturate(100%) blur(5px);
    color: var(--color-white);
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
        background: rgba(var(--rbg-white),0.5);
        transition: all 0.3s;
        margin: 0 5px;
        &.active {
          background: var(--color-white);
          width: 20px;
        }
      }
    }
  }
}
@keyframes clip {
  0% {
    clip-path: circle(0% at 0% 100%);
  }
  100% {
    clip-path: circle(100% at 50% 50%);
  }
}
</style>