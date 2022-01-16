/**
 * 设置消息滚动
 * @param { Array } arr 数组
 * @param { Number } duration 动画时长
 * @param { Number } interval 滚动间隔
 * @param { Function } callback 回调
 * @param { Boolean } reverse 是否反向插入
 */
 const setScrollAnimation = (arr: any, duration: number, interval: number, callback: Function, reverse?: boolean) => {
  let counter = 0
  let timer = undefined
  let inter = undefined

  clearTimeout(inter)
  clearTimeout(timer)

  if (!arr.length || arr.length < 2) {
    return
  }

  inter = setInterval(() => {
    if (counter === arr.length) {
      counter = 0
    }

    callback({ isChange: true, index: counter })

    timer = setTimeout(() => {
      const el = arr[counter]
      // 每滚动一次后把这条数据插入到最后面,并清除class, 否则把这条数据插入到最前面
      if (reverse) {
        arr.unshift(arr.pop(el))
      } else {
        arr.push(arr.shift(el))
      }
      callback({ isChange: false, index: counter })
      clearTimeout(timer)
    }, duration)

    counter ++

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