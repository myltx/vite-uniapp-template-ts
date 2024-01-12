<template>
  <view class="h-full flex flex-col px-4 py-3 bg-gray-50">
    <view class="relative flex-none">
      <image
        :src="$assets('/images/contact/bg-tel.jpg')"
        mode="widthFix"
        class="w-full"
      />
    </view>
    <view class="p-4 bg-white mt-4 shadow-md rounded-md">
      <uv-form label-width="200" border>
        <uv-form-item label="邮箱">
          <view class="" @click="handleCopy(enterpriseInfo.email)">
            {{ enterpriseInfo.email }}
            <via-icon name="fuzhi" class="text-gray-400"></via-icon>
          </view>
        </uv-form-item>
        <uv-form-item label="微信号">
          <view class="" @click="handleCopy(enterpriseInfo.wechat)">
            {{ enterpriseInfo.wechat }}
            <via-icon name="fuzhi" class="text-gray-400"></via-icon>
          </view>
        </uv-form-item>
        <uv-form-item label="微信二维码">
          <image :src="wechatImage" alt="" class="w-25 h-25" />
        </uv-form-item>
      </uv-form>
    </view>
  </view>
</template>

<script setup lang="ts">
import { enterpriseInfo } from '@/configs/index'
import wechatImage from '@/assets/image-wechat.png'

const handleCopy = (val) => {
  console.log(val)
}
</script>

<style></style>
