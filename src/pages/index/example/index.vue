<template>
  <view class="">
    <view
      v-for="(item, index) of exampleModel"
      :key="index"
      class="py-4 px-4 border-b border-gray-200 bg-white"
      @click="handleInfo(item)"
    >
      <view class="flex items-center">
        <view class="w-10 flex-none truncate text-primary-500 text-2xl">
          <via-icon :name="item.icon" :deep-class="item.iconClass"></via-icon>
        </view>
        <view class="flex-1 w-0 leading-none">
          {{ item.text }}
        </view>
        <view class="flex-none w-10 text-right text-gray-500">
          <via-icon name="arrow-right-bold"></via-icon>
        </view>
      </view>
      <view class="text-sm text-gray-500 pl-10">
        {{ item.desc }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useRouter } from '$uni-router'

const router = useRouter()

const exampleModel = ref([
  {
    icon: 'm-luyou',
    iconClass: '',
    text: '路由中间件',
    desc: '进入此页面将触发实名认证路由中间件演示',
    route: {
      path: '/pages/middleware/index',
    },
  },
  {
    icon: 'dingwei',
    iconClass: '',
    text: '请求页面',
    desc: '进入页面测试request请求',
    route: {
      path: '/pages/index/example/request/index',
    },
  },
  {
    icon: 'qingchu',
    iconClass: '',
    text: '远程资源展示',
    desc: '进入页面查看远程资源加载方法使用',
    route: {
      path: '/pages/index/example/remoteResource/index',
    },
  },
  {
    icon: 'qingchu',
    iconClass: '',
    text: '地区选择',
    desc: '进入页面查看地区选择组件使用',
    route: {
      path: '/pages/index/example/addressPicker/index',
    },
  },
])
function handleInfo(row) {
  router.navigateTo(row.route)
}
</script>

<style></style>
