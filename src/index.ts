import { getHeaders } from 'h3'
import { parseAcceptLanguage } from './utils.ts'

import type { H3Event } from 'h3'

/**
 * get accpet languages
 * @description parse `accept-language` header string
 * @param {H3Event} event The H3 event
 * @returns {Array<string>} The array of language tags, if `*` (any language) or empty string is detected, return an empty array.
 */
export function getAcceptLanguages(event: H3Event): string[] {
  const headers = getHeaders(event)
  const acceptLanguage = headers['accept-language']
  return acceptLanguage ? parseAcceptLanguage(acceptLanguage) : []
}

/**
 * get locale
 * @param {H3Event} event The H3 event
 * @param {string} lang The default language, default is `en-US`
 * @returns {Intl.Locale} The locale that resolved from `accept-language` header string, first language tag is used. if `*` (any language) or empty string is detected, return `en-US`.
 */
export function getLocale(event: H3Event, lang = 'en-US'): Intl.Locale {
  const language = getAcceptLanguages(event)[0] || lang
  return new Intl.Locale(language)
}
