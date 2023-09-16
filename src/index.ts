import { getCookie, getHeaders } from 'h3'
import { parseAcceptLanguage } from './utils.ts'

import type { H3Event } from 'h3'

/**
 * get accpet languages
 *
 * @description parse `accept-language` header string
 *
 * @param {H3Event} event The H3 event
 *
 * @returns {Array<string>} The array of language tags, if `*` (any language) or empty string is detected, return an empty array.
 */
export function getAcceptLanguages(event: H3Event): string[] {
  const headers = getHeaders(event)
  const acceptLanguage = headers['accept-language']
  return acceptLanguage ? parseAcceptLanguage(acceptLanguage) : []
}

/**
 * get locale
 *
 * @param {H3Event} event The H3 event
 * @param {string} lang The default language tag, default is `en-US`. You must specify the language tag with the {@link https://datatracker.ietf.org/doc/html/rfc4646#section-2.1 | BCP 47 syntax}.
 *
 * @throws {RangeError} Throws a `RangeError` if `lang` option or `accpet-languages` are not a well-formed BCP 47 language tag.
 *
 * @returns {Intl.Locale} The locale that resolved from `accept-language` header string, first language tag is used. if `*` (any language) or empty string is detected, return `en-US`.
 */
export function getLocale(event: H3Event, lang = 'en-US'): Intl.Locale {
  const language = getAcceptLanguages(event)[0] || lang
  return new Intl.Locale(language)
}

/**
 * get locale from cookie
 *
 * @param {H3Event} event The H3 event
 * @param {string} options.lang The default language tag, default is `en-US`. You must specify the language tag with the {@link https://datatracker.ietf.org/doc/html/rfc4646#section-2.1 | BCP 47 syntax}.
 * @param {string} options.name The cookie name, default is `i18n_locale`
 *
 * @throws {RangeError} Throws a `RangeError` if `lang` option or cookie name value are not a well-formed BCP 47 language tag.
 *
 * @returns The locale that resolved from cookie
 */
export function getCookieLocale(
  event: H3Event,
  { lang = 'en-US', name = 'i18n_locale' } = {},
): Intl.Locale {
  return new Intl.Locale(getCookie(event, name) || lang)
}
