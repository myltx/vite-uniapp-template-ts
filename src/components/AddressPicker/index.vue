<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { OptionsItem, TabItem } from './AddressPicker'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  fieldNames: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'id',
      children: 'children',
    }),
  },
  title: {
    type: String,
    default: '请选择地区',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  // 开始等级
  startLevel: {
    type: Number,
    default: 0,
  },
  // column 控制需要展示的数据列
  // 例如：column: 2 表示只展示前前两级
  column: {
    type: Number,
    default: -1,
  },
  tabsConfig: {
    type: Object,
    default: () => ({
      lineColor: '#ec0e23',
    }),
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits([
  'update:modelValue',
  'change',
  'confirm',
  'cancel',
  'close',
])
const show = ref(false)
const transitionShow = ref(false)

const tabList = ref<TabItem[]>([
  {
    name: props.placeholder,
    index: 0,
    list: [],
  },
])

const currentTabIndex = ref(0)
const selectedRows = ref<OptionsItem[]>([])
const selectedIds = ref<string[] | number[]>([])
const showColumn = ref<OptionsItem[]>([])
const isFirstOpen = ref(true)
// 用于实现 数据双向绑定
watch(
  () => props.modelValue,
  (newVal: string[] | number[]) => {
    selectedIds.value = newVal || []
  },
)
// 监听 options 变化更新展示数据
watch(
  () => props.options,
  (newVal) => {
    if (!props.modelValue.length) {
      tabList.value[0].list = newVal
    }
    processingTree(newVal)
    transitionChange()
  },
)
// 监听 show 的变化 出发 close
watch(
  () => show.value,
  (newVal) => {
    if (!newVal) {
      emits('close')
    }
  },
)

function maskClose() {
  if (props.maskClosable) {
    show.value = false
  }
}

function tabClick(item) {
  currentTabIndex.value = item.index
  showColumn.value = item.list || []
  transitionChange()
}

// 切换层级时动画
function transitionChange() {
  transitionShow.value = false
  setTimeout(() => {
    transitionShow.value = true
  }, 100)
}

function confirm() {
  emits('confirm', {
    selectedIds: getSelectRowIds(),
    selectedRows: getSelectRows(),
  })
  cancel()
}

function open() {
  show.value = true
  if (isFirstOpen.value) {
    currentTabIndex.value = 0
    setTimeout(() => {
      setShowOptions()
    }, props.tabsConfig?.duration || 300)
    isFirstOpen.value = false
  }
}

function cancel() {
  show.value = false
  emits('cancel')
}

function handleItem(item: OptionsItem) {
  const newLevel = item.level - props.startLevel
  // 这里需要判断一下当前点击的是不是已经选择过了 如果选择过了就不需要再次点击了
  if (getSelectRowIds().includes(item[props.fieldNames.value])) {
    return
  }
  // 这里 给 selectedRows 添加选中项
  if (!selectedIds.value[newLevel]) {
    selectedRows.value.push(item)
    selectedIds.value.push(item[props.fieldNames.value] as never)
  }
  else {
    selectedRows.value[newLevel] = item
    selectedIds.value[newLevel] = item[props.fieldNames.value]
  }
  tabList.value.forEach((tab) => {
    if (tab.index === newLevel) {
      tab.name = item[props.fieldNames.label]
    }
  })

  const nowLevel = newLevel + 1
  // 先判断 是不是传入了 column 如果有 就优先根据 column 控制需要显示的层级
  if (props.column !== -1 && props.column && props.column <= nowLevel) {
    return
  }
  if ((item.children && !item.children.length) || !item.children) {
    return
  }
  // 这里如果选择了之前的 需要先去掉之前的数据
  spliceLastSelectedData(nowLevel)
  if (tabList.value.length === nowLevel) {
    tabList.value.push({
      name: props.placeholder,
      index: nowLevel,
      list: item.children ? item.children : [],
    })
    currentTabIndex.value = nowLevel
    showColumn.value = item.children
  }
  transitionChange()
  emits('change', {
    selectedIds: getSelectRowIds(),
    selectedRows: getSelectRows(),
    value: cloneDeep(item),
  })
  emits('update:modelValue', getSelectRowIds())
}

function spliceLastSelectedData(nowLevel) {
  tabList.value.splice(nowLevel)
  selectedIds.value.splice(nowLevel)
  selectedRows.value.splice(nowLevel)
}

function processingTree(newVal) {
  const findNewData = findDataByCode(newVal, props.modelValue)
  findNewData.forEach((item, index) => {
    selectedRows.value.push(item)
    if (index === 0) {
      tabList.value[0].list = newVal
      tabList.value[0].name = item[props.fieldNames.label]
    }
    else {
      tabList.value.push({
        name: item[props.fieldNames.label],
        index,
        list: findNewData[index - 1]?.children || [],
      })
      if (index === findNewData.length - 1) {
        tabList.value.push({
          name: props.placeholder,
          index: index + 1,
          list: item.children || [],
        })
      }
    }
  })
  // 先随便设置一个值然后等数据加载后重新赋值，解决选中样式错误问题
  currentTabIndex.value = -1
  setTimeout(() => {
    setShowOptions()
  }, props.tabsConfig?.duration || 200)
}

function setShowOptions() {
  showColumn.value = tabList.value[tabList.value.length - 1]?.list || []
  currentTabIndex.value = tabList.value.length - 1
}

function findDataByCode(dataArray: OptionsItem[], codeArray) {
  const result: OptionsItem[] = []

  function recursiveSearch(data: OptionsItem[], codes) {
    for (const item of data) {
      if (codes.includes(item.code)) {
        result.push(item)
      }
      if (item.children) {
        recursiveSearch(item.children, codes)
      }
    }
  }

  recursiveSearch(dataArray, codeArray)
  return result
}

function getSelectRows() {
  return cloneDeep(selectedRows.value)
}

function getSelectRowIds() {
  return cloneDeep(selectedIds.value)
}

function isSelected(item: OptionsItem) {
  return selectedIds.value.includes(item[props.fieldNames.value] as never)
}
defineExpose({
  open,
  close: cancel,
  getSelectRows,
  getSelectRowIds,
})
</script>

<template>
  <uv-overlay :show="show" @click="maskClose">
    <div
      class="h-65% w-100% bg-white position-absolute bottom-0 left-0 rounded-tl-10px rounded-tr-10px"
      @click.stop
    >
      <!-- 头部内容 -->
      <div class="h-40px px-10px py-20px flex justify-between items-center">
        <slot name="header">
          <div>
            <uv-icon
              v-if="props.showIcon"
              name="close"
              :color="props.tabsConfig?.lineColor || '#1aa328'"
              size="20"
              @click="cancel"
            />
            <div v-if="!props.showIcon" class="text-gray-500" @click="cancel">
              取消
            </div>
          </div>
          <div>{{ props.title }}</div>
          <div>
            <uv-icon
              v-if="props.showIcon"
              name="checkbox-mark"
              color="#1aa328"
              size="20"
              @click="confirm"
            />
            <div v-if="!props.showIcon" class="text-#1aa328" @click="confirm">
              确定
            </div>
          </div>
        </slot>
      </div>
      <div class="h-80%">
        <uv-tabs
          :list="tabList"
          :line-color="props.tabsConfig?.lineColor || '#1aa328'"
          :current="currentTabIndex"
          line-width="30"
          @click="tabClick"
        />
        <!-- 下边是需要根据 tabList 生成对应数量的dom   然后每个dom 中 再根据当前的 index  去 props.options level 对应登记数据  -->
        <scroll-view class="h-97% overflow-y-auto" :scroll-y="true">
          <uv-transition :show="transitionShow" mode="slide-left">
            <template
              v-for="item in showColumn"
              :key="item[props.fieldNames.value]"
            >
              <div
                class="p-10px flex justify-between items-center"
                @click="handleItem(item)"
              >
                <slot :data="item">
                  <template>
                    <div>{{ item[props.fieldNames.label] }}</div>
                    <uv-icon
                      v-if="isSelected(item)"
                      name="checkbox-mark"
                      :color="props.tabsConfig?.lineColor || '#1aa328'"
                      size="26"
                    />
                  </template>
                </slot>
              </div>
            </template>
          </uv-transition>
        </scroll-view>
      </div>
    </div>
  </uv-overlay>
</template>
