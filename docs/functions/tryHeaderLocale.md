[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / tryHeaderLocale

# Function: tryHeaderLocale()

```ts
function tryHeaderLocale(event, __namedParameters?): Locale | null;
```

try to get locale from header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | `HeaderOptions` & `object` | - |

## Returns

`Locale` \| `null`

The first locale that resolved from header string. if you use `accept-language` header and `*` (any language) or empty string is detected, return `en-US`. if header are not a well-formed BCP 47 language tag, return `null`.

## Description

wrap language tag with Intl.Locale \| locale, languages tags will be parsed from `accept-language` header as default. Unlike [getHeaderLocale](getHeaderLocale.md), this function does not throw an error if the locale cannot be obtained, this function returns `null`.
