<script lang="ts" setup>

const baseSettings = useBaseSettings()

</script>

<template>
  <footer class="yzp-footer">
    <div class="yzp-footer-main max-w1200">
      <div class="yzp-footer-link">
        <nuxt-link to="/feedback">反馈建议</nuxt-link>
        <nuxt-link to="/blogroll">友情链接</nuxt-link>
        <nuxt-link to="/about">关于本站</nuxt-link>
      </div>
      <div v-if="baseSettings" class="yzp-footer-copyroght">
        <span>CopyRight ©{{ new Date(baseSettings.web_date).getFullYear() + '-' + new Date().getFullYear() + baseSettings.web_name }} - </span>
        <a href="https://beian.miit.gov.cn/" target="_blank">{{ baseSettings.web_beian }}</a>
      </div>
    </div>
  </footer>
</template>

<style lang="less">
.yzp-footer {
  background: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-15) 0;

  .yzp-footer-main {
    width: 100%;
    height: 50px;
    padding: 10px;
  }
  .yzp-footer-link {
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: inline-block;
      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &:after {
        content: '';
        display: inline-block;
        height: 10px;
        width: 1px;
        background: #555;
        margin: 0 15px;
      }
    }
  }
  .yzp-footer-copyroght {
    margin-top: var(--space-15);
    text-align: center;
    color: #999999;
    a {
      display: inline-block;
      &:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    }
  }
}
</style>
