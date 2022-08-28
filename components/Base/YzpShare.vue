<script setup langt="ts">
import { useBaseSettings } from '~~/composables';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  summary: {
    type: String,
    default: '',
  },
  cover: {
    type: String,
    default: '',
  }
})

const baseSettings = useBaseSettings()
const poster = ref()

const { title, description, summary, cover } = props
const webName = baseSettings.value.web_name

const shareQzone = () => {
  window.open(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(props.url)}&share_source=qzoneShare&desc=${summary}&summary=${description}&title=${title}&site=${webName}&pics=${encodeURIComponent(poster.value)}`)
}

const shareQQ = () => {
  window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(props.url)}&share_source=qqShare`)
}

const shareWeibo = () => {
  window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(props.url)}&sharesource=weiboShare&title=${title}&pic=${poster.value}&site=${webName}&appkey=`)
}

const shareTieba = () => {
  window.open(`http://tieba.baidu.com/f/commit/share/openShareApi?title=${title}&url=${encodeURIComponent(props.url)}&pic=${encodeURIComponent(poster.value)}&key=&sign=on&desc=${description}&comment=${summary}`)
}

onMounted(() => {
  poster.value = props.cover && props.cover.indexOf('http') > -1 ? props.cover : (location.origin + cover)
})

</script>

<template>
  <div class="yzp-share-layer blur yzp-box">
    <div class="yzp-share-main">
      <i class="iconfont" style="color: #f4ac41" @click="shareQzone">&#xe80f;</i>
      <i class="iconfont" style="color: #00aeec" @click="shareQQ">&#xe882;</i>
      <i class="iconfont" style="color: #e94716" @click="shareWeibo">&#xe616;</i>
      <i class="iconfont" style="color: #008aec" @click="shareTieba">&#xe632;</i>
    </div>
  </div>
</template>

<style scoped lang="less">
.yzp-share-layer {
  display: none;
  animation: toTop 0.3s;
  position: absolute;
  left: -5px;
  box-shadow: 0 0 15px rgb(0 0 0 / 20%);
  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    line-height:0;
    border-bottom: 10px solid var(--color-white);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position:absolute;
    top: -10px;
    left:0;
    right:0;
    margin:auto;
    z-index:9;
  }
  .iconfont {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-24);
    padding: var(--space-5) var(--space-10);
    color: var(--color-dark);
    transition: all 0.3s;
    &:hover {
      background: var(--border-1);
    }
  }
}
</style>