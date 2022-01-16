import Http from '@/utils/http'

export default new class Api extends Http {

  public getColumns() {
    return this.get('/web/v1/column')
  }

  public getBaseSettings() {
    return this.get('/web/v1/settings/base')
  }

  public getBanners() {
    return this.get('/web/v1/banner')
  }

  public getHotArticle() {
    return this.get('/web/v1/hotArticle')
  }

  public getIndexArticle() {
    return this.get('/web/v1/article')
  }
}