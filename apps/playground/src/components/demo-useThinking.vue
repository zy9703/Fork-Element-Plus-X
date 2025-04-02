<script lang='ts' setup>
import type { ThinkingItem } from 'vue-element-plus-x/types/components/Thinking/types'
import { Check } from '@element-plus/icons-vue'

const thinkings = ref<ThinkingItem[]>([{
  id: '1',
  content: 'content--收到问题',
  title: 'title--进行搜索文字',
  type: 'success',
  dotIcon: markRaw(Check),
  isCanExpand: true,
  isDefaultExpand: false,
  expandContent: '进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
}])

const thinkingItems = ref<ThinkingItem[]>([
  {
    id: '1',
    content: 'content--收到问题',
    title: 'title--进行搜索文字',
    type: 'success',
    dotIcon: markRaw(Check),
    isCanExpand: true,
    isDefaultExpand: true,
    expandContent: 'expandContent--进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
  },
  {
    id: '2',
    content: 'content--找到问题',
    title: 'title--思考中',
    type: 'primary',
    dotIcon: markRaw(Check),
    isLoading: true,
  },
])

setTimeout(() => {
  thinkingItems.value[1] = {
    ...thinkingItems.value[1],
    isLoading: false,
    type: 'success',
  }
  thinkingItems.value.push({
    id: '3',
    content: 'content--解决问题 title--被隐藏了  打字动画建议只给最后一个思维链接',
    title: 'title--进行搜索文字',
    hideTitle: true,
    type: 'danger',
    dotIcon: Check,
    isLoading: true,
    isCanExpand: true,
    isDefaultExpand: true,
    isMarkdown: false,
    typing: {
      step: 4,
      interval: 60,
    },
    expandContent: 'expandContent--进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
  })
}, 4000)
</script>

<template>
  <div class="component-container">
    <Thinking :thinking-items="thinkings" :line-gradient="true" /> <br>
    <Thinking :thinking-items="thinkingItems" :line-gradient="true" /> <br>
    <Thinking :thinking-items="thinkingItems" @handle-expand="(id:string[]) => console.log(id)">
      <template #dot="{ item, parentProps }">
        <el-button
          :size="parentProps.dotSize" :type="item.type" :icon="item.dotIcon" :loading="item.isLoading"
          :loading-icon="item.loadingIcon" circle
        />
      </template>
    </Thinking>
  </div>
</template>

<style lang='scss' scoped>
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
}
</style>
