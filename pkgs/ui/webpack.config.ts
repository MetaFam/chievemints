import path from 'path'
import webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import dotenv from 'dotenv'
import { ExternalProvider } from '@ethersproject/providers'
import postcssPresetEnv from 'postcss-preset-env'
import { defines, hideValues } from './src/lib/build'

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })
const define = defines(process.env)
console.debug({ define: hideValues(define) })

const config = (env: any) => {
  return ({
    mode: 'production',
    entry: './src/main.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv({ stage: 0 })
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(define),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public', to: '.' },
        ],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin(),
      ],
      fallback: {
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert'),
        stream: require.resolve('stream-browserify'),
      }
    },
    optimization: {
      usedExports: true,
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    devtool: 'source-map',
  })
}

export default config