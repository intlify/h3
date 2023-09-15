import { describe, expect, test } from 'vitest'
import { getAcceptLanguages } from '../src/index.ts'

import type { H3Event } from 'h3'

describe('getAcceptLanguages', () => {
  test('basic', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            'accept-language': 'en-US,en;q=0.9,ja;q=0.8',
          },
        },
      },
    } as H3Event
    expect(getAcceptLanguages(eventMock)).toEqual(['en-US', 'en', 'ja'])
  })

  test('any language', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            'accept-language': '*',
          },
        },
      },
    } as H3Event
    expect(getAcceptLanguages(eventMock)).toEqual([])
  })

  test('empty', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {},
        },
      },
    } as H3Event
    expect(getAcceptLanguages(eventMock)).toEqual([])
  })
})
