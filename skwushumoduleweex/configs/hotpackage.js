/*
 * @Author: yaoyongping
 * @Date: 2021-09-10 10:26:49
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-11-18 17:25:26
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */

const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

const tempFilePath = path.resolve(__dirname, './.temp_pagckage_file')
const removeTempPackageFile = function () {
    if (fs.existsSync(tempFilePath)) {
        shell.rm('-f',tempFilePath)
    }
}

const parseHotPackageFiles = function (fileStr) {
    try {
        // 移除临时文件夹
        removeTempPackageFile()

        if (!fileStr) {
            return
        }
        const fileListStr = fileStr // 'home/TCHomePage,BookTicket/GoodsChooseShop/GoodsChooseShopList'
        const fileList = fileListStr.split(',').filter((fileName) => {
            return typeof (fileName) === "string" && fileName.trim().length > 0
        })
        fs.writeFileSync(tempFilePath, JSON.stringify(fileList), {
            encoding: 'utf-8'
        })
    } catch (error) {
        throw error
    }
}

const getPackageFiles = function (allFiles) {
    try {
        if (fs.existsSync(tempFilePath)) {
            const tempContent = fs.readFileSync(tempFilePath, {
                encoding: 'utf-8'
            })
            const fileList = JSON.parse(tempContent)
            const result = {}
            fileList.forEach(fileName => {
                const fileInfo = allFiles[fileName]
                if (fileInfo) {
                    result[fileName] = fileInfo
                }
            });
            // 删除临时文件，防止对其它内容形成干扰
            removeTempPackageFile()
            return result
        }
    } catch (error) {
        throw error
    }

    return allFiles
}

module.exports = {
    getPackageFiles: getPackageFiles,
    parseHotPackageFiles: parseHotPackageFiles
}