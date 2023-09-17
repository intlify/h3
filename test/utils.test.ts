import { describe, expect, test } from 'vitest'
import {
  isLocale,
  parseAcceptLanguage,
  validateLanguageTag,
} from '../src/utils.ts'

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

describe('isLocale', () => {
  test('Locale instance', () => {
    expect(isLocale(new Intl.Locale('en-US'))).toBe(true)
  })

  test('not Locale instance', () => {
    expect(isLocale('en-US')).toBe(false)
  })
})

describe('validateLanguageTag', () => {
  test('valid', () => {
    expect(validateLanguageTag('en-US')).toBe(true)
  })

  test('invalid', () => {
    expect(validateLanguageTag('j')).toBe(false)
  })
})
