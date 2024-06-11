import postcssPresetEnv from 'postcss-preset-env'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: [
    postcssPresetEnv({ stage: 0 })
  ],
}