import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base.css'

// 导入Markdown和代码高亮相关样式
import 'github-markdown-css'
import 'prismjs/themes/prism.css'

// 导入自定义组件库
import ElementPlusX from './index.js'

// 注册Element UI
Vue.use(ElementUI)

// 注册自定义组件
Vue.use(ElementPlusX)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
