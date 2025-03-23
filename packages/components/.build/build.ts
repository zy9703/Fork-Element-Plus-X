import type { BuildEnvironmentOptions } from 'vite'
import { resolve } from 'node:path'

const buildConfig: BuildEnvironmentOptions = {
  lib: {
    name: 'ElementPlusX',
    entry: {
      'index': resolve(__dirname, '../src/index.ts'),
      'Bubble/index': resolve(__dirname, '../src/components/Bubble/index.vue'),
      'BubbleList/index': resolve(__dirname, '../src/components/BubbleList/index.vue'),
      'Sender/index': resolve(__dirname, '../src/components/Sender/index.vue'),
      'Typewriter/index': resolve(__dirname, '../src/components/Typewriter/index.vue'),
      'components': resolve(__dirname, '../src/components.ts'),
    },
    fileName: (format, entryName) => {
      return `${format}/${entryName}.js`
    },
    formats: ['es'],
  },
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    external: ['vue', 'vue/jsx-runtime'],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue',
      },
      exports: 'named', // 确保有命名导出
      assetFileNames: ((info: any) => {
        const srcName = info.originalFileNames[0]
        if (srcName) {
          if (srcName.includes('src/components/')) {
            const fileName = srcName.replace('src/components/', '').replace('index.vue', 'index.css')
            return `es/${fileName}`
          }
        }
        return info.name
      }) as unknown as string,
    },
  },
  sourcemap: true,
  // 减少文件大小
  minify: 'terser',
  // CSS 处理
  cssCodeSplit: true,
  // 确保只生成一个CSS文件
  emptyOutDir: false,
}

export default buildConfig
