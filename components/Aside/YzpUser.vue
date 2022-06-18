<script lang="ts" setup>
const { $baseSettings, $message, $db  } = useNuxtApp()
const { web_avatar, web_like, web_slogan } = $baseSettings || {}

const likeNum = ref(web_like || 0)

const onLike = () => {
  if (!$db.get('isLikedWeb')) {
    $db.set('isLikedWeb', true)
    $message.success('点赞成功')
    likeNum.value += 1
  } else {
    $message.warning('您已经点过赞了')
  }
}

</script>

<template>
  <!--博主信息-->
  <base-yzp-panel noPadding style="position: relative;z-index: 1">
    <div class="yzp-aside-info">
      <div class="yzp-aside-info-avatar">
        <img class="yzp-aside-info-avatar-img" :src="web_avatar" onerror="this.src='/img/default-avatar.png'" />
      </div>
      <p class="yzp-aside-info-slogan">{{ web_slogan || '欢迎来到本站' }}</p>
      <div class="yzp-aside-info-btngroup">
        <div class="yzp-aside-info-btn-item yzp-aside-info-like-btn" @click="onLike">
          <i class="iconfont iconicon-test"></i>
          <span>{{ likeNum }}</span>
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

<style lang="less">
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
      width: 80%;
      height: 80%;
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
      .iconfont {
        display: inline-block;
        margin-right: var(--space-5);
      }
    }
    .yzp-aside-info-like-btn {
      background: var(--color-primary-01);
      color: var(--color-primary);
      border: 1px solid var(--color-primary-05);
      &:hover {
        background: var(--color-primary);
        color: var(--color-white);
        border-color: var(--color-white);
      }
    }
    .yzp-aside-info-focus-btn {
      background: rgba(var(--rgb-sub),0.1);
      color: rgb(var(--rgb-sub));
      border: 1px solid rgb(var(--rgb-sub));
      margin-left: var(--space-15);
      &:hover {
        background: rgb(var(--rgb-sub));
        color: var(--color-white);
        border-color: var(--color-white);
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