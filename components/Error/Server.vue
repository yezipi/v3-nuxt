<script setup lang="ts">
defineProps({
  error: Object,
})
</script>

<template>
  <div class="yzp-error-server">
    <div class="yzp-error-server-box">
      <img src="@/assets/img/error/laptop.svg" style="height: 350px" />
      <div class="yzp-error-server-parts">
        <img src="@/assets/img/error/eye.svg" class="eye1" />
        <img src="@/assets/img/error/eye.svg" class="eye2" />
        <img src="@/assets/img/error/smile.svg" class="smile" />
      </div>
    </div>
    <h1 class="yzp-error-server-status">
      服务器开小差了，{{ error.statusMessage + ' ' +error.statusCode }}
    </h1>
    <p class="yzp-error-server-message">{{ error.message }}</p>
    <!-- <p v-html="error.description" class="yzp-error-server-desc"></p> -->
  </div>
</template>

<style lang="less">
.yzp-error-server {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.yzp-error-server-status {
  font-size: 30px;
  margin-bottom: 10px;
}
.yzp-error-server-message {
  font-size: 16px;
}
.yzp-error-server-desc {
  padding: 10px;
  background: #f5f5f5;
  color: #999999;
}
.yzp-error-server-box {
  margin: 0 auto;
  position: relative;
}
.yzp-error-server-parts {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 200px;
  background-color: transparent;
}

.yzp-error-server-parts .eye1 {
  position: absolute;
  left: 60px;
  top: 50px;
  width: 30px;
  animation: spin 2s infinite linear;
}
.yzp-error-server-parts .eye2, .yzp-error-server-parts .eye1 {
  position: absolute;
  right: 60px;
  top: 50px;
  width: 30px;
  animation: spin 2s infinite linear;
}

.yzp-error-server-parts .smile {
  width: 150px;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  margin: auto;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
