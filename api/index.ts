import Http from '@/utils/http'

interface CommentConfig {
  nickname: string,
  site: string,
  email: string,
  content: string,
  parent_id?: number,
  type: string,
  avatar: string,
}

interface CommentsGetType {
  size?: number,
  page?: number,
  article_id?: number,
  mood_id?: number,
  album_id?: number,
}

interface ArticleListCondition {
  size?: number,
  page?: number,
  subcolumn_id?: number,
  keywords?: string,
  title?: string,
  type?: string,
}

export default new class Api extends Http {

  /**
   * 获取栏目
   */
  public getColumns() {
    return this.get('/app/v1/column')
  }

  /**
   * 获取基本设置
   */
  public getBaseSettings() {
    return this.get('/app/v1/settings/base')
  }

  /**
   * 获取个性化
   */
   public getPersonalizeSettings() {
    return this.get('/app/v1/settings/personalize')
  }

  /**
   * 获取轮播图
   */
  public getBanners() {
    return this.get('/app/v1/banner')
  }

  /**
   * 获取热门文章
   */
  public getHotArticle() {
    return this.get('/app/v1/article/hotView')
  }

  /**
   * 获取首页文章， 文章列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   * @param { Number } params.subcolumn_id 二级分类id
   * @param { String } params.title 文章标题
   * @param { String } params.type 类型
   */
  public getArticles(params?: ArticleListCondition) {
    return this.get('/app/v1/article', params)
  }

  /**
   * 获取文章详情
   * @param { Number } id 文章id
   */
  public getArticleDetil(id: number) {
    return this.get('/app/v1/article/detail/' + id)
  }

  /**
   * 获取微语
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  public getMoods(params?: { size?: number, page?: number }) {
    return this.get('/app/v1/mood', params)
  }

  /**
   * 获取最新评论
   * @param { Object } params
   * @param { Object } params.article_id 文章id
   * @param { Object } params.mood_id 微语id
   * @param { Object } params.album_id 相册id
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  public getComments(params?: CommentsGetType) {
    return this.get('/app/v1/comment', params)
  }

  /**
   * 保存评论
   * @param { Object } params
   * @param { String } params.article_id 上级id,必须
   * @param { String } params.content 内容
   * @param { String } params.nickname 昵称
   * @param { String } params.site 站点
   * @param { String } params.email 邮箱
   * @param { String } params.type 评论文章类型
   * @param { String } params.avatar 头像
   */
  public saveComment(params?: CommentConfig) {
    return this.post('/app/v1/comment', params)
  }

  /**
   * 保存留言
   * @param { Object } params
   * @param { String } params.content 内容
   * @param { String } params.nickname 昵称
   * @param { String } params.site 站点
   * @param { String } params.email 邮箱
   * @param { String } params.type 评论文章类型
   * @param { String } params.avatar 头像
   */
  public saveFeedback(params?: CommentConfig) {
    return this.post('/app/v1/feedback', params)
  }

  /**
   * 获取前5条最多点赞和最多评论的文章
   */
  public getMostLikeAndMostComment() {
    return this.get('/app/v1/article/mostLikeAndMostComment')
  }

  /**
   * 获取标签
   */
  public getTags(params?: { size?: number, page?: number }) {
    return this.get('/app/v1/tags', params)
  }

  /**
   * 获取标签
   */
  public getBlogroll(params?: { size?: number, page?: number, recommend?: number }) {
    return this.get('/app/v1/blogroll', params)
  }

  /**
   * 获取留言列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  public getFeedbacks(params?: { size?: number, page?: number }) {
    return this.get('/app/v1/feedback', params)
  }
}