<script lang="ts" setup>
const { $config, $baseSettings } = useNuxtApp()
</script>

<template>
  <!--博主信息-->
  <base-yzp-panel noPadding>
    <div class="yzp-aside-info">
      <div class="yzp-aside-info-avatar">
        <img class="yzp-aside-info-avatar-img" :src="$baseSettings.web_avatar" />
      </div>
      <p class="yzp-aside-info-slogan">{{ $baseSettings.web_slogan || '欢迎来到本站' }}</p>
      <div class="yzp-aside-info-btngroup">
        <div class="yzp-aside-info-btn-item yzp-aside-info-like-btn">
          <i class="iconfont iconicon-test"></i>
          <span>{{ $baseSettings.web_like }}</span>
        </div>
        <div class="yzp-aside-info-btn-item yzp-aside-info-focus-btn">
          <i class="iconfont iconjiahao"></i>
          <span>关注我</span>
          <div class="yzp-aside-info-focus-img">
            <div class="yzp-aside-info-focus-img-box">
              <img src="https://yezipi.net/_nuxt/img/e9a495f.jpg" />
            </div>
          </div>
        </div>
      </div>
      <div class="yzp-aside-info-count">
        <div class="yzp-aside-info-count-item">
          <span class="yzp-aside-info-count-num">523</span>
          <span class="yzp-aside-info-count-label">今日pv</span>
        </div>
        <div class="yzp-aside-info-count-item">
          <span class="yzp-aside-info-count-num">85</span>
          <span class="yzp-aside-info-count-label">文章</span>
        </div>
        <div class="yzp-aside-info-count-item">
          <span class="yzp-aside-info-count-num">36</span>
          <span class="yzp-aside-info-count-label">留言</span>
        </div>
      </div>
    </div>
  </base-yzp-panel>
  <!--end 博主信息-->
</template>

<style lang="less" scoped>
.yzp-aside-info {
  height: 218px;
  padding: var(--space-15);
  .yzp-aside-info-avatar {
    border-radius: 50%;
    overflow: hidden;
    background: var(--color-white);
    border: 1px solid var(--border-2);
    margin: auto;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      transform: rotate(360deg);
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      padding: 10px;
    }
  }
  .yzp-aside-info-slogan {
    text-align: center;
    color: var(--color-gray);
    margin: var(--space-10) 0;
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .yzp-aside-info-btngroup {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    .yzp-aside-info-btn-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 15px;
      border-radius: 20px;
      font-size: 12px;
      min-width: 60px;
      cursor: pointer;
      border: 1px solid var(--color-white);
      transition: all 0.3s;
      position: relative;
      z-index: 1;
      line-height: 28px;
      &:hover {
        filter: saturate(120%);
        border-radius: var(--border-radius);
      }
      .iconfont {
        display: inline-block;
        margin-right: var(--space-5);
      }
    }
    .yzp-aside-info-like-btn {
      background: var(--color-primary);
      &:hover {
        background: var(--color-white);
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
    }
    .yzp-aside-info-focus-btn {
      background: var(--color-link);
      margin-left: var(--space-15);
      &:hover {
        background: var(--color-white);
        color: var(--color-link);
        border-color: var(--color-link);
        .yzp-aside-info-focus-img {
          display: block;
        }
      }
    }
    .yzp-aside-info-focus-img {
      position: absolute;
      top: 40px;
      display: none;
      animation: toTop 0.3s ease;
      z-index: 3;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
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
        top: -9px;
        border-width: 0 10px 10px;
        border-color: transparent transparent var(--color-white);
        z-index: 2;
      }
      &:before {
        top: -10px;
        z-index: 1;
        border-width: 0 11px 11px;
        border-color: transparent transparent var(--border-1);
      }
      .yzp-aside-info-focus-img-box {
        width: 100px;
        padding: var(--space-5);
        background: var(--color-white);
        border: 1px solid var(--border-1);
        border-radius: 5px;
      }
      img {
        width: 100%;
      }
    }
  }
  .yzp-aside-info-count {
    display: flex;
    align-items: center;
    justify-content: --space-between;
    margin-top: var(--space-15);
    .yzp-aside-info-count-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      &:before {
        content: "";
        display: block;
        width: 1px;
        height: 50%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        background: var(--border-2);
      }
      &:first-child {
        &:before {
          display: none;
        }
      }
      .yzp-aside-info-count-num {
        color: var(--color-dark);
        font-size: var(--font-xl);
        font-weight: bold;
      }
      .yzp-aside-info-count-label {
        color: var(--color-gray);
        font-size: var(--font-s);
      }
    }
  }
}
</style>