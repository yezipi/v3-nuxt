<!-- 顶部导航组件 2022-01-15 yzp -->
<script lang="ts" setup>
import { scrollAnimation } from '~~/utils/index'

const route = useRoute()
const { $baseSettings, $columns } = useNuxtApp()
const { web_notice, web_logo } = $baseSettings.value

const scroller = new scrollAnimation()

const navItemRefs = []
const navActiveDiv = reactive({
  left: 0,
  width: 0,
})
const timer = ref(undefined)
const scrolling = ref(false)
const currIndex = ref(0) // 当前页面的菜单索引
const activeIndex = ref(0) // 滑动菜单的索引

const setItemNavRefs = (el: any) => {
  navItemRefs.push(el)
}

// 设置滑块位置
const setActiveNav = (index: number) => {
  const navCurrEle = navItemRefs[index]
  if (!navCurrEle) {
    return
  }
  const { offsetLeft = 0, clientWidth = 0 } = navItemRefs[index]
  navActiveDiv.left = offsetLeft
  navActiveDiv.width = clientWidth
}

const getCurrNavIndex = () => {
  const urls = $columns.value.map((e: any) => e.url).filter((e: any) => e)
  const columnIndex = urls.findIndex((e: any) => (route.name as string).indexOf(e) > -1)
  currIndex.value = route.name === 'index' ? 0 : columnIndex + 1
  activeIndex.value = currIndex.value 
}

const initActiveIndex = () => {
  getCurrNavIndex()
  setActiveNav(currIndex.value)
}

// 鼠标移动显示滑块
const showSubNav = (flag: boolean, index: number) => {
  clearTimeout(timer.value)
  setActiveNav(flag ? index : currIndex.value)
  timer.value = setTimeout(() => {
    activeIndex.value = flag ? index : currIndex.value
  }, 150)
}
watch(() => route.path, () => initActiveIndex())

onMounted(() => {
  initActiveIndex()
  scroller.start({
    list: web_notice,
    intervalChange: () => {
      scrolling.value = true
    },
    durationChange: () => {
      scrolling.value = false
    },
  })
})

</script>

<template>
  <header class="yzp-header blur">
    <div class="yzp-header-main max-w1200">
      <div class="yzp-header-left">
        <div class="yzp-header-logo">
          <img :src="web_logo" />
        </div>
        <!--滚动消息-->
        <div v-if="web_notice && web_notice.length" class="yzp-header-notice">
          <i class="iconfont icongonggao"></i>
          <ul :class="{ scrolling }" class="yzp-notice-list">
            <li v-for="(item, index) in web_notice" :key="index">{{ item }}</li>
          </ul>
        </div>
        <!--end 滚动消息-->
      </div>
      <!--导航菜单-->
      <nav class="yzp-header-nav">
        <ul class="yzp-nav-list">
          <li
            v-for="(item, index) in $columns"
            :key="index"
            :ref="setItemNavRefs"
            :class="{ 'yzp-nav-link-active': index === activeIndex }"
            class="yzp-nav-item"
            @mouseenter="showSubNav(true, index)"
            @mouseleave="showSubNav(false, index)"
          >
            <nuxt-link
              :to="`${item.type === 'single' ? '/single/' : '/'}${item.url}`"
              class="yzp-nav-link"
            >
              <span class="yzp-nav-name">{{ item.name }}</span>
              <i v-if="item.subcolumns.length" class="iconfont iconico_open"></i>
            </nuxt-link>
            <!--下拉菜单-->
            <div v-if="item.subcolumns && item.subcolumns.length" class="yzp-drop-nav">
              <ul class="yzp-sub-list">
                <li v-for="(sub, idx) in item.subcolumns" :key="idx" class="yzp-sub-item">
                  <nuxt-link :to="`/${item.url}/${sub.url}`" class="yzp-sub-link">
                    <span class="yzp-sub-name">{{ sub.name }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <!--end 菜单-->
          </li>
        </ul>
        <div
          v-show="navActiveDiv.width > 0"
          :style="{ transform: `translateX(${navActiveDiv.left}px) scale(${navActiveDiv.width ? 1 : 0})` }"
          class="yzp-nav-slider-active"
        ></div>
      </nav>
      <!--end 导航菜单-->
    </div>
  </header>
</template>

<style scoped lang="less">
.yzp-header {
  position: fixed;
  box-shadow: 0 0 10px var(--border-1);
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 9;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: top center !important;
}
.yzp-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: auto;
  .yzp-header-left {
    display: flex;
    align-items: center;
    height: 100%;
    flex-shrink: 0;
    .yzp-header-logo {
      width: 150px;
      height: 100%;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        object-fit: cover;
        height: auto;
      }
    }
    .yzp-header-notice {
      height: 24px;
      display: flex;
      overflow: hidden;
      line-height: 24px;
      .yzp-notice-list {
        margin-left: 10px;
        &.scrolling {
          animation: scrollUp 0.35s linear;
        }
        li {
          max-width: 200px;
          display: block;
          line-height: 24px;
          height: 24px;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
  .yzp-header-nav {
    margin-left: 10px;
    height: 100%;
  }
}
.yzp-nav-list {
  display: flex;
  align-items: center;
  height: 100%;
  .yzp-nav-item {
    display: flex;
    text-align: center;
    justify-content: center;
    width: 100px;
    height: 100%;
    z-index: 1;
    position: relative;
    &:hover {
      .yzp-drop-nav {
        display: block;
        animation: toTop 0.3s ease;
      }
    }
    .yzp-nav-link {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: var(--font-m);
      .iconfont {
        display: inline-block;
        margin-left: 5px;
      }
    }
    &.yzp-nav-link-active {
      .yzp-nav-link {
        color: #ffffff;
      }
    }
  }
}
.yzp-drop-nav {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 11px;
  top: 70px;
  z-index: -1;
  transition: all 0.3s;
  box-shadow: 0 8px 8px rgba(var(--rgb-dark), .15);
  &:after,
  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    left: 0;
    right: 0;
    margin: auto;
  }
  &:after {
    top: 2px;
    border-width: 0 10px 10px;
    border-color: transparent transparent var(--color-white);
    z-index: 1;
  }
  &:before {
    top: 1px;
    z-index: 0;
    border-width: 0 11px 11px;
    border-color: transparent transparent var(--border-2);
  }
  .yzp-sub-list {
    border: 1px solid var(--border-1);
    border-radius: var(--border-radius);
    background: var(--color-white);
    overflow: hidden;
  }
  .yzp-sub-link {
    display: block;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    font-size: var(--font-m);
    &:hover {
      background: var(--border-1);
    }
  }
}
.yzp-nav-slider-active {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 40px;
  background: var(--color-primary);
  z-index: 0;
  width: 80px;
  left: 10px;
  margin: auto;
  border-radius: 50px;
  transition: all 0.3s;
}
</style>
