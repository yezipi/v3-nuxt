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

class scrollAnimation {
  timer: any
  inter: any
  index: number
  constructor() {
    this.timer = undefined
    this.inter = undefined
    this.index = 0
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
  start(params: ScrollConfig) {
    const {
      list = [],
      duration = 300,
      interval = 3000,
      reverse = false,
      intervalChange = () => {},
      durationChange = () => {},
    } = params

    let arr = list

    clearInterval(this.inter)
    clearTimeout(this.timer)

    if (!arr.length || arr.length < 2) {
      return
    }

    this.inter = setInterval(() => {
      if (this.index === arr.length) {
        this.index = 0
      }

      intervalChange(this.index)

      this.timer = setTimeout(() => {
        // 每滚动一次后把这条数据插入到最后面,并清除class, 否则把这条数据插入到最前面
        if (reverse) {
          arr.unshift(arr.pop())
        } else {
          arr.push(arr.shift())
        }
        durationChange(this.index)
        clearTimeout(this.timer)
      }, duration)

      this.index ++

    }, interval)
  }
  
  stop() {
    clearInterval(this.inter)
    clearTimeout(this.timer)
  }
  
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

/**
 * @name 本地存储方法
 */
 const db = {
  set: (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify({ type: typeof data, data }))
  },

  get: (key: string) => {
    const str = localStorage.getItem(key)
    if (!str) {
      return str
    }
    try {
      const data = JSON.parse(str)
      return data.data
    } catch(e) {}
  },

  del: (key: string) => localStorage.removeItem(key)
}

/**
 * 替换表情符号
 * @param { String } str 内容
 */
const replaceFace = (str: string) => {
  let constent = str
  constent = constent.replace(/\[tieba_([0-9]*)\]/g, `<img class="yzp-face-replace" src="/public/face/tieba/$1.png"/>`)
  constent = constent.replace(/\[sina_([0-9]*)\]/g, `<img class="yzp-face-replace" src="/public/face/sina/$1.png"/>`)
  constent = constent.replace(/\[qq_([0-9]*)\]/g, `<img class="yzp-face-replace" src="/public/face/qq/$1.gif"/>`)
  return constent
}

/**
 * 24小时内的显示为最新
 */
const isNewest = (time: any) => {
  const oneDayMs = 24 * 60 * 60 * 1000
  const viewTimeMs = new Date(time).getTime() + oneDayMs // 这个就是24小时过期的时间
  const nowMs = new Date().getTime()
  const isValid = (viewTimeMs - nowMs) / oneDayMs
  return isValid >= 0
}
 
export {
  scrollAnimation,
  db,
  setAticleLink,
  setRandomTag,
  timeAgao,
  replaceFace,
  isNewest,
}