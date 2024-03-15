<script setup lang="ts">
import { getDailySentence } from '@/api/example'
import { useToast } from '@/utils/modals'

interface DailySentenceData {
  content?: string
  note?: string
  picture?: string
  pictures?: string[]
  sentence?: string
  caption?: string
  fenxiang_img?: string
  picture2?: string
  picture3?: string
  picture4id?: number
  dateline?: string
}
const show = ref(false)
const dailySentenceData = ref<DailySentenceData>({})

handleDailySentence()
async function handleDailySentence() {
  try {
    const data = await getDailySentence()
    dailySentenceData.value = data
    dailySentenceData.value.pictures = [data.picture, data.picture2, data.picture3, data.picture4]
    setTimeout(() => {
      show.value = true
    }, 500)
    useToast('请求成功')
  }
  catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div>
    <uv-transition :show="show" mode="slide-left">
      <div class="p-20px">
        <div class="text-#5d66df text-18px font-600 text-center mb-20px">
          {{ dailySentenceData.caption }}
        </div>
        <div class="text-right text-14px text-gray-500 mb-10px">
          {{ dailySentenceData.dateline }}
        </div>
        <div class="text-16px text-#6c80be mb-10px">
          {{ dailySentenceData.content }}
        </div>
        <div class="text-16px text-#6c80be mb-10px text-right">
          - {{ dailySentenceData.note }}
        </div>
        <uv-image :src="dailySentenceData.fenxiang_img" width="100%" height="500px" />
      </div>
    </uv-transition>
  </div>
</template>
