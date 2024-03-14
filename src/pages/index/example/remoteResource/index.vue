<script setup lang="ts">
const show = ref(false)
const show1 = ref(false)
setTimeout(() => {
  show.value = true
}, 500)
setTimeout(() => {
  show1.value = true
}, 700)
</script>

<template>
  <div class="p-20px">
    <div class="text-#5d66df text-18px font-600 text-center mb-20px">
      远程资源展示
    </div>
    <div class="text-center text-#6c80be mb-20px">
      Uv-Image
    </div>
    <div class="flex items-center justify-center b-1px b-#6c80be h-200px">
      <uv-transition :show="show" mode="slide-left">
        <uv-image :src="$assets('wx_logo.png')" width="80px" height="80px" />
      </uv-transition>
    </div>
    <div class="text-center text-#6c80be my-20px">
      Background-Image
    </div>
    <div class="flex items-center justify-center b-1px b-#6c80be h-300px">
      <uv-transition :show="show1" mode="slide-right">
        <div class="h-200px w-200px" :style="$setRemoteBg('wx_logo.png', { backgroundSize: '100% 100%' })"></div>
      </uv-transition>
    </div>
  </div>
</template>
