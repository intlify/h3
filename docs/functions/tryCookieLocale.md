[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / tryCookieLocale

# Function: tryCookieLocale()

```ts
function tryCookieLocale(event, __namedParameters?): Locale | null;
```

try to get locale from cookie

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | \{ `lang?`: `string`; `name?`: `string`; \} | - |
| `__namedParameters.lang?` | `string` | - |
| `__namedParameters.name?` | `string` | - |

## Returns

`Locale` \| `null`

The locale that resolved from cookie. if `lang` option or cookie name value are not a well-formed BCP 47 language tag, return `null`.

## Description

Unlike [getCookieLocale](getCookieLocale.md), this function does not throw an error if the locale cannot be obtained, this function returns `null`.
