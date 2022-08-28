<script setup lang="ts">
defineProps({
  error: Object,
})
</script>

<template>
  <div class="yzp-error-server">
    <div class="yzp-error-server-content">
      <h1 class="yzp-error-server-title">{{ error.statusCode }} WARNING</h1>
      <h2 class="yzp-error-server-desc" style="margin-bottom: 10px">{{ error.statusMessage }}</h2>
      <p class="yzp-error-server-desc">{{ error.message }}</p>
    </div>
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
  background: #000000;
  .yzp-error-server-content {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .yzp-error-server-title {
      font-size: var(--font-32);
      color: #ffffff;
      background: #a00;
      padding: var(--space-10) var(--space-20);
      margin-bottom: var(--space-20);
      text-align: center;
      display: inline-block;
    }
    .yzp-error-server-desc {
      color: #ffffff;
      font-size: var(--font-20);
    }
  }
}

</style>
