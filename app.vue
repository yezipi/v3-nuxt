<script lang="ts" setup>

const currTheme = useCookie<string>('theme')
const { settingsApi, columnApi } = useApi()

const route = useRoute()
const { $db } = useNuxtApp()


const metaConfig = ref<any>({})
const pageTitle = ref('')

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

// 获取设置
const initSettings = async () => {
  try {
    personalizeSettings.value = await settingsApi.getPersonalizeSettings()
    baseSettings.value = await settingsApi.getBaseSettings()
    const { web_name, web_title, web_description, web_keywords } = baseSettings.value
    const { style, gray, background } = personalizeSettings.value
    const hasLeafStyle = ['spring', 'summer', 'autumn', 'winter']
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
        class: `yzp-theme-${style || 'fresh'}`,
        style: style === 'fresh' && background ? `background-image: url(${background})` : ''
      },
      link: [] as any,
      script: [] as any
    }

    // 如果cookie中已经设置了主题
    if (currTheme.value) {
      personalizeSettings.value.style = currTheme.value
    }

    metaConfig.link.push({
      hid: 'theme',
      id: 'theme',
      rel: 'stylesheet',
      href: `/theme/${style || 'fresh'}/index.css`
    })

    if (hasLeafStyle.includes(style)) {
      metaConfig.script.push({
        id: 'fallenLeaves',
        type: 'text/javascript',
        src: '/js/fallenLeaves.js'
      })
    }

    currTheme.value = style
  } catch (e) {
    console.log(e)
  }
}

// 初始化栏目
const initColumns = async () => {
  try {
    const navData = await columnApi.getList()
    const navVal = navData || []
    columns.value = [homeRoute, ...navVal]
    flatColumns.value = columns.value.map((e) => [e, ...e.subcolumns]).flat()
  } catch (e) {
    console.log(e)
  }
}

const setPageTitle = (val: string) => {
  const paths = val ? val.split('/').filter((e: string) => e) : []
  const currCoulmn = flatColumns.value.find((e) => paths.includes(e.url))
  pageTitle.value = currCoulmn ? currCoulmn.name : ''
}

watch(() => route.path, (val: string) => {
  setPageTitle(val)
})

setPageTitle(route.path)

await initSettings()
await initColumns()

useHead(metaConfig.value)

onMounted(() => {
  if (!$db.get('avatar')) {
    $db.set('avatar', parseInt(String(Math.random() * 45)))
  }
  $db.set('entryTime', new Date().getTime())
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
