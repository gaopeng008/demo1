/*
 * @Author: yaoyongping
 * @Date: 2020-06-04 14:15:46
 * @LastEditors: yaoyongping
 * @LastEditTime: 2020-06-12 11:46:11
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */
const beforeRquest = (params, options) => {
  console.log(`将要发送请求,params:${JSON.stringify(params)},options:${JSON.stringify(options)}`)
  return true
}

const requestComplete = (params, options, resdata) => {
  console.log(`收到服务器端响应,params:${JSON.stringify(params)},options:${JSON.stringify(options)}`)
  console.log(`响应数据:${JSON.stringify(resdata)}`)

  return {
    errorCode: 0,
    data: {
      'v': '这是被拦截后返回的数据'
    }
  }
}

const mockCallback = (params, options) => {
  return {
    mock: 'mock数据'
  }
}

export default{
  beforeRquest,
  requestComplete,
  mockCallback
}
