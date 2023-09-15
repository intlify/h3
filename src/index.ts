import { getHeaders } from 'h3'
import { parseAcceptLanguage } from './utils.ts'

import type { H3Event } from 'h3'

/**
 * get accpet languages
 * @description parse `accept-language` header string
 * @param event The H3 event
 * @returns The array of language tags, if `*` (any language) or empty string is detected, return an empty array.
 */
export function getAcceptLanguages(event: H3Event): string[] {
  const headers = getHeaders(event)
  const acceptLanguage = headers['accept-language']
  return acceptLanguage ? parseAcceptLanguage(acceptLanguage) : []
}
