// build/scripts/generate-auto-entry.ts
import path from 'node:path'
import { cwd, exit } from 'node:process'
import fs from 'fs-extra'

// 组件信息接口
interface ComponentInfo {
  name: string
  path: string
}

/**
 * 自动生成组件入口文件和安装文件
 */
async function generateAutoEntry() {
  const componentsDir = path.resolve(cwd(), 'src/components')
  const components: ComponentInfo[] = []

  // 扫描组件目录
  if (await fs.exists(componentsDir)) {
    const dirs = await fs.readdir(componentsDir)

    for (const dir of dirs) {
      const compPath = path.join(componentsDir, dir, 'index.vue')
      // 检查组件是否存在 index.vue 文件
      if (await fs.exists(compPath)) {
        // 转换组件名为 PascalCase
        const compName = dir
          .replace(/(^\w|-\w)/g, (m: string) =>
            m.replace('-', '').toUpperCase())

        components.push({
          name: compName,
          path: `./components/${dir}/index.vue`, // 组件路径
        })
      }
    }
  }

  // 生成入口文件内容 (components.ts)
  const entryContent = [
    '// Auto-Element-Plus-X by auto-export-all-components script',
    ...components.map(c => `export { default as ${c.name} } from '${c.path}'`), // 导出所有组件
    '',
  ].join('\n')

  // 生成安装文件内容 (index.ts)
  const installContent = [
    'import type { App, Plugin } from \'vue\'',
    // 'import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from \'./context/constants\'', // 应用程序配置常量 (注释掉)
    ...components.map(c => `import ${c.name} from '${c.path}'`), // 导入所有组件
    '',
    `export * from './components'`, // 导出组件
    `export * from './hooks'`, // 导出 hooks
    '',
    'const ElementPlusX: Plugin = {',
    '  install(app: App) {',
    // '    app.provide(APP_CONFIG_PROVIDE_KEY, defaultAppConfig)', // 提供应用程序配置 (注释掉)
    ...components.map(c => `    app.component('${c.name}', ${c.name})`), // 注册所有组件
    '  }',
    '}',
    '',
    'export default ElementPlusX',
  ].join('\n')

  // 写入文件
  const outputDir = path.resolve(cwd(), 'src')

  try {
    await fs.ensureDir(outputDir) // 确保输出目录存在
    await fs.writeFile(path.join(outputDir, 'components.ts'), entryContent) // 写入 components.ts
    await fs.writeFile(path.join(outputDir, 'index.ts'), installContent) // 写入 index.ts
    console.log('✅ Auto entry files generated successfully!')
  }
  catch (error) {
    console.error('❌ Error generating auto-entry files:', error)
    exit(1)
  }
}

// 执行生成
void generateAutoEntry()
