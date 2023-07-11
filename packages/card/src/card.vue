<template>
  <div style="color: red;">
    dp-card
  </div>
</template>

<script lang="ts" setup name="dp-card">
import { cardProps } from './types'

defineProps(cardProps)
</script>

<style scoped lang="scss">
.dp-card {
}
</style>
