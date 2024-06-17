// eslint.config.mjs
import { eslint } from 'eslint-plugin-import'
import tsEslint from 'typescript-eslint/eslint-plugin'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

const config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/warnings',
    'plugin:prettier/recommended' // 添加 Prettier 插件
  ],
  plugins: ['import', 'react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect' // 或者指定 React 版本，例如 "17.0"
    },
    'import/resolver': {
      // 如果你使用了 webpack 等构建工具，可以在这里配置模块解析器
      // node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    }
  },
  rules: {
    'import/no-unresolved': 'error', // 启用 import 规则
    'prettier/prettier': 'error', // 启用 Prettier 规则
    'react-hooks/rules-of-hooks': 'error', // 启用 React Hooks 规则
    'react-hooks/exhaustive-deps': 'warn' // 启用依赖检查规则
    // 其他规则...
  },
  overrides: [
    // 如果你有特定的配置需求，可以在这里覆盖主配置
    {
      files: ['*.js', '*.jsx'],
      rules: {
        // JS/JSX 特定规则
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript/TSX 特定规则
        '@typescript-eslint/no-unused-vars': 'warn'
        // 其他 TypeScript 规则...
      }
    }
  ],
  // 环境配置
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: globals.browser // 设置全局变量
}
export default config
