<template>
  <div class="yzp-not-found" style="width: 420px">
    <div>
      <img src="/img/404.gif" alt="" style="width:100%" />
    </div>
    <nuxt-link class="defaultTextColor ft16" to="/">返回首页</nuxt-link>
  </div>
</template>

<style lang="less">
  .yzp-not-found {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 35%;
    a {
      display: block;
      text-align: center;
      margin-top: 10px;
    }
  }
</style>
