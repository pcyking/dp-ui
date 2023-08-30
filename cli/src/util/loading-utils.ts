// 在命令行中创建组件时需要有 loading 效果，该文件使用 ora 库，提供显示 loading 和关闭 loading 的函数
import ora from 'ora'

let spinner: ora.Ora | null = null

export const showLoading = (msg: string) => {
  spinner = ora(msg).start()
}

export const closeLoading = () => {
  if (spinner != null) {
    spinner.stop()
  }
}
