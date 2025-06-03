<template>
  <div class="component-container">
    <div class="header-wrap">
      此处是拿硅基流动中的免费模型进行测试，仅供预览使用
      <p>和 BubbleList 组合使用，支持放在 气泡头部，或者 气泡自定义内容中</p>
    </div>

    <div class="chat-warp">
      <div v-if="error" class="error">
        {{ error.message }}
      </div>
      <A3BubbleList ref="bubbleListRef" :list="bubbleItems">
        <template #header="{ item }">
          <A3Thinking v-if="item.reasoning_content" :content="item.reasoning_content" :status="item.thinkingStatus" class="thinking-chain-warp" @change="handleChange" />
        </template>
        <template #content="{ item }">
          <A3Thinking
            v-if="item.reasoning_content"
            :content="item.reasoning_content"
            :status="item.thinkingStatus"
            duration=".3s"
            max-width="350px"
            button-width="100%"
            background-color="linear-gradient(to right, #ffd3d8e0, #ff6969e7)"
            color="black"
            class="thinking-chain-warp"
          >
            <template #status-icon="{ status }">
              <span v-if="status === 'start'">💡</span>
              <span v-if="status === 'thinking'">💖</span>
              <span v-if="status === 'end'">✅</span>
              <span v-if="status === 'error'">❌</span>
            </template>

            <template #label="{ status }">
              <span v-if="status === 'start'">开始思考 😄</span>
              <span v-if="status === 'thinking'">让我想想 🤔</span>
              <span v-if="status === 'end'">想出来啦 😆</span>
              <span v-if="status === 'error'">想不出来 🥵</span>
            </template>

            <template #arrow>
              👇
            </template>

            <template #error>
              <span class="error-color">思考报错</span>
            </template>

            <template #content="{ content }">
              这里是自定义内容 + 返回：{{ content }}
            </template>
          </A3Thinking>

          <A3Typewriter 
            :content="item.content" 
            :loading="item.loading" 
            :typing="item.typing" 
            :is-markdown="item.isMarkdown" 
            :is-fog="item.isFog" />
        </template>
      </A3BubbleList>
      <A3Sender ref="senderRef" v-model="inputValue" @submit="startSSE">
        <template #action-list>
          <div class="footer-container">
            <el-button v-if="!isLoading" type="danger" circle @click="startSSE">
              <!-- Element UI 图标使用 i 标签和类名 -->
              <i class="el-icon-position"></i>
            </el-button>
            <el-button v-else type="info" circle @click="cancel">
              <!-- Element UI 图标使用 i 标签和类名 -->
              <i class="el-icon-loading"></i>
            </el-button>
          </div>
        </template>
      </A3Sender>
    </div>
  </div>
</template>

<script>
import A3BubbleList from '../BubbleList/index.vue';
import A3Sender from '../Sender/index.vue';
import A3Thinking from '../Thinking/index.vue';
import A3Typewriter from '../Typewriter/index.vue'; 
import { useXStream } from '../../hooks/index';
export default {
  name: 'ThinkingDemo',
  components: {
    A3BubbleList,
    A3Sender,
    A3Thinking,
    A3Typewriter,
  },
  setup() {
    // 模拟 useXStream 的状态
    const { startStream, cancel, data, error, isLoading } = useXStream();
    return {
      startStream,
      cancel,
      data,
      error,
      isLoading,
    };
  },
  data() {
    return {
      BASE_URL: 'https://api.siliconflow.cn/v1/chat/completions',
      // 仅供测试，请勿拿去测试其他付费模型
      API_KEY: 'sk-vfjyscildobjnrijtcllnkhtcouidcxdgjxtldzqzeowrbga',
      MODEL: 'THUDM/GLM-Z1-9B-0414',
      inputValue: '帮我写一篇小米手机介绍',
      bubbleItems: [],
      processedIndex: 0,
    };
  },
  watch: {
    data: {
      handler() {
        for (let i = this.processedIndex; i < this.data.length; i++) {
          const chunk = this.data[i].data;
          this.handleDataChunk(chunk);
          this.processedIndex++;
        }
      },
      deep: true,
    },
  },
  methods: {
    // 封装数据处理逻辑
    handleDataChunk(chunk) {
      if (chunk === ' [DONE]') {
        console.log('数据接收完毕');
        // 停止打字器状态
        if (this.bubbleItems.length) {
          this.bubbleItems[this.bubbleItems.length - 1].typing = false;
        }
        // 调用模拟的 cancel 方法
        this.cancel();
        return;
      }
      try {
        // console.log('New chunk:', JSON.parse(chunk))
        const reasoningChunk = JSON.parse(chunk).choices[0].delta.reasoning_content;
        if (reasoningChunk) {
          // 开始思考链状态
          this.bubbleItems[this.bubbleItems.length - 1].thinkingStatus = 'thinking';
          this.bubbleItems[this.bubbleItems.length - 1].loading = true;
          if (this.bubbleItems.length) {
            this.bubbleItems[this.bubbleItems.length - 1].reasoning_content += reasoningChunk;
          }
        }

        const parsedChunk = JSON.parse(chunk).choices[0].delta.content;
        if (parsedChunk) {
          // 结束 思考链状态
          this.bubbleItems[this.bubbleItems.length - 1].thinkingStatus = 'end';
          this.bubbleItems[this.bubbleItems.length - 1].loading = false;
          if (this.bubbleItems.length) {
            this.bubbleItems[this.bubbleItems.length - 1].content += parsedChunk;
          }
        }
      } catch (err) {
        console.error('解析数据时出错:', err);
      }
    },

    // 封装错误处理逻辑
    handleError(err) {
      console.error('Fetch error:', err);
    },

    async startSSE() {
      try {
        // 添加用户输入的消息
        console.log('inputValue', this.inputValue);
        this.addMessage(this.inputValue, true);
        this.addMessage('', false);

        // 这里有必要调用一下 BubbleList 组件的滚动到底部 手动触发 自动滚动
        if (this.$refs.bubbleListRef && this.$refs.bubbleListRef.scrollToBottom) {
          this.$refs.bubbleListRef.scrollToBottom();
        }

        const response = await fetch(this.BASE_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
          },
          body: JSON.stringify({
            model: this.MODEL,
            messages: this.bubbleItems.filter(item => item.role === 'user').map(item => ({
              role: item.role,
              content: item.content,
            })),
            stream: true,
          }),
        });
        const readableStream = response.body;
        // 重置状态
        this.processedIndex = 0;
        await this.startStream({ readableStream });
      }
      catch (err) {
        this.handleError(err);
      }
    },

    // 添加消息 - 维护聊天记录
    addMessage(message, isUser) {
      const i = this.bubbleItems.length;
      const obj = {
        key: i,
        avatar: isUser ? 'https://avatars.githubusercontent.com/u/76239030?v=4' : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        avatarSize: '48px',
        role: isUser ? 'user' : 'system',
        placement: isUser ? 'end' : 'start',
        isMarkdown: !isUser,
        variant: 'shadow',
        shape: 'corner',
        // maxWidth: '500px',
        typing: isUser ? false : { step: 2, suffix: '❤️‍🔥', interval: 80 },
        isFog: isUser ? false : { bgColor: '#FFFFFF' },
        loading: !isUser,
        content: message || '',
        reasoning_content: '',
        thinkingStatus: 'start',
      };
      this.bubbleItems.push(obj);
    },

    // 展开收起 事件展示
    handleChange(payload) {
      console.log('value', payload.value, 'status', payload.status);
    }
  },
};
</script>

<style scoped lang='scss'>
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;

  .header-wrap {
    padding: 12px;
  }
  .chat-warp {
    height: calc(100vh - 325px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .thinking-chain-warp {
      margin-bottom: 12px;
    }
  }

  :deep() {
    .el-bubble-list {
      padding-top: 24px;
    }

    .el-bubble {
      padding: 0 12px;
      padding-bottom: 24px;
    }

    .el-typewriter {
      border-radius: 12px;
      overflow: hidden;
    }

    .markdown-body {
      background-color: transparent;
    }
  }
}
</style>
