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

interface CommentsGetType {
  article_id?: number,
  mood_id?: number,
  album_id?: number,
}

interface ArticleListCondition extends ListConfig {
  column_id?: number,
  subcolumn_id?: number,
  keywords?: string,
  type?: string,
}

interface PictureListCondition extends ListConfig {
  album_id?: number,
}

/**
 * 获取栏目列表
 */
export const useColumns = () => Http.get('/app/v1/column')

/**
 * 获取栏目详情
 * @param { Number } id 文章id
 */
export const useColumnDetail = (id: number) => Http.get('/app/v1/column/' + id)


/**
 * 获取基本设置
 */
export const useBaseSettings = () => Http.get('/app/v1/settings/base')

/**
 * 获取个性化
 */
export const usePersonalizeSettings = () => Http.get('/app/v1/settings/personalize')

/**
 * 获取轮播图
 */
export const useBanners = () => Http.get('/app/v1/banner')

/**
 * 获取热门文章
 */
export const useHotArticle = () => Http.get('/app/v1/article/hotView')

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
export const useArticles = (params?: ArticleListCondition) => Http.get('/app/v1/article', params)

/**
 * 获取文章详情
 * @param { Number } id 文章id
 */
export const useArticleDetil = (id: number) => Http.get('/app/v1/article/detail/' + id)

/**
 * 获取微语列表
 * @param { Object } params
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 */
export const useMoods = (params?: ListConfig) => Http.get('/app/v1/mood', params)

/**
 * 获取微语详情
 * @param { Object } params
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 */
 export const useMoodDetail = (id: number) => Http.get('/app/v1/mood/' + id)

/**
 * 获取最新评论
 * @param { Object } params
 * @param { Object } params.article_id 文章id
 * @param { Object } params.mood_id 微语id
 * @param { Object } params.album_id 相册id
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 */
export const useComments = (params?: CommentsGetType) => Http.get('/app/v1/comment', params)

/**
 * 获取前5条最多点赞和最多评论的文章
 */
export const useMostLikeAndMostComment = () => Http.get('/app/v1/article/mostLikeAndMostComment')

/**
 * 获取标签
 * @param { Object } params
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 */
export const useTags = (params?: ListConfig) => Http.get('/app/v1/tags', params)

/**
 * 获取标签
 */
export const useBlogroll = (params?: { recommend?: number }) => Http.get('/app/v1/blogroll', params)

/**
 * 获取留言列表
 * @param { Object } params
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 */
export const useFeedbacks = (params?: ListConfig) => Http.get('/app/v1/feedback', params)

/**
 * 获取相册列表
 * @param { Object } params
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 */
 export const useAlbums = (params?: ListConfig) => Http.get('/app/v1/album', params)

 /**
 * 获取图片列表
 * @param { Object } params
 * @param { Number } params.size 页数
 * @param { Number } params.page 页码
 * @param { Number } params.album_id 相册id
 */
  export const usePictures = (params?: PictureListCondition) => {
    return Http.get('/app/v1/picture', params)
  }

  /**
  * 获取版本更新记录
  * @param { Object } params
  * @param { Number } params.size 页数
  * @param { Number } params.page 页码
  */
  export const useLogs = (params?: ListConfig) => {
    return Http.get('/app/v1/changeLogs', params)
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
export const saveComment = (params?: CommentConfig) => Http.post('/app/v1/comment', params)

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
export const saveFeedback = (params?: CommentConfig) => Http.post('/app/v1/feedback', params)

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
 export const saveBlogroll = (params?: CommentConfig) => Http.post('/app/v1/blogroll', params)
