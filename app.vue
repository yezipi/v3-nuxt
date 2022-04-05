<script lang="ts" setup>

interface ColumnItem {
  name: string,
  id: string,
  alias: string,
  type: string,
  url: string,
  subcolumns: any[]
}

const route = useRoute()
const { provide, $db } = useNuxtApp()

const columns = ref<Array<ColumnItem>>([])
const pageTitle = ref('')

const homeRoute = {
  name: '首页',
  id: '',
  alias: '',
  type: 'home',
  url: '',
  subcolumns: []
}

const personalizeSettings = await usePersonalizeSettings()
const baseSettings = await useBaseSettings()
const { web_name, web_title, web_description, web_keywords } = baseSettings.value

const custome: any = personalizeSettings ? personalizeSettings.value : {}

const metaConfig = {
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
    style: custome.gray ? 'filter: grayscale(1)' : ''
  },
  bodyAttrs: {
    class: custome.style,
    style: `background-image: url(${custome.background})`
  },
  link: [] as any
}

if (custome.style !== 'simple') {
  metaConfig.link.push({
    hid: 'theme',
    id: 'theme',
    rel: 'stylesheet',
    href: `/css/theme/${custome.style}.css`
  })
}

useMeta(metaConfig)

// 获取栏目数据
const navData = await useColumns()
columns.value = [ homeRoute, ...navData.value ]

// 数组打平
const flatColumns = columns.value.map((e: ColumnItem) => [ e, ...e.subcolumns ]).flat()

provide('baseSettings', baseSettings || {})
provide('personalizeSettings', personalizeSettings || {})
provide('columns', columns || [])
provide('flatColumns', flatColumns || [])

const setPageTitle = (val: string) => {
  const paths = val ? val.split('/').filter((e: string) => e) : []
  const currCoulmn = flatColumns.find((e: ColumnItem) => paths.includes(e.url))
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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
