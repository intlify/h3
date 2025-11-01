import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['scripts/**', 'playground/**'],
  ignoreDependencies: ['@vitest/coverage-v8', 'lint-staged']
}

export default config
