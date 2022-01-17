interface ScrollConfig {
  list: any[],
  inter?: any,
  duration?: number,
  interval?: number,
  reverse?: boolean,
  intervalChange?: Function,
  durationChange?: Function,
}

/**
 * 设置消息滚动
 * @param { Object } params
 * @param { Array } params.list 数组
 * @param { Number } params.duration 动画时长
 * @param { Number } params.interval 滚动间隔
 * @param { Boolean } params.reverse 是否反向插入
 * @param { Object } params.inter 时间对象
 * @param { Function } params.intervalChange interval结束回调
 * @param { Function } params.durationChange duration结束回调
 * @version 2021-01-17 yzp
 */
const setScrollAnimation = (params: ScrollConfig) => {
  const {
    list = [],
    duration = 300,
    interval = 3000,
    reverse = false,
    intervalChange = () => {},
    durationChange = () => {},
  } = params

  let arr = list
  let index = 0
  let timer = undefined
  let inter = params.inter

  clearTimeout(inter)
  clearTimeout(timer)

  if (!arr.length || arr.length < 2) {
    return
  }

  inter = setInterval(() => {
    if (index === arr.length) {
      index = 0
    }

    intervalChange(index)

    timer = setTimeout(() => {
      // 每滚动一次后把这条数据插入到最后面,并清除class, 否则把这条数据插入到最前面
      if (reverse) {
        arr.unshift(arr.pop())
      } else {
        arr.push(arr.shift())
      }
      durationChange(index)
      clearTimeout(timer)
    }, duration)

    index ++

  }, interval)
}

/**
 * 设置文章跳转链接
 * @param { Number } id 文章id
 * @param { String } type 文章类型
 */
const setAticleLink = (id: number, type: string ) => {
  return type === 'article' ? `/article/detail/${id}` : `/case/detail/${id}`
}

export {
  setScrollAnimation,
  setAticleLink
}