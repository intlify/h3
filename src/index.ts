import {
  createCoreContext,
  NOT_REOSLVED,
  translate as _translate,
} from '@intlify/core'
import { getHeaderLocale } from '@intlify/utils/h3'

export * from '@intlify/utils/h3'

import type { AppOptions, H3Event } from 'h3'
import type {
  CoreContext,
  CoreOptions,
  Locale,
  LocaleDetector,
} from '@intlify/core'

declare module 'h3' {
  interface H3EventContext {
    i18n?: CoreContext
  }
}

/**
 * i18n middleware for h3
 *
 * @description
 * The middleware for h3 [`createApp`]({@link https://www.jsdocs.io/package/h3#createApp})
 */
export interface I18nMiddleware {
  /**
   * `onRequest` option of `createApp`
   */
  onRequest: AppOptions['onRequest']
  /**
   * `onAfterResponse` option of `createApp`
   */
  onAfterResponse: AppOptions['onAfterResponse']
}

/**
 * define i18n middleware for h3
 *
 * @description
 * Define the middleware to be specified for h3 [`createApp`]({@link https://www.jsdocs.io/package/h3#createApp})
 *
 * @param {CoreOptions} options - An i18n options like vue-i18n [`createI18n`]({@link https://vue-i18n.intlify.dev/guide/#javascript}), which are passed to `createCoreContext` of `@intlify/core`, see about details [`CoreOptions` of `@intlify/core`](https://github.com/intlify/vue-i18n-next/blob/6a9947dd3e0fe90de7be9c87ea876b8779998de5/packages/core-base/src/context.ts#L196-L216)
 *
 * @returns {I18nMiddleware} A defined i18n middleware, which is included `onRequest` and `onAfterResponse` options of `createApp`
 *
 * @example
 *
 * ```js
 * import { defineI18nMiddleware } from '@intlify/h3'
 *
 * const middleware = defineI18nMiddleware({
 *   messages: {
 *     en: {
 *       hello: 'Hello {name}!',
 *     },
 *     ja: {
 *       hello: 'こんにちは、{name}！',
 *     },
 *   },
 *   // your locale detection logic here
 *   locale: (event) => {
 *     // ...
 *   },
 * })
 *
 * const app = createApp({ ...middleware })
 * ```
 */
export function defineI18nMiddleware(
  options: CoreOptions = {},
): {
  onRequest: AppOptions['onRequest']
  onAfterResponse: AppOptions['onAfterResponse']
} {
  const i18n = createCoreContext(options)
  const orgLocale = i18n.locale

  let staticLocaleDetector: LocaleDetector | null = null
  if (typeof orgLocale === 'string') {
    console.warn(
      `defineI18nMiddleware 'locale' option is static ${orgLocale} locale! you should specify dynamic locale detector function.`,
    )
    staticLocaleDetector = () => orgLocale
  }

  const getLocaleDetector = (event: H3Event): LocaleDetector => {
    // deno-fmt-ignore
    return typeof orgLocale === 'function'
      ? orgLocale.bind(null, event)
      : staticLocaleDetector != null
        ? staticLocaleDetector.bind(null, event)
        : detectLocaleFromAcceptLanguageHeader.bind(null, event)
  }

  return {
    onRequest(event: H3Event) {
      i18n.locale = getLocaleDetector(event)
      event.context.i18n = i18n as CoreContext
    },
    onAfterResponse(event: H3Event) {
      i18n.locale = orgLocale
      delete event.context.i18n
    },
  }
}

/**
 * locale detection with `Accept-Language` header
 *
 * @param {H3Event} event - A h3 event
 *
 * @returns {Locale} A locale string, which will be detected of **first** from `Accept-Language` header
 *
 * @example
 * ```js
 * import { createApp } from 'h3'
 * import { defineI18nMiddleware, detectLocaleWithAcceeptLanguageHeader } from '@intlify/h3'
 *
 * const middleware = defineI18nMiddleware({
 *   messages: {
 *     en: {
 *       hello: 'Hello {name}!',
 *     },
 *     ja: {
 *       hello: 'こんにちは、{name}！',
 *     },
 *   },
 *   locale: detectLocaleWithAcceeptLanguageHeader
 * })
 *
 * const app = createApp({ ...middleware })
 * ```
 */
export const detectLocaleFromAcceptLanguageHeader = (
  event: H3Event,
): Locale => getHeaderLocale(event).toString()

// TODO: should support key completion
type TranslationFunction = (
  key: string,
  ...args: unknown[]
) => string

/**
 * use translation function in event handler
 *
 * @description
 * This function must be initialized with defineI18nMiddleware. See about the {@link defineI18nMiddleware}
 *
 * @param {H3Event} event - A h3 event
 *
 * @returns {TranslationFunction} Return a translation function, which can be translated with i18n resource messages
 *
 * @example
 * ```js
 * import { createRouter } from 'h3'
 *
 * const router = createRouter()
 * router.get(
 *   '/',
 *   eventHandler((event) => {
 *     const t = useTranslation(event)
 *     return t('hello', { name: 'h3' })
 *   }),
 * )
 * ```
 */
// TODO: should support key completion
export function useTranslation(event: H3Event): TranslationFunction {
  if (event.context.i18n == null) {
    throw new Error(
      'middleware not initialized, please setup `onRequest` and `onAfterResponse` options of `createApp` with the middleware obtained with `defineI18nRequestMiddleware`',
    )
  }

  // TODO: should design rest arguments
  function translate(key: string, ...args: unknown[]): string {
    const result = Reflect.apply(_translate, null, [
      event.context.i18n!,
      key,
      ...args,
    ])
    return NOT_REOSLVED === result ? key : result as string
  }

  return translate
}
