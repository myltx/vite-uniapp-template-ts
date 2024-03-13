<template>
  <view class="h-full overflow-auto">
    <zero-markdown-view :markdown="content" :theme-color="VITE_APP_PRIMARY_COLOR" />
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import content from '/README.md?raw'
import { VITE_APP_PRIMARY_COLOR } from '@/configs/'

console.log('onShow--->', onShow)
console.log('onShow123--->', onShow)
</script>
