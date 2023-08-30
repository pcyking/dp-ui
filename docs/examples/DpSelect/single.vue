<template>
    <DpSelect
      valueKey="value"
      v-model="selectedValue"
      :optionsSource="stepList"
      placeholder="请选择"
      width="200px"
      @change="selectChange"
    ></DpSelect>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const selectedValue = ref<any>()
const stepList = [
  {
    label: 'label1',
    value: 'value1'
  },
  {
    label: 'label2',
    value: 'value2'
  },
  {
    label: 'label3',
    value: 'value3'
  }
]
const selectChange = (val:any) => {
  console.log(val)
}
</script>
