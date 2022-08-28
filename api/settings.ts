import Http from '@/utils/http'

interface ListConfig {
  size?: number,
  page?: number,
}

export default new class settings extends Http {


  /**
   * 获取基本设置
   */
  getBaseSettings() {
    return this.get('/app/v1/settings/base')
  }

  /**
   * 获取维护设置
   */
   getMaintenanceSettings() {
    return this.get('/app/v1/settings/maintenance')
  }

  /**
   * 获取个性化设置
   */
  getPersonalizeSettings() {
    return this.get('/app/v1/settings/personalize')
  }

  /**
   * 获取黑名单
   */
  getSecuritySettings () {
    return this.get('/app/v1/settings/security')
  }

  /**
   * 获取版本更新记录
   * @param { Object } params
   * @param { Number } params.size 页数
   * @param { Number } params.page 页码
   */
  getChangeLogs (params?: ListConfig) {
    return this.get('/app/v1/changeLogs', params)
  }

}