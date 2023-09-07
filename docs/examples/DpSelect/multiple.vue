<template>
    <dp-select
      valueKey="value"
      v-model="selectedValue"
      :optionsSource="stepList"
      placeholder="请选择"
      :multiple="true"
      @change="selectChange"
    ></dp-select>
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
