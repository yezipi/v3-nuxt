import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

interface ArticleListCondition extends ListConfig {
  column_id?: number,
  subcolumn_id?: number,
  keywords?: string,
  type?: string,
}

export default new class article extends Http {

  /**
   * 获取热门文章
   */
  getHot() {
    return this.get('/app/v1/article/hotView')
  }

  /**
   * 获取首页文章， 文章列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   * @param { Number } params.column_id 一级级分类id
   * @param { Number } params.subcolumn_id 二级分类id
   * @param { String } params.keywords 关键词
   * @param { String } params.type 类型
   */
  getList(params?: ArticleListCondition) {
    return this.get('/app/v1/article', params)
  }

  /**
   * 获取文章详情
   * @param { Number } id 文章id
   */
  getDetail(id: number) {
    return this.get('/app/v1/article/detail/' + id)
  }

  /**
   * 获取前5条最多点赞和最多评论的文章
   */
  getMostLikeAndMostComment() {
    return this.get('/app/v1/article/mostLikeAndMostComment')
  }

  /**
   * 获取轮播图
   */
   getBanners() {
    return this.get('/app/v1/banner')
  }

  /**
   * 获取标签
   */
  getTags(params?: ListConfig) {
    return this.get('/app/v1/tags', params)
  }

  /**
   * 查看加密文章
   * @param { Object } params params
   * @param { Number } params.id 文章id
   * @param { Number } params.password 文章密码
   */
  unlock(params?: { id: any, password: any }) {
    return this.post('/app/v1/article/unlock', params)
  }

  /**
   * 文章点赞
   * @param { Object } params params
   * @param { Number } params.id 文章id
   */
  like(params?: { id: any }) {
    return this.post('/app/v1/article/like', params)
  }
}