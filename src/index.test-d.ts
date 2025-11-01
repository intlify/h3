import { expectTypeOf, test } from 'vitest'
import { defineI18nMiddleware, useTranslation } from './index.ts'

import type { H3Event } from 'h3'

/**
 * you can define global resource schema extending with `declare module`
 */
declare module './index.ts' {
  export interface DefineLocaleMessage {
    test: string
  }
}

test('defineI18nMiddleware', () => {
  const en = {
    hello: 'worked',
  }
  type ResourceSchema = typeof en
  defineI18nMiddleware<[ResourceSchema], 'en' | 'ja'>({
    messages: {
      en: { hello: 'world' },
      ja: { hello: '世界' },
    },
  })
})

test('translation function', async () => {
  const eventMock = {
    node: {
      req: {
        method: 'GET',
      },
    },
    context: {},
  } as H3Event

  const resources = {
    foo: 'foo',
    bar: {
      buz: {
        baz: 'baz',
      },
    },
  }

  const t = await useTranslation<typeof resources>(eventMock)
  expectTypeOf<string>(t('test')).toMatchTypeOf<string>()
  expectTypeOf<string>(t('foo')).toMatchTypeOf<string>()
  expectTypeOf<string>(t('bar.buz.baz')).toMatchTypeOf<string>()
})
