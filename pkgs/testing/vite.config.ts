import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { defines, hideValues } from './src/lib/build'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const define = defines(env)
  console.debug({ define: hideValues(define) })

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    define,
  }
})
