import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default dts({
  outDir: 'types',
  tsconfigPath: resolve(__dirname, '../../tsconfig.app.json')
})
