<script setup lang="ts">
type MessageType = 'default' | 'success' | 'warning' | 'error'

interface MessageProps {
  tips?: string,
  type?: MessageType,
  visible?: boolean,
  duration?: number,
  el?: undefined,
}

const props = withDefaults(defineProps<MessageProps>(), {
  tips: '',
  type: 'default',
  visible: false,
  duration: 3000,
  id: undefined
})

const state = ref(false)
const title = ref(props.tips)
const status = ref(props.type)
const lock = ref(false)
const timer1 = ref(undefined)
const timer2 = ref(undefined)

watch(() => props.visible, (val: boolean) => {
  state.value = val
  show()
})

const hide = () =>{
    timer1.value = setTimeout(() => {
    lock.value = false
  }, props.duration - 300)

  timer2.value = setTimeout(() => {
    state.value = false
    document.body.removeChild(props.el)
  }, props.duration)
}

const show = () => {
  if (state.value) {
    return
  }
  
  clearTimeout(timer1.value)
  clearTimeout(timer2.value)

  state.value = true
  lock.value = true

  hide()
}

onMounted(() => show())

</script>

<template>
  <div v-if="state" :class="{ zoomOut: !lock }" class="yzp-message-wrap zoomIn">
    <div class="yzp-meesage-box blur">
      <span class="yzp-message-tip">{{ title }}</span>
      <img class="yzp-message-img" :src="`/img/message/${status}.png`" />
    </div>
  </div>
</template>

<style scoped lang="less">
.yzp-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  z-index: 999;
}
.yzp-message-wrap .yzp-meesage-box {
  box-shadow: 0 0 10px var(--border-1);
  border: 1px solid var(--border-1);
  padding: var(--space-15) var(--space-30);
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  max-width: 50%;
}
.yzp-message-wrap .yzp-message-img {
  width: 45px;
  height: 45px;
  margin-left: 15px;
}
.yzp-message-wrap .yzp-message-tip {
  font-size: 14px;
  word-break: break-all;
}
.zoomIn {
  animation: zoomIn 0.3s linear;
}
.zoomOut {
  animation: zoomOut 0.3s linear;
}
@keyframes zoomIn {
  0%,30% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes zoomOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>