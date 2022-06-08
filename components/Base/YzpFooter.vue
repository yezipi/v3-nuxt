<script lang="ts" setup>

const backTopButtonShow = ref(false)

const backToTop = () => {
  let top = document.documentElement.scrollTop
  let timer = null
  if (top > 0) {
    timer = setInterval(() => {
      if (top <= 0) {
        clearInterval(timer)
        return
      }
      top -= 50
      document.documentElement.scrollTop = top
    }, 10)
  }
}

onMounted(() => {
  window.onscroll = function () {
    backTopButtonShow.value = document.documentElement.scrollTop > 100
  }
})

</script>

<template>
  <footer class="yzp-footer">
    <div class="yzp-footer-main max-w1200"></div>
    <div v-if="backTopButtonShow" class="yzp-backtop" @click="backToTop"></div>
  </footer>
</template>

<style lang="less">
.yzp-footer {
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;

  .yzp-footer-main {
    width: 100%;
    height: 50px;
    padding: 10px;
  }
  .yzp-backtop {
    width: 46px;
    height: 46px;
    background: url('@/img/back-top-btn.png') no-repeat;
    background-size: 100%;
    text-align: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 9;
  }
}
</style>
