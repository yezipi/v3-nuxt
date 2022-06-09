<script lang="ts" setup>

const { $baseSettings } = useNuxtApp()

const backTopButtonShow = ref(false)

const currTheme =  useCookie<{ theme: string }>('theme')

const themeList = ref([
  { name: '暗黑', id: 'dark', Leaves: false },
  { name: '简约', id: 'simple', Leaves: false },
  { name: '春季', id: 'spring', Leaves: true },
  { name: '秋季', id: 'autumn', Leaves: true },
  { name: '冬季', id: 'winter', Leaves: true }
])

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

// 换肤
const changeTheme = (theme: { name: string, id: any, Leaves: boolean }) => {
  const themeLinkEle: HTMLLinkElement = document.querySelector('#theme')
  const leavesScriptEle: HTMLScriptElement = document.querySelector('#fallenLeaves')
  const headEle = document.querySelector('head')
  const themeUrl = `/theme/${theme.id}/index.css`
  const scriptUrl = '/js/fallenLeaves.js'
  if (!themeLinkEle) {
    const newLinkEle =  document.createElement('link')
    newLinkEle.id = 'theme'
    newLinkEle.rel = 'stylesheet'
    newLinkEle.href = themeUrl
    headEle.append(newLinkEle)
  } else {
    themeLinkEle.href = themeUrl
  }
  console.log(leavesScriptEle)
  if (theme.Leaves) {
    if (!leavesScriptEle) {
      const newScriptEle: HTMLScriptElement =  document.createElement('script')
      newScriptEle.id = 'fallenLeaves'
      newScriptEle.type = 'text/javascript'
      newScriptEle.src = scriptUrl
      headEle.append(newScriptEle)
      newScriptEle.onload = () => {
        (window as any).leavesStart()
      }
    }
  } else {
    if (leavesScriptEle) {
      headEle.removeChild(leavesScriptEle)
    }
  }
  document.body.setAttribute('class', `yzp-theme-${theme.id}`)
  currTheme.value = theme.id
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
    <div class="yzp-skin-main">
      <span class="yzp-skin-btn">换肤</span>
      <div class="yzp-skin-list">
        <span v-for="(theme) in themeList" :key="theme.id" @click="changeTheme(theme)">{{ theme.name }}</span>
      </div>
    </div>
    <div v-if="backTopButtonShow" class="yzp-backtop-btn" @click="backToTop"></div>
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
  .yzp-backtop-btn {
    width: 46px;
    height: 46px;
    background: url('@/img/back-top-btn.png') no-repeat;
    background-size: 100%;
    text-align: center;
    position: fixed;
    border-radius: 50%;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 9;
  }
  .yzp-skin-main {
    width: 46px;
    height: 46px;
    text-align: center;
    position: fixed;
    bottom: 0;
    right: 20px;
    top: 0;
    margin: auto;
    cursor: pointer;
    z-index: 9;
    border-radius: 50%;
    background: var(--bg-white);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    line-height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      .yzp-skin-list {
        display: block;
      }
    }
    .yzp-skin-btn {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      &:hover {
        color: var(--color-primary);
        background: var(--color-primary-01);
      }
    }
    .yzp-skin-list {
      position: absolute;
      background: var(--bg-white);
      left: -100px;
      width: 100px;
      display: none;
      span:hover {
        color: var(--color-primary);
        background: var(--color-primary-01);
      }
      span {
        display: block;
      }
    }
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
