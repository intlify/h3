/**
 * parse `accept-language` header string
 *
 * @param {string} value The accept-language header string
 *
 * @returns {Array<string>} The array of language tags, if `*` (any language) or empty string is detected, return an empty array.
 */
export function parseAcceptLanguage(value: string): string[] {
  return value.split(',').map((tag) => tag.split(';')[0]).filter((tag) =>
    !(tag === '*' || tag === '')
  )
}
