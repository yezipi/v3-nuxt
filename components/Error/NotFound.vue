<template>
  <div class="yzp-notfound">
    <div class="yzp-notfound-box">
      <img src="/img/404.gif" alt="" style="width:100%" />
      <p>页面未找到</p>
      <nuxt-link class="" to="/">返回首页</nuxt-link>
    </div>
  </div>
</template>

<style lang="less">
  .yzp-notfound {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    .yzp-notfound-box {
      width: 350px;
    }
    p {
      text-align: center;
      font-size: 16px;
      color: #999999;
      margin: 20px 0;
    }
    a {
      display: block;
      width: 150px;
      margin: auto;
      color: #ffffff;
      background: var(--color-primary);
      height: 35px;
      line-height: 35px;
      border-radius: 6px;
      text-align: center;
      &:hover {
        opacity: 0.7;
      }
    }
  }
</style>
