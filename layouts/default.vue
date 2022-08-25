<script lang="ts" setup>
const backTopButtonShow = ref(false)

const currTheme = useCookie<string>('theme')
const personalSettings = usePersonalSettings()

const themeList = ref([
  { name: '春季', id: 'spring', Leaves: true, icon: '\ue62c', color: '#3ed376' },
  { name: '夏季', id: 'summer', Leaves: false, icon: '\ue636', color: '#23b6f2' },
  { name: '秋季', id: 'autumn', Leaves: true, icon: '\ue620', color: '#e77518' },
  { name: '冬季', id: 'winter', Leaves: true, icon: '\ue76c', color: '#cccccc' },
  { name: '暗黑', id: 'dark', Leaves: false, icon: '\ue6a0', color: '#353535' },
  { name: '简约', id: 'simple', Leaves: false, icon: '\ue614', color: '#999999' },
  { name: '小清新', id: 'fresh', Leaves: false, icon: '\ue615', color: '#999999' },
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
  if (theme.id !== 'fresh') {
    document.body.removeAttribute('style')
  } else {
    document.body.setAttribute('style', `background-image: url(${personalSettings.value.background})`)
  }
  document.body.setAttribute('class', `yzp-theme-${theme.id}`)
  currTheme.value = theme.id
  personalSettings.value.style = theme.id
  useTheme().value = theme.id
  setTimeout(() => {
    window.location.reload()
  })
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

    <!--悬浮按钮-->
    <div class="yzp-floatbtn">
      <div class="yzp-float-item">
        <a :class="{ halfRadius: backTopButtonShow }" title="切换主题"><i class="iconfont">&#xe6cb;</i></a>
        <div class="yzp-float-menu yzp-skin-wrap">
          <div class="yzp-skin-list">
            <div
              v-for="(theme) in themeList"
              :key="theme.id"
              :class="{ active: currTheme === theme.id }"
              class="yzp-skin-item" @click="changeTheme(theme)"
            >
              <i class="iconfont" :style="{color: theme.color}">{{ theme.icon }}</i>
              <span>{{ theme.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="backTopButtonShow" class="yzp-float-backtop yzp-float-item" @click="backToTop">
        <a title="返回顶部">
          <i class="iconfont">&#xe693;</i>
        </a>
      </div>
    </div>

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
  min-height: calc(100vh - 170px);
  width: 70%;
  flex-shrink: 0;
}

.yzp-floatbtn {
  width: 46px;
  text-align: center;
  position: fixed;
  bottom: 130px;
  right: var(--space-20);
  z-index: 9;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  .yzp-float-item {
    position: relative;
    a {
      display: block;
      height: 46px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: saturate(100%) blur(10px);
      background: rgba(var(--rgb-white), .5);
      border-radius: 5px;
    }

    .iconfont {
      color: var(--color-gray);
      font-size: var(--font-xl);
    }

    &:hover {
      background: var(--color-primary-01);

      .iconfont {
        color: var(--color-primary);
      }

      .yzp-float-menu {
        display: block;
      }
    }
  }
  .yzp-float-backtop a {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  a.halfRadius {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.yzp-skin-wrap {
  position: absolute;
  left: -112px;
  bottom: 0;
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
    bottom: var(--space-15);
    margin: auto;
  }

  &:after {
    right: -10px;
    border-width: 11px;
    border-color: transparent transparent transparent rgba(var(--rgb-white), .6);
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
    box-sizing: border-box;
    border: 1px solid var(--border-1);
    border-radius: 5px;
    backdrop-filter: saturate(100%) blur(10px);
    background: rgba(var(--rgb-white), .5);
  }

  .yzp-skin-item {
    display: flex;
    padding: var(--space-15);
    cursor: pointer;
    align-items: center;
    .iconfont {
      font-size: var(--font-16);
      margin-right: 5px;
    }
    &:hover,
    &.active {
      color: var(--color-primary);
      background: var(--color-primary-01);
    }
  }
}
</style>
