<template>
  <view class="h-full overflow-auto">
    <zero-markdown-view :markdown="content" :theme-color="primaryColor" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import content from '/README.md?raw'
import { primaryColor } from '@/configs/index'

console.log('onShow--->', onShow)
console.log('onShow123--->', onShow)
</script>
