import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

export default new class column extends Http {


  /**
   * 获取首页栏目， 栏目列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  getList(params?: ListConfig) {
    return this.get('/app/v1/column', params)
  }

  /**
   * 获取栏目详情
   * @param { Number } id 栏目id
   */
  getDetail(id: number) {
    return this.get('/app/v1/column/' + id)
  }
}