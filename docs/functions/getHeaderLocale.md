[**@intlify/h3**](../index.md)

***

[@intlify/h3](../index.md) / getHeaderLocale

# Function: getHeaderLocale()

```ts
function getHeaderLocale(event, __namedParameters?): Locale;
```

get locale from header

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `H3Event` | The H3Event \| H3 event |
| `__namedParameters?` | `HeaderOptions` & `object` | - |

## Returns

`Locale`

The first locale that resolved from header string. if you use `accept-language` header and `*` (any language) or empty string is detected, return `en-US`.

## Description

wrap language tag with Intl.Locale \| locale, languages tags will be parsed from `accept-language` header as default.

## Example

example for h3:

```ts
import { createApp, eventHandler } from 'h3'
import { getHeaderLocale } from '@intlify/utils/h3'

app.use(eventHandler(event) => {
  const locale = getHeaderLocale(event)
  // ...
  return `accepted locale: ${locale.toString()}`
})
```

## Throws

Throws the RangeError if `lang` option or header are not a well-formed BCP 47 language tag.
