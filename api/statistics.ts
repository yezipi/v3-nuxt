import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

export default new class statistics extends Http {

  /**
   * 数据统计
   */
  total() {
    return this.get('/app/v1/statistics/total')
  }

  /**
   * 网站点赞
   */
  like() {
    return this.post('/app/v1/statistics/like')
  }
}