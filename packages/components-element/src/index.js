import A3Sender from './components/Sender/index.vue';
import A3Bubble from './components/Bubble/index.vue';
import A3BubbleList from './components/BubbleList/index.vue';
import A3Typewriter from './components/Typewriter/index.vue';
import A3Attachments from './components/Attachments/index.vue';

// 组件数组
const components = [
  A3Sender,
  A3Bubble,
  A3BubbleList,
  A3Typewriter,
  A3Attachments
];

// 定义 install 方法
const install = function(Vue) {
  // 判断是否安装过
  if (install.installed) return;
  install.installed = true;
  
  // 注册组件
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  A3Sender,
  A3Bubble,
  A3BubbleList,
  A3Typewriter,
  A3Attachments
};

export default {
  install,
  A3Bubble,
  A3Typewriter,
  A3BubbleList,
  A3Sender,
  A3Attachments
}; 