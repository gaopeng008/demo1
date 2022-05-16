/*
 * @Author: yaoyongping
 * @Date: 2021-11-10 09:52:51
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-11-10 10:02:59
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */

let envConfig = {}
// 通过条件编译获取配置文件
// #!if PACKAGE_ENV==="IDC"
envConfig = require('./idc.config')
// #!elseif PACKAGE_ENV==="GREY"
envConfig = require('./grey.config')
// #!elseif PACKAGE_ENV==="DT"
envConfig = require('./dt.config')
// #!else
envConfig = require('./dev.config')
// #!endif

export default envConfig
