<!--
 * @Author: yaoyongping
 * @Date: 2021-08-13 17:52:15
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-09-09 14:46:41
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
-->
<template>
  <div>
    <list>
      <template v-for="(section,index) in list">
        <header :key="'section_'+index">
          <text class="header">{{section.title}}</text>
        </header>
        <cell class="cell" v-for="(item,itemIndex) in section.data" :key="'section'+ index +'_cell_' + itemIndex">
          <div class="panel"
            :style='(itemIndex % 2==0)?{backgroundColor:"#fff"}:{backgroundColor:"rgba(162, 217, 192, 0.2)"}'
            @click="testNavigatorHandler(item.index)">
            <text>{{item.text}}</text>
          </div>
        </cell>
      </template>
    </list>

  </div>
</template>

<script>
import d from './data'
import {
  TCWeexAppConfig,
  TCWeexCache,
  TCWeexLocationManager,
  TCWeexDevice,
  TCWeexControllerModule,
  TCWeexAlert
} from '@tc/tcweexbridge'
import DemoAPI from '@/apis/demoApi/demoAPI'
export default {
  data () {
    return {
      list: d.list
    }
  },
  methods: {
    async testNavigatorHandler (index) {
      console.log('点击索引:', index)
      let needLogin = false
      let success = false
      switch (index) {
        case 0:
          this.popViewController()
          break
        case 1:
          this.pushWithActionId('Browser_POP')
          break
        case 2:
          this.pushWithUrl('ticai://ticai?page=Browser_POP', {
            'uid': '19299388383'
          }, false, () => {
            console.log('跳转结束')
          })
          break
        case 3:
          this.pushWithUrl('ticai://ticai?page=membercenter&needLogin=1', {
            'uid': '19299388383'
          }, false, () => {
            console.log('跳转结束')
          })
          break
        case 4:
          const loginStatus = await this.checkUserLoginStatus()
          console.log('当前用户登录态', loginStatus)
          break
        case 5:
          needLogin = await this.checkNeedLoginWithUrl('ticai://ticai?page=browser')
          console.log('当前协议是否需要登录', needLogin)
          break
        case 6:
          needLogin = await this.checkNeedLoginWithActionId('actionId')
          console.log('当前协议是否需要登录', needLogin)
          break
        case 7:
          const openLoginView = await this.showLoginViewControllerWithIdentify('login id ', {
            'data': 'abdkk'
          })
          console.log('登录结果', JSON.stringify(openLoginView))
          break
        case 8:
          const userInfo = await this.fetchAccountInfo()
          console.log('用户信息', JSON.stringify(userInfo))
          break
        case 9:
          const config = await TCWeexAppConfig.appConfig()
          console.log('APP Config:', JSON.stringify(config))
          break
        case 10:
          const cacheData = await TCWeexCache.fetchCacheDataWithKey('key')
          console.log('获取缓存数据:', JSON.stringify(cacheData))
          break
        case 11:
          success = await TCWeexCache.addCacheDataWithKey('key', {
            'data': '被缓存的数据'
          })
          console.log('添加缓存数据结果:', success)
          break
        case 12:
          success = await TCWeexCache.removeCacheDataWithKey('key')
          console.log('删除缓存数据结果', success)
          break
        case 13:
          const locationInfo = await TCWeexLocationManager.getLocationInfo()
          console.log('获取位置信息:', JSON.stringify(locationInfo))
          break
        case 14:
          const convertCoord = await TCWeexLocationManager.convertCoord({
            'latitude': 36.993883,
            'longitude': 116.93889929
          })
          console.log('坐标转换后的结果:', JSON.stringify(convertCoord))
          break
        case 15:
          const appsize = await TCWeexDevice.applicationSize()
          console.log('APP size:', JSON.stringify(appsize))
          break
        case 16:
          const constSize = await TCWeexDevice.constViewSize()
          console.log('APP 常量尺寸:', JSON.stringify(constSize))
          break
        case 17:
          TCWeexControllerModule.addRightButtonItems([{
            'imageUrl': '',
            'selectedImageUrl': '',
            'title': '右侧按钮',
            'titleColor': '#ff0000'
          }], (buttonInfo) => {
            console.log(`点击了按钮,按钮信息为:${JSON.stringify(buttonInfo)}`)
          })
          break
        case 18:
          TCWeexControllerModule.addLeftButtonItems([{
            'imageUrl': '',
            'selectedImageUrl': '',
            'title': '左侧按钮',
            'titleColor': '#00ff00'
          }], (buttonInfo) => {
            console.log(`点击了按钮,按钮信息为:${JSON.stringify(buttonInfo)}`)
          })
          break
        case 19:
          TCWeexControllerModule.removeRightButtonItems()
          break
        case 20:
          TCWeexControllerModule.removeLeftButtonItems()
          break
        case 21:
          TCWeexControllerModule.addRightButtonItems([{
            'imageUrl': 'https://img.icons8.com/emoji/2x/american-football-emoji.png',
            'selectedImageUrl': '',
            'title': '',
            'titleColor': '#000000'
          }], (buttonInfo) => {
            console.log(`点击了按钮,按钮信息为:${JSON.stringify(buttonInfo)}`)
          })
          break
        case 22:
          TCWeexControllerModule.addLeftButtonItems([{
            'imageUrl': 'https://img.icons8.com/emoji/2x/-emoji-heart-balloon.png',
            'selectedImageUrl': '',
            'title': '',
            'titleColor': '#000000'
          }], (buttonInfo) => {
            console.log(`点击了按钮,按钮信息为:${JSON.stringify(buttonInfo)}`)
          })
          break
        case 25: {
          const api = new DemoAPI()
          console.log('loading中')
          const res = await api.fetch()
          console.log('loading 结束')
          console.log('接口响应数据:', JSON.stringify(res))
        }
          break
        case 26:
          const msg = 'toast的内容,3秒后消失'
          TCWeexAlert.toast(msg)
          console.log('toast调用')
          break
        case 27: {
          const msg = 'alert的内容,点击确定消失'
          const result = await TCWeexAlert.alert(msg)
          console.log(`点击了Alert的 ${result} 按钮`)
        }

          break
        case 28: {
          const msg = 'confirm的内容,点击确定或者取消'
          const result = await TCWeexAlert.confirm(msg)
          console.log(`您点击了 ${result} 按钮`)
        }
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
  .header {
    width: 750px;
    padding: 25px;
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: #41B883;
    background-color: rgb(162, 217, 192);
  }

  .cell {
    height: 100px;
    width: 750;
  }

  .panel {
    width: 750px;
    height: 100px;
    justify-content: center;
    /* align-items: center; */
    border-width: 2px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    padding: 10px;
  }
</style>
