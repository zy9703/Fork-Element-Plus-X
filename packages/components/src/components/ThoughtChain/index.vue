<script lang='ts' setup generic="T = DefaultThoughtChainItemProps">
import type { ElTimeline } from 'element-plus'
import type { DefaultThoughtChainItemProps, ThinkingInstance, ThoughtChainProps, ThoughtChainType } from './types.d.ts'
import { Check, Close, Loading } from '@element-plus/icons-vue'
import { get } from 'radash'
import { computed, ref, watch } from 'vue'
import { Typewriter } from '../../components'

const props = withDefaults(defineProps<ThoughtChainProps<T>>(), {
  thinkingItems: () => [],
  dotSize: 'default',
  maxWidth: '600px',
  lineGradient: false,
  rowKey: 'id',
  statusKey: 'status',
  statusEnum: () => ({
    loading: {
      value: 'loading',
      type: 'warning',
    },
    error: {
      value: 'error',
      type: 'danger',
    },
    success: {
      value: 'success',
      type: 'success',
    },
  }),
  titleKey: 'title',
  thinkTitleKey: 'thinkTitle',
  thinkContentKey: 'thinkContent',
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

const colorArr: Record<ThoughtChainType, string> = {
  info: 'var(--el-color-primary)',
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  primary: 'var(--el-color-primary)',
}

const timelineRef = ref<InstanceType<typeof ElTimeline>>()

const getLineColor = computed(() => {
  if (props.thinkingItems.length) {
    const arr = props.thinkingItems.map((item) => {
      const _type_ = getType(item)
      if (_type_) {
        return colorArr[_type_]
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
    .map(item => String(getId(item))),
)

const defaultActiveNodes = ref<string[]>([...activeNamesComputed.value])

function handleExpand(item: any) {
  emits('handleExpand', item)
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

function isLoading(item: T): boolean {
  const status = getStatus(item)
  return status === props.statusEnum.loading.value
}

function isError(item: T): boolean {
  const status = getStatus(item)
  return status === props.statusEnum.error.value
}

function getId(item: T) {
  return get(item, props.rowKey)
}

function getType(item: T): ThoughtChainType {
  const status = getStatus(item)
  return props.statusEnum[status as keyof typeof props.statusEnum]?.type ?? 'success'
}

function getTitle(item: T) {
  return get(item, props.titleKey) as string ?? ''
}

function getThinkTitle(item: T) {
  return get(item, props.thinkTitleKey) as string ?? ''
}
function getThinkContent(item: T) {
  return get(item, props.thinkContentKey) as string ?? ''
}

function getStatus(item: T) {
  return get(item, props.statusKey)
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
  <div class="el-thought-chain">
    <el-timeline
      ref="timelineRef" :style="{
        maxWidth: `${maxWidth}`,
      }"
    >
      <TransitionGroup name="thought-chain" tag="el-timeline-item">
        <el-timeline-item
          v-for="item in props.thinkingItems" :key="getId(item)" :type="getType(item)"
          :timestamp="getTitle(item)" :hide-timestamp="item.hideTitle" :placement="item.placement ?? 'top'"
        >
          <div v-if="!item.isCanExpand">
            <Typewriter :content="getThinkTitle(item)" :is-markdown="item.isMarkdown" :typing="item.typing" />
          </div>
          <el-collapse v-else-if="!item.isDefaultExpand" @change="handleExpand(item)">
            <el-collapse-item :title="getThinkTitle(item)">
              <Typewriter :content="getThinkContent(item)" :is-markdown="item.isMarkdown" :typing="item.typing" />
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-else-if="item.isDefaultExpand" v-model="defaultActiveNodes" @change="handleExpand(item)">
            <el-collapse-item :title="getThinkTitle(item)" :name="String(getId(item))">
              <Typewriter :content="getThinkContent(item)" :is-markdown="item.isMarkdown" :typing="item.typing" />
            </el-collapse-item>
          </el-collapse>

          <template #dot>
            <div class="el-thought-chain-item-dot">
              <slot name="icon" :item="item">
                <el-button circle :type="getType(item)" :loading="isLoading(item)" :size="dotSize">
                  <template #loading>
                    <el-icon class="thought-chain-loading">
                      <Loading />
                    </el-icon>
                  </template>

                  <template #icon>
                    <el-icon v-if="!isLoading(item)">
                      <Close v-if="isError(item)" />
                      <Check v-else />
                    </el-icon>
                  </template>
                </el-button>
              </slot>
            </div>
          </template>
        </el-timeline-item>
      </TransitionGroup>
    </el-timeline>
  </div>
</template>

<style scoped lang="scss">
.el-thought-chain {

  &-item-dot {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: v-bind(dotMargin);
    :deep(.el-button){
      cursor:default !important;
      &:active {
        background-color: var(--el-button-bg-color) !important;
        border-color: var(--el-button-bg-color) !important;
      };
      &:hover {
        background-color: var(--el-button-bg-color) !important;
        border-color: var(--el-button-bg-color) !important;
      }
    }
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

  :deep(.el-timeline-item) {
    // 清除 li 样式
    list-style: none !important;
  }
}

.thought-chain-move,
.thought-chain-enter-active,
.thought-chain-leave-active {
  transition: all 0.5s ease;
}

.thought-chain-enter-from,
.thought-chain-leave-to {
  opacity: 0;
  transform: translateY(10px) scaleY(0.9);
}

.thought-chain-leave-active {
  position: absolute;
}

.thought-chain-loading{
  animation: rotating 1.5s linear infinite;
  transform-origin: center center;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
