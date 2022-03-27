<script lang="ts" setup>

interface Props {
  data: any[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const tags = ref(props.data)

watch(() => props.data, (res: any[]) => {
  tags.value = res
})

const tagsBoxRef = ref()
const tagsItemRef = []

const CX = ref(0)
const CY = ref(0)
const EX = ref(0)
const EY = ref(0)
const fallLength = ref(0)
const radius = ref(0)
const angleX =  ref(0)
const angleY = ref(0)

const setTagsItemRefs = (el: any) => {
  el && tagsItemRef.push(el)
}

class Tag {
  ele: any
  x: number
  y: number
  z: number
  constructor(ele: any, x: number, y: number, z: number) {
    this.ele = ele
    this.x = x
    this.y = y
    this.z = z
  }
  move() {
    const scale = fallLength.value / (fallLength.value - this.z)
    const alpha = (this.z + radius.value) / (2 * radius.value)
    const left = this.x + CX.value - this.ele.offsetWidth / 2 + 'px'
    const top = this.y + CY.value - this.ele.offsetHeight / 2 + 'px'
    const transform = `translate(${left}, ${top}) scale(${scale})`
    this.ele.style.opacity = alpha + 0.5
    this.ele.style.zIndex = parseInt(String(scale * 100))
    this.ele.style.transform = transform
    this.ele.style.webkitTransform = transform
  }
}

const rotateX = () => {
  const cos = Math.cos(angleX.value)
  const sin = Math.sin(angleX.value)
  tags.value = tags.value.map((e: any) => {
    const y1 = e.tag.y * cos - e.tag.z * sin
    const z1 = e.tag.z * cos + e.tag.y * sin
    e.tag.y = y1
    e.tag.z = z1
    return e
  })
}

const rotateY = () => {
  const cos = Math.cos(angleY.value)
  const sin = Math.sin(angleY.value)
  tags.value = tags.value.map((e: any) => {
    const x1 = e.tag.x * cos - e.tag.z * sin
    const z1 = e.tag.z * cos + e.tag.x * sin
    e.tag.x = x1
    e.tag.z = z1
    return e
  })
}

const animate = () => {
  rotateX()
  rotateY()
  tags.value.forEach((e: any) => {
    e.tag.move()
  })
  requestAnimationFrame(animate)
}

const onBoxMousemove = (event: any) => {
  const x = event.clientX - EX.value - CX.value
  const y = event.clientY - EY.value - CY.value
  angleY.value = x * 0.000001
  angleX.value = y * 0.000001
}

const onBoxMouseout = (event: any) => {
  const x = event.clientX - EX.value - CX.value
  const y = event.clientY - EY.value - CY.value
  angleY.value = x * 0.00001
  angleX.value = y * 0.00001
}

const setRandomColor = () => parseInt(String(Math.random() * 255))

const init = () => {
  const { offsetWidth, offsetLeft, offsetTop } = tagsBoxRef.value
  const len = tags.value.length
  const offsetHeight = offsetWidth / 1.5

  tagsBoxRef.value.style.height = offsetHeight + 'px'
  tagsBoxRef.value.style.position = 'reactive'

  radius.value = offsetHeight / 2
  fallLength.value = offsetWidth
  angleX.value = Math.PI / (offsetWidth * 2)
  angleY.value = Math.PI / (offsetWidth * 2)

  CX.value = offsetWidth / 2
  CY.value = offsetHeight / 2
  EX.value = offsetLeft
  EY.value = offsetTop

  for (var i = 0; i < len; i++) {
    const k = -1 + (2 * (i + 1) - 1) / len
    const a = Math.acos(k)
    const b = a * Math.sqrt(len * Math.PI)
    const x = radius.value * Math.sin(a) * Math.cos(b)
    const y = radius.value * Math.sin(a) * Math.sin(b)
    const z = radius.value * Math.cos(a)
    const tag = new Tag(tagsItemRef[i], x, y, z)

    tagsItemRef[i].style.position = 'absolute'
    tagsItemRef[i].style.color = `rgb(${setRandomColor()},${setRandomColor()},${setRandomColor()})`

    tags.value[i].tag = tag
    tag.move()
  }

  animate()
}

onMounted(() => init())

</script>

<template>
  <div
    ref="tagsBoxRef"
    class="tags-wrap"
    @mouseover="onBoxMousemove"
    @mouseout="onBoxMouseout"
  >
    <a
      v-for="(item, index) in tags"
      :index="index"
      :ref="setTagsItemRefs"
      class="tags-item"
    >
      <slot name="item" :item="item"></slot>
    </a>
  </div>
</template>

<style lang="less" scoped>
.tags-wrap {
  .tags-item {
    cursor: pointer;
    &:hover {
      filter: brightness(90%);
    }
  }
}
</style>