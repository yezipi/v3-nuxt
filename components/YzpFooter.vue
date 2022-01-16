<template>
  <footer class="yzp-footer">
    <div class="yzp-footer-main max-w1200"></div>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="less">
.yzp-footer {
  position: fixed;
  z-index: 9;
  background: rgba(0,0,0,0.8);
  backdrop-filter: saturate(100%) blur(10px);
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .yzp-footer-main {
    width: 100%;
    height: 50px;
    padding: 10px;
  }
}
</style>
