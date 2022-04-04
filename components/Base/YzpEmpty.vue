<script lang="ts" setup>
const props = defineProps({
  desc: {
    type: String,
    default: '',
  }
})
</script>


<template>
  <div class="yzp-empty">
    <img src="/img/icon_empty.png" />
    <span v-if="desc" class="yzp-empty-desc">{{ desc }}</span>
  </div>
</template>

<style lang="less">
.yzp-empty {
  position: relative;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: var(--space-30) 0;
  img {
    width: 80px;
  }
  span {
    display: inline-block;
    margin-top: var(--space-15);
    color: var(--color-gray);
  }
}
</style>