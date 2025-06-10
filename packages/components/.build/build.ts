import type { BuildEnvironmentOptions } from 'vite'
import { extname, join, relative, resolve } from 'node:path'
import fg from 'fast-glob'

// 获取当前文件所在目录的根路径
const root = resolve(__dirname, '../')

// 查找所有组件入口文件
const entries = fg.globSync('src/components/*/*.(tsx|ts|vue)', {
  ignore: ['src/components/**/*.d.ts', 'src/components/**/*.types.ts'], // 忽略类型声明文件
})

// 查找所有 hooks 入口文件
const hooksEntries = fg.globSync('src/hooks/*.(ts|tsx)', {
  ignore: ['src/hooks/**/*.d.ts', 'src/hooks/**/*.types.ts'], // 忽略类型声明文件
})

// 将组件入口文件路径转换为对象格式
const entriesObj = Object.fromEntries(entries.map((f) => {
  return [
    relative('src/components', f.slice(0, f.length - extname(f).length)),
    join(root, f),
  ]
}))

// 将 hooks 入口文件路径转换为对象格式
const hooksEntriesObj = Object.fromEntries(hooksEntries.map((f) => {
  return [
    `hooks/${relative('src/hooks', f.slice(0, f.length - extname(f).length))}`,
    join(root, f),
  ]
}))

// 构建配置
const buildConfig: BuildEnvironmentOptions = {
  lib: {
    name: 'ElementPlusX', // 库的名称
    entry: {
      index: resolve(__dirname, '../src/index.ts'), // 主入口文件
      components: resolve(__dirname, '../src/components.ts'), // 组件入口文件
      ...entriesObj, // 动态添加的组件入口
      ...hooksEntriesObj, // 动态添加的 hooks 入口
    },
    fileName: (format, entryName) => {
      return `${format}/${entryName}.js` // 输出文件名格式
    },
    formats: ['es'], // 输出格式，这里是 ES 模块
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
  sourcemap: true, // 生成 sourcemap
  // 减少文件大小
  minify: 'terser',
  // CSS 处理
  cssCodeSplit: true,
  // 确保只生成一个CSS文件
  emptyOutDir: false,
}

export default buildConfig
