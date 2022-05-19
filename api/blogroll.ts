import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
  recommend?: number,
}

interface BlogrollConfig  extends ListConfig {
  nickname: string,
  site: string,
  email: string,
  content: string,
  parent_id?: number,
  type: string,
  avatar: string,
}

export default new class blogroll extends Http {
  /**
   * 获取友链列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  getList(params?: ListConfig) {
    return this.get('/app/v1/blogroll', params)
  }

 /**
  * 获取友链详情
  * @param { Number } id 友链id
  */
  getDetail(id: number) {
    return this.get('/app/v1/blogroll/' + id)
  }

  /**
   * 保存友链
   * @param { Object } params
   * @param { String } params.content 内容
   * @param { String } params.nickname 昵称
   * @param { String } params.site 站点
   * @param { String } params.email 邮箱
   * @param { String } params.type 评论文章类型
   * @param { String } params.avatar 头像
   */
  save(params?: BlogrollConfig) {
    return this.post('/app/v1/blogroll',params)
  }
}