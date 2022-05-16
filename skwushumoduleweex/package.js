/*
 * @Author: yaoyongping
 * @Date: 2021-08-17 10:38:19
 * @LastEditors: yaoyongping
 * @LastEditTime: 2021-11-18 16:45:23
 * @Description: file content
 * @company: China Sports Lottery Operation Co.,Ltd.
 */

const path = require('path')
const shell = require('shelljs')
const fs = require('fs')
const _ = require('underscore')
const HotPackage = require('./configs/hotpackage')
const argv = require('yargs').option({
        "n": {
            alias: "bundleName",
            demand: true,
            type: "string",
            describe: "bundle的名称"
        },
        "o": {
            alias: "outputpath",
            demand: false,
            type: "string",
            describe: "bundle的输出目录"
        },
        "e": {
            alias: "env",
            demand: true,
            type: "string",
            describe: "打包环境 生产:idc 测试:dt 灰度:grey 开发:dev"
        },
        "f": {
            alias: "files",
            demand: false,
            type: "string",
            describe: "要打包的weex文件的相对路径集合,通过逗号(,)隔开"
        }
    })
    .usage("Usage: node package.js [options]")
    .example("node package.js -n 'weex budnle的名称' -o 'bundle库的输出路径' -e '环境标识'")
    .help("h")
    .alias("h", "help")
    .epilog(`copyright ticai 2020-${new Date().getFullYear()}`)
    .argv


const execCmd = function (cmd) {
    const promise = new Promise((resolve, reject) => {
        console.log(`执行命令:${cmd}`)
        console.log(`执行命令的目录：${shell.pwd().toString()}`)

        shell.exec(cmd, (code, stdout, stderr) => {
            console.log('命令行执行结果:', code)
            if (code != 0) {
                throw new Error(`执行命令出错:${cmd}`)
            }
            return resolve(code)
        })
    })
    return promise;
}
// 创建目录 兼容相对路径
const createOutputPath = function (inputOutputPath, isCreate = true) {
    const pwd = shell.pwd().toString()
    const result = path.resolve(pwd, inputOutputPath)
    console.log(`创建目录:${result}`)
    if (!fs.existsSync(result)) {
        console.log(`目录不存在:${result}`)
        if (isCreate) {
            shell.mkdir('-p', result)
        }
    }
    return result
}

const packageHandler = async function () {
    const env = argv.e
    const bundleName = argv.n
    const outputPath = argv.o || shell.pwd().toString()
    const files = argv.f || ''
    if (_.isEmpty(bundleName)) {
        throw new Error('请输入包的名称')
    }
    if(_.isEmpty(env)){
        throw new Error('请选择打包环境,生产:idc 测试:dt 灰度:grey 开发:dev')
    }

    HotPackage.parseHotPackageFiles(files)
    
    // 编译结果路径
    const distPath = path.resolve(__dirname, './dist')
    // 输出目录
    const bundleOutput = createOutputPath(path.join(outputPath,'weexBundleOutput')) // path.resolve(__dirname, './output')
    // bundle文件的路径
    const bundlePath = path.resolve(bundleOutput, `./${bundleName}.bundle`)

    let commandText = ''
    switch (env) {
        case 'dt':
            commandText = 'npm run build:dt'
            break;
        case 'grey':
            commandText = 'npm run build:grey'
            break;
        case 'idc':
            commandText = 'npm run build:idc'
            break;
        case 'dev':
            commandText = 'npm run build:dev'
            break;
        default:
            commandText = 'npm run build:idc'
            break;
    }

    if (fs.existsSync(distPath)) {
        shell.rm('-rf', distPath)
    }

    if (fs.existsSync(bundlePath)){
        shell.rm('-rf', bundlePath)
    }

    await execCmd(commandText)

    shell.mv(distPath, bundlePath)

    console.log(`weex 打包完成,文件输出路径为:${bundlePath}`)
    return bundlePath
}

packageHandler()