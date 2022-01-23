import dayjs from 'dayjs'

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

/**
 * 时间格式化，多少秒，多少分钟前
 * @param { Date } time 日期对象及格式
 * @param { Boolean } showMM 是否显示分钟
 * @version 2021-01-14 zzc
 */
 const timeAgao = (time: any, showMM?: boolean) => {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  // const halfamonth = day * 15
  const month = day * 30
  const dateTimeStamp = Date.parse(time)
  const now = new Date().getTime()
  const diffValue = now - dateTimeStamp
  let result = ''
  if (diffValue < 0) {
    return
  }
  const monthC = diffValue / month
  // console.log(monthC)
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  if (monthC >1) {
    result = dayjs(time).format(showMM ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD')
  } else if (weekC >= 1) {
    result = `${parseInt(String(weekC))}周前`
  } else if (dayC >= 1) {
    result = `${parseInt(String(dayC))}天前`
  } else if (hourC >= 1) {
    result = `${parseInt(String(hourC))}小时前`
  } else if (minC >= 1) {
    result = `${parseInt(String(minC))}分钟前`
  } else result = '刚刚'
  return result
}

/**
 * 随机标签颜色
 */
const setRandomTag = () => {
  const arr = [ 'pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple' ]
  const index = parseInt(String(Math.random() * arr.length + 1))
  return arr[index]
}
 
export {
  setScrollAnimation,
  setAticleLink,
  setRandomTag,
  timeAgao,
}