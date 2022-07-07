import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ESBuildGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill'
import RollupBuiltinsPolyfill from 'rollup-plugin-node-polyfills'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import ModulesPolyfill from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],

  optimizeDeps: {
    include: ['react/jsx-runtime'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        ESBuildGlobalsPolyfill({
          process: true,
          buffer: true,
        }),
//        ModulesPolyfill()
      ],
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    },
    rollupOptions: {
      input: 'src/main.tsx',
      plugins: [
        // RollupBuiltinsPolyfill(),
        nodeResolve(),
        commonjs(),
      ]
    }
  }
})