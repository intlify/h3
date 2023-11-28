import { describe, expect, test } from 'vitest'
import { createCoreContext } from '@intlify/core'

import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from './index.ts'

import type { H3Event } from 'h3'
import type { CoreContext, LocaleDetector } from '@intlify/core'

test('detectLocaleFromAcceptLanguageHeader', () => {
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
  expect(detectLocaleFromAcceptLanguageHeader(eventMock)).toBe('en-US')
})

test('defineI18nMiddleware', () => {
  const middleware = defineI18nMiddleware({
    locale: detectLocaleFromAcceptLanguageHeader,
    messages: {
      en: {
        hello: 'hello, {name}',
      },
      ja: {
        hello: 'こんにちは, {name}',
      },
    },
  })
  expect(middleware.onRequest).toBeDefined()
  expect(middleware.onAfterResponse).toBeDefined()
})

describe('useTranslation', () => {
  test('basic', async () => {
    /**
     * setup `defineI18nMiddleware` emulates
     */
    const context = createCoreContext({
      locale: detectLocaleFromAcceptLanguageHeader,
      messages: {
        en: {
          hello: 'hello, {name}',
        },
        ja: {
          hello: 'こんにちは, {name}',
        },
      },
    })
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            'accept-language': 'ja,en',
          },
        },
      },
      context: {
        i18n: context as CoreContext,
      },
    } as H3Event
    const locale = context.locale as unknown
    const bindLocaleDetector = (locale as LocaleDetector).bind(null, eventMock)
    // @ts-ignore ignore type error because this is test
    context.locale = bindLocaleDetector

    // test `useTranslation`
    const t = await useTranslation(eventMock)
    expect(t('hello', { name: 'h3' })).toEqual('こんにちは, h3')
  })

  test('not initilize context', async () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            'accept-language': 'ja,en',
          },
        },
      },
      context: {},
    } as H3Event

    await expect(() => useTranslation(eventMock)).rejects.toThrowError()
  })
})
