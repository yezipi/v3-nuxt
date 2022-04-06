<script setup lang="ts">import { stat } from 'fs';

interface LightboxProps {
  tips?: string,
  visible?: boolean,
  urlKey?: string,
  el?: any,
  current: string,
  rows: any[],
}

const props = withDefaults(defineProps<LightboxProps>(), {
  current: '',
  rows: () => [],
  visible: false,
  urlKey: 'origin_path',
  el: undefined
})

const urls = computed(() => props.rows.map((e: any) => e[props.urlKey]))
const state = ref(props.visible)
const index = ref(0)
const isLoadEnd = ref(false)
const active = ref(props.current)

const imgChange = (flag: boolean) => {
  isLoadEnd.value = false
  if (flag) {
    if (index.value === props.rows.length - 1) {
      return false
    }
    index.value++
  } else {
    if (index.value === 0) {
      return false
    }
    index.value--
  }
  active.value = urls.value[index.value]
  console.log(active.value)
}

const imgLoad = () => {
  isLoadEnd.value = true
}

const changeState = (flag: boolean) => {
  state.value = flag
  if (!flag) {
    setTimeout(() => {
      document.body.removeChild(props.el)
    })
  }
}

watch(() => props.visible, (res: boolean) => {
  state.value = res
})

</script>

<template>
  <div v-if="state" class="yzp-lightbox-main" @click="changeState(false)">
    <i class="yzp-lightbox-btn-left iconfont" @click.stop="imgChange(false)">&#xe60a;</i>
    <img v-show="isLoadEnd" class="yzp-lightbox-img zoomIn" :src="active" @load="imgLoad" />
    <img v-show="!isLoadEnd" class="yzp-lightbox-loading" src="/img/btn-loading.gif" />
    <i class="yzp-lightbox-btn-right iconfont" @click.stop="imgChange(true)">&#xe60a;</i>
    <i class="yzp-lightbox-btn-close iconfont" @click.stop="changeState(false)">&#xe65f;</i>
    <p class="yzp-lightbox-description">{{ rows[index].description || '暂无描述' }}</p>
  </div>
</template>

<style lang="less" scoped>
.yzp-lightbox-main {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 19;
  display: flex;
  align-items: center;
  justify-content: center;
  .yzp-lightbox-loading {
    width: 30px;
    height: 30px;
  }
  .yzp-lightbox-img {
    min-width: 50px;
    max-width: 80%;
    border-radius: 5px;
  }
  .yzp-lightbox-description {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px 0;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
  }
  .iconfont {
    display: block;
    position: absolute;
    top: 48%;
    color: #cccccc;
    font-size: 50px;
    cursor: pointer;
    &::selection {
      background: none;
    }
    &:hover {
      opacity: 0.5;
    }
    &.yzp-lightbox-btn-left {
      left: 20px;
      transform: rotate(180deg);
    }
    &.yzp-lightbox-btn-right {
      right: 20px;
    }
    &.yzp-lightbox-btn-close {
      top: 20px;
      right: 20px;
      font-size: 30px;
    }
  }
}
</style>