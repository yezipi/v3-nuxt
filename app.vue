<script lang="ts" setup>

const { settingsApi, columnApi } = useApi()

const route = useRoute()
const { $db } = useNuxtApp()

const metaConfig = ref<any>({})
const pageTitle = ref('')

const settingsTheme = ref<string>('')
const currTheme = useCookie<string>('theme')

const maintenanceSettings = useMaintenanceSettings()
const baseSettings = useBaseSettings()
const personalizeSettings = usePersonalSettings()
const securitySettings = useSecuritySettings()
const columns = useColumns()
const flatColumns = useFlatColumns()

const isBlack = ref(false) // 是否黑名单
const isMaintenance = ref(false) // 是否维护
const ip = ref('')

const homeRoute = {
  name: '首页',
  id: '',
  alias: '',
  type: 'home',
  url: '',
  subcolumns: []
}

// 获取网站维护设置
maintenanceSettings.value = await settingsApi.getMaintenanceSettings()

if (maintenanceSettings.value && maintenanceSettings.value.open) {
  throw createError({
    statusCode: 503,
    statusMessage: 'Website maintenance',
    message: maintenanceSettings.value.content,
  })
}

// 黑名单ip
try {
  securitySettings.value = await settingsApi.getSecuritySettings()
  const { open, black_ip } = securitySettings.value
  const blackIp = black_ip ? black_ip.split('\n') : []
  const headers = useRequestHeaders(['x-forwarded-for'])
  const headerIp = headers['x-forwarded-for']
  if (open && Array.isArray(blackIp)) {
    if (blackIp.includes(headerIp)) {
      ip.value = headerIp
      isBlack.value = true
    }
  }
} catch (error) {
  console.log(error)
}

if (isBlack.value) {
  throw createError({
    statusCode: 403,
    statusMessage: ip.value,
    message: '您已被列入黑名单，禁止访问',
  })
}

// 获取设置信息
baseSettings.value = await settingsApi.getBaseSettings()
personalizeSettings.value = await settingsApi.getPersonalizeSettings()

if (!baseSettings.value || !personalizeSettings.value) {
  (baseSettings.value as any) = {}
  throw createError({
    statusCode: 500,
    statusMessage: 'website is not yet',
    message: '网站未进行相关配置，请前往后台进行配置',
  })
}


const { web_name, web_title, web_description, web_keywords } = baseSettings.value
const { style, gray, background } = personalizeSettings.value
const hasLeafStyle = ['spring', 'autumn', 'winter']

// 如果cookie中已经设置了主题
if (currTheme.value) {
  settingsTheme.value = currTheme.value
} else {
  currTheme.value = settingsTheme.value = style
  useTheme().value = style
}

metaConfig.value = {
  title: computed(() => pageTitle.value ? `${pageTitle.value}-${web_name}` : `${web_name}-${web_title}`),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: web_description || '',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: web_keywords || '',
    }
  ],
  htmlAttrs: {
    style: gray ? 'filter: grayscale(1)' : ''
  },
  bodyAttrs: {
    class: `yzp-theme-${settingsTheme.value || 'fresh'}`,
    style: settingsTheme.value === 'fresh' && background ? `background-image: url(${background})` : ''
  },
  link: [] as any,
  script: [] as any
}

metaConfig.value.link.push({
  hid: 'theme',
  id: 'theme',
  rel: 'stylesheet',
  href: `/theme/${settingsTheme.value || 'fresh'}/index.css`
})

if (hasLeafStyle.includes(settingsTheme.value)) {
  metaConfig.value.script.push({
    id: 'fallenLeaves',
    type: 'text/javascript',
    src: '/js/fallenLeaves.js'
  })
}

// 格式化百度统计代码，只取链接
if (baseSettings.value.web_tongji) {
  const str = baseSettings.value.web_tongji.replace(/<\/?.+?\/?>/g, '').replace(/\"/g, '').trim().split('=')
  if (str && str[3]) {
    const link = str[3].split(';')
    if (link && link[0]) {
      metaConfig.value.script.push({
        id: 'BAIDU_TONGJI',
        type: 'text/javascript',
        src: link[0]
      })
    }
  }
}

useHead(metaConfig.value)

// 获取栏目数据
const navData = await columnApi.getList()

const setPageTitle = (val: string) => {
  columns.value = [homeRoute, ...(navData || [])]
  flatColumns.value = columns.value.map((e) => [e, ...e.subcolumns]).flat()
  const path = val ? val.split('/').filter((e: string) => e) : []
  const currCoulmn = flatColumns.value.find((e) => path && path[path.length - 1] === e.url)
  pageTitle.value = currCoulmn ? currCoulmn.name : ''
}

watch(() => route.path, (val: string) => {
  setPageTitle(val)
})

setPageTitle(route.path)

onMounted(() => {
  if (!$db.get('avatar')) {
    $db.set('avatar', parseInt(String(Math.random() * 45)))
  }
  $db.set('entryTime', new Date().getTime())
})

if (process.client) {
  // 初始化51.la统计代码
  //@ts-ignore
  // LA.init({ id: 'JnRZ4qqqHEgeXEzu',ck: 'JnRZ4qqqHEgeXEzu', autoTrack:true })
}

</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
