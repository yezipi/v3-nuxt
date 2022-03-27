<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  }
})
</script>


<template>
  <div class="yzp-empty">
    <img src="/assets/img/icon/icon_empty.png" />
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<style scoped lang="less">
.yzp-empty {
  position: relative;
  left: 0;
  right: 0;
  margin-top: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
  }
  span {
    display: inline-block;
    margin-top: 10px;
  }
}
</style>