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
      <BubbleList ref="bubbleListRef" :list="bubbleItems">
        <template #header="{ item }">
          <Thinking v-if="item.reasoning_content" :content="item.reasoning_content" :status="item.thinkingStatus" class="thinking-chain-warp" @change="handleChange" />
        </template>

        <template #content="{ item }">
          <Thinking
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
          </Thinking>

          <Typewriter :content="item.content" :loading="item.loading" :typing="item.typing" :is-markdown="item.isMarkdown" :is-fog="item.isFog" />
        </template>
      </BubbleList>
      <Sender ref="senderRef" v-model="inputValue" @submit="startSSE">
        <template #action-list>
          <div class="footer-container">
            <el-button v-if="!isLoading" type="danger" circle @click="senderRef.submit()">
              <!-- Element UI 图标使用 i 标签和类名 -->
              <i class="el-icon-position"></i>
            </el-button>
            <el-button v-else type="info" circle @click="cancel">
              <!-- Element UI 图标使用 i 标签和类名 -->
              <i class="el-icon-loading"></i>
            </el-button>
          </div>
        </template>
      </Sender>
    </div>
  </div>
</template>

<script>
// 导入 Element UI 组件和 Message 提示
import { Button, Message } from 'element-ui';
import BubbleList from '../BubbleList/index.vue'; // 假设 BubbleList 组件已转写为 Vue 2
import Sender from '../Sender/index.vue'; // 假设 Sender 组件已转写为 Vue 2
import Typewriter from '../Typewriter/index.vue'; // 假设 Typewriter 组件已转写为 Vue 2
import Thinking from '../Thinking/index.vue'; // 假设 Thinking 组件已转写为 Vue 2

// 假设 useXStream 是一个 Vue 2 兼容的 mixin 或插件
// 如果 useXStream 是一个 Composition API hook，需要手动转写其逻辑到 Options API
// 这里假设 useXStream 提供了类似 Vue 2 mixin 的接口，或者其逻辑已内联
// 如果 useXStream 依赖 Vue 3 特性，则需要完全重写其功能
// 为了示例，我们假设 useXStream 的功能可以通过 Vue 2 methods/data/computed/watch 实现
// 实际项目中需要根据 useXStream 的具体实现进行调整

// 模拟 useXStream 的功能
const useXStream = () => {
  // 这里的实现需要根据 useXStream 的实际逻辑来转写
  // 例如，如果 useXStream 内部使用了 fetch 和 EventSource，则需要在 methods 中实现
  // 并将状态 (data, error, isLoading) 放在 data 中
  return {
    startStream: ({ readableStream }) => {
      // 模拟开始流处理
      console.log('startStream called with readableStream', readableStream);
      // 实际逻辑：创建 EventSource 或读取 ReadableStream
    },
    cancel: () => {
      // 模拟取消流处理
      console.log('cancel stream');
      // 实际逻辑：关闭 EventSource 连接或取消 fetch 请求
    },
    data: [], // 模拟接收到的数据
    error: null, // 模拟错误状态
    isLoading: false, // 模拟加载状态
  };
};

export default {
  name: 'ThinkingDemo',
  components: {
    BubbleList,
    Sender,
    Typewriter,
    Thinking,
    // 注册 Element UI 组件
    [Button.name]: Button,
  },
  data() {
    // 模拟 useXStream 的状态
    const { data, error, isLoading } = useXStream();

    return {
      // 模拟 useXStream 的状态
      streamData: data,
      streamError: error,
      streamIsLoading: isLoading,

      BASE_URL: 'https://api.siliconflow.cn/v1/chat/completions',
      // 仅供测试，请勿拿去测试其他付费模型
      API_KEY: 'sk-vfjyscildobjnrijtcllnkhtcouidcxdgjxtldzqzeowrbga',
      MODEL: 'THUDM/GLM-Z1-9B-0414',

      inputValue: '帮我写一篇小米手机介绍',
      senderRef: null,
      bubbleListRef: null,
      bubbleItems: [],
      processedIndex: 0,
    };
  },
  watch: {
    // 监听模拟的 streamData 变化
    streamData: {
      handler(newData) {
        for (let i = this.processedIndex; i < newData.length; i++) {
          const chunk = newData[i].data;
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
        useXStream().cancel();
        return;
      }
      try {
        // console.log('New chunk:', JSON.parse(chunk))
        const parsedChunk = JSON.parse(chunk).choices[0].delta.content;
        const reasoningChunk = JSON.parse(chunk).choices[0].delta.reasoning_content;

        if (reasoningChunk) {
          // 开始思考链状态
          this.bubbleItems[this.bubbleItems.length - 1].thinkingStatus = 'thinking';
          this.bubbleItems[this.bubbleItems.length - 1].loading = true;
          if (this.bubbleItems.length) {
            this.bubbleItems[this.bubbleItems.length - 1].reasoning_content += reasoningChunk;
          }
        }

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
      this.streamError = err; // 更新模拟的错误状态
    },

    async startSSE() {
      try {
        // 添加用户输入的消息
        console.log('inputValue.value', this.inputValue);
        this.addMessage(this.inputValue, true);
        this.addMessage('', false);

        // 这里有必要调用一下 BubbleList 组件的滚动到底部 手动触发 自动滚动
        if (this.bubbleListRef && this.bubbleListRef.scrollToBottom) {
          this.bubbleListRef.scrollToBottom();
        }

        this.streamIsLoading = true; // 更新模拟的加载状态

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const readableStream = response.body;
        // 重置状态
        this.processedIndex = 0;
        this.streamData = []; // 重置模拟数据

        // 调用模拟的 startStream 方法
        // 在实际应用中，这里需要处理 ReadableStream 并更新 this.streamData
        // 例如，可以使用 TextDecoderStream 和 while 循环读取 chunk
        // 为了简化，这里只调用模拟方法
        useXStream().startStream({ readableStream });

        // 实际的流处理逻辑需要在这里实现，例如：
        const reader = readableStream.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            this.streamIsLoading = false; // 更新模拟的加载状态
            this.handleDataChunk(' [DONE]'); // 处理结束标记
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          // 处理 buffer 中的完整事件
          const events = buffer.split('\n\n');
          buffer = events.pop(); // Keep incomplete event in buffer

          for (const event of events) {
            if (event.startsWith('data:')) {
              const data = event.substring(5).trim();
              // 模拟 useXStream 更新 data
              this.streamData.push({ data });
            }
          }
        }

      } catch (err) {
        this.handleError(err);
        this.streamIsLoading = false; // 更新模拟的加载状态
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
    },

    // 取消流处理 (对应 useXStream 的 cancel)
    cancel() {
      // 实际取消逻辑，例如中断 fetch 请求
      console.log('取消流处理');
      this.streamIsLoading = false; // 更新模拟的加载状态
      // 如果有正在进行的 fetch 请求，需要在这里中止
    }
  },
};
</script>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 220px);
  overflow: auto;

  .header-wrap {
    padding: 12px;
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 12px;
    font-size: 14px;
    color: #606266;

    p {
      margin-top: 8px;
      color: #909399;
    }
  }

  .chat-warp {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0 12px;

    .error {
      color: red;
      margin-bottom: 10px;
    }

    .thinking-chain-warp {
      margin-bottom: 10px;
    }

    .footer-container {
      display: flex;
      justify-content: flex-end;
      padding: 8px 0;

      .el-button {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
    }
  }
}
</style>
