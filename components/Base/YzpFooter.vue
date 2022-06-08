<script lang="ts" setup>

const { $baseSettings } = useNuxtApp()

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
    <div class="yzp-footer-main max-w1200">
      <div class="yzp-footer-link">
        <nuxt-link to="/feedback">反馈建议</nuxt-link>
        <nuxt-link to="/blogroll">友情链接</nuxt-link>
        <nuxt-link to="/about">关于本站</nuxt-link>
      </div>
      <div class="yzp-footer-copyroght">
        <span>CopyRight ©{{ new Date($baseSettings.web_date).getFullYear() + '-' + new Date().getFullYear() + $baseSettings.web_name }} - </span>
        <a href="https://beian.miit.gov.cn/" target="_blank">{{ $baseSettings.web_beian }}</a>
      </div>
    </div>
    <div v-if="backTopButtonShow" class="yzp-backtop" @click="backToTop"></div>
  </footer>
</template>

<style lang="less">
.yzp-footer {
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-15) 0;

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
  .yzp-footer-link {
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: inline-block;
      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &:after {
        content: '';
        display: inline-block;
        height: 10px;
        width: 1px;
        background: #555;
        margin: 0 15px;
      }
    }
  }
  .yzp-footer-copyroght {
    margin-top: var(--space-15);
    text-align: center;
    color: #999999;
    a {
      display: inline-block;
      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    }
  }
}
</style>
