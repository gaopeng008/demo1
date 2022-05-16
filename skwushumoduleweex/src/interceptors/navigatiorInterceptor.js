/*
 * @Author: yaoyongping
 * @Date: 2020-05-06 13:13:46
 * @LastEditors: yaoyongping
 * @LastEditTime: 2020-06-29 16:50:59
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */
const beforePushToNextPageCallback = (url, info, done) => {
  return true
}

const urlOfPopToRootViewControllerCallback = () => {
  return 'ticai://ticai?page=poptoroot'
}

const urlOfPopViewControllerCallback = () => {
  return 'ticai://ticai?page=poptoback'
}

export default {
  beforePushToNextPageCallback,
  urlOfPopToRootViewControllerCallback,
  urlOfPopViewControllerCallback
}
