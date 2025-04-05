<!-- home 首页-使用 Bubble 组件 -->
<script setup lang="ts">
import type { ThinkingItem } from 'vue-element-plus-x/types/components/Thinking/types'
import { DocumentCopy, Refresh, Search, Star } from '@element-plus/icons-vue'

const avatar = ref(
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
)
const loading = ref(true)
const content = ref('')

const thinkings = ref<ThinkingItem[]>([{
  id: '1',
  thinkTitle: 'content--收到问题',
  title: 'title--进行搜索文字',
  status: 'success',
  isCanExpand: true,
  isDefaultExpand: true,
  thinkContent: '进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
}])

onMounted(() => {
  setTimeout(() => {
    thinkings.value[0] = {
      ...thinkings.value[0],
      isLoading: false,
    }
    thinkings.value.push({
      id: '2',
      thinkTitle: 'content--解决问题 title--被隐藏了  打字动画建议只给最后一个思维链接',
      title: 'title--进行搜索文字',
      hideTitle: true,
      status: 'success',
      isCanExpand: true,
      isDefaultExpand: true,
      isMarkdown: false,
      typing: {
        step: 4,
        interval: 60,
      },
      thinkContent: 'expandContent--进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
    })

    // 模拟思考结束
    setTimeout(() => {
      content.value = `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*
\`\`\`javascript
console.log('Hello, world!');
\`\`\`
`.trim()
      loading.value = false
    }, 500)
  }, 2000)
})
</script>

<template>
  <div class="component-container">
    <div class="component-1">
      <Bubble
        placement="start"
        :content="content"
        shape="corner"
        variant="shadow"
        :loading="loading"
        :typing="{
          step: 2,
          suffix: '💗',
        }"
        :is-markdown="true"
      >
        <template #avatar>
          <el-avatar :size="32" :src="avatar" />
        </template>

        <template #header>
          <div class="header-container">
            <Thinking :thinking-items="thinkings" :line-gradient="true" @handle-expand="(id: string[]) => console.log(id)" />
          </div>
        </template>

        <!-- <template #content>
          <div class="content-container">在这里可以自定义内容，支持插槽。</div>
        </template> -->

        <template #footer>
          <div class="footer-container">
            <el-button type="info" :icon="Refresh" size="small" circle />
            <el-button type="success" :icon="Search" size="small" circle />
            <el-button type="warning" :icon="Star" size="small" circle />
            <el-button
              color="#626aef"
              :icon="DocumentCopy"
              size="small"
              circle
            />
          </div>
        </template>
      </Bubble>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  .component-1 {
    .footer-container {
      :deep() {
        .el-button + .el-button {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
