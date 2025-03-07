import type { BuildEnvironmentOptions } from "vite";
import { resolve } from "path";

const buildConfig: BuildEnvironmentOptions = {
  lib: {
    name: 'ElementPlusX',
    entry: resolve(__dirname, "../src/index.ts"),
    fileName: (format, entryName) => {
      return `${format}/${entryName}.js`
    }
  },
  rollupOptions: {
    // 确保外部化处理那些你不想打包进库的依赖
    external: ['vue'],
    output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      globals: {
        vue: 'Vue'
      },
      exports: 'named' // 确保有命名导出
    },
  },
  sourcemap: true,
  // 减少文件大小
  minify: 'terser',
  // CSS 处理
  cssCodeSplit: true,
  // 确保只生成一个CSS文件
  emptyOutDir: true
}

export default buildConfig;
