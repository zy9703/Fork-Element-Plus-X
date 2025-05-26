<script>
import A3Bubble from './index.vue'; // 引用 A3Bubble 组件
import A3Typewriter from '../Typewriter/index.vue'; // 引用 A3Typewriter 组件
import markdownItMermaid from '@jsonlee_12138/markdown-it-mermaid';
import { usePrism } from '@/hooks';
import '../../../public/styles/prism-solarizedlight.min.css';

export default {
  name: 'BubbleDemo',
  components: {
    A3Bubble,
    A3Typewriter
  },
  data() {
    return {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      loading: true,
      content: ''
    };
  },
  setup() {
    const highlight = usePrism();
    const mdPlugins = [markdownItMermaid({ delay: 100, forceLegacyMathML: true })];
    return { highlight, mdPlugins };
  },
  mounted() {
    setTimeout(() => {
      setTimeout(() => {
        this.content = `
# 标题
这是一个 Markdown 示例。
- 列表项 1
- 列表项 2
**粗体文本** 和 *斜体文本*
\`\`\`javascript
console.log('Hello, world!');
\`\`\`

\`\`\`java
console.log('Hello, world!');
\`\`\`

\`\`\`mermaid
pie
    "传媒及文化相关" : 35
    "广告与市场营销" : 8
    "游戏开发" : 15
    "影视动画与特效" : 12
    "互联网产品设计" : 10
    "VR/AR开发" : 5
    "其他" : 15
\`\`\`

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant 1 as $$alpha$$
    participant 2 as $$beta$$
    2-->>1: Answer: $$2$$
\`\`\`
`.trim();
        this.loading = false;
      }, 500);
    }, 2000);
  },
};
</script>

<template>
  <!-- <AppConfig :md-plugins="mdPlugins" :highlight="highlight"> -->
  <div class="component-container">
    <p>新版本支持 打字器 雾化效果 使用 Mermaid.js 支持简单的图表和函数公式 </p>
    <div class="component-1">
      <A3Bubble
        placement="start" :content="content" shape="corner" variant="shadow" :loading="loading" :typing="{
          step: 2,
          suffix: '💗',
        }" :is-markdown="true" :is-fog="{ bgColor: '#FFFFFF' }"
      >
        <template #avatar>
          <el-avatar :size="32" :src="avatar" />
        </template>

        <template #content>
          <A3Typewriter :content="content" :is-markdown="true" :md-plugins="mdPlugins" :highlight="highlight" />
        </template>

        <template #footer>
          <div class="footer-container">
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
            <el-button type="success" icon="el-icon-search" size="small" circle />
            <el-button type="warning" icon="el-icon-star-on" size="small" circle />
            <el-button color="#626aef" icon="el-icon-document-copy" size="small" circle />
          </div>
        </template>
      </A3Bubble>
    </div>
  </div>
  <!-- </AppConfig> -->
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 220px);
  overflow: auto;

  .component-1 {
    .footer-container {
      :deep() {
        .el-button+.el-button {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
