import { describe, expect, test } from 'vitest'
import { parseAcceptLanguage } from '../src/utils.ts'

describe('parseAcceptLanguage', () => {
  test('basic: ja,en-US;q=0.7,en;q=0.3', () => {
    expect(parseAcceptLanguage('ja,en-US;q=0.7,en;q=0.3')).toEqual([
      'ja',
      'en-US',
      'en',
    ])
  })

  test('q-factor nothing: ja,en-US', () => {
    expect(parseAcceptLanguage('ja,en-US')).toEqual([
      'ja',
      'en-US',
    ])
  })

  test('single: ja', () => {
    expect(parseAcceptLanguage('ja')).toEqual([
      'ja',
    ])
  })

  test('any language: *', () => {
    expect(parseAcceptLanguage('*')).toEqual([])
  })

  test('empty: ""', () => {
    expect(parseAcceptLanguage('')).toEqual([])
  })
})
