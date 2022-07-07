// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import nodePolyfills from "rollup-plugin-polyfill-node"
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
// import builtins from "rollup-plugin-node-builtins";
// import globals from "rollup-plugin-node-globals";


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   // ...other config settings
//   optimizeDeps: {
//       esbuildOptions: {
//           // Node.js global to browser globalThis
//           define: {
//               global: 'globalThis'
//           },
//           // Enable esbuild polyfill plugins
//           plugins: [
//               NodeGlobalsPolyfillPlugin({
//                   buffer: false,
//               }),
//               NodeModulesPolyfills()
//           ]
//       }
//   }
// })



// const production = process.env.NODE_ENV === "production";

// const builtinsPlugin = {
//     ...builtins({ crypto: true, buffer: true }),
//     name: "builtins",
//   };
//   const globalsPlugin = {
//     ...globals({buffer: true}),
//     name: "globals",
//   };

// export default {
//   plugins: [
//     // ↓ Needed for development mode

//     builtinsPlugin, globalsPlugin

//     // !production &&
//     //   nodePolyfills({
//     //     include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
//     //   })
//   ],
//   optimizeDeps: {
//     esbuildOptions: {
//     // Node.js global to browser globalThis
//       define: {
//        global: 'globalThis'
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//             buffer: true,
//         }),
//       ]
//     }
//   },

//   build: {
//     rollupOptions: {
//       entry: 'main.js',
//       plugins: [
//         builtinsPlugin, globalsPlugin
//         // ↓ Needed for build
//         // nodePolyfills()
//       ]
//     },
//     // ↓ Needed for build if using WalletConnect and other providers
//     commonjsOptions: {
//       transformMixedEsModules: true
//     }
//   }
// };

import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
  plugins: [
    react()
  ],
  optimizeDeps: {
    exclude: [
      'web3',
    ], // <= The libraries that need shimming should be excluded from dependency optimization.
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
    },
  },
    build: {
      sourcemap: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
      },
    },
    resolve: {
      alias: {
        process: "process/browser",
        // stream: "stream-browserify",
        // zlib: "browserify-zlib",
        util: 'util',
        '@': path.resolve(__dirname, './src'),
      },
    },
  })