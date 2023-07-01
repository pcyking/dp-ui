<template>
  <dp-foo :msg="msg"></dp-foo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const msg = ref('hello custom component')
</script>
