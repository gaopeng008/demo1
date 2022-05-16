/*
 * @Author: yaoyongping
 * @Date: 2020-06-02 15:55:06
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-11-10 09:51:03
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */
import BaseAPI from '../skwushumoduleweexBaseAPI'
class DemoAPI extends BaseAPI {
  fetch (userName, pwd) {
    const method = {
      d: 'd',
      c: 'c',
      m: 'm',
      v: 'v'
    }
    const params = {
      method: method,
      params: {
        userId: '1234',
        pwd: '456'
      }
    }

    this.setParams(params)

    return super.fetch()
  }
}

export default DemoAPI
