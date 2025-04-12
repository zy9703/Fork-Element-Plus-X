import type { App, Plugin } from 'vue'
import Bubble from './components/Bubble/index.vue'
import BubbleList from './components/BubbleList/index.vue'
import Conversations from './components/Conversations/index.vue'
import Sender from './components/Sender/index.vue'
import Typewriter from './components/Typewriter/index.vue'

export * from './components'
export * from './hooks'

const ElementPlusX: Plugin = {
  install(app: App) {
    app.component('Bubble', Bubble)
    app.component('BubbleList', BubbleList)
    app.component('Conversations', Conversations)
    app.component('Sender', Sender)
    app.component('Typewriter', Typewriter)
  }
}

export default ElementPlusX