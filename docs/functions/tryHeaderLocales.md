[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / tryHeaderLocales

# Function: tryHeaderLocales()

```ts
function tryHeaderLocales(event, __namedParameters?): Locale[] | null;
```

try to get locales from header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | `HeaderOptions` | - |

## Returns

`Locale`[] \| `null`

The locales that wrapped from header, if you use `accept-language` header and `*` (any language) or empty string is detected, return an empty array. if header are not a well-formed BCP 47 language tag, return `null`.

## Description

wrap language tags with Intl.Locale \| locale, languages tags will be parsed from `accept-language` header as default. Unlike [getHeaderLocales](getHeaderLocales.md), this function does not throw an error if the locale cannot be obtained, this function returns `null`.
