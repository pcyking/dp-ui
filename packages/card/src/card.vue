<template>
  <div>
    dp-card
  </div>
</template>

<script lang="ts" setup name="dp-card">
import { defineProps } from 'vue'
import { cardProps } from './types'

defineProps(cardProps)
</script>

<style scoped lang="scss">
.dp-card {
}
</style>
