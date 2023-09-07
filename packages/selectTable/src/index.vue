<template>
  <el-select ref="selectRef" v-model="state.defaultValue"
  :multiple="multiple"
  v-bind="selectAttr"
  :value-key="keywords.value"
  @visible-change="visibleChange"
  :filterable="filterable"
    :filter-method="filterMethod || filterMethodHandle"
    @remove-tag="removeTag"
  popper-class="t-select-table">
    <template #empty>
      <div class="t-table-select__table" :style="{ width: `${tableWidth}px` }">
        <el-table ref="selectTable"
          :data="state.tableData"
          v-bind="$attrs"
          highlight-current-row
          border
          :row-key="getRowKey"
          :class="{
            radioStyle: !multiple
          }"
          @row-click="rowClick"
          @selection-change="handlesSelectionChange"
        >
          <el-table-column v-if="multiple" type="selection" width="55" :reserve-selection="reserveSelection"
            fixed>
          </el-table-column>
          <el-table-column
          type="radio"
          width="80"
          :label="radioTxt"
          align="center"
          fixed
          v-if="!multiple && isShowFirstColumn"
          >
            <template #default="scope">
              <el-radio
                v-model="radioVal"
                :label="scope.$index + 1"
                @click.stop="
                  radioChangeHandle($event, scope.row, scope.$index + 1)
                "
              ></el-radio>
            </template>
          </el-table-column>

          <el-table-column v-for="(item, index) in columns" :key="index + 'i'" :type="item.type" :label="item.label"
            :prop="item.prop" :min-width="item['min-width'] || item.minWidth || item.width" :align="item.align || 'center'"
            :fixed="item.fixed" :show-overflow-tooltip="item.noShowTip" v-bind="{ ...item.bind, ...$attrs }">
            <template #default="scope">
              <!-- render方式 -->
              <template v-if="item.render">
                <render-col :column="item" :row="scope.row" :render="item.render" :index="scope.$index" />
              </template>
              <!-- 作用域插槽 -->
              <template v-if="item.slotName">
                <slot :name="item.slotName" :scope="scope"></slot>
              </template>
              <div v-if="!item.render && !item.slotName">
                <span>{{ scope.row[item.prop] }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </el-select>
</template>
<script setup lang="ts">
import { reactive, ref, computed, useAttrs, watch, nextTick } from 'vue'
import { defineProp } from './props'
const props = defineProps({
  ...defineProp
})

const state: any = reactive({
  tableData: props.table.data, // table数据
  defaultValue: props.value,
  ids: [], // 多选id集合
  tabularMap: {} // 存储下拉tale的所有name
})

// 获取ref
const selectRef: any = ref<HTMLElement | null>(null)
const selectTable: any = ref<HTMLElement | null>(null)
const radioVal = ref('')
const isDefaultSelectVal = ref(true) // 是否已经重新选择了
const forbidden = ref(true) // 判断单选选中及取消选中
watch(
  () => props.table.data,
  (val) => {
    // console.log(111, val)
    state.tableData = val
    nextTick(() => {
      state.tableData &&
        state.tableData.length > 0 &&
        state.tableData.forEach((item) => {
          state.tabularMap[item[props.keywords.value]] =
            item[props.keywords.label]
        })
      findLabel()
    })
  },
  { deep: true }
)

watch(
  () => props.value,
  (val) => {
    // console.log(111, val)
    state.tableData = val
    nextTick(() => {
      // 多选
      if (props.multiple) {
        state.defaultValue = Array.isArray(props.value)
          ? props.value
          : typeof props.value === 'string'
            ? props.value.split(',')
            : []
        state.defaultValue = (state.defaultValue || []).map((item) => {
          return item
        })
      } else {
        state.defaultValue = props.value
          ? { [props.keywords.value]: props.value }
          : ''
      }
      findLabel()
    })
  },
  { deep: true }
)
const selectAttr = computed(() => {
  return {
    clearable: true,
    ...useAttrs()
  }
})

// 点击单选框单元格触发事件
const radioChangeHandle = (event, row, index) => {
  event.preventDefault()
  isDefaultSelectVal.value = false
  radioClick(row, index)
}

const rowClick = async (row) => {
  if (!props.rowClickRadio) return
  if (!props.multiple) {
    let rowIndex
    props.table?.data.forEach((item, index) => {
      if (item[props.keywords.value] === row[props.keywords.value]) {
        rowIndex = index
      }
    })
    isDefaultSelectVal.value = false
    await radioClick(row, rowIndex + 1)
    // if(radioVal.value) {
    //   isRadio.value = true
    // }
  }
}

// 单选抛出事件radioChange
const radioClick = (row, index) => {
  forbidden.value = !!forbidden.value
  console.log(radioVal.value, index)

  if (radioVal.value) {
    if (radioVal.value === index) {
      radioVal.value = ''
      isForbidden()
      state.defaultValue = {}
      emits('radioChange', {}, null) // 取消勾选就把回传数据清除
      blur()
    } else {
      isForbidden()
      radioVal.value = index
      state.defaultValue = row
      emits('radioChange', row, row[props.keywords.value])
      blur()
    }
  } else {
    isForbidden()
    radioVal.value = index
    state.defaultValue = row
    emits('radioChange', row, row[props.keywords.value])
    blur()
  }
}

// forbidden取值
const isForbidden = () => {
  forbidden.value = false
  setTimeout(() => {
    forbidden.value = true
  }, 0)
}

// 赋值
const findLabel = () => {
  nextTick(() => {
    if (props.multiple) {
      // if (selectRef.value) {
      selectRef.value.selected?.forEach((item) => {
        item.currentLabel = item.value
        // this.tableData.map(val => {
        //   if (val[this.keywords.label] === item.value) {
        //     item.value = val[this.keywords.value]
        //   }
        // })
      })
      // }
    } else {
      // if (selectRef.value) {
      selectRef.value.selectedLabel =
        (state.defaultValue && state.defaultValue[props.keywords.label]) || ''
      // }
      blur()
    }
  })
}

// 表格显示隐藏回调
const visibleChange = (visible) => {
  // console.log('表格显示隐藏回调', visible)
  if (visible) {
    if (props.defaultSelectVal && isDefaultSelectVal.value) {
      defaultSelect(props.defaultSelectVal)
    }
    initTableData()
  } else {
    findLabel()
    filterMethodHandle('')
  }
}

// 默认选中（且只能默认选中第一页的数据）
const defaultSelect = (defaultSelectVal) => {
  if (typeof defaultSelectVal === 'object' && props.multiple) {
    const multipleList: any = []
    // eslint-disable-next-line array-callback-return
    defaultSelectVal.map((val) => {
      state.tableData.forEach((row: any) => {
        if (val === row[props.keywords.value]) {
          multipleList.push(row)
        }
      })
    })
    setTimeout(() => {
      state.defaultValue = multipleList.map(
        (item) => item[props.keywords.label]
      )
      multipleList.forEach((row) => {
        const arr = state.tableData.filter(
          (item) => item[props.keywords.value] === row[props.keywords.value]
        )
        if (arr.length > 0) {
          selectTable.value.toggleRowSelection(arr[0], true)
        }
      })
      selectRef.value.selected.forEach((item) => {
        item.currentLabel = item.value
      })
    }, 0)
  } else {
    let row, index
    // eslint-disable-next-line array-callback-return
    state.tableData.map((val, i) => {
      if (val[props.keywords.value] === defaultSelectVal) {
        row = val
        index = i
      }
    })
    radioVal.value = index + 1
    state.defaultValue = row
    setTimeout(() => {
      selectRef.value.selectedLabel = row[props.keywords.label]
    }, 0)
  }
}

// 复选框(多选)
const handlesSelectionChange = (val) => {
  // console.log('复选框', val)
  isDefaultSelectVal.value = false
  state.defaultValue = val.map((item) => item[props.keywords.label])
  state.ids = val.map((item) => item[props.keywords.value])
  emits('selectionChange', val, state.ids)
}

// 搜索后表格勾选不取消
const getRowKey = (row) => {
  return row[props.keywords.value]
}

// 获取表格数据
const initTableData = () => {
  // 表格默认赋值
  nextTick(() => {
    if (props.multiple) {
      state.defaultValue.forEach((row) => {
        const arr = state.tableData.filter(
          (item) => item[props.keywords.value] === row[props.keywords.value]
        )
        if (arr.length > 0) {
          selectTable.value.toggleRowSelection(arr[0], true)
        }
      })
    } else {
      const arr = state.tableData.filter(
        (item) =>
          item[props.keywords.value] === state.defaultValue &&
          state.defaultValue[props.keywords.value]
      )
      selectTable.value.setCurrentRow(arr[0])
    }
  })
}

// 搜索过滤
const filterMethodHandle = (val) => {
  if (!props.filterable) return
  const tableData = JSON.parse(JSON.stringify(props.table?.data))
  if (tableData && tableData.length > 0) {
    // eslint-disable-next-line array-callback-return
    state.tableData = tableData.filter((item) => {
      if (item[props.keywords.label].includes(val)) {
        return item
      }
    })
  }
}
// tags删除后回调
const removeTag = (tag) => {
  const row = state.tableData.find((item) => item[props.keywords.label] === tag)
  selectTable.value.toggleRowSelection(row, false)
}

// 触发select隐藏
const blur = () => {
  selectRef.value.blur()
}
// 触发select显示
const focus = () => {
  selectRef.value.focus()
}
// 暴露方法出去
defineExpose({ focus, blur })

const emits = defineEmits(['page-change', 'selectionChange', 'radioChange'])

</script>
<style lang="scss">
.t-select-table {
  .el-table__cell {
    text-align: center;
  }

  // 单选样式
  .radioStyle {
    .el-table__cell {
      text-align: center;
    }

    .el-radio {
      .el-radio__label {
        display: none;
      }

      &:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
        box-shadow: none;
      }
    }
    .el-table__row {
      cursor: pointer;
    }
  }
  // 键盘事件开启选择高亮
  .keyUpStyle {
    .el-table__body {
      tbody {
        .current-row {
          color: var(--el-color-primary) !important;
          cursor: pointer;
        }
      }
    }
  }
  // 选中行样式
  .highlightCurrentRow {
    :deep(.current-row) {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
  .t-table-select__table {
    padding: 10px;

    .el-table__body,
    .el-table__header {
      margin: 0;
    }
    // 条件查询组件样式
    .table_query_condition {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 10px;
    }
  }

  .t-table-select__page {
    padding-top: 5px;

    .el-pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: calc(2% - 20px);
      background-color: var(--el-table-tr-bg-color);
    }
  }
}

</style>
