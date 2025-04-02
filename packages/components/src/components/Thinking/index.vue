<script lang='ts' setup>
import type { ElTimeline } from 'element-plus'
import type { ThinkingInstance, ThinkingItemBase, ThinkingProps } from './types'
import { computed, ref, watch } from 'vue'
import { Typewriter } from '../../components'

const props = withDefaults(defineProps<ThinkingProps>(), {
  thinkingItems: () => [],
  dotSize: 'default',
  maxWidth: '600px',
  lineGradient: false,
})

const emits = defineEmits<{
  handleExpand: [value: ThinkingInstance['expandKeys']]
}>()

const dotMargin = computed(() => {
  switch (props.dotSize) {
    case 'small':
      return '-4px 0 0 -7px'
    case 'large':
      return '-11px 0 0 -15px'
    default:
      return '-8px 0 0 -11px'
  }
})

const colorArr: Record<Required<ThinkingItemBase>['type'], string> = {
  info: 'var(--el-color-primary)',
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  primary: 'var(--el-color-primary)',
}

const timelineRef = ref<InstanceType<typeof ElTimeline>>()

const getLineColor = computed(() => {
  if (props.thinkingItems.length && props.thinkingItems.length) {
    const arr = props.thinkingItems.map((item) => {
      if (item.type) {
        return colorArr[item.type]
      }
      return ''
    })

    return arr
  }
  return []
})

// 计算默认展开项
const activeNamesComputed = computed(() =>
  props.thinkingItems
    .filter(item => item.isCanExpand && item.isDefaultExpand)
    .map(item => String(item.id)),
)

const defaultActiveNodes = ref<string[]>([...activeNamesComputed.value])

function handleExpand(activeNames: string[]) {
  emits('handleExpand', activeNames)
}

function setRadialGradient(colors: typeof getLineColor.value, ele: HTMLElement[]) {
  const length = ele.length
  Array.from(ele).forEach((item, index) => {
    const line = item.children[0]
    if (line) {
      line.setAttribute('style', `
      border: none;
      width:2px;
      background: linear-gradient(to bottom, ${colors[index]} 0% , ${colors[index < length ? index + 1 : index]} 100%);
    `)
    }
  })
}

function getEle() {
  if (getLineColor.value && timelineRef.value && props.lineGradient) {
    const ele = timelineRef.value.$el.children[0].children
    setRadialGradient(getLineColor.value, ele)
  }
}

watch(() => activeNamesComputed.value, (v) => {
  defaultActiveNodes.value = [...v]
})

watch(() => getLineColor.value, () => {
  getEle()
})

onMounted(() => {
  getEle()
})
</script>

<template>
  <div class="el-thinking">
    <el-timeline
      ref="timelineRef"
      :style="{
        maxWidth: `${maxWidth}`,
      }"
    >
      <TransitionGroup name="thinking" tag="el-timeline-item">
        <el-timeline-item
          v-for="item in props.thinkingItems"
          :key="item.id" :type="item.type" :timestamp="item.title"
          :hide-timestamp="item.hideTitle" :placement="item.placement ?? 'top'"
        >
          <div v-if="!item.isCanExpand">
            <Typewriter
              :content="item.content"
              :is-markdown="item.isMarkdown"
              :typing="item.typing"
            />
          </div>
          <el-collapse v-else-if="!item.isDefaultExpand" @change="handleExpand">
            <el-collapse-item :title="item.content">
              <Typewriter
                :content="item.expandContent"
                :is-markdown="item.isMarkdown"
                :typing="item.typing"
              />
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-else-if="item.isDefaultExpand" v-model="defaultActiveNodes" @change="handleExpand">
            <el-collapse-item :title="item.content" :name="String(item.id)">
              <Typewriter
                :content="item.expandContent"
                :is-markdown="item.isMarkdown"
                :typing="item.typing"
              />
            </el-collapse-item>
          </el-collapse>

          <template #dot>
            <div class="el-thinking-item-dot">
              <el-button
                v-if="!$slots.customDot"
                :size="props.dotSize" :type="item.type" :icon="item.dotIcon" :loading="item.isLoading"
                :loading-icon="item.loadingIcon" circle
              />
              <slot v-else name="customDot" :item="{ ...item }" :parent-props="{ ...props }" />
            </div>
          </template>
        </el-timeline-item>
      </TransitionGroup>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.el-thinking {
  width: 100%;
  margin: 0 0 0 7px;

  &-item-dot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: v-bind(dotMargin)
  }

  :deep(.el-collapse) {
    border: none;

    .el-collapse-item__header {
      height: 20px;
      font-weight: normal;
    }

    .el-collapse-item__arrow {
      margin: 0 0 0 8px;
    }

    .el-collapse-item__header {
      margin-bottom: 5px;
    }

    .el-collapse-item__header,
    .el-collapse-item__wrap {
      border: none;
    }

    .el-collapse-item__content {
      color: var(--el-text-color-secondary);
      padding: 0;
    }
  }

  :deep(.el-timeline) {
    padding: 10px 0 0 5px;
  }

  :deep(.el-timeline-item__timestamp) {
    color: var(--el-text-color-primary);
  }

  :deep(.el-timeline-item__content) {
    color: var(--el-text-color-secondary);
  }
}

.thinking-move,
.thinking-enter-active,
.thinking-leave-active {
  transition: all 0.5s ease;
}

.thinking-enter-from,
.thinking-leave-to {
  opacity: 0;
  transform: translateY(10px) scaleY(0.9);
}

.thinking-leave-active {
  position: absolute;
}
</style>
