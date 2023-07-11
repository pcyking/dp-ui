<template>
  <foo :msg="msg"></foo>
</template>

<script lang="ts" setup name="foo-1">
import { Foo } from '@dp-ui/dp-demo-ui'
import { ref } from 'vue'

const msg = ref('hello custom component')
</script>
