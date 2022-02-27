import Http from '@/utils/http'

export default new class Api extends Http {

  /**
   * 获取栏目
   */
  public getColumns() {
    return this.get('/web/v1/column')
  }

  /**
   * 获取基本设置
   */
  public getBaseSettings() {
    return this.get('/web/v1/settings/base')
  }

  /**
   * 获取轮播图
   */
  public getBanners() {
    return this.get('/web/v1/banner')
  }

  /**
   * 获取热门文章
   */
  public getHotArticle() {
    return this.get('/web/v1/hotArticle')
  }

  /**
   * 获取首页文章， 文章列表
   */
  public getIndexArticle() {
    return this.get('/web/v1/article')
  }

  /**
   * 获取文章详情
   * @param { Number } id 文章id
   */
  public getArticleDetil(id: number) {
    return this.get('/web/v1/article/' + id)
  }

  /**
   * 获取微语
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  public getMoods(params?: { size?: number, page?: number }) {
    return this.get('/web/v1/mood', params)
  }
}