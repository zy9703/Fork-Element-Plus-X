import { defineConfig } from 'vite'
import plugins from './.build/plugins';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins,
  build: {
    lib: {
      name: 'ElementPlusX',
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['umd'],
      fileName: (format) => {
        return `${format}/index.js`
      },
      cssFileName: 'styles.css'
    },
    rollupOptions: {
      external: ['vue', 'vue/jsx-runtime'],
      output: {
        globals: {
          vue: 'Vue'
        },
      }
    },
    emptyOutDir: false,
    sourcemap: true,
    minify: 'terser',
    cssCodeSplit: false
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
})
