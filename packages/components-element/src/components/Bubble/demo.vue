<template>
  <div class="component-container">
    <div class="demo-section">
      <h2>基础用法</h2>
      <p class="demo-desc">最简单的使用方式，只需提供内容</p>
      <A3Bubble content="这是一条简单的消息" placement="start" />
      <A3Bubble content="这是用户发送的消息" placement="end" />
    </div>

    <div class="demo-section">
      <h2>位置与头像</h2>
      <p class="demo-desc">支持左右位置和不同的头像显示方式</p>
      
      <!-- 左侧-头像URL -->
      <A3Bubble 
        content="支持通过avatar属性设置头像URL" 
        placement="start"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        avatarSize="40"
      />

      <!-- 左侧-头像占位 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="支持设置头像占位空间" 
        placement="start"
        avatarSize="40"
      />

      <!-- 右侧-插槽头像 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="支持通过插槽自定义头像" 
        placement="end">
        <template #avatar>
          <el-avatar 
            :size="40" 
            :src="avatar" 
            style="background-color: #409EFF;"
          />
        </template>
      </A3Bubble>

      <!-- 自定义头像间距 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="支持通过avatarGap设置头像与内容的间距" 
        placement="start"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        avatarSize="40"
        avatarGap="24px"
      />

      <!-- 方形头像 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="支持设置方形头像" 
        placement="start"
        avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        avatarSize="40"
        avatarShape="square"
      />
    </div>

    <div class="demo-section">
      <h2>头部、底部与内容区插槽</h2>
      <p class="demo-desc">支持自定义气泡头部、底部与内容区</p>
      <A3Bubble
        content="这是一条带有自定义头部和底部的消息"
      >
        <template #header>
          <div class="custom-header">
            <span>用户名</span>
            <span class="time">14:30</span>
          </div>
        </template>
        <template #footer>
          <div class="custom-footer">
            <el-button type="text" icon="el-icon-refresh" ></el-button>
            <el-button type="text" icon="el-icon-copy-document" ></el-button>
          </div>
        </template>
      </A3Bubble>

      <!-- 自定义内容 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble>
        <template #content>
          <div class="custom-content">
            这是通过<strong>内容插槽</strong>自定义的消息。
            <el-progress :percentage="50" />
          </div>
        </template>
      </A3Bubble>
    </div>
    <div class="demo-section">
      <h2>气泡形状、变体与最大宽度</h2>
      <p class="demo-desc">支持不同的形状和样式变体</p>
      
      <!-- 圆角 -->
      <A3Bubble 
        content="圆角形状" 
        placement="start"
        shape="round"
      />

      <!-- 直角 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="直角形状" 
        placement="start"
        shape="corner"
      />

      <!-- 填充 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="填充变体 (默认)" 
        placement="start"
        variant="filled"
      />

      <!-- 无边框 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="无边框变体" 
        placement="start"
        variant="borderless"
      />

      <!-- 轮廓 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="轮廓变体" 
        placement="start"
        variant="outlined"
      />

      <!-- 阴影 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="阴影变体" 
        placement="start"
        variant="shadow"
      />

      <!-- 无样式 -->
      <div style="margin-top: 10px;"></div>
      <A3Bubble 
        content="无样式" 
        placement="start"
        :noStyle="true"
      />

      <p class="demo-desc">支持设置气泡最大宽度</p>
      <A3Bubble 
        content="这是一条设置了最大宽度为300px的消息，当内容超过这个宽度时会自动换行。这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的消息。" 
        placement="start"
        maxWidth="300px"
      />
    </div>
    
    <div class="demo-section">
      <h2>打字效果</h2>
      <p class="demo-desc">支持渐进式打字效果</p>

      <div style="margin-bottom: 15px;">
        <el-button style="width: fit-content;" @click="refreshTypingContent">
          默认打字效果
        </el-button>
      </div>
      <A3Bubble 
        :content="refreshContent" 
        :loading="loading"
        :typing="true" 
      />
      
      <div style="margin-top: 20px;"></div>
      <p class="demo-desc">支持自定义打字速度、步长和光标</p>

      <div style="margin-bottom: 15px;">
        <el-button style="width: fit-content;" @click="changeTypingContent">
          自定义打字效果
        </el-button>
      </div>
      
      <A3Bubble 
        :content="typingContent" 
        :typing="{ 
          step: 1,        // 每次显示1个字符
          interval: 100,  // 每100毫秒显示一次
          suffix: '❤️'    // 使用心形作为光标
        }"
      >
        <template #avatar>
          <el-avatar :size="40" :src="avatar" />
        </template>
      </A3Bubble>
    </div>
    
    <div class="demo-section">
      <h2>加载状态</h2>
      <p class="demo-desc">支持加载状态显示</p>
      
      <!-- 基础加载状态 -->
      <div style="margin-bottom: 15px;">
        <A3Bubble :loading="loadingDemo" content="hello world !"/>
      </div>

      <!-- 自定义加载内容 -->
      <div style="margin-bottom: 15px;">
        <A3Bubble :loading="loadingDemo" content="hello world !">
          <template #loading>
            <div>loading...</div>
          </template>
        </A3Bubble>
      </div>

      <!-- 带文本的自定义加载内容 -->
      <div style="margin-bottom: 15px;">
        <A3Bubble :loading="loadingDemo" content="hello world !">
          <template #loading>
            <div style="padding: 0; margin: 0;">感谢使用 Element-Plus-X 🌹 请稍后...</div>
          </template>
        </A3Bubble>
      </div>

      <!-- 加载状态切换 -->
      <div class="loading-control">
        <span>状态：</span>
        <el-switch v-model="loadingDemo" />
      </div>
    </div>

    <div class="demo-section">
      <h2>Markdown支持</h2>
      <p class="demo-desc">支持Markdown内容渲染</p>
      <A3Bubble
        :content="markdownContent"
        :is-markdown="true"
      />
    </div>

    
    <div class="demo-section">
      <h2>组件实例方法演示</h2>
      <p class="demo-desc">支持控制打字过程和状态</p>
      <div class="control-buttons">
        <el-button size="small" @click="handleStart">开始打字</el-button>
        <el-button size="small" @click="handleInterrupt">暂停</el-button>
        <el-button size="small" @click="handleContinue">继续</el-button>
        <el-button size="small" @click="handleRestart">重新开始</el-button>
        <el-button size="small" @click="handleDestroy">销毁</el-button>
      </div>
      <div style="margin-top: 10px;"></div>
      <div v-if="progress > 0">
        <el-progress :percentage="progress" :stroke-width="5" />
      </div>
      <div style="margin-top: 10px;"></div>
      <A3Bubble
        ref="controlBubble"
        :content="controlContent"
        :typing="true"
        @start="onBubbleStart"
        @writing="onBubbleWriting"
        @finish="onBubbleFinish"
      />
    </div>
    
    <div class="demo-section">
      <h2>完整示例</h2>
      <p class="demo-desc">综合展示多个特性</p>
      <A3Bubble
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
          <div>我是头部内容</div>
        </template>

        <template #footer>
          <div>
            <el-button type="info" icon="el-icon-refresh" size="small" circle />
            <el-button type="success" icon="el-icon-search" size="small" circle />
            <el-button type="warning" icon="el-icon-star-off" size="small" circle />
            <el-button type="primary" icon="el-icon-document-copy" size="small" circle />
          </div>
        </template>
      </A3Bubble>
    </div>
  </div>
</template>

<script>
import A3Bubble from './index.vue'

export default {
  name: 'BubbleDemo',
  components: {
    A3Bubble
  },
  data() {
    return {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      loading: false,
      content: `
        # 标题
        这是一个 Markdown 示例。
        - 列表项 1
        - 列表项 2
        **粗体文本** 和 *斜体文本*
        \`\`\`javascript
        console.log('Hello, world!');
        \`\`\`
      `.trim(),
      markdownContent: `
        # Markdown 支持
        这是使用 Markdown 语法的内容示例。

        ## 列表支持
        - 项目 1
        - 项目 2
        - 项目 3

        ## 代码支持
        \`\`\`javascript
        function hello() {
          console.log("Hello World!");
        }
        \`\`\`

        ## 文本格式化
        **粗体文本** 和 *斜体文本*

        > 引用文本示例
      `.trim(),
      loadingDemo: true,
      refreshContent: '这是一条带打字效果的消息，会自动一个字一个字地显示出来。',
      controlContent: '这是一个可以通过实例方法控制的气泡组件，可以暂停、继续和重新开始打字效果。',
      progress: 0,
      destroyed: false,
      typingContent: '这是一条自定义打字效果的消息 ~ ',
      typingCount: 1
    }
  },
  mounted() {
    // 示例：2秒后加载完成
    setTimeout(() => {
      this.loading = false;
      this.loadingDemo = true;
    }, 2000);
  },
  methods: {
    toggleLoading() {
      this.loadingDemo = !this.loadingDemo;
    },
    handleStart() {
      if (this.destroyed) {
        this.destroyed = false;
        this.$nextTick(() => {
          if (this.$refs.controlBubble) {
            this.$refs.controlBubble.restart();
          }
        });
      }
    },
    handleInterrupt() {
      if (this.$refs.controlBubble) {
        this.$refs.controlBubble.interrupt();
      }
    },
    handleContinue() {
      if (this.$refs.controlBubble) {
        this.$refs.controlBubble.continueTyping();
      }
    },
    handleRestart() {
      if (this.$refs.controlBubble) {
        this.$refs.controlBubble.restart();
      }
    },
    handleDestroy() {
      if (this.$refs.controlBubble) {
        this.$refs.controlBubble.destroy();
        this.destroyed = true;
      }
    },
    onBubbleStart() {
      this.progress = 0;
      console.log('打字效果开始');
    },
    onBubbleWriting(instance) {
      if (instance && typeof instance.progress === 'number') {
        this.progress = instance.progress;
      }
    },
    onBubbleFinish() {
      this.progress = 100;
      console.log('打字效果完成');
    },
    refreshTypingContent(){
      this.loading = true;
      this.refreshContent = null;
      setTimeout(() => {
        this.loading = false;
        this.refreshContent = '这是一条带打字效果的消息，会自动一个字一个字地显示出来。';
      }, 1000);
    },
    changeTypingContent() {
      this.typingCount = (this.typingCount || 1) + 1;
      if (this.typingCount > 3) {
        this.typingCount = 1;
      }
      this.typingContent = '这是一条自定义打字效果的消息 ~ '.repeat(this.typingCount);
    }
  }
}
</script>

<style scoped>
.component-container {
  width: 100%;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-desc {
  margin-bottom: 15px;
  color: #606266;
  font-size: 14px;
}

.demo-row {
  display: flex;
  align-items: center;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 0;
  padding: 0;
}

.custom-header .time {
  color: #909399;
  font-size: 12px;
}

.custom-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.custom-content {
  padding: 10px;
}

.control-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.loading-control {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style> 