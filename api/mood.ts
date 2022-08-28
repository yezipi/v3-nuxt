import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

export default new class mood extends Http {


  /**
   * 获取首页微语， 微语列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  getList(params?: ListConfig) {
    return this.get('/app/v1/mood', params)
  }

  /**
   * 获取微语详情
   * @param { Number } id 微语id
   */
  getDetail(id: number) {
    return this.get('/app/v1/mood/' + id)
  }

  /**
   * 微语点赞
   * @param { Object } params params
   * @param { Number } params.id 微语id
   * @param { Number } params.like 微语点赞数
   */
  like(params?: { id: any, like: number }) {
    return this.post('/app/v1/mood/like', params)
  }
}