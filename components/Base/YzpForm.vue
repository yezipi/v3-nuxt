<!--评论表单, 2022-3-25 yzp-->
<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  parentId: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['success'])

const { $message, $db } = useNuxtApp()
const { commonApi } = useApi()

const form = reactive({
  nickname: undefined,
  email: undefined,
  site: undefined,
  content: undefined,
})

const verifyCode = ref(undefined)
const checkCode = ref(undefined)
const loading = ref(false)
const codeRef = ref()

const drawVerifyCode = () => {
  if (!checkCode.value) {
    return
  }
  const arrStr = checkCode.value.split('')
  const canvas = codeRef.value
  const ctx = canvas.getContext('2d')
  ctx.font = '20px normal bold'

  // 创建渐变
  const gradient = ctx.createLinearGradient(0, 0, codeRef.value.width, 0);
  gradient.addColorStop('0', 'green')
  gradient.addColorStop('0.5', 'blue')
  gradient.addColorStop('1.0', 'red')
  
  ctx.fillStyle = '#eeeeee'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 用渐变填色
  for (let i = 0; i < arrStr.length; i++) {
    const num = arrStr[i];
    ctx.fillStyle = gradient;
    ctx.fillText(num, (i + 1) * 18 , 28)
  }
}

const getVerifyCode = async (refresh?: boolean) => {
  verifyCode.value = ''
  checkCode.value = await commonApi.getVerifyCode(new Date().getTime() + checkCode.value)
  if (refresh) {
    drawVerifyCode()
  }
}

const { feedbackApi, blogrollApi, commentApi } = useApi()

// 提交评论
const submit = async () => {
  const patternName = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
  const patternContent = /[`#$%^*()+<>{},\;']/im
  const patternEmail =  /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  const patternSite = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/

  if (!props.parentId && props.type === 'comment') {
    return $message.error('缺少id')
  }

  if (!form.nickname || form.nickname.length < 2) {
    return $message.error('昵称不能为空或者太短哦~')
  }
  if (!patternName.test(form.nickname)) {
    return $message.error('亲，非法昵称~')
  }
  if (!patternEmail.test(form.email)) {
    return $message.error('亲，非法邮箱~')
  }
  if (form.site && !patternSite.test(form.site)) {
    return $message.error('亲，非法网址~')
  }
  if (!form.content || form.content.length < 4) {
    return $message.error('内容不能为空或者太短哦~')
  }
  if (props.type === 'blogroll' && !form.site) {
    return $message.error('亲，请填写网址~')
  }
  if (patternContent.test(form.content)) {
    return $message.error('内容包含非法字符哦~')
  }
  if (!verifyCode.value) {
    return $message.error('请填写验证码哦~')
  }
  if (verifyCode.value.toUpperCase() !== checkCode.value) {
    getVerifyCode(true)
    return $message.error('验证码错误~')
  }

  loading.value = true

  try {
    const params = {
      ...toRaw(form),
      parent_id: props.parentId, 
      type: props.type,
      avatar: `/public/avatar/${$db.get('avatar') || 1}.jpg`
    }
    let res: any = {}
    if (props.type === 'feedback') {
      res = await feedbackApi.save(params)
    } else if (props.type === 'blogroll') {
      res = await blogrollApi.save(params)
    } else {
      res = await commentApi.save(params)
    }
    console.log(res)
    $message.success(res.msg)
    form.content = ''
    emit('success', params)
  } catch (e) {
    console.log(e)
    $message.error(e.msg || '提交失败，请稍后再试')
  } finally {
    getVerifyCode(true)
    loading.value = false
  }
}

await getVerifyCode()

onMounted(() => {
  drawVerifyCode()
})

</script>

<template>
  <div class="yzp-form-wrap">
    <form id="yzp-form-box" action="" onsubmit="return false">
      <!--昵称-->
      <div class="yzp-form-item yzp-box">
        <i class="icongeren iconfont"></i>
        <input v-model="form.nickname" class="yzp-form-item-input" type="text" name="nickname" maxlength="16" placeholder="您的称呼（必填）" />
      </div>

      <!--邮箱-->
      <div class="yzp-form-item yzp-box">
        <i class="iconyouxiang iconfont"></i>
        <input v-model="form.email" class="yzp-form-item-input" type="text" name="email" maxlength="100" placeholder="您的邮箱（必填）" />
      </div>

      <!--网址-->
      <div class="yzp-form-item yzp-box">
        <i class="iconwangzhan iconfont"></i>
        <input v-model="form.site" class="yzp-form-item-input" type="text" name="site" maxlength="100" :placeholder="type==='blogroll' ? '您的网站（必填)' : '您的网站（选填)'" />
      </div>

      <!--表情-->
      <!-- <div class="yf-emoji">
        <img src="../static/images/icon/emoji.png" style="width: 25px" alt="表情" @click="emojiShow">
        <template v-if="showEmoji">
          <emoji-select v-show="visibleEmoji" @onSelected="onSelectEmoji" @onClose="visibleEmoji = false" @onLoad="visibleEmoji = true"></emoji-select>
        </template>
      </div> -->

      <!--内容-->
      <!-- <div class="edit-div textarea" :contenteditable="true" placeholder="说点什么吧"></div> -->
      <div class="yzp-form-item yzp-box" style="max-width: none;">
        <textarea
          v-model="form.content"
          :placeholder="type === 'blogroll' ? '请填写申请原因' : '说点什么吧...'"
          class="yzp-form-item-textarea"
          name="content"
          rows="5"
        >
        </textarea>
      </div>

      <!--验证码-->
      <div class="yzp-form-item yzp-box">
        <i class="iconxinxi iconfont"></i>
        <input v-model="verifyCode" class="yzp-form-item-input" type="text" placeholder="验证码">
        <canvas id="yzp-form-code" ref="codeRef" height="40" width="100" @click="getVerifyCode(true)">不支持canvas</canvas>
      </div>
      <div class="yzp-form-button">
        <button class="yzp-form-submit yzp-box" :class="{ disabled: loading }" :disabled="loading" @click="submit">
          <img v-if="loading" src="/img/btn-loading.gif" />
          <span>{{ loading ? '提交中...' : '立即提交' }}</span>
        </button>
      </div>
    </form>

  </div>
</template>

<style lang="less">
.yzp-form-item {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: var(--space-15);
  max-width: 50%;
  .yzp-form-item-input {
    flex: 1;
    height: 40px;
    padding-left: calc(var(--space-20) + var(--space-20));
    border: none;
    background: none;
  }
  .yzp-form-item-textarea {
    padding: var(--space-10);
    flex: 1;
    border: none;
    background: none;
  }
  .iconfont {
    position: absolute;
    left: var(--space-15);
    margin: auto;
    font-size: var(--font-16);
    color: var(--color-gray);
  }
}

.yzp-form-button {
  display: flex;
  align-items: center;
  width: 20%;
  .yzp-form-submit {
    background: var(--color-primary);
    flex: 1;
    height: 40px;
    color: #ffffff;
    transition: all 0.3s;
    font-size: var(--font-14);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      margin-right: 10px;
    }
    &:hover {
      filter:saturate(150%) brightness(90%);
    }
    &.disabled {
      background: #eeeeee;
      color: #999999;
      cursor: not-allowed;
    }
  }
}
</style>
