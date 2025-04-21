<template>
  <div class="ai-chat-container">
    <!-- 聊天头部 -->
    <div class="ai-chat-header">
      <div class="ai-chat-logo">
        <i class="el-icon-s-promotion"></i>
        <span>Element AI Chat</span>
      </div>
    </div>
    
    <!-- 直接使用BubbleList作为聊天内容区域 -->
    <a3-bubble-list
      v-if="messages.length > 0"
      :list="messages"
      max-height="100%"
      class="ai-chat-body"
      ref="bubbleListRef"
    />
    
    <!-- 空状态占位内容 -->
    <div v-else class="ai-chat-body ai-chat-welcome">
      <div class="welcome-title">
        <i class="el-icon-s-promotion"></i>
        <h2>你好，我是Element AI助手</h2>
      </div>
      <p class="welcome-desc">基于Element UI构建的智能对话界面，为您提供流畅的交互体验</p>
      
      <!-- 快捷提示词 -->
      <div class="chat-prompts">
        <h3>您可以问我:</h3>
        <div class="prompt-items">
          <div 
            v-for="(prompt, index) in quickPrompts" 
            :key="index"
            class="prompt-item"
            @click="usePrompt(prompt.content)"
          >
            <i :class="prompt.icon"></i>
            <span>{{ prompt.title }}</span>
            <div class="prompt-desc">{{ prompt.desc }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 发送区域 -->
    <div class="ai-chat-footer">
      <a3-sender
        v-model="inputMessage"
        :loading="loading"
        placeholder="输入消息，按Enter发送..."
        :clear-on-submit="true"
        :allow-speech="true"
        :show-send-tip="true"
        :enable-at-commands="true"
        :enable-slash-commands="true"
        :header-animation-timer="300"
        ref="senderRef"
        @submit="handleSubmit"
        @fileSelected="handleFileSelected"
        @atCommand="handleAtCommand"
        @slashCommand="handleSlashCommand"
      >
        <template #header>
          <div v-if="showAttachments" class="ai-chat-attachments">
            <div class="attachments-header">
              <div class="attachments-title">附件</div>
              <el-button 
                type="text" 
                icon="el-icon-close" 
                class="attachments-close"
                @click="toggleAttachments"
              ></el-button>
            </div>
            <a3-attachments
              :before-upload="() => false"
              :items="attachmentsList"
              @change="handleAttachmentsChange"
              @remove="handleAttachmentRemove"
            />
          </div>
        </template>
        
        <template #before-actions>
          <el-button 
            type="text" 
            icon="el-icon-paperclip"
            @click="toggleAttachments"
          ></el-button>
        </template>
      </a3-sender>
    </div>
  </div>
</template>

<script>
import A3BubbleList from '../BubbleList/index.vue';
import A3Sender from '../Sender/index.vue';
import A3Attachments from '../Attachments/index.vue';

export default {
  name: 'AiChatDemo',
  components: {
    A3BubbleList,
    A3Sender,
    A3Attachments
  },
  data() {
    return {
      inputMessage: '',
      loading: false,
      messages: [],
      attachmentsList: [],
      showAttachments: false,
      lastUserMessage: '',
      aiResponseQueue: [
        '你好！我是Element AI助手，很高兴为你服务。',
        '我可以回答你关于Element UI的问题，或者帮助你解决一些常见的开发难题。',
        '请问你有什么需要帮助的吗？',
        '我还可以提供一些示例代码，帮助你更好地使用Element UI组件。',
        '如果你遇到困难，随时可以向我提问。'
      ],
      quickPrompts: [
        {
          icon: 'el-icon-s-help',
          title: '什么是Element Plus X?',
          desc: '了解Element Plus X的基本概念和用途',
          content: '什么是Element Plus X?'
        },
        {
          icon: 'el-icon-s-opportunity',
          title: '组件使用示例',
          desc: '查看如何使用各种组件',
          content: '请提供一些组件使用示例'
        },
        {
          icon: 'el-icon-s-data',
          title: '数据展示最佳实践',
          desc: '如何更好地展示数据',
          content: '数据展示有哪些最佳实践？'
        },
        {
          icon: 'el-icon-s-custom',
          title: '主题定制',
          desc: '如何定制组件主题',
          content: '如何定制组件主题？'
        }
      ]
    };
  },
  methods: {
    // 处理提交消息
    handleSubmit(message) {
      if (!message.trim() && this.attachmentsList.length === 0) return;
      
      const userContent = message.trim();
      
      // 添加用户消息
      if (userContent) {
        this.messages.push({
          key: `user-msg-${this.messages.length}`,
          role: 'user',
          content: userContent,
          placement: 'end',
          shape: 'corner',
          variant: 'shadow'
        });
      }
      
      // 处理附件
      if (this.attachmentsList.length > 0) {
        const attachmentsMessage = `[附件: ${this.attachmentsList.length}个文件]`;
        this.messages.push({
          key: `user-attach-${this.messages.length}`,
          role: 'user',
          content: attachmentsMessage,
          placement: 'end',
          shape: 'corner',
          variant: 'shadow'
        });
        
        // 可以在这里处理附件上传逻辑
        
        // 清空附件列表
        this.attachmentsList = [];
        this.showAttachments = false;
      }
      
      // 模拟AI响应
      this.simulateAiResponse(userContent);
      
      // 滚动到底部
      this.scrollToBottom();
    },
    
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.bubbleListRef) {
          this.$refs.bubbleListRef.scrollToBottom();
        }
      });
    },
    
    // 模拟AI响应
    simulateAiResponse(userContent) {
      this.loading = true;
      
      // 先添加一个加载中的AI消息，使用消息数组长度作为key确保唯一性
      const loadingMsgKey = `ai-msg-${this.messages.length}`;
      this.messages.push({
        key: loadingMsgKey,
        role: 'ai',
        content: '已收到，我发送的内容',
        placement: 'start',
        shape: 'round',
        variant: 'shadow',
        loading: true, // 显示为加载状态
      });
      
      this.scrollToBottom();
      
      // 模拟2秒延迟后，更新消息内容和状态
      setTimeout(() => {
        this.loading = false;
        
        console.log('this.messages', this.messages)
        // 找到加载中消息的索引
        const loadingIndex = this.messages.findIndex(msg => msg.key === loadingMsgKey);
        if (loadingIndex !== -1) {
          // 检查用户消息是否为Markdown格式
          const isUserMessageMarkdown = this.checkIfMarkdown(userContent);
          const processedContent = isUserMessageMarkdown 
            ? userContent // 如果是Markdown格式，直接保留原文
            : (userContent ? `已收到：${userContent}` : '我已准备好为您服务');
          
          // 更新消息内容和状态，不删除原消息
          this.messages[loadingIndex].content = processedContent;
          this.messages[loadingIndex].loading = false;
          this.messages[loadingIndex].typing = { step: 5, interval: 20 };
          this.messages[loadingIndex].isMarkdown = isUserMessageMarkdown;
        }
        
        this.scrollToBottom();
      }, 2000);
    },
    
    // 检查内容是否为Markdown格式
    checkIfMarkdown(content) {
      if (!content) return false;
      
      // 检查是否包含Markdown特征
      const markdownFeatures = [
        /^#+\s+/m,                      // 标题
        /\*\*.*?\*\*/,                  // 粗体
        /\*.*?\*/,                      // 斜体
        /`.*?`/,                        // 行内代码
        /```[\s\S]*?```/,               // 代码块
        /^\s*[-*+]\s+/m,                // 无序列表
        /^\s*\d+\.\s+/m,                // 有序列表
        /\[.*?\]\(.*?\)/,               // 链接
        /!\[.*?\]\(.*?\)/,              // 图片
        />\s+.*/,                       // 引用
        /^\s*---+\s*$/m,                // 分隔线
        /^\s*===+\s*$/m,                // 分隔线
        /\|.*\|.*\|/                    // 表格
      ];
      
      return markdownFeatures.some(regex => regex.test(content));
    },
    
    // 附件相关方法
    toggleAttachments() {
      this.showAttachments = !this.showAttachments;
      
      if (this.showAttachments) {
        this.$refs.senderRef.openHeader();
      } else {
        this.$refs.senderRef.closeHeader();
      }
    },
    
    handleAttachmentsChange(event) {
      this.attachmentsList = event.fileList;
    },
    
    handleAttachmentRemove(file) {
      const index = this.attachmentsList.findIndex(item => item.uid === file.uid);
      if (index !== -1) {
        this.attachmentsList.splice(index, 1);
        
        // 当附件列表为空时，关闭附件区域
        if (this.attachmentsList.length === 0 && this.showAttachments) {
          this.showAttachments = false;
          this.$refs.senderRef.closeHeader();
        }
      }
    },
    
    // 文件选择处理
    handleFileSelected(fileData) {
      // 添加文件到附件列表
      if (fileData.file) {
        const fileObj = {
          uid: Date.now() + Math.random().toString(36).substring(2),
          name: fileData.file.name,
          size: fileData.file.size,
          type: fileData.file.type,
          status: 'done',
          url: URL.createObjectURL(fileData.file),
          originFile: fileData.file
        };
        
        // 添加到附件列表 - 避免重复元素
        const existingIndex = this.attachmentsList.findIndex(item => 
          item.name === fileObj.name && item.size === fileObj.size
        );
        
        if (existingIndex === -1) {
          this.attachmentsList.push(fileObj);
        }
        
        // 确保附件区域显示 - 如果已经显示就不重复打开
        if (!this.showAttachments) {
          this.showAttachments = true;
          this.$refs.senderRef.openHeader();
        }
      }
      
      this.$message.success(`添加了文件: ${fileData.file.name}`);
    },
    
    // 命令处理
    handleAtCommand(action, value) {
      this.$message.info(`执行@命令: ${action}${value ? '，值: ' + value : ''}`);
    },
    
    handleSlashCommand(action) {
      // 处理特殊命令
      if (action === 'clearInput') {
        this.messages = [];
        this.$message.success('聊天记录已清空');
      } else if (action === 'insertDate') {
        const date = new Date().toLocaleDateString();
        const content = `今天的日期是: ${date}`;
        
        // 设置loading状态为true，禁用输入
        this.loading = true;
        
        this.messages.push({
          key: `user-slash-${this.messages.length}`,
          role: 'user',
          content: content,
          placement: 'end',
          shape: 'corner',
          variant: 'shadow'
        });
        this.simulateAiResponse(content);
      } else {
        this.$message.info(`执行/命令: ${action}`);
      }
    },
    
    // 使用快捷提示词
    usePrompt(content) {
      if (!content) return;
      
      // 设置loading状态为true，禁用输入
      this.loading = true;
      
      // 直接处理消息，不需要设置inputMessage
      this.messages.push({
        key: `user-prompt-${this.messages.length}`,
        role: 'user',
        content: content,
        placement: 'end',
        shape: 'corner',
        variant: 'shadow'
      });
      
      // 模拟AI响应
      this.simulateAiResponse(content);
      
      // 滚动到底部
      this.scrollToBottom();
    }
  },
  mounted() {
    // 添加一个初始的AI消息，带有加载状态
    const initialMsgKey = `ai-initial-${this.messages.length}`;
    this.loading = true; // 设置loading为true，禁用输入框
    this.messages.push({
      key: initialMsgKey,
      role: 'ai',
      content: '已收到，我发送的内容',
      placement: 'start',
      shape: 'round',
      variant: 'shadow',
      loading: true, // 显示为加载状态
    });
    
    // 2秒后替换为带有Markdown的消息
    setTimeout(() => {
      this.loading = false; // 设置loading为false，启用输入框
      
      // 找到初始消息的索引
      const initialIndex = this.messages.findIndex(msg => msg.key === initialMsgKey);
      if (initialIndex !== -1) {
        // 更新消息内容和状态，不删除原消息
        this.messages[initialIndex].content = '#### 标题 \n 这是一个 Markdown 示例。\n - 列表项 1 \n - 列表项 2 **粗体文本** 和 *斜体文本* \n ```javascript \n console.log(\'Hello, world!\'); \n ```';
        this.messages[initialIndex].loading = false;
        this.messages[initialIndex].typing = { step: 5, interval: 20 };
        this.messages[initialIndex].isMarkdown = true; // 确保开启Markdown渲染
      }
    }, 2000);
  }
};
</script>

<style>
.ai-chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.ai-chat-header {
  padding: 16px;
  background-color: #409EFF;
  color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.ai-chat-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 500;
}

.ai-chat-logo i {
  font-size: 24px;
}

.ai-chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  /* background-color: #f5f7fa; */
  background-color: #fff;
}

.ai-chat-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
}

.welcome-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.welcome-title i {
  font-size: 32px;
  color: #409EFF;
}

.welcome-desc {
  color: #606266;
  margin-bottom: 32px;
}

.chat-prompts {
  width: 100%;
  max-width: 600px;
}

.chat-prompts h3 {
  margin-bottom: 16px;
  color: #303133;
  font-size: 16px;
  font-weight: 500;
}

.prompt-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.prompt-item {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.prompt-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-color: #c6e2ff;
}

.prompt-item i {
  font-size: 20px;
  color: #409EFF;
  margin-bottom: 8px;
}

.prompt-item span {
  font-weight: 500;
  color: #303133;
  margin-bottom: 8px;
}

.prompt-desc {
  font-size: 12px;
  color: #909399;
}

.ai-chat-footer {
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
}

.ai-chat-attachments {
  padding: 16px;
}

.attachments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.attachments-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}
</style>

<!-- 添加全局样式 -->
<style>
/* Markdown样式 */
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 5px;
}

.markdown-body h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.markdown-body h2 {
  font-size: 1.3em;
  margin-bottom: 8px;
}

.markdown-body h3 {
  font-size: 1.1em;
  margin-bottom: 6px;
}

.markdown-body ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 10px 0;
}

.markdown-body ul li {
  margin-bottom: 5px;
}

.markdown-body p {
  margin: 8px 0;
}

.markdown-body pre {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  overflow: auto;
  margin: 16px 0;
}

.markdown-body code {
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  background-color: rgba(175, 184, 193, 0.2);
  padding: 2px 4px;
  border-radius: 3px;
}

.markdown-body pre code {
  background-color: transparent;
  padding: 0;
}

.markdown-body strong {
  font-weight: 600;
}

.markdown-body em {
  font-style: italic;
}

.markdown-body blockquote {
  margin: 0;
  padding: 0 1em;
  color: #57606a;
  border-left: 0.25em solid #d0d7de;
}
</style> 