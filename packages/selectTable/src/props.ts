export const defineProp = {
  // 选择值
  value: {
    type: [String, Number, Array]
  },
  // table所需数据
  table: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 表头数据
  columns: {
    type: Array as unknown as any[],
    default: () => []
  },
  // 单选文案
  radioTxt: {
    type: String,
    default: '单选'
  },
  // 是否显示搜索条件
  isShowQuery: {
    type: Boolean,
    default: false
  },
  // 单选框--是否开启点击整行选中
  rowClickRadio: {
    type: Boolean,
    default: true
  },
  // 是否显示首列
  isShowFirstColumn: {
    type: Boolean,
    default: true
  },
  // 是否过滤
  filterable: {
    type: Boolean,
    default: true
  },
  // 是否支持翻页选中
  reserveSelection: {
    type: Boolean,
    default: true
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: false
  },
  // 是否自定义过滤
  filterMethod: {
    type: Function
  },
  // 下拉数据指向的label/value
  keywords: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value'
      }
    }
  },
  // 单选是否开启键盘事件
  isKeyup: {
    type: Boolean,
    default: false
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false
  },
  // table宽度
  tableWidth: {
    type: Number,
    default: 550
  },
  // 设置默认选中项--keywords.value值（单选是String, Number类型；多选时是数组）
  defaultSelectVal: {
    type: [String, Number, Array]
  }
}
