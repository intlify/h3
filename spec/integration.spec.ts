import { afterEach, describe, expect, test, vi } from 'vitest'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { getQueryLocale } from '@intlify/utils/h3'
import supertest from 'supertest'

import {
  defineI18nMiddleware,
  detectLocaleFromAcceptLanguageHeader,
  useTranslation,
} from '../src/index.ts'

import type { App, H3Event } from 'h3'
import type { CoreContext } from '@intlify/core'
import type { DefineLocaleMessage } from '../src/index.ts'

let app: App
let request: ReturnType<typeof supertest>

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
    eventHandler(async (event) => {
      const t = await useTranslation(event)
      return { message: t('hello', { name: 'h3' }) }
    }),
  )

  const res = await request.get('/').set(
    'accept-language',
    'en;q=0.9,ja;q=0.8',
  )
  expect(res.body).toEqual({ message: 'hello, h3' })
})

describe('custom locale detection', () => {
  test('basic', async () => {
    // define custom locale detector
    const localeDetector = (event: H3Event): string => {
      return getQueryLocale(event).toString()
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
      eventHandler(async (event) => {
        const t = await useTranslation(event)
        return { message: t('hello', { name: 'h3' }) }
      }),
    )

    const res = await request.get('/?locale=ja')
    expect(res.body).toEqual({ message: 'こんにちは, h3' })
  })

  test('async', async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const loader = (path: string) => import(path).then((m) => m.default || m)
    const messages: Record<string, () => ReturnType<typeof loader>> = {
      en: () => loader('./fixtures/en.json'),
      ja: () => loader('./fixtures/ja.json'),
    }

    // async locale detector
    const localeDetector = async (
      event: H3Event,
      i18n: CoreContext<string, DefineLocaleMessage>,
    ) => {
      const locale = getQueryLocale(event).toString()
      await sleep(100)
      const loader = messages[locale]
      if (loader && !i18n.messages[locale]) {
        const message = await loader()
        i18n.messages[locale] = message
      }
      return locale
    }

    const middleware = defineI18nMiddleware({
      locale: localeDetector,
      messages: {
        en: {
          hello: 'hello, {name}',
        },
      },
    })
    app = createApp({ ...middleware })
    request = supertest(toNodeListener(app))

    app.use(
      '/',
      eventHandler(async (event) => {
        const t = await useTranslation(event)
        return { message: t('hello', { name: 'h3' }) }
      }),
    )

    const translated: Record<string, { message: string }> = {
      en: {
        message: 'hello, h3',
      },
      ja: {
        message: 'こんにちは, h3',
      },
    }
    for (const locale of ['en', 'ja']) {
      const res = await request.get(`/?locale=${locale}`)
      expect(res.body).toEqual(translated[locale])
    }
  })
  test('async parallel', async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const loader = (path: string) => import(path).then((m) => m.default || m)
    const messages: Record<string, () => ReturnType<typeof loader>> = {
      en: () => loader('./fixtures/en.json'),
      ja: () => loader('./fixtures/ja.json'),
    }

    // async locale detector
    const localeDetector = async (
      event: H3Event,
      i18n: CoreContext<string, DefineLocaleMessage>,
    ) => {
      const locale = getQueryLocale(event).toString()
      await sleep(100)
      const loader = messages[locale]
      if (loader && !i18n.messages[locale]) {
        const message = await loader()
        i18n.messages[locale] = message
      }
      return locale
    }

    const middleware = defineI18nMiddleware({
      locale: localeDetector,
      messages: {
        en: {
          hello: 'hello, {name}',
        },
      },
    })
    app = createApp({ ...middleware })
    request = supertest(toNodeListener(app))

    app.use(
      '/',
      eventHandler(async (event) => {
        await sleep(100)
        const t = await useTranslation(event)
        await sleep(100)
        return { message: t('hello', { name: 'h3' }) }
      }),
    )

    const translated: Record<string, { message: string }> = {
      en: {
        message: 'hello, h3',
      },
      ja: {
        message: 'こんにちは, h3',
      },
    }
    // request in parallel
    const resList = await Promise.all(
      ['en', 'ja'].map((locale) =>
        request.get(`/?locale=${locale}`).then((res: { body: string }) => res.body)
      ),
    )
    expect(resList).toEqual([translated['en'], translated['ja']])
  })
})
