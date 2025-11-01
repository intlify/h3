/**
 * Internationalization middleware & utilities for h3
 *
 * @module
 */

/**
 * @author kazuya kawaguchi (a.k.a. kazupon)
 * @license MIT
 */

import {
  translate as _translate,
  createCoreContext,
  NOT_REOSLVED,
  // @ts-expect-error internal function
  parseTranslateArgs
} from '@intlify/core'
import { getHeaderLocale } from '@intlify/utils/h3'

export * from '@intlify/utils/h3'

export type { CoreContext } from '@intlify/core'

import type {
  CoreContext,
  CoreOptions,
  IsEmptyObject,
  Locale,
  LocaleDetector,
  LocaleMessage,
  LocaleParams,
  NamedValue,
  PickupPaths,
  RemovedIndexResources,
  RemoveIndexSignature,
  SchemaParams,
  TranslateOptions
} from '@intlify/core'
import type { AppOptions, H3Event } from 'h3'

declare module 'h3' {
  interface H3EventContext {
    i18n?: CoreContext
    _i18nLocale?: LocaleDetector
  }
}

type DefaultLocaleMessageSchema<
  Schema = RemoveIndexSignature<{
    [K in keyof DefineLocaleMessage]: DefineLocaleMessage[K]
  }>
> = IsEmptyObject<Schema> extends true ? LocaleMessage<string> : Schema

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
  onRequest: NonNullable<AppOptions['onRequest']>
  /**
   * `onAfterResponse` option of `createApp`
   */
  onAfterResponse: NonNullable<AppOptions['onAfterResponse']>
}

/**
 * define i18n middleware for h3
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
 *
 * @description
 * Define the middleware to be specified for h3 [`createApp`]({@link https://www.jsdocs.io/package/h3#createApp})
 *
 * @param options - An i18n options like vue-i18n [`createI18n`]({@link https://vue-i18n.intlify.dev/guide/#javascript}), which are passed to `createCoreContext` of `@intlify/core`, see about details [`CoreOptions` of `@intlify/core`](https://github.com/intlify/vue-i18n-next/blob/6a9947dd3e0fe90de7be9c87ea876b8779998de5/packages/core-base/src/context.ts#L196-L216)
 *
 * @returns A defined i18n middleware, which is included `onRequest` and `onAfterResponse` options of `createApp`
 */
export function defineI18nMiddleware<
  Schema = DefaultLocaleMessageSchema,
  Locales = string,
  Message = string,
  Options extends CoreOptions<
    Message,
    SchemaParams<Schema, Message>,
    LocaleParams<Locales>
  > = CoreOptions<Message, SchemaParams<Schema, Message>, LocaleParams<Locales>>
>(options: Options): I18nMiddleware {
  const i18n = createCoreContext(options as CoreOptions)
  const orgLocale = i18n.locale

  let staticLocaleDetector: LocaleDetector | null = null
  if (typeof orgLocale === 'string') {
    console.warn(
      `defineI18nMiddleware 'locale' option is static ${orgLocale} locale! you should specify dynamic locale detector function.`
    )
    staticLocaleDetector = () => orgLocale
  }

  const getLocaleDetector = (event: H3Event, i18n: CoreContext): LocaleDetector => {
    // deno-fmt-ignore
    return typeof orgLocale === 'function'
      ? orgLocale.bind(null, event, i18n)
      : staticLocaleDetector == null
        ? detectLocaleFromAcceptLanguageHeader.bind(null, event)
        : staticLocaleDetector.bind(null, event, i18n)
  }

  return {
    onRequest(event: H3Event) {
      event.context._i18nLocale = getLocaleDetector(event, i18n as CoreContext)
      i18n.locale = event.context._i18nLocale
      event.context.i18n = i18n as CoreContext
    },
    onAfterResponse(event: H3Event) {
      i18n.locale = orgLocale
      delete event.context.i18n
    }
  }
}

/**
 * locale detection with `Accept-Language` header
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
 *
 * @param event - A h3 event
 *
 * @returns A locale string, which will be detected of **first** from `Accept-Language` header
 */
export const detectLocaleFromAcceptLanguageHeader = (event: H3Event): Locale =>
  getHeaderLocale(event).toString()

/**
 * The type definition of Locale Message for `@intlify/h3` package
 *
 * @example
 * ```ts
 * // type.d.ts (`.d.ts` file at your app)
 * import { DefineLocaleMessage } from '@intlify/h3'
 *
 * declare module '@intlify/h3' {
 *   export interface DefineLocaleMessage {
 *     title: string
 *     menu: {
 *       login: string
 *     }
 *   }
 * }
 * ```
 *
 * @description
 * The typealias is used to strictly define the type of the Locale message.
 */
export interface DefineLocaleMessage extends LocaleMessage<string> {}

type ResolveResourceKeys<
  Schema extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any -- NOTE(kazupon): generic type
  DefineLocaleMessageSchema extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any -- NOTE(kazupon): generic type
  DefinedLocaleMessage extends
    RemovedIndexResources<DefineLocaleMessageSchema> = RemovedIndexResources<DefineLocaleMessageSchema>,
  SchemaPaths = IsEmptyObject<Schema> extends false
    ? PickupPaths<{ [K in keyof Schema]: Schema[K] }>
    : never,
  DefineMessagesPaths = IsEmptyObject<DefinedLocaleMessage> extends false
    ? PickupPaths<{
        [K in keyof DefinedLocaleMessage]: DefinedLocaleMessage[K]
      }>
    : never
> = SchemaPaths | DefineMessagesPaths

/**
 * The translation function, which will be defined by {@link useTranslation}.
 */
interface TranslationFunction<
  Schema extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any -- NOTE(kazupon): generic type
  DefineLocaleMessageSchema extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any -- NOTE(kazupon): generic type
  ResourceKeys = ResolveResourceKeys<Schema, DefineLocaleMessageSchema>
> {
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {number} plural - A plural choice number
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, plural: number): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {number} plural - A plural choice number
   * @param {TranslateOptions} options - A translate options, about details see {@link TranslateOptions}
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, plural: number, options: TranslateOptions): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {string} defaultMsg - A default message, if the key is not found
   * @returns {string} A translated message, if the key is not found, return the `defaultMsg` argument
   */
  <Key extends string>(key: Key | ResourceKeys, defaultMsg: string): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {string} defaultMsg - A default message, if the key is not found
   * @param {TranslateOptions} options - A translate options, about details see {@link TranslateOptions}
   * @returns {string} A translated message, if the key is not found, return the `defaultMsg` argument
   */
  <Key extends string>(
    key: Key | ResourceKeys,
    defaultMsg: string,
    options: TranslateOptions
  ): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {unknown[]} list - A list for list interpolation
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, list: unknown[]): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {unknown[]} list - A list for list interpolation
   * @param {number} plural - A plural choice number
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, list: unknown[], plural: number): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {unknown[]} list - A list for list interpolation
   * @param {string} defaultMsg - A default message, if the key is not found
   * @returns {string} A translated message, if the key is not found, return the `defaultMsg` argument
   */
  <Key extends string>(key: Key | ResourceKeys, list: unknown[], defaultMsg: string): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {unknown[]} list - A list for list interpolation
   * @param {TranslateOptions} options - A translate options, about details see {@link TranslateOptions}
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, list: unknown[], options: TranslateOptions): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {NamedValue} named - A named value for named interpolation
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, named: NamedValue): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {NamedValue} named - A named value for named interpolation
   * @param {number} plural - A plural choice number
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(key: Key | ResourceKeys, named: NamedValue, plural: number): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {NamedValue} named - A named value for named interpolation
   * @param {string} defaultMsg - A default message, if the key is not found
   * @returns {string} A translated message, if the key is not found, return the `defaultMsg` argument
   */
  <Key extends string>(key: Key | ResourceKeys, named: NamedValue, defaultMsg: string): string
  /**
   * @param {Key | ResourceKeys} key - A translation key
   * @param {NamedValue} named - A named value for named interpolation
   * @param {TranslateOptions} options - A translate options, about details see {@link TranslateOptions}
   * @returns {string} A translated message, if the key is not found, return the key
   */
  <Key extends string>(
    key: Key | ResourceKeys,
    named: NamedValue,
    options: TranslateOptions
  ): string
}

/**
 * use translation function in event handler
 *
 * @example
 * ```js
 * import { createRouter } from 'h3'
 *
 * const router = createRouter()
 * router.get(
 *   '/',
 *   eventHandler(async (event) => {
 *     const t = await useTranslation(event)
 *     return t('hello', { name: 'h3' })
 *   }),
 * )
 * ```
 *
 * @description
 * This function must be initialized with defineI18nMiddleware. See about the {@link defineI18nMiddleware}
 *
 * @param event - A h3 event
 *
 * @returns Return a translation function, which can be translated with i18n resource messages
 */
export async function useTranslation<
  Schema extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/no-explicit-any -- NOTE(kazupon): generic type
  Event extends H3Event = H3Event
>(event: Event): Promise<TranslationFunction<Schema, DefineLocaleMessage>> {
  if (event.context.i18n == null) {
    throw new Error(
      'middleware not initialized, please setup `onRequest` and `onAfterResponse` options of `createApp` with the middleware obtained with `defineI18nMiddleware`'
    )
  }

  const localeDetector = event.context._i18nLocale as unknown as LocaleDetector
  let locale: string
  if (localeDetector.constructor.name === 'AsyncFunction') {
    locale = await localeDetector(event)
    event.context.i18n.locale = locale
  }

  function translate(key: string, ...args: unknown[]): string {
    const [_, options] = parseTranslateArgs(key, ...args)
    const [arg2] = args
    const result = Reflect.apply(_translate, null, [
      event.context.i18n!,
      key,
      arg2,
      {
        // bind to request locale
        locale,
        ...options
      }
    ])
    return NOT_REOSLVED === result ? key : (result as string)
  }

  return translate as TranslationFunction<Schema, DefineLocaleMessage>
}
