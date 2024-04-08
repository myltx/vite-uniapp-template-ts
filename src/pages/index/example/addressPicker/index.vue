<template>
  <view class="h-full overflow-auto">
    <view>
      <AddressSelect
        ref="AddressSelectRef"
        v-model="selectVal"
        :options="options"
        :start-level="2"
        @change="change"
        @confirm="confirm"
        @cancel="cancel"
        @close="close"
      />

      <div class="mt-20px"></div>
      <uv-button type="primary" block @click="open">
        打开
      </uv-button>
      {{ selectVal }}
    </view>
    <uv-divider text="文档"></uv-divider>
    <div class="mt-20px h-75% overflow-y-auto">
      <zero-markdown-view :markdown="content" :theme-color="primaryColor" />
    </div>
  </view>
</template>

<script setup lang="ts">
import content from '../../../../components/AddressPicker/README.md?raw'
import { AddressJson } from './helper'
import AddressSelect from '@/components/AddressPicker/index.vue'
import type { OptionsItem } from '@/components/AddressPicker/AddressPicker'
import { primaryColor } from '@/configs'

const AddressSelectRef = ref()
const selectVal = ref<string[] | number[]>([])
const options = ref<OptionsItem[]>([])
setTimeout(() => {
  // selectVal.value = ['330000']
  // selectVal.value = ['330000', '330400']
  // selectVal.value = ['330000', '330400', '330421']
  // selectVal.value = ['330000', '330400', '330421', '330421102']
}, 1000)
setTimeout(() => {
  options.value = AddressJson as any
  console.log(options.value)
}, 2000)

function open() {
  AddressSelectRef.value.open()
}
function change(data) {
  console.log(data, 'change')
}
function confirm(data) {
  console.log(data, 'confirm')
}
function cancel() {
  console.log('点击了取消按钮')
}
function close() {
  console.log('关闭了')
}
</script>
