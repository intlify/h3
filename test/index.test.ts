import { beforeEach, describe, expect, test } from 'vitest'
import { createApp, eventHandler, toNodeListener } from 'h3'
import supertest from 'supertest'
import {
  getAcceptLanguages,
  getCookieLocale,
  getLocale,
  setCookieLocale,
} from '../src/index.ts'

import type { App, H3Event } from 'h3'
import type { SuperTest, Test } from 'supertest'

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

describe('getLocale', () => {
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
    const locale = getLocale(eventMock)

    expect(locale.baseName).toEqual('en-US')
    expect(locale.language).toEqual('en')
    expect(locale.region).toEqual('US')
  })

  test('accept-language is any language', () => {
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
    const locale = getLocale(eventMock)

    expect(locale.baseName).toEqual('en-US')
  })

  test('specify default language', () => {
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
    const locale = getLocale(eventMock, 'ja-JP')

    expect(locale.baseName).toEqual('ja-JP')
  })

  test('RangeError', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            'accept-language': 's',
          },
        },
      },
    } as H3Event

    expect(() => getLocale(eventMock, 'ja-JP')).toThrowError(RangeError)
  })
})

describe('getCookieLocale', () => {
  test('basic', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            cookie: 'i18n_locale=ja-US',
          },
        },
      },
    } as H3Event
    const locale = getCookieLocale(eventMock)

    expect(locale.baseName).toEqual('ja-US')
    expect(locale.language).toEqual('ja')
    expect(locale.region).toEqual('US')
  })

  test('cookie is empty', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {},
        },
      },
    } as H3Event
    const locale = getCookieLocale(eventMock)

    expect(locale.baseName).toEqual('en-US')
  })

  test('specify default language', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {},
        },
      },
    } as H3Event
    const locale = getCookieLocale(eventMock, { lang: 'ja-JP' })

    expect(locale.baseName).toEqual('ja-JP')
  })

  test('specify cookie name', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            cookie: 'intlify_locale=fr-FR',
          },
        },
      },
    } as H3Event
    const locale = getCookieLocale(eventMock, { name: 'intlify_locale' })

    expect(locale.baseName).toEqual('fr-FR')
  })

  test('RangeError', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {
            cookie: 'intlify_locale=f',
          },
        },
      },
    } as H3Event

    expect(() => getCookieLocale(eventMock, { name: 'intlify_locale' }))
      .toThrowError(RangeError)
  })
})

describe('setCookieLocale', () => {
  let app: App
  let request: SuperTest<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  test('specify Locale instance', async () => {
    app.use(
      '/',
      eventHandler((event) => {
        const locale = new Intl.Locale('ja-JP')
        setCookieLocale(event, locale)
        return '200'
      }),
    )
    const result = await request.get('/')
    expect(result.headers['set-cookie']).toEqual([
      'i18n_locale=ja-JP; Path=/',
    ])
  })

  test('specify language tag', async () => {
    app.use(
      '/',
      eventHandler((event) => {
        setCookieLocale(event, 'ja-JP')
        return '200'
      }),
    )
    const result = await request.get('/')
    expect(result.headers['set-cookie']).toEqual([
      'i18n_locale=ja-JP; Path=/',
    ])
  })

  test('specify cookie name', async () => {
    app.use(
      '/',
      eventHandler((event) => {
        setCookieLocale(event, 'ja-JP', { name: 'intlify_locale' })
        return '200'
      }),
    )
    const result = await request.get('/')
    expect(result.headers['set-cookie']).toEqual([
      'intlify_locale=ja-JP; Path=/',
    ])
  })

  test('Syntax Error', () => {
    const eventMock = {
      node: {
        req: {
          method: 'GET',
          headers: {},
        },
      },
    } as H3Event

    expect(() => setCookieLocale(eventMock, 'j'))
      .toThrowError(/locale is invalid: j/)
  })
})
