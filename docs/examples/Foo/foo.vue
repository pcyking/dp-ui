<template>
  <foo :msg="msg"></foo>
</template>

<script lang="ts" setup name="foo-1">
import { ref } from 'vue'

const msg = ref('hello custom component')
</script>
