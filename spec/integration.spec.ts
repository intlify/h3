import { afterEach, expect, test, vi } from 'vitest'
import { createApp, eventHandler, getRequestURL, toNodeListener } from 'h3'
import supertest from 'supertest'
import { getQueryLocale } from '@intlify/utils'

import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from '../src/index.ts'

import type { App, H3Event } from 'h3'
import type { SuperTest, Test } from 'supertest'

let app: App
let request: SuperTest<Test>

afterEach(() => {
  vi.resetAllMocks()
})

test('translation', async () => {
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
  app = createApp({ ...middleware })
  request = supertest(toNodeListener(app))

  app.use(
    '/',
    eventHandler((event) => {
      const t = useTranslation(event)
      return { message: t('hello', { name: 'h3' }) }
    }),
  )

  const res = await request.get('/').set(
    'accept-language',
    'en;q=0.9,ja;q=0.8',
  )
  expect(res.body).toEqual({ message: 'hello, h3' })
})

test('custom locale detection', async () => {
  const defaultLocale = 'en'
  // TODO: should be improved locale detector arguments, first argument should be passed default locale
  const localeDetector = (event: H3Event): string => {
    try {
      const url = getRequestURL(event)
      console.log('custom locale detector:', url)
      // TODO: use `getQueryLocale` from `@intlify/utils/h3`
      const locale = getQueryLocale(url)
      console.log('custom locale detector:', locale)
      return locale.toString()
    } catch (_e) {
      return defaultLocale
    }
  }
  const middleware = defineI18nMiddleware({
    locale: localeDetector,
    messages: {
      en: {
        hello: 'hello, {name}',
      },
      ja: {
        hello: 'こんにちは, {name}',
      },
    },
  })
  app = createApp({ ...middleware })
  request = supertest(toNodeListener(app))

  app.use(
    '/',
    eventHandler((event) => {
      const t = useTranslation(event)
      return { message: t('hello', { name: 'h3' }) }
    }),
  )

  const res = await request.get('/?locale=ja')
  expect(res.body).toEqual({ message: 'こんにちは, h3' })
})
