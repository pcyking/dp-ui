import { ComponentInfo } from '../domain/component-info'
import fs from 'fs'
import * as path from 'path'
import { indexTemplate, sfcTemplate, tsxTemplate, typesTemplate } from '../util/template-utils'
import { g } from '../util/log-utils'
import { execCmd } from '../util/cmd-utils'
import { Config } from '../config'

/**
 *修改 package.json ** ：读取 package.json 文件，由于默认生成的 name 属性为 xxx-xx 的形式，
 * 故只需将该字段串替换为 @dp-ui/xxx-xx 的形式即可，最后将替换后的结果重新写入到 package.json
 */
const updatePackageJson = (componentInfo: ComponentInfo) => {
  const { lineName, fullPath, nameWithLib } = componentInfo
  const packageJsonPath = `${fullPath}/package.json`
  if (fs.existsSync(packageJsonPath)) {
    let content = fs.readFileSync(packageJsonPath).toString()
    content = content.replace(lineName, nameWithLib)
    fs.writeFileSync(packageJsonPath, content)
  }
}

/**
 *  创建组件的本体 xxx.vue / xxx.tsx：
 *  根据组件类型（.tsx 或 .vue）读取对应的模板，然后写入到文件中即可
 */

const createSrcIndex = (componentInfo: ComponentInfo) => {
  let content = ''
  if (componentInfo.type === 'vue') {
    content = sfcTemplate(componentInfo.lineNameWithPrefix, componentInfo.lowCamelName)
  } else {
    content = tsxTemplate(componentInfo.lineNameWithPrefix, componentInfo.lowCamelName)
  }
  const fileFullName = `${componentInfo.fullPath}/src/${componentInfo.lineName}.${componentInfo.type}`
  fs.writeFileSync(fileFullName, content)
}

/**
 * 创建 src/types.ts 文件：调用 template-utils.ts 中的函数 typesTemplate 得到模板，再写入文件
 */

const createSrcTypes = (componentInfo: ComponentInfo) => {
  const content = typesTemplate(componentInfo.lowCamelName, componentInfo.upCamelName)
  const fileFullName = `${componentInfo.fullPath}/src/types.ts`
  fs.writeFileSync(fileFullName, content)
}

// 创建 index.ts
const createIndex = (componentInfo: ComponentInfo) => {
  fs.writeFileSync(`${componentInfo.fullPath}/index.ts`, indexTemplate(componentInfo))
}

/**
 * 创建组件目录及文件
 */
export const initComponent = (componentInfo: ComponentInfo) => new Promise((resolve, reject) => {
  if (fs.existsSync(componentInfo.fullPath)) {
    return reject(new Error('组件已存在'))
  }

  // 1. 创建组件根目录
  fs.mkdirSync(componentInfo.fullPath)

  // 2. 使用 pnpm init 初始化 package.json 文件
  execCmd(`cd ${componentInfo.fullPath} && pnpm init`).then(r => {
    // 3. 修改 package.json 的 name 属性
    updatePackageJson(componentInfo)

    // 4. 安装通用工具包 @dp-ui/utils 到依赖中
    execCmd(`cd ${componentInfo.fullPath} && pnpm install @${Config.COMPONENT_LIB_NAME}/utils`)

    // 5. 创建组件 src 目录
    fs.mkdirSync(path.resolve(componentInfo.fullPath, 'src'))

    // 6. 在 src 目录中创建组件本体文件 xxx.tsx 或 xxx.vue
    createSrcIndex(componentInfo)

    // 7.在 src 目录中创建 types.ts 文件
    createSrcTypes(componentInfo)

    // 8. 创建组件入口文件 index.ts
    createIndex(componentInfo)

    g('component init success')

    return resolve(componentInfo)
  }).catch(e => {
    return reject(e)
  })
})
