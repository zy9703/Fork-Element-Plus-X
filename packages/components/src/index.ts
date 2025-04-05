import type { App, Plugin } from 'vue'
import Bubble from './components/Bubble/index.vue'
import BubbleList from './components/BubbleList/index.vue'
import Sender from './components/Sender/index.vue'
import Thought from './components/Thought/index.vue'
import ThoughtChain from './components/ThoughtChain/index.vue'
import Typewriter from './components/Typewriter/index.vue'
import Welcome from './components/Welcome/index.vue'

export * from './components'
export * from './hooks'

const ElementPlusX: Plugin = {
  install(app: App) {
    app.component('Bubble', Bubble)
    app.component('BubbleList', BubbleList)
    app.component('Sender', Sender)
    app.component('Thought', Thought)
    app.component('ThoughtChain', ThoughtChain)
    app.component('Typewriter', Typewriter)
    app.component('Welcome', Welcome)
  }
}

export default ElementPlusX