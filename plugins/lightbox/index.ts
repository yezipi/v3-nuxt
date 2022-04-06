import Lightbox from './index.vue'

interface LightboxProps {
  tips?: string,
  visible?: boolean,
  urlKey?: string,
  id?: string,
  current: string,
  rows: any[],
}

// 插件注册
import { createVNode, render } from 'vue'

const Ele = function(props: LightboxProps) {

  if (process.client) {
    let container = undefined
    let vm = undefined
    const id = 'yzp-lightbox'
    const div =  document.querySelector('#' + id)

    if (!div) {
      container = document.createElement('div')
      container.id = id
      vm = createVNode(Lightbox,  { id, el: container, ...props })
      render(vm, container)
    }

    document.body.appendChild(container)
  }

}

export default {

  preview(current: string, rows: any[], urlKey: string) {
    Ele({ current, visible: true, rows, urlKey })
  },

}