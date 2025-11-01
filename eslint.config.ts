import { includeIgnoreFile } from '@eslint/compat'
import {
  comments,
  defineConfig,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  prettier,
  promise,
  regexp,
  stylistic,
  typescript,
  unicorn,
  vitest,
  yaml
} from '@kazupon/eslint-config'
import { globalIgnores } from 'eslint/config'
import { fileURLToPath, URL } from 'node:url'

import type { Linter } from 'eslint'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

const config: ReturnType<typeof defineConfig> = defineConfig(
  javascript(),
  stylistic(),
  comments({
    kazupon: {
      ignores: [
        './scripts/**',
        './playground/**',
        './spec/**',
        './src/**/*.test-d.ts',
        './src/**/*.test.ts'
      ]
    }
  }),
  jsdoc({
    typescript: 'syntax',
    ignores: ['./playground/**']
  }),
  imports({
    typescript: true,
    rules: {
      'import/extensions': ['error', 'always', { ignorePackages: true }]
    }
  }),
  promise(),
  regexp(),
  unicorn({
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/consistent-function-scoping': 'off'
    }
  }),
  typescript({
    parserOptions: {
      tsconfigRootDir: import.meta.dirname
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }),
  jsonc({
    json: true,
    json5: true,
    jsonc: true,
    prettier: true
  }),
  yaml({
    prettier: true
  }),
  markdown({
    preferences: true
  }),
  vitest(),
  prettier(),
  includeIgnoreFile(gitignorePath),
  globalIgnores([
    '.vscode',
    'tsconfig.json',
    'pnpm-lock.yaml',
    'playground/**',
    'CHANGELOG.md',
    '.devcontainer/**',
    '.github/FUNDING.yml'
  ]) as Linter.Config
)

export default config
