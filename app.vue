<script lang="ts" setup>
interface ColumnItem {
  name: string,
  id: string,
  alias: string,
  type: string,
  url: string,
  subcolumns: any[]
}

import api from '@/api'

const route = useRoute()
const { provide } = useNuxtApp()

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

// 获取栏目数据
const navData = await api.getColumns()
const personalizeSettings = await api.getPersonalizeSettings()
const baseSettings = await api.getBaseSettings()

columns.value = [ homeRoute, ...toRaw(navData.value) ]
// console.log(columns.value)

// 数组打平
const flatColumns = columns.value.map((e: ColumnItem) => [ e, ...e.subcolumns ]).flat()

const { web_name, web_title, web_description, web_keywords } = baseSettings.value

provide('baseSettings', baseSettings || {})
provide('personalizeSettings', personalizeSettings || {})
provide('columns', columns || [])

const setPageTitle = (val: string) => {
  const paths = val ? val.split('/').filter((e: string) => e) : []
  const currCoulmn = flatColumns.find((e: ColumnItem) => paths.includes(e.url))
  pageTitle.value = currCoulmn ? currCoulmn.name : ''
}

watch(() => route.path, (val: string) => setPageTitle(val))


setPageTitle(route.path)

useMeta({
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
})

onMounted(() => {
  if (!localStorage.getItem('avatar')) {
    localStorage.setItem('avatar', String(parseInt(String(Math.random() * 45))))
  }
  if (personalizeSettings.value.gray) {
    document.body.style.filter = 'grayscale(1)'
  }
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
