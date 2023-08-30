// 用于处理参数为 create 时执行的内容（即创建组件相关的目录文件等）
import inquirer, { QuestionCollection } from 'inquirer'
import { ComponentInfo } from '../domain/component-info'
import { closeLoading, showLoading } from '../util/loading-utils'
import { g, r } from '../util/log-utils'
import { initComponent } from '../service/init-component'
import { initScss } from '../service/init-scss'
import { updateComponentLib } from '../service/update-component-lib'
import { initDoc } from '../service/init-doc'

// 交互提示
const questions: QuestionCollection = [
  {
    name: 'componentName',
    // message: 'Input the component name: ',
    message: '输入创建组件的名字： ',
    default: 'Card'
  },
  {
    name: 'description',
    // message: 'Input the component description: ',
    message: '输入组件的描述: ',
    default: '卡片'
  },
  {
    type: 'list',
    name: 'componentType',
    // message: 'Choose the component type: ',
    message: '选择组件的类型: ',
    choices: [
      'tsx', 'vue'
    ]
  }
]

// 该函数首先根据用户输入，构造 ComponentInfo 对象，然后依次调用引入的四个 service，完成组件创建的全部流程
const createNewComponent = async (componentName: string, description: string, componentType: string) => {
  console.log(componentName, description, componentType)
  showLoading('Generating, please wait...')
  try {
    // 1. 构造 ComponentInfo 对象
    const componentInfo = new ComponentInfo(componentName, description, componentType)
    // 2. 创建组件目录及文件
    await initComponent(componentInfo)
    // 3. 创建样式
    await initScss(componentInfo)
    // 4. 更新组件库入口
    await updateComponentLib(componentInfo)
    // 5. 组件库文档
    initDoc(componentInfo)

    closeLoading()
    g(`component [${componentInfo.lineName} ${componentInfo.zhName}] created done!`)
  } catch (e: any) {
    closeLoading()
    r(e.message)
  }
}

export const createComponent = () => {
  inquirer.prompt(questions).then(({ componentName, description, componentType }) => {
    createNewComponent(componentName, description, componentType)
  })
}
