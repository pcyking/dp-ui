#!/usr/bin/env node
// 这是命令执行的入口
// 第一行不能忽略：意思是使用node来执行这个文件，并且在/use/bin/env环境变量中找node执行器
import { mainEntry } from './src'

mainEntry()
