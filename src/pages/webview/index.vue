<template>
  <web-view class="h-full" :src="viewProps.src"></web-view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

const viewProps = ref<any>({ src: '' })
onLoad((params: any) => {
  if (params.title) {
    uni.setNavigationBarTitle({
      title: params.title,
    })
  }
  viewProps.value = params
})
</script>

<style></style>
