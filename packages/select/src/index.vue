<template>
  <el-select popper-class="dp_select"
  :style="{ width: width || '100%' }"
  v-model="selectedValue"
  v-bind="{ clearable: true,filterable: true, ...$attrs }"
  :multiple="multiple"
    @change="selectChange">
    <el-checkbox v-if="multiple" v-model="selectChecked" @change="selectAll" class="all_checkbox">全选</el-checkbox>
    <el-option v-for="(item, index) in optionsSource" :key="item[key] || index + 'i'" :label="item[labelKey]"
      :value="item[valueKey]" />
  </el-select>
</template>
<script setup lang="ts" name="DpSelect">
import { computed, ref } from 'vue'
import { defineProp } from './props'

const props = defineProps({
  ...defineProp
})
const emits = defineEmits(['update:modelValue'])

// vue3 v-model 简写
const selectedValue: any = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emits('update:modelValue', val)
  }
})

// 设置全选
const selectChecked: any = ref(false)

const selectChange = (val: any) => {
  if (props.multiple) {
    selectChecked.value = val.length === props.optionsSource.length
  }
}
// 点击全选
const selectAll = (val: any) => {
  const options = JSON.parse(JSON.stringify(props.optionsSource))
  if (val) {
    const selectedAllValue = options.map((item: { [x: string]: any; }) => {
      return item[props.valueKey]
    })
    emits('update:modelValue', selectedAllValue)
  } else {
    emits('update:modelValue', null)
  }
}

</script>
<style lang="scss" scoped>
.dp_select {
  .el-select-dropdown {
    .all_checkbox {
      padding-left: 20px;
      width: 100%;
    }
  }
}
// select 抖动问题
:deep(.el-tag--small) {
  height: 21px !important;
}
</style>
