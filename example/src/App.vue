<template>
  <div class="site">
    <h1>组件库测试站点 dp-demo-ui</h1>
    <p>测试站点主要用于开发过程中测试组件，即在开发过程中由业务驱动组件开发。</p>
    <Card :msg="msg"></Card>
    <Foo :msg="msg"></Foo>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Card, Foo } from '@dp-ui/dp-demo-ui'

const msg = ref('hello w发发发orld')
</script>

<style scoped lang="scss">
.site {
  padding: 20px;
}
</style>
