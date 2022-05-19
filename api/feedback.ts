import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

interface CommentConfig  extends ListConfig {
  nickname: string,
  site: string,
  email: string,
  content: string,
  parent_id?: number,
  type: string,
  avatar: string,
}

export default new class feedback extends Http {
  /**
   * 获取留言列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  getList(params?: ListConfig) {
    return this.get('/app/v1/feedback', params)
  }

 /**
  * 获取留言详情
  * @param { Number } id 留言id
  */
  getDetail(id: number) {
    return this.get('/app/v1/feedback/' + id)
  }

  /**
   * 保存留言
   * @param { Object } params
   * @param { String } params.content 内容
   * @param { String } params.nickname 昵称
   * @param { String } params.site 站点
   * @param { String } params.email 邮箱
   * @param { String } params.type 留言文章类型
   * @param { String } params.avatar 头像
   */
  save(params?: CommentConfig) {
    return this.post('/app/v1/feedback',params)
  }
}