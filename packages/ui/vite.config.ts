import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  NodeGlobalsPolyfillPlugin as ESBuildGlobalsPolyfillsPlugin
} from '@esbuild-plugins/node-globals-polyfill'
import TSConfigPathsPlugin  from 'rollup-plugin-tsconfig-paths'
import NodePolyfillsPlugin from 'rollup-plugin-polyfill-node'
import CommonJSPlugin from '@rollup/plugin-commonjs'
import InjectPlugin from '@rollup/plugin-inject'
import { defines, hideValues } from './src/lib/build'

export default defineConfig(
  ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const define = defines(env)
    console.debug({ define: hideValues(define) })
    
    return {
      plugins: [
        // ResolvePlugin({
        //   browser: true,
        //   preferBuiltins: true,
        //   mainFields: ['browser'],
        // }),
        TSConfigPathsPlugin(),
        NodePolyfillsPlugin({
          // include: null,
        }),
        react(),
      ],
      build: {
        target: ['ES2020'],
        minify: false,
        sourcemap: true,
        modulePreload: {
          polyfill: false,
        },
        commonjsOptions: {
          // exclude: [/tslib/],
          include: [/node_modules/],
          transformMixedEsModules: true,
          ignoreGlobal: false,
          requireReturnsDefault: false,
          // defaultIsModuleExports: true,
          // dynamicRequireTargets: ['**/react/**'],
          // esmExternals: ['react-helmet']
        },
        rollupOptions: {
          // external: ["react", "react-dom"],
          // output: {
          //   globals: { // for UMD build
          //     react: 'React',
          //     'react-dom': 'ReactDOM',
          //   },
          // },
          plugins: [
            InjectPlugin({ Buffer: ['buffer', 'Buffer'] }),
            CommonJSPlugin(),
          ],
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          sourcemap: true,
          define: {
            global: 'globalThis',
          },
          plugins: [
            ESBuildGlobalsPolyfillsPlugin({
              process: true,
              buffer: true
            }),
          ],
        },
      },
      resolve: {
        alias: {
          http: 'stream-http',
          https: 'https-browserify',
          stream: 'stream-browserify',
          util: 'util',
        },
      },
      define,
    }
  }
)
