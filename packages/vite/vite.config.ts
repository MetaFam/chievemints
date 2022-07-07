import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import GlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill'
// import ModulesPolyfill from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        GlobalsPolyfill({
          process: true,
          buffer: true,
        }),
//        ModulesPolyfill()
      ],
    },
  },
})