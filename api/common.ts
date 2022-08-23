import Http from '@/utils/http'

export default new class Common extends Http {

  /**
   * 获取验证码
   * @param { Number } timestamp 时间戳
   */
   getVerifyCode(timestamp?: number) {
    return this.get('/app/v1/common/getVerifyCode', { timestamp })
  }

  /**
   * 获取表情
   */
   getFace() {
    return this.get('/app/v1/common/getFace')
  }
}