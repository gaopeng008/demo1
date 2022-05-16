/*
 * @Author: yaoyongping
 * @Date: 2021-09-08 17:28:22
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-11-10 09:50:04
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */
import {
  TCWXAPI
} from '@tc/tcweexbridge'
class BaseAPI extends TCWXAPI {
  constructor () {
    super()
    this.moduleName = 'skwushumoduleweex'
  }
}

export default BaseAPI
