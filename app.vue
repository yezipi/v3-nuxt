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
  const paths = val ? val.split('/').filter((e: string) => e) : []
  const currCoulmn = flatColumns.value.find((e) => paths.includes(e.url))
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
</script>

<template>
  <NuxtLayout :name="maintenanceSettings.open ? 'maintenance' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>
