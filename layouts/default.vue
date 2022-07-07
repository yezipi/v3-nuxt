<script lang="ts" setup>
const backTopButtonShow = ref(false)

const currTheme = useCookie<string>('theme')

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
    const newLinkEle = document.createElement('link')
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
      const newScriptEle: HTMLScriptElement = document.createElement('script')
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
  <div class="yzp-wrapper">
    <!--顶部-->
    <base-yzp-header></base-yzp-header>
    <!--end 顶部-->

    <!--内容部分-->
    <article class="yzp-container">

      <div class="yzp-main max-w1200">
        <!--正文-->
        <section class="yzp-section">
          <slot />
        </section>
        <!--end 正文-->

        <!--侧边栏-->
        <base-yzp-aside></base-yzp-aside>
        <!--侧边栏-->
      </div>

    </article>
    <!--end 内容部分-->

    <!--页脚-->
    <base-yzp-footer></base-yzp-footer>
    <!--end 页脚-->


    <div class="yzp-skin-main">
      <span class="yzp-skin-btn">换肤</span>
      <div class="yzp-skin-wrap">
        <div class="yzp-skin-list">
          <span
            v-for="(theme) in themeList"
            :key="theme.id"
            :class="{ active: currTheme === theme.id }"
            class="yzp-skin-item"
            @click="changeTheme(theme)"
          >
          {{ theme.name }}
        </span>
        </div>
      </div>
    </div>
    <div v-if="backTopButtonShow" class="yzp-backtop-btn" @click="backToTop"></div>

  </div>
</template>

<style scoped lang="less">
.yzp-wrapper {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.yzp-container {
  padding-top: 85px;
  padding-bottom: var(--space-15);
  display: flex;
  justify-content: center;
}

.yzp-main {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.yzp-section {
  flex: 1;
  min-height: calc(100vh - 170px);
}

.yzp-backtop-btn {
  width: 46px;
  height: 46px;
  background: url('_nuxt/img/back-top-btn.png') no-repeat;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  line-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    .yzp-skin-wrap {
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

  .yzp-skin-wrap {
    position: absolute;
    left: -110px;
    padding-right: 10px;
    display: none;
    &:after,
    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    &:after {
      right: -10px;
      border-width: 11px;
      border-color: transparent transparent transparent var(--bg-white);
      z-index: 1;
    }
    &:before {
      right: -11px;
      z-index: 0;
      border-width: 11px;
      border-color: transparent transparent transparent var(--border-1);
    }
    .yzp-skin-list {
      width: 100px;
      border: 1px solid var(--border-1);
      border-radius: 5px;
      backdrop-filter: saturate(100%) blur(10px);
      background: rgba(var(--rgb-white),.5);
    }

    .yzp-skin-item {
      display: block;
      &:hover,&.active {
        color: var(--color-primary);
        background: var(--color-primary-01);
      }
    }
  }
}
</style>
