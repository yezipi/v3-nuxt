import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

interface PictureListCondition extends ListConfig {
  album_id?: number,
}

export default new class album extends Http {
  /**
   * 获取相册列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  getList(params?: ListConfig) {
    return this.get('/app/v1/album', params)
  }

 /**
  * 获取相册详情
  * @param { Number } id 相册id
  */
  getDetail(id: number) {
    return this.get('/app/v1/album/' + id)
  }

   /**
   * 获取图片列表
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   * @param { Number } params.album_id 相册id
   */
  getPictures(params?: PictureListCondition) {
    return this.get('/app/v1/picture', params)
  }
}