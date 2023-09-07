export const defineProp = {
  modelValue: {
    type: [String, Number, Array]
  },
  // 下拉框组件数据源头
  optionsSource: {
    type: Array as unknown as any[],
    defalult: () => []
  },
  // 传入的option数组汇总，要作为显示项的键值key
  valueKey: {
    type: String,
    default: 'key'
  },
  // 传入的option数组汇总，要作为显示项的键值名称
  labelKey: {
    type: String,
    default: 'label'
  },
  // 传入的option数组汇总，要作为显示项的key
  key: {
    type: String,
    default: 'id'
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false
  },
  // 选择框宽度
  width: {
    type: String
  }
}
