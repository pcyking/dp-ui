<template>
  <h1>欢迎vite+vue3+ts+pinia+element-plus+qiankun项目</h1>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <div>
      <DpSelect       valueKey="value"
      v-model="selectedValue"
      :optionsSource="stepList"
      placeholder="请选择"
      :multiple="true"
      @change="selectChange"></DpSelect>
    </div>
  </el-row>
</template>
<script lang="ts" setup name="home">
import { onMounted, ref } from 'vue'
onMounted(() => {
  console.log('===')
})
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

<style lang="scss" scoped>
</style>
