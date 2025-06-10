import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// d.ts 文件生成插件配置
export default dts({
  outDir: 'types', // 输出目录
  tsconfigPath: resolve(__dirname, '../../tsconfig.app.json'), // tsconfig 文件路径
  copyDtsFiles: true, // 复制 d.ts 文件
  exclude: ['dom-speech-recognition-env.d.ts', 'vite-env.d.ts'], // 排除的文件
})
