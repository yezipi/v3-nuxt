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
const columns = useColumns()
const flatColumns = useFlatColumns()

const homeRoute = {
  name: '首页',
  id: '',
  alias: '',
  type: 'home',
  url: '',
  subcolumns: []
}

// 获取网站维护设置
try {
  maintenanceSettings.value = await settingsApi.getMaintenanceSettings()
} catch (error) {
  console.log(error)
}

// 获取设置信息
personalizeSettings.value = await settingsApi.getPersonalizeSettings()
baseSettings.value = await settingsApi.getBaseSettings()

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

// 格式化百度统计代码，只取链接
if (baseSettings.value.web_tongji) {
  const str = baseSettings.value.web_tongji.replace(/<\/?.+?\/?>/g, '').replace(/\"/g, '').trim().split('=')
  if (str && str[3]) {
    const link = str[3].split(';')
    if (link && link[0]) {
     metaConfig.value.script.push({
      id: 'baiduTongji',
      type: 'text/javascript',
      src: link[0]
    })
    }
  }
}

// 51.la统计代码
metaConfig.value.script.push({
  id: 'LA_COLLECT',
  type: 'text/javascript',
  src: '//sdk.51.la/js-sdk-pro.min.js'
})

if (hasLeafStyle.includes(settingsTheme.value)) {
  metaConfig.value.script.push({
    id: 'fallenLeaves',
    type: 'text/javascript',
    src: '/js/fallenLeaves.js'
  })
}

useHead(metaConfig.value)

// 获取栏目数据
const navData = await columnApi.getList()
columns.value = [homeRoute, ...(navData || [])]
flatColumns.value = columns.value.map((e) => [e, ...e.subcolumns]).flat()

const setPageTitle = (val: string) => {
  const path = val ? val.split('/').filter((e: string) => e) : []
  const currCoulmn = flatColumns.value.find((e) => path && path[ path.length - 1] === e.url )
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
  <NuxtLayout :name="maintenanceSettings && maintenanceSettings.open ? 'maintenance' : 'default'">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
