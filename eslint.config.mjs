// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.vue'],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      // 允許 HTML void elements 使用自閉合（官方建議，避免和 Prettier 打架）
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',     // <img /> <br /> <input /> ...
          normal: 'never',
          component: 'always'
        }
      }]
    }
  }
)
