/*
 * @Author: yaoyongping
 * @Date: 2021-08-13 17:31:45
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-09-09 14:48:23
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */
/* eslint-disable */

import App from 'VUE_RELATIVE_PATH'
import {imageMixns,navigatorMixns,userMixns,TCWXConfig,TCNavigatorInterceptor,TCWXGateway} from "@tc/tcweexbridge"
import WeexGatewayInterceptor from '@/interceptors/gatewayIntercepotr'

/*** 当前项目的工程配置 ***/

// 配置跳转引擎回调函数
import navigationInterceptor from "@/interceptors/navigatiorInterceptor"
TCNavigatorInterceptor.beforePushToNextPageCallback = navigationInterceptor.beforePushToNextPageCallback;
TCNavigatorInterceptor.urlOfPopViewControllerCallback = navigationInterceptor.urlOfPopViewControllerCallback;
TCNavigatorInterceptor.urlOfPopToRootViewControllerCallback = navigationInterceptor.urlOfPopToRootViewControllerCallback

// 配置网关回调函数
TCWXGateway.requestCompleteCallback = WeexGatewayInterceptor.requestComplete;
TCWXGateway.beforeRequestCallback = WeexGatewayInterceptor.beforeRquest;

// 配置开发环境需要的内容
// #!if PACKAGE_ENV === "DEV"
console.log('只有开发环境显示Mock数据配置回调')
// 只有开发环境配置mock数据的回调
// TCWXGateway.requestFromMockCallback = WeexGatewayInterceptor.mockCallback;
// #!endif

// 配置静态资源文件路径
TCWXConfig.getInstance().assetsDomain = "http://192.168.29.148/assets/images";

/** 当前项目工程配置结束 */

Vue.mixin(navigatorMixns);
Vue.mixin(userMixns);
Vue.mixin(imageMixns);

App.el = '#root'
new Vue(App)
