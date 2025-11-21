import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {
  NodeGlobalsPolyfillPlugin as ESBuildGlobalsPolyfillsPlugin
} from '@esbuild-plugins/node-globals-polyfill'
import TSConfigPathsPlugin from 'vite-tsconfig-paths'
import NodePolyfillsPlugin from 'rollup-plugin-polyfill-node'
import ViteCommonJSPlugin from 'vite-plugin-commonjs'
import RollupCommonJSPlugin from '@rollup/plugin-commonjs'
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
        ViteCommonJSPlugin({
          filter(id) {
            const match = (
              /\/node_modules\//.test(id)
              && (
                /cookie/.test(id)
                || /react/.test(id)
              ) &&
              !/\.(m|t)js$/.test(id)
            )
            console.info({ id, match })
            return match
          },
          dynamic: { onFiles(files) {
            console.info({ files })
            return files
          } },
        }),
        NodePolyfillsPlugin({
          // include: null,
        }),
        react(),
      ],
      build: {
        target: ['ES2022'],
        minify: false,
        sourcemap: true,
        // modulePreload: {
        //   polyfill: false,
        // },
        commonjsOptions: {
          // exclude: [/tslib/],
          include: [
            /react/,
            /rehackt/,
            /cookie/,
            /set-cookie-parser/,
          ],
          // transformMixedEsModules: true,
          ignoreGlobal: false,
          requireReturnsDefault: 'auto',
          defaultIsModuleExports: 'auto',
          // dynamicRequireTargets: ['**/elliptic/**'],
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
            RollupCommonJSPlugin(),
          ],
        },
      },
      optimizeDeps: {
        include: ['cookie', 'set-cookie-parser'],
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
